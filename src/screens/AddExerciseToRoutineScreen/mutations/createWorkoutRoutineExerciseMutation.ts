import { gql } from '@apollo/client';

export const createWorkoutRoutineExerciseMutation = gql`
  mutation CreateWorkoutRoutineExercise(
    $input: CreateWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    createWorkoutRoutineExercise(input: $input, condition: $condition) {
      id
      name
      muscleGroup
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
  }
`;
