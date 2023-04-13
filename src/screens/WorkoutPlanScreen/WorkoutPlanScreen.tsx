import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  TabBarProps,
  Tabs,
} from 'react-native-collapsible-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { openCreateRoutineModal } from '../../components/modals/CreateRoutineModal/CreateRoutineModal';
import { useWorkoutPlansByUser } from './hooks/useWorkoutPlansByUser';
import { FullscreenLoader } from '../../components/FullscreenLoader/FullscreenLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import { CreateWorkoutPlanSection } from './components/CreateWorkoutPlanSection/CreateWorkoutPlanSection';
import {
  WorkoutPlan,
  WorkoutPlanRoutine,
  WorkoutRoutineExercise,
} from '../../API';
import { openCreatePlanModal } from '../../components/modals/CreatePlanModal/CreatePlanModal';
import { useWorkoutPlanActions } from '../../hooks/useWorkoutPlanActions';
import { Toast } from 'native-base';
import { useWorkoutPlanRoutineActions } from '../../hooks/useWorkoutPlanRoutineActions';
import { PagerViewProps } from 'react-native-pager-view';
import { ApiErrorMessage } from '../../components/ApiErrorMessage/ApiErrorMessage';
import PortalHost from '../../components/Portal/PortalHost';
import {
  deleteDraftWorkoutData,
  getPersistedDraftWorkoutData,
} from '../../utils/persistWorkout';
import { openBeforeWorkoutStartModal } from '../../components/modals/BeforeWorkoutStartModal/BeforeWorkoutStartModal';
import { DraftWorkoutExercise } from '../../types/draftWorkout';
import { useWorkout } from '../../hooks/useWorkout/useWorkout';
import { EmptyWorkoutPlanTab } from './components/EmptyWorkoutPlanTab/EmptyWorkoutPlanTab';
import { WorkoutPlanRoutineTab } from './components/WorkoutPlanRoutineTab/WorkoutPlanRoutineTab';
import { WorkoutRoutineTabBar } from './components/WorkoutRoutineTabBar/WorkoutRoutineTabBar';

type Props = RootTabScreenProps<'WorkoutPlan'>;

const HEADER_HEIGHT = 64;

