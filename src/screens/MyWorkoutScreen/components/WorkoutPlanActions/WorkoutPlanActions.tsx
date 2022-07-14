import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, Button } from 'react-native';
import { WorkoutPlanActionItem } from './WorkoutPlanActionItem/WorkoutPlanActionItem';
import { colors } from '../../../../styles/colors';
import { ActionsContext } from '../../contexts/ActionsContext';

type WorkoutActionsProps = {
  onSheetClose: () => void;
}

export const WorkoutPlanActions: React.FC<WorkoutActionsProps> = ({ onSheetClose }) => {
  const { onOpenRenameWorkoutPlanModal } = useContext(ActionsContext);

  const handleOpenRenameModal = () => {
    onSheetClose();
    setTimeout(() => {
      onOpenRenameWorkoutPlanModal();
    })
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>My Workout Plan</Text>
      <WorkoutPlanActionItem name="Manage Routines" icon="list" />
      <WorkoutPlanActionItem name="Rename" icon="pencil-alt" onPress={handleOpenRenameModal} />
      <WorkoutPlanActionItem name="Delete" icon="trash" />
      <WorkoutPlanActionItem name="Reminders" icon="clock" />
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
