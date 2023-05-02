import { gql } from '@apollo/client';

export const createRoutineReminderMutation = gql`
  mutation CreateRoutineReminder($routineId: ID!, $fcmToken: String!) {
    createRoutineReminder(routineId: $routineId, fcmToken: $fcmToken) {
      ruleName
    }
  }
`;
