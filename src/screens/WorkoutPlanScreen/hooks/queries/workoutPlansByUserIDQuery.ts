import { gql } from '@apollo/client';
import { planFragment } from '../../../../fragments/planFragment';

export const workoutPlansByUserIDQuery = gql`
  query WorkoutPlansByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutPlansByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...Plan
      }
      nextToken
      startedAt
    }
  }
  ${planFragment}
`;
