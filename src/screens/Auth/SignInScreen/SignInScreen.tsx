import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { SignInNavigationProp } from '../../../types/navigation';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { colors } from '../../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'native-base';

type SignInData = {
  email: string;
  password: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<SignInData>();

  const onSignInPressed = async ({ email, password }: SignInData) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await Auth.signIn(email, password);
    } catch (e) {
      setLoading(false);

      if ((e as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', { email });
      } else {
        Alert.alert('Oops', (e as Error).message);
      }
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <View style={[styles.root, { paddingTop: insets.top }]}>
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
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
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
          onPress={handleSubmit(onSignInPressed)}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>

        <Button
          onPress={onForgotPasswordPressed}
          variant="unstyled"
          _text={{ fontWeight: 'bold' }}
          mt={1.5}
          mb={1.5}>
          Forgot password?
        </Button>

        <SocialSignInButtons />

        <Button
          onPress={onSignUpPress}
          variant="unstyled"
          _text={{ fontWeight: 'bold' }}>
          Don't have an account? Create one
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
});

export default SignInScreen;
