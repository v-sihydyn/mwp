import { gql } from '@apollo/client';

export const exerciseFragment = gql`
  fragment Exercise on WorkoutRoutineExercise {
    id
    name
    muscleGroup
    color
    setsConfig
    restTimeInSeconds

    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
  }
`;
