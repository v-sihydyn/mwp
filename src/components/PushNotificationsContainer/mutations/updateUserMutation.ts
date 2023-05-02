import { gql } from '@apollo/client';

export const updateUserMutation = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      fcmToken
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
