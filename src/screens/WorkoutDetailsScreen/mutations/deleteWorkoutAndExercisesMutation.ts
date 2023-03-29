import { gql } from '@apollo/client';

export const deleteWorkoutAndExercisesMutation = gql`
  mutation DeleteWorkoutAndExercises($workoutId: ID!) {
    deleteWorkoutAndExercises(workoutId: $workoutId) {
      id
    }
  }
`;
