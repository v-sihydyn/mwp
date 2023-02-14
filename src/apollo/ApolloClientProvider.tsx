import React from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import config from '../aws-exports';

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: config.aws_appsync_apiKey,
};

const link = ApolloLink.from([createAuthLink({ url, region, auth })]);

const apolloClientProvider = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApolloProvider client={apolloClientProvider}>{children}</ApolloProvider>
  );
};
