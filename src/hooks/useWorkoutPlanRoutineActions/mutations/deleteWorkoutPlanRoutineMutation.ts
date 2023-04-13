import { gql } from '@apollo/client';

export const deleteWorkoutPlanRoutineMutation = gql`
  mutation DeleteWorkoutPlanRoutine(
    $input: DeleteWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    deleteWorkoutPlanRoutine(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
