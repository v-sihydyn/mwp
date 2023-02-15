import { gql } from '@apollo/client';

export const createWorkoutPlanMutation = gql`
  mutation CreateWorkoutPlan(
    $input: CreateWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    createWorkoutPlan(input: $input, condition: $condition) {
      id
      name
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
