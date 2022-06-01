import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WorkoutPlanListItem } from './WorkoutPlanListItem/WorkoutPlanListItem';
import { AddWorkoutPlanButton } from '../AddWorkoutPlanButton/AddWorkoutPlanButton';

export const WorkoutPlansList = () => {
  return (
    <View style={styles.root}>
      <WorkoutPlanListItem name="My Workout Plan" isSelected={true} style={styles.notLastItem} />
      <WorkoutPlanListItem name="My Workout Plan 2" isSelected={false} />
      <AddWorkoutPlanButton />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#2c2c2e',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  notLastItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#535353',
  },
});