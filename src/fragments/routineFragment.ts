import { gql } from '@apollo/client';
import { exerciseFragment } from './exerciseFragment';

export const routineFragment = gql`
  fragment Routine on WorkoutPlanRoutine {
    id
    name
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    WorkoutRoutineExercises(filter: { _deleted: { ne: true } }) {
      items {
        ...Exercise
      }
    }
  }
  ${exerciseFragment}
`;
