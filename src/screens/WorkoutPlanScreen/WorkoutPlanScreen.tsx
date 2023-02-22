import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { WorkoutPlanSheet } from './components/WorkoutPlanSheet/WorkoutPlanSheet';
import Portal from '../../components/Portal/Portal';
import { RoutineToolbar } from './components/RoutineToolbar/RoutineToolbar';
import { colors } from '../../styles/colors';
import { WorkoutPlanActions } from './components/WorkoutPlanActions/WorkoutPlanActions';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { RootTabScreenProps } from '../../../types';
import { openRenameRoutineModal } from '../../components/modals/RenameRoutineModal/RenameRoutineModal';
import { openDeleteRoutineModal } from '../../components/modals/DeleteRoutineModal/DeleteRoutineModal';
import { openRenamePlanModal } from '../../components/modals/RenamePlanModal/RenamePlanModal';
import { openDeletePlanModal } from '../../components/modals/DeletePlanModal/DeletePlanModal';
import {
  CollapsibleRef,
  MaterialTabBar,
  Tabs,
} from 'react-native-collapsible-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { openCreateRoutineModal } from '../../components/modals/CreateRoutineModal/CreateRoutineModal';
import { WorkoutExerciseCard } from './components/WorkoutRoutinesList/WorkoutExerciseCard/WorkoutExerciseCard';
import { useWorkoutPlansByUser } from './hooks/useWorkoutPlansByUser';
import { FullscreenLoader } from '../../components/FullscreenLoader/FullscreenLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import { CreateWorkoutPlanSection } from './components/CreateWorkoutPlanSection/CreateWorkoutPlanSection';
import { WorkoutPlan } from '../../API';
import { openCreatePlanModal } from '../../components/modals/CreatePlanModal/CreatePlanModal';
import { useWorkoutPlanActions } from '../../hooks/useWorkoutPlanActions';
import { Toast } from 'native-base';
import { Icon } from '../../components/Icon/Icon';
import { StoreObject } from '@apollo/client';
import { useWorkoutPlanRoutineActions } from '../../hooks/useWorkoutPlanRoutineActions';

type Props = RootTabScreenProps<'WorkoutPlan'>;

