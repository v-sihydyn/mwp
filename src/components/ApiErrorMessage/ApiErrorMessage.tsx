import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { colors } from '../../styles/colors';

type ApiErrorMessageProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export const ApiErrorMessage = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}: ApiErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    margin: 20,
  },
  message: {
    color: colors.text3,
    marginBottom: 10,
  },
});
