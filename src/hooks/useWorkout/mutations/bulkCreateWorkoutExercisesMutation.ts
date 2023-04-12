import { gql } from '@apollo/client';

export const bulkCreateWorkoutExercisesMutation = gql`
  mutation BulkCreateWorkoutExercises(
    $exercises: [CreateWorkoutExerciseInput!]!
    $routineExercisesToUpdate: [RoutineExerciseToUpdateInput]
  ) {
    bulkCreateWorkoutExercises(
      exercises: $exercises
      routineExercisesToUpdate: $routineExercisesToUpdate
    ) {
      exercises {
        id
        setsConfig
        sortOrder
        workoutID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedRoutineExercises {
        id
        setsConfig
      }
    }
  }
`;
