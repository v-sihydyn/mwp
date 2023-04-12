import { gql } from '@apollo/client';
import { routineFragment } from './routineFragment';

export const planFragment = gql`
  fragment Plan on WorkoutPlan {
    id
    name
    userID
    WorkoutPlanRoutines(filter: { _deleted: { ne: true } }) {
      items {
        ...Routine
      }
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
  }
  ${routineFragment}
`;
