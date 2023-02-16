import { gql } from '@apollo/client';

export const createWorkoutPlanRoutineMutation = gql`
  mutation CreateWorkoutPlanRoutine(
    $input: CreateWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    createWorkoutPlanRoutine(input: $input, condition: $condition) {
      id
      name
      sortOrder
      workoutPlanID
      WorkoutRoutineExercises {
        items {
          id
          name
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
