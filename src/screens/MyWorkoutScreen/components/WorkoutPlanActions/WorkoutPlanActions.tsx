import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WorkoutPlanActionItem } from './WorkoutPlanActionItem/WorkoutPlanActionItem';
import { colors } from '../../../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WorkoutActionsProps = {
  onSheetClose: () => void;
  onGoToRoutinesList: () => void;
  onGoToReminders: () => void;
  onInitiateRenamePlan: () => Promise<void>;
  onInitiateDeletePlan: () => Promise<void>;
};

export const WorkoutPlanActions = ({
  onSheetClose,
  onGoToRoutinesList,
  onGoToReminders,
  onInitiateRenamePlan,
  onInitiateDeletePlan,
}: WorkoutActionsProps) => {
  const insets = useSafeAreaInsets();

  const handleOpenRenameModal = () => {
    onSheetClose();
    setTimeout(() => {
      onInitiateRenamePlan();
    });
  };

  const handleOpenDeleteModal = () => {
    onSheetClose();
    setTimeout(() => {
      onInitiateDeletePlan();
    });
  };

  const handleGoToRoutinesLst = () => {
    onSheetClose();
    setTimeout(() => {
      onGoToRoutinesList();
    });
  };

  const handleGoToReminders = () => {
    onSheetClose();
    setTimeout(() => {
      onGoToReminders();
    });
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>My Workout Plan</Text>
      <WorkoutPlanActionItem
        name="Manage Routines"
        icon="list"
        onPress={handleGoToRoutinesLst}
      />
      <WorkoutPlanActionItem
        name="Rename"
        icon="pencil-alt"
        onPress={handleOpenRenameModal}
      />
      <WorkoutPlanActionItem
        name="Delete"
        icon="trash"
        onPress={handleOpenDeleteModal}
      />
      <WorkoutPlanActionItem
        name="Reminders"
        icon="clock"
        onPress={handleGoToReminders}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    color: colors.text,
    padding: 20,
  },
});
