import { gql } from '@apollo/client';

export const updateWorkoutPlanRoutineMutation = gql`
  mutation UpdateWorkoutPlanRoutine(
    $input: UpdateWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    updateWorkoutPlanRoutine(input: $input, condition: $condition) {
      id
      name
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
