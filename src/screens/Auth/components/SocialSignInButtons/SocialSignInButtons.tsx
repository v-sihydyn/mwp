import React from 'react';
import { Auth } from 'aws-amplify';
import { Alert } from 'react-native';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/src/types/Auth';
import { Button } from 'native-base';

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
      <Button
        bgColor={'#FAE9EA'}
        padding={15}
        w="100%"
        mt={5}
        mb={5}
        borderRadius={5}
        _text={{ fontWeight: 'bold', color: '#DD4D44' }}
        onPress={onSignInGoogle}>
        Sign In with Google
      </Button>

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
