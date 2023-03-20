import { gql } from '@apollo/client';
import { exerciseFragment } from '../../../fragments/exerciseFragment';

export const updateWorkoutRoutineExerciseMutation = gql`
  mutation UpdateWorkoutRoutineExercise(
    $input: UpdateWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    updateWorkoutRoutineExercise(input: $input, condition: $condition) {
      ...Exercise
    }
  }
  ${exerciseFragment}
`;
