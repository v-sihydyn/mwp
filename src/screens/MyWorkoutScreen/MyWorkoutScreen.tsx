import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { WorkoutPlanSheet } from './components/WorkoutPlanSheet/WorkoutPlanSheet';
import Portal from '../../components/Portal/Portal';
import { WorkoutRoutinesList } from './components/WorkoutRoutinesList/WorkoutRoutinesList';
import { RoutineToolbar } from './components/RoutineToolbar/RoutineToolbar';
import { colors } from '../../styles/colors';
import { WorkoutPlanActions } from './components/WorkoutPlanActions/WorkoutPlanActions';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { RootTabScreenProps } from '../../../types';
import { openRenameRoutineModal } from '../../components/modals/RenameRoutineModal/RenameRoutineModal';
import { openDeleteRoutineModal } from '../../components/modals/DeleteRoutineModal/DeleteRoutineModal';
import { openRenamePlanModal } from '../../components/modals/RenamePlanModal/RenamePlanModal';
import { openDeletePlanModal } from '../../components/modals/DeletePlanModal/DeletePlanModal';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { openCreateRoutineModal } from '../../components/modals/CreateRoutineModal/CreateRoutineModal';

const tabNames = [
  'Push A',
  'Legs',
  'Push B',
  'Pull A',
  'Pull B',
  'Hands',
  'Abs',
];

type Props = RootTabScreenProps<'MyWorkout'>;

export const MyWorkoutScreen = ({ navigation }: Props) => {
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] =
    useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] =
    useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();

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

  const handleOpenRenamePlanModal = async () => {
    try {
      const resp = await openRenamePlanModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const handleOpenDeletePlanModal = async () => {
    try {
      const resp = await openDeletePlanModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const handleOpenRenameRoutineModal = async () => {
    try {
      const resp = await openRenameRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const handleOpenDeleteRoutineModal = async () => {
    try {
      const resp = await openDeleteRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const handleOpenCreateRoutineModal = async () => {
    try {
      const resp = await openCreateRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
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
        <WorkoutPlanSelector onPress={onOpenWorkoutPlanSheet} />
        <WorkoutPlanActionsButton onPress={onOpenWorkoutActionsSheet} />
      </View>
    );
  }, []);

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
        revealHeaderOnScroll={true}
        renderHeader={() => header}
        headerHeight={64}
        renderTabBar={(props: any) => (
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
          </View>
        )}
        tabBarHeight={68}
        headerContainerStyle={{
          backgroundColor: colors.page,
          elevation: 0,
          shadowOpacity: 0,
        }}>
        {tabNames.map((name) => {
          return (
            <Tabs.Tab name={name} key={name}>
              <Tabs.ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}>
                <WorkoutRoutinesList />
              </Tabs.ScrollView>
            </Tabs.Tab>
          );
        })}
      </Tabs.Container>
      <RoutineToolbar
        onRenameRoutine={handleOpenRenameRoutineModal}
        onDeleteRoutine={handleOpenDeleteRoutineModal}
      />
      <Portal>
        <WorkoutPlanSheet
          isVisible={isWorkoutPlanSheetVisible}
          onClose={onCloseWorkoutPlanSheet}
        />

        <BottomSheet
          isVisible={isWorkoutActionsSheetVisible}
          onClose={onCloseWorkoutActionsSheet}>
          <WorkoutPlanActions
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
    // paddingTop: 40,
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
