import { gql } from '@apollo/client';

export const createWorkoutMutation = gql`
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      dateFinished
      totalTimeInSeconds
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutWorkoutPlanRoutineId
      owner
    }
  }
`;
