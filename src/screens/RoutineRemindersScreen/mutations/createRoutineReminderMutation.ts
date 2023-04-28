import { gql } from '@apollo/client';

export const createRoutineReminderMutation = gql`
  mutation CreateRoutineReminder($deviceId: String!) {
    createRoutineReminder(deviceId: $deviceId) {
      id
    }
  }
`;
