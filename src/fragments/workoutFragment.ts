import { gql } from '@apollo/client';

export const workoutFragment = gql`
  fragment Workout on Workout {
    id
    name
    status
    dateFinished
    totalTimeInSeconds
    WorkoutExercises(sortDirection: ASC) {
      items {
        id
        name
        muscleGroup
        color
        restTimeInSeconds
        setsConfig
        sortOrder
        workoutID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
  }
`;
