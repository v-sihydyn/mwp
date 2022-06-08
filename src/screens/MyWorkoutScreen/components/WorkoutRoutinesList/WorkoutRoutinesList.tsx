import * as React from 'react';
import { View } from 'react-native';
import { WorkoutExercises } from './WorkoutExercises/WorkoutExercises';


export const WorkoutRoutinesList = () => {
  return (
    <View style={{ paddingBottom: 50 }}>
      <WorkoutExercises />
    </View>
  );
};