export const WorkoutPlanScreen = ({ navigation }: Props) => {
  const { createDraftWorkoutAndExercises } = useWorkout();
  const { userId } = useAuthContext();
  const {
    workoutPlans,
    areWorkoutPlansLoading,
    error: workoutPlansFetchError,
  } = useWorkoutPlansByUser(userId);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] =
    useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] =
    useState(false);
  const insets = useSafeAreaInsets();
  const { doDeleteWorkoutPlan, deleteLoading: deletePlanLoading } =
    useWorkoutPlanActions();
  const { doDeleteWorkoutPlanRoutine, deleteLoading: deleteRoutineLoading } =
    useWorkoutPlanRoutineActions();
  const [didPlansInitLoaded, setDidPlansInitLoaded] = useState(false);
  const [tabToDelayedFocus, setTabToDelayedFocus] = useState<string | null>(
    null,
  );
  const tabContainerRef = useRef<CollapsibleRef>();
  const [tabContainerKey, setTabContainerKey] = useState(0);
  const [activeTabPosition, setActiveTabPosition] = useState<number | null>(
    null,
  );

  const forceUpdateTabContainer = () => setTabContainerKey((x) => x + 1);

  const selectedPlan = useMemo(() => {
    const plan = workoutPlans.find((x) => x?.id === selectedPlanId);

    return plan ?? null;
  }, [workoutPlans, selectedPlanId]);

  const routines = useMemo(() => {
    return selectedPlan?.WorkoutPlanRoutines?.items ?? [];
  }, [selectedPlan]);

  const selectedRoutine = useMemo(() => {
    return activeTabPosition !== null ? routines[activeTabPosition] : null;
  }, [routines, activeTabPosition]);

  useEffect(() => {
    if (workoutPlans.length > 0 && !didPlansInitLoaded) {
      // @TODO: select previously selected plan
      const plan = workoutPlans[0] as WorkoutPlan;
      handleSelectPlan(plan);

      setDidPlansInitLoaded(true);
    }
  }, [workoutPlans, didPlansInitLoaded]);

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
  }, [routines, tabToDelayedFocus]);

  // WORKOUT PLAN ACTIONS
  const handleCreateWorkoutPlan = async () => {
    const newPlanId = await openCreatePlanModal().catch(() => {});

    if (newPlanId) {
      setSelectedPlanId(newPlanId as string | null);
      onCloseWorkoutPlanSheet();
    }
  };

  const handleOpenRenamePlanModal = async () => {
    if (!selectedPlan) return;

    await openRenamePlanModal({
      workoutPlan: selectedPlan as WorkoutPlan,
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
        await doDeleteWorkoutPlan(selectedPlan.id!);
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
    if (!selectedPlan || !selectedRoutine) return;
    if (deleteRoutineLoading) return;

    const deleteConfirmed = await openDeleteRoutineModal({
      name: selectedRoutine.name,
    }).catch(() => {});

    if (deleteConfirmed) {
      try {
        await doDeleteWorkoutPlanRoutine(
          selectedRoutine.id!,
          selectedRoutine._version,
          selectedPlan.id!,
        );
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

  const handleInitiateAddExercise = () => {
    if (!selectedPlan || !selectedRoutine) return;

    navigation.navigate('ExerciseCatalog', {
      workoutPlanId: selectedPlan.id!,
      workoutRoutineId: selectedRoutine.id!,
    });
  };

  const handleInitiateEditExercise = (exerciseId: string) => {
    if (!selectedPlan?.id || !selectedRoutine?.id) return;

    navigation.navigate('EditRoutineExercise', {
      workoutPlanId: selectedPlan.id,
      workoutRoutineId: selectedRoutine.id,
      exerciseId,
    });
  };

  const handlePlayWorkout = async () => {
    if (!selectedRoutine?.id) return;

    const persistedWorkoutData = await getPersistedDraftWorkoutData(
      selectedRoutine.id,
    );

    if (persistedWorkoutData) {
      const shouldResumeWorkout = await openBeforeWorkoutStartModal().catch(
        () => {},
      );
      if (typeof shouldResumeWorkout === 'undefined') return;

      if (shouldResumeWorkout) {
        let displayedExerciseIndex;
        const draftWorkoutExercises: DraftWorkoutExercise[] =
          persistedWorkoutData.exercises.map((e, exerciseIdx) => ({
            ...e,
            sets: e.sets.map((s) => {
              if (
                s.id === persistedWorkoutData.currentSetId &&
                persistedWorkoutData.currentSetId !== null
              ) {
                displayedExerciseIndex = exerciseIdx;
                return {
                  ...s,
                  status: 'inprogress',
                };
              }

              return s;
            }),
          }));

        navigation.navigate('Workout', {
          workoutRoutineId: selectedRoutine.id,
          restTimeInSeconds: persistedWorkoutData.restTimeInSeconds,
          draftWorkout: persistedWorkoutData.workout,
          draftWorkoutExercises,
          displayedExerciseIndex,
          currentSetId: persistedWorkoutData.currentSetId,
          totalTimeInSeconds: persistedWorkoutData.totalTimeInSeconds,
        });
        return;
      } else {
        await deleteDraftWorkoutData(selectedRoutine.id);
      }
    }

    const exercises = selectedRoutine.WorkoutRoutineExercises.items ?? [];

    if (exercises.length > 1) {
      navigation.navigate('ConfigureWorkout', {
        workoutRoutineId: selectedRoutine.id,
      });
    } else {
      const { draftWorkout, draftWorkoutExercises } =
        createDraftWorkoutAndExercises(
          selectedRoutine.name!,
          exercises as WorkoutRoutineExercise[],
        );

      draftWorkoutExercises[0].sets[0].status = 'inprogress';

      navigation.navigate('Workout', {
        workoutRoutineId: selectedRoutine.id,
        restTimeInSeconds: 0,
        draftWorkout,
        draftWorkoutExercises,
      });
    }
  };

  if (areWorkoutPlansLoading) return <FullscreenLoader />;

  if (workoutPlansFetchError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ApiErrorMessage
          title="Error fetching workout plans"
          message={workoutPlansFetchError.message}
        />
      </View>
    );
  }

  if (workoutPlans.length === 0) {
    return <CreateWorkoutPlanSection />;
  }

  const emptyTabElement = (
    <Tabs.Tab name="__empty__" key="Empty">
      <EmptyWorkoutPlanTab onCreateRoutine={handleOpenCreateRoutineModal} />
    </Tabs.Tab>
  );

  const _tabs = routines.map((routine) => {
    return (
      <Tabs.Tab name={routine!.name!} key={routine!.id}>
        <WorkoutPlanRoutineTab
          routine={routine as WorkoutPlanRoutine}
          onEditExercise={handleInitiateEditExercise}
        />
      </Tabs.Tab>
    );
  });

  const hasNoRoutines = !areWorkoutPlansLoading && routines.length === 0;

  return (
    <View style={styles.container}>
      <PortalHost>
        <View
          style={{
            height: insets.top,
            zIndex: 1,
            backgroundColor: colors.page,
          }}
        />
        <Tabs.Container
          pagerProps={
            {
              onPageSelected: (e) =>
                setActiveTabPosition(e.nativeEvent.position),
            } as Omit<PagerViewProps, 'onPageScroll' | 'initialPage'>
          }
          key={tabContainerKey}
          ref={tabContainerRef}
          revealHeaderOnScroll={true}
          renderHeader={() => header}
          headerHeight={HEADER_HEIGHT}
          renderTabBar={(props: TabBarProps<string>) =>
            !areWorkoutPlansLoading && routines.length === 0 ? null : (
              <View style={styles.tabBarSpacer}>
                <WorkoutRoutineTabBar {...props} />
                {routines.length > 0 && (
                  <CustomButton
                    style={styles.newRoutineButton}
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
            isPlayButtonDisabled={
              selectedRoutine?.WorkoutRoutineExercises?.items?.length === 0
            }
            onPlayWorkout={handlePlayWorkout}
            onAddExercise={handleInitiateAddExercise}
            onRenameRoutine={handleOpenRenameRoutineModal}
            onDeleteRoutine={handleOpenDeleteRoutineModal}
          />
        )}
      </PortalHost>

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
  tabBarSpacer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  newRoutineButton: {
    height: 32,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
