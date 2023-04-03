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
        WorkoutRoutineExercise {
          id
          name
          muscleGroup
          equipment
          color
          description
          restTimeInSeconds
          sortOrder
          workoutPlanRoutineID
          setsConfig
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        workoutExerciseWorkoutRoutineExerciseId
        owner
      }
      updatedRoutineExercises {
        id
        setsConfig
      }
    }
  }
`;