export const WorkoutPlanScreen = ({ navigation }: Props) => {
  const { userId } = useAuthContext();
  const { workoutPlans, areWorkoutPlansLoading } =
    useWorkoutPlansByUser(userId);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] =
    useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] =
    useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { deleteWorkoutPlan, deleteLoading: deletePlanLoading } =
    useWorkoutPlanActions();
  const { deleteWorkoutPlanRoutine, deleteLoading: deleteRoutineLoading } =
    useWorkoutPlanRoutineActions();
  const [didPlansInitLoaded, setDidPlansInitLoaded] = useState(false);
  const [tabToDelayedFocus, setTabToDelayedFocus] = useState<string | null>(
    null,
  );
  const tabContainerRef = useRef<CollapsibleRef>();
  const [tabContainerKey, setTabContainerKey] = useState(0);

  const forceUpdateTabContainer = () => setTabContainerKey((x) => x + 1);

  const selectedPlan = useMemo(() => {
    const plan = workoutPlans.find((x) => x?.id === selectedPlanId);

    return plan ?? null;
  }, [workoutPlans, selectedPlanId]);

  const routines = useMemo(() => {
    return selectedPlan?.WorkoutPlanRoutines?.items ?? [];
  }, [selectedPlan]);

  useEffect(() => {
    if (workoutPlans.length > 0 && !didPlansInitLoaded) {
      const plan = workoutPlans[0] as WorkoutPlan;
      handleSelectPlan(plan);

      setDidPlansInitLoaded(true);
    }
  }, [workoutPlans, didPlansInitLoaded, tabContainerRef?.current]);

  useEffect(() => {
    if (tabToDelayedFocus) {
      const routine = routines.find((r) => r?.name === tabToDelayedFocus);

      if (routine && tabToDelayedFocus) {
        setTimeout(() => {
          const focusedTab = tabContainerRef?.current?.getFocusedTab();

          if (!focusedTab || focusedTab !== tabToDelayedFocus) {
            tabContainerRef?.current?.jumpToTab(tabToDelayedFocus);
          }
        });

        setTabToDelayedFocus(null);
      }
    }
  }, [routines, tabToDelayedFocus, tabContainerRef?.current]);

  // WORKOUT PLAN ACTIONS
  const handleCreateWorkoutPlan = async () => {
    const newPlanId = await openCreatePlanModal({ userId }).catch(() => {});
    setSelectedPlanId(newPlanId as string | null);
    onCloseWorkoutPlanSheet();
  };

  const handleOpenRenamePlanModal = async () => {
    if (!selectedPlan) return;

    await openRenamePlanModal({
      workoutPlan: selectedPlan!,
      userId,
    }).catch(() => {});
  };

  const handleOpenDeletePlanModal = async () => {
    if (!selectedPlan) return;
    if (deletePlanLoading) return;

    const deleteConfirmed = await openDeletePlanModal({
      name: selectedPlan.name!,
    }).catch(() => {});

    if (deleteConfirmed) {
      try {
        await deleteWorkoutPlan({
          variables: {
            input: {
              id: selectedPlan.id,
              _version: selectedPlan._version,
            },
          },
          update(cache, { data }) {
            if (!data?.deleteWorkoutPlan) return;

            cache.modify({
              id: cache.identify(data.deleteWorkoutPlan),
              fields: {
                workoutPlansByUserID(existingItems = [], { readField }) {
                  return existingItems.filter(
                    (plan: StoreObject) =>
                      selectedPlan.id !== readField('id', plan),
                  );
                },
              },
            });
          },
        });
        setDidPlansInitLoaded(false);
      } catch (e) {
        Toast.show({
          title: 'Failed to delete a plan',
          description: (e as Error).message,
          duration: 3000,
          backgroundColor: colors.red,
        });
      }
    }
  };
  // WORKOUT PLAN ACTIONS END

  // WORKOUT ROUTINE ACTIONS
  const handleOpenCreateRoutineModal = async () => {
    if (!selectedPlan) return;

    const routine = await openCreateRoutineModal({
      workoutPlanId: selectedPlan.id!,
      userId,
    }).catch(() => {});

    setTabToDelayedFocus(routine?.name ?? null);

    if (routines.length === 0) {
      forceUpdateTabContainer();
    }
  };

  const handleOpenRenameRoutineModal = async () => {
    const focusedTab = tabContainerRef?.current?.getFocusedTab();
    const selectedRoutine = routines.find((r) => r?.name === focusedTab);

    if (!selectedPlan || !selectedRoutine) return;

    await openRenameRoutineModal({
      workoutPlanId: selectedPlan.id!,
      userId,
      routine: {
        id: selectedRoutine.id,
        name: selectedRoutine.name,
        _version: selectedRoutine._version,
      },
    }).catch(() => {});
  };

  const handleOpenDeleteRoutineModal = async () => {
    const focusedTab = tabContainerRef?.current?.getFocusedTab();
    const selectedRoutine = routines.find((r) => r?.name === focusedTab);

    if (!selectedPlan || !selectedRoutine) return;
    if (deleteRoutineLoading) return;

    const deleteConfirmed = await openDeleteRoutineModal({
      name: selectedRoutine.name,
    }).catch(() => {});

    if (deleteConfirmed) {
      try {
        await deleteWorkoutPlanRoutine({
          variables: {
            input: {
              id: selectedRoutine.id,
              _version: selectedRoutine._version,
            },
          },
          update(cache, { data }) {
            if (!data?.deleteWorkoutPlanRoutine) return;

            cache.modify({
              id: cache.identify(data.deleteWorkoutPlanRoutine),
              fields: {
                workoutPlansByUserID(existingItems = [], { readField }) {
                  return existingItems.map((planRef: StoreObject) => {
                    if (readField('id', planRef) === selectedPlan.id) {
                      return {
                        ...planRef,
                        WorkoutPlanRoutines: planRef.WorkoutPlanRoutines.filter(
                          (routineRef: StoreObject) =>
                            readField('id', routineRef) === selectedRoutine.id,
                        ),
                      };
                    }

                    return planRef;
                  });
                },
              },
            });
          },
        });

        const updatedRoutines = routines.filter(
          (x) => x?.id !== selectedRoutine.id,
        );
        const routineIndex = routines.findIndex(
          (r) => r?.id === selectedRoutine.id,
        );
        const nextIndex = Math.max(routineIndex - 1, 0);
        setTabToDelayedFocus(updatedRoutines[nextIndex]?.name ?? null);
      } catch (e) {
        Toast.show({
          title: 'Failed to delete a routine',
          description: (e as Error).message,
          duration: 3000,
          backgroundColor: colors.red,
        });
      }
    }
  };
  // WORKOUT ROUTINE ACTIONS END

  const onOpenWorkoutPlanSheet = () => {
    setWorkoutPlanSheetVisible(true);
  };

  const onCloseWorkoutPlanSheet = () => {
    setWorkoutPlanSheetVisible(false);
  };

  const onOpenWorkoutActionsSheet = () => {
    setWorkoutActionsSheetVisible(true);
  };

  const onCloseWorkoutActionsSheet = () => {
    setWorkoutActionsSheetVisible(false);
  };

  const handleGoToRoutinesList = () => {
    navigation.navigate('RoutinesManagement');
  };

  const handleGoToReminders = () => {
    navigation.navigate('RoutineReminders');
  };

  const handleGoToExerciseScreen = () => {
    navigation.navigate('EditRoutineExercise');
  };

  const header = useMemo(() => {
    return (
      <View style={[styles.header]}>
        <WorkoutPlanSelector
          label={selectedPlan?.name ?? null}
          onPress={onOpenWorkoutPlanSheet}
        />
        <WorkoutPlanActionsButton onPress={onOpenWorkoutActionsSheet} />
      </View>
    );
  }, [selectedPlan]);

  const handleSelectPlan = (plan: WorkoutPlan) => {
    setSelectedPlanId(plan.id);
    setTabToDelayedFocus(plan?.WorkoutPlanRoutines?.items?.[0]?.name ?? null);
    forceUpdateTabContainer();
  };

  if (areWorkoutPlansLoading) return <FullscreenLoader />;

  if (workoutPlans.length === 0) {
    return <CreateWorkoutPlanSection />;
  }

  const emptyTabElement = (
    <Tabs.Tab name="__empty__" key="Empty">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          icon={<Icon name="plus-circle" size={14} color={colors.text} />}
          onPress={handleOpenCreateRoutineModal}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: 16,
          }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Add your first routine
          </Text>
        </CustomButton>
      </View>
    </Tabs.Tab>
  );

  const _tabs = routines.map((routine) => {
    return (
      <Tabs.Tab name={routine!.name} key={routine!.id}>
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <WorkoutExerciseCard
              name="Barbell Bench Press"
              onPress={handleGoToExerciseScreen}
            />
          )}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            marginTop: 20,
            paddingBottom: 94,
          }}
        />
      </Tabs.Tab>
    );
  });

  const hasNoRoutines = !areWorkoutPlansLoading && routines.length === 0;

  return (
    <View style={styles.container}>
      <View
        style={{
          height: insets.top,
          zIndex: 1,
          backgroundColor: colors.page,
        }}
      />
      <Tabs.Container
        key={tabContainerKey}
        ref={tabContainerRef}
        revealHeaderOnScroll={true}
        renderHeader={() => header}
        headerHeight={64}
        renderTabBar={(props: any) =>
          !areWorkoutPlansLoading && routines.length === 0 ? null : (
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                flex: 1,
              }}>
              <MaterialTabBar
                {...props}
                width={windowWidth - 105 - 20}
                style={{
                  marginLeft: 20,
                  flex: 1,
                }}
                indicatorStyle={{
                  backgroundColor: colors.text,
                  height: 1,
                }}
                labelStyle={{
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  fontSize: 15,
                  margin: 0,
                }}
                tabStyle={{
                  marginRight: 20,
                  paddingHorizontal: 0,
                  height: 30,
                }}
                activeColor={colors.text}
                inactiveColor="#b5b5b5"
                scrollEnabled
              />
              {routines.length > 0 && (
                <CustomButton
                  style={{
                    height: 32,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  onPress={handleOpenCreateRoutineModal}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                    New Routine
                  </Text>
                </CustomButton>
              )}
            </View>
          )
        }
        tabBarHeight={68}
        headerContainerStyle={{
          backgroundColor: colors.page,
          elevation: 0,
          shadowOpacity: 0,
        }}>
        {hasNoRoutines ? emptyTabElement : _tabs}
      </Tabs.Container>
      {!hasNoRoutines && (
        <RoutineToolbar
          onRenameRoutine={handleOpenRenameRoutineModal}
          onDeleteRoutine={handleOpenDeleteRoutineModal}
        />
      )}
      <Portal>
        <WorkoutPlanSheet
          selectedPlanId={selectedPlan?.id ?? null}
          workoutPlans={workoutPlans as WorkoutPlan[]}
          onCreatePlan={handleCreateWorkoutPlan}
          onSelectPlan={handleSelectPlan}
          isVisible={isWorkoutPlanSheetVisible}
          onClose={onCloseWorkoutPlanSheet}
        />

        <BottomSheet
          isVisible={isWorkoutActionsSheetVisible}
          onClose={onCloseWorkoutActionsSheet}>
          <WorkoutPlanActions
            label={selectedPlan?.name ?? null}
            onInitiateRenamePlan={handleOpenRenamePlanModal}
            onInitiateDeletePlan={handleOpenDeletePlanModal}
            onSheetClose={onCloseWorkoutActionsSheet}
            onGoToRoutinesList={handleGoToRoutinesList}
            onGoToReminders={handleGoToReminders}
          />
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
});
