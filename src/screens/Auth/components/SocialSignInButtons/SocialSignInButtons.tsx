import React from 'react';
import CustomButton from '../CustomButton';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/src/types/Auth';

const SocialSignInButtons = () => {
  const onSignInGoogle = async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <>
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      {/*<CustomButton*/}
      {/*  text="Sign In with Apple"*/}
      {/*  onPress={onSignInApple}*/}
      {/*  bgColor="#e3e3e3"*/}
      {/*  fgColor="#363636"*/}
      {/*/>*/}
    </>
  );
};

export default SocialSignInButtons;
