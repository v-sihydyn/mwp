import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { FormInput } from '../components/FormInput';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import { useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { colors } from '../../../styles/colors';
import { Button } from 'native-base';

type ConfirmEmailData = {
  email: string;
  code: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const { control, handleSubmit, watch } = useForm<ConfirmEmailData>({
    defaultValues: { email: route?.params?.email },
  });
  const watchEmail = watch('email');

  const navigation = useNavigation<ConfirmEmailNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onConfirmPressed = async ({ email, code }: ConfirmEmailData) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await Auth.confirmSignUp(email, code);

      navigation.navigate('Sign in');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(watchEmail);
      Alert.alert('Check your email', 'The code has been sent');
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />
        <Button
          isLoading={loading}
          bgColor={colors.green}
          padding={15}
          w="100%"
          mt={2}
          borderRadius={5}
          _text={{ fontWeight: 'bold', color: colors.text }}
          onPress={handleSubmit(onConfirmPressed)}>
          {loading ? 'Loading...' : 'Confirm'}
        </Button>

        <Button
          padding={15}
          w="100%"
          mt={2}
          borderRadius={5}
          borderColor={colors.green}
          borderWidth={2}
          _text={{ fontWeight: 'bold', color: colors.green }}
          onPress={onResendPress}
          variant="outline">
          Resend code
        </Button>

        {/*<CustomButton*/}
        {/*  text="Back to Sign in"*/}
        {/*  onPress={onSignInPress}*/}
        {/*  type="TERTIARY"*/}
        {/*/>*/}
        <Button
          onPress={onSignInPress}
          variant="unstyled"
          _text={{ fontWeight: 'bold' }}
          mt={1.5}
          mb={1.5}>
          Back to Sign in
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
