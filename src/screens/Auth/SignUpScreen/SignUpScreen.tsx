import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { FormInput } from '../components/FormInput';
import { SocialSignInButtons } from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { SignUpNavigationProp } from '../../../types/navigation';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { colors } from '../../../styles/colors';
import { Button } from 'native-base';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type SignUpData = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm<SignUpData>();
  const pwd = watch('password');
  const navigation = useNavigation<SignUpNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onRegisterPressed = async ({ name, email, password }: SignUpData) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          email,
        },
      });

      navigation.navigate('Confirm email', { email });
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Sign in');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <FormInput
          name="name"
          control={control}
          placeholder="Full name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

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
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <FormInput
          name="passwordRepeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: (value: string) =>
              value === pwd || 'Password do not match',
          }}
        />

        <Button
          isLoading={loading}
          bgColor={colors.green}
          padding={15}
          w="100%"
          mt={1.5}
          mb={1.5}
          borderRadius={5}
          _text={{ fontWeight: 'bold', color: colors.text }}
          onPress={handleSubmit(onRegisterPressed)}>
          {loading ? 'Loading...' : 'Register'}
        </Button>

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <Button
          onPress={onSignInPress}
          variant="unstyled"
          mt={1.5}
          mb={1.5}
          _text={{ fontWeight: 'bold' }}>
          Have an account? Sign in
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
    color: colors.green,
  },
});
