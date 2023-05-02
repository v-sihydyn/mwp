import { gql } from '@apollo/client';

export const createRoutineReminderMutation = gql`
  mutation CreateRoutineReminder($routineId: ID!, $deviceId: String!) {
    createRoutineReminder(routineId: $routineId, deviceId: $deviceId) {
      ruleName
    }
  }
`;
