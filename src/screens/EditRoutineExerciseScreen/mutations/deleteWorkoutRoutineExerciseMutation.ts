import { gql } from '@apollo/client';

export const deleteWorkoutRoutineExerciseMutation = gql`
  mutation DeleteWorkoutRoutineExercise(
    $input: DeleteWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    deleteWorkoutRoutineExercise(input: $input, condition: $condition) {
      id
    }
  }
`;
