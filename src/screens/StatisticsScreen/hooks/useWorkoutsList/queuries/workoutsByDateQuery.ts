import { gql } from '@apollo/client';
import { workoutFragment } from '../../../../../fragments/workoutFragment';

export const workoutsByDateQuery = gql`
  query WorkoutsByDate(
    $status: WorkoutStatus!
    $dateFinished: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsByDate(
      status: $status
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
