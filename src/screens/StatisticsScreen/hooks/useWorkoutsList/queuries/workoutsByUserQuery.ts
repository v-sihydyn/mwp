import { gql } from '@apollo/client';
import { workoutFragment } from '../../../../../fragments/workoutFragment';

export const workoutsByUserQuery = gql`
  query WorkoutsByUser(
    $userID: ID!
    $dateFinished: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsByUser(
      userID: $userID
      dateFinished: $dateFinished
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...Workout
      }
      nextToken
      startedAt
    }
  }
  ${workoutFragment}
`;
