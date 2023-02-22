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

export const deletePlanAndRoutinesMutation = gql`
  mutation DeletePlanAndRoutines($planId: ID!) {
    deletePlanAndRoutines(planId: $planId) {
      id
    }
  }
`;
