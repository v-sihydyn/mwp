import React, { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

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
import PortalHost from '../../components/Portal/PortalHost';
import { openRenameRoutineModal } from '../../components/modals/RenameRoutineModal/RenameRoutineModal';
import { openDeleteRoutineModal } from '../../components/modals/DeleteRoutineModal/DeleteRoutineModal';
import { openRenamePlanModal } from '../../components/modals/RenamePlanModal/RenamePlanModal';
import { openDeletePlanModal } from '../../components/modals/DeletePlanModal/DeletePlanModal';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabNames = ['12', 'Product Design', 'Development', 'Project Management'];

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
    <PortalHost>
      <View style={styles.container}>
        <View
          style={{
            height: insets.top,
            zIndex: 1,
            backgroundColor: colors.page,
          }}
        />
        <Tabs.Container
          renderHeader={() => header}
          renderTabBar={(props: any) => (
            <MaterialTabBar
              {...props}
              style={{
                marginTop: 20,
                width: windowWidth - 40,
                alignSelf: 'center',
              }}
              indicatorStyle={{
                backgroundColor: colors.text,
                height: 1,
              }}
              labelStyle={{ fontWeight: '700' }}
              activeColor={colors.text}
              inactiveColor="#b5b5b5"
              scrollEnabled
            />
          )}
          headerContainerStyle={{
            backgroundColor: colors.page,
            elevation: 0,
            shadowOpacity: 0,
          }}>
          {tabNames.map((name) => {
            return (
              <Tabs.Tab name={name} key={name}>
                <Tabs.ScrollView>
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
    </PortalHost>
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
