import { gql } from '@apollo/client';

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
        id
        name
        userID
        WorkoutPlanRoutines {
          items {
            id
            name
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            WorkoutRoutineExercises {
              items {
                id
                name
                muscleGroup
                color
                setsConfig

                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
              }
            }
          }
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
