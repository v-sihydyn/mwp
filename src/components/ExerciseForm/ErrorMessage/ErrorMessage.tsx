import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../../../styles/colors';
import { FieldError } from 'react-hook-form';

type ErrorMessageProps = { error: FieldError };

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <Text style={styles.errorMessage}>{error.message}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 4,
    color: colors.red,
    alignSelf: 'stretch',
  },
});
