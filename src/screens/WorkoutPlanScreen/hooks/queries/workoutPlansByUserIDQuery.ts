import { gql } from '@apollo/client';
import { planFragment } from '../../../../fragments/planFragment';

export const workoutPlansByUserIDQuery = gql`
  query WorkoutPlansByUserIDAndCreatedAt(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutPlansByUserIDAndCreatedAt(
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
