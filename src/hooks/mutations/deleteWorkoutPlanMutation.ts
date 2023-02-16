import { gql } from '@apollo/client';

export const deleteWorkoutPlanMutation = gql`
  mutation DeleteWorkoutPlan(
    $input: DeleteWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    deleteWorkoutPlan(input: $input, condition: $condition) {
      id
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
