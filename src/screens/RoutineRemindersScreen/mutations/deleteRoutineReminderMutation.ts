import { gql } from '@apollo/client';

export const deleteRoutineReminderMutation = gql`
  mutation DeleteRoutineReminder($ruleName: String!) {
    deleteRoutineReminder(ruleName: $ruleName) {
      deleted
    }
  }
`;
