import { View } from 'react-native';
import { WorkoutExercises } from './WorkoutExercises/WorkoutExercises';

export const WorkoutRoutinesList = () => {
  return (
    <View
      style={{
        padding: 20,
        paddingBottom: 54,
        flex: 1,
      }}>
      <WorkoutExercises />
    </View>
  );
};
