import React from 'react';
import { WorkoutExerciseCard } from '../WorkoutExerciseCard/WorkoutExerciseCard';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

interface WorkoutExercisesProps {}

export const WorkoutExercises: React.FC<WorkoutExercisesProps> = () => {
  return (
    <View style={styles.root}>
      <WorkoutExerciseCard name="Barbell Bench Press" />
      <WorkoutExerciseCard name="Barbell Bench Press" />
      <WorkoutExerciseCard name="Barbell Bench Press 3" />
      <WorkoutExerciseCard name="Barbell Bench Press 4" />
      <WorkoutExerciseCard name="Barbell Bench Press" />
      <WorkoutExerciseCard name="Barbell Bench Press" />
      <WorkoutExerciseCard name="Barbell Bench Press" />
      <WorkoutExerciseCard name="Barbell Bench Press" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
