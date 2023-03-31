import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { NewPasswordNavigationProp } from '../../../types/navigation';
import { Auth } from 'aws-amplify';
import { colors } from '../../../styles/colors';
import { Button } from 'native-base';

type NewPasswordType = {
  email: string;
  code: string;
  password: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm<NewPasswordType>();

  const navigation = useNavigation<NewPasswordNavigationProp>();
  const [loading, setLoading] = useState(false);

  const onSubmitPressed = async ({
    email,
    code,
    password,
  }: NewPasswordType) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await Auth.forgotPasswordSubmit(email, code, password);

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

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

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
          placeholder="Code"
          name="code"
          control={control}
          rules={{ required: 'Code is required' }}
        />

        <FormInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <Button
          bgColor={colors.green}
          padding={15}
          w="100%"
          mt={1.5}
          borderRadius={5}
          _text={{ fontWeight: 'bold', color: colors.text }}
          onPress={handleSubmit(onSubmitPressed)}>
          Submit
        </Button>
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

export default NewPasswordScreen;
