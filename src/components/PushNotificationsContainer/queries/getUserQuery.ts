import { gql } from '@apollo/client';

export const getUserQuery = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      fcmToken
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
