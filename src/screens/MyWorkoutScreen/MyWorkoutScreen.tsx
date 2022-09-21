import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

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

const tabs = [
  {
    title: '12',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Product Design',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Development',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Project Management',
    content: <WorkoutRoutinesList />,
  },
];

type Props = RootTabScreenProps<'MyWorkout'>;

export const MyWorkoutScreen = ({ navigation }: Props) => {
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] = useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] = useState(false);

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
        {/* @ts-ignore */}
        <StickyParallaxHeader
          foreground={header}
          parallaxHeight={80}
          headerHeight={0}
          tabs={tabs}
          tabTextStyle={styles.tabText}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabsContainerBackgroundColor={colors.page}
        />
        <RoutineToolbar onRenameRoutine={handleOpenRenameRoutineModal} onDeleteRoutine={handleOpenDeleteRoutineModal} />
        <Portal>
          <WorkoutPlanSheet isVisible={isWorkoutPlanSheetVisible} onClose={onCloseWorkoutPlanSheet} />

          <BottomSheet isVisible={isWorkoutActionsSheetVisible} onClose={onCloseWorkoutActionsSheet}>
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
    paddingTop: 40,
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },

  //
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
});
