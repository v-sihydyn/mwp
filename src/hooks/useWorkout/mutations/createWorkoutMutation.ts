import { gql } from '@apollo/client';
import { workoutFragment } from '../../../fragments/workoutFragment';

export const createWorkoutMutation = gql`
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      ...Workout
    }
  }
  ${workoutFragment}
`;
