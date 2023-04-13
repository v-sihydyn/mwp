import { gql } from '@apollo/client';

export const updateWorkoutPlanMutation = gql`
  mutation UpdateWorkoutPlan(
    $input: UpdateWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    updateWorkoutPlan(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
