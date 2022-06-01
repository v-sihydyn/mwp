import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WorkoutPlanActionItem } from './WorkoutPlanActionItem/WorkoutPlanActionItem';

interface WorkoutActionsProps {}

export const WorkoutPlanActions: React.FC<WorkoutActionsProps> = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>My Workout Plan</Text>
      <WorkoutPlanActionItem name="Manage Routines" icon="list" />
      <WorkoutPlanActionItem name="Rename" icon="pencil-alt" />
      <WorkoutPlanActionItem name="Delete" icon="trash" />
      <WorkoutPlanActionItem name="Reminders" icon="clock" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#2c2c2e',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    color: '#ffffff',
    padding: 20,
  },
});
