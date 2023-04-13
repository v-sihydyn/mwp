import { gql } from '@apollo/client';
import { planFragment } from '../../../fragments/planFragment';

export const createWorkoutPlanMutation = gql`
  mutation CreateWorkoutPlan(
    $input: CreateWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    createWorkoutPlan(input: $input, condition: $condition) {
      ...Plan
    }
  }
  ${planFragment}
`;
