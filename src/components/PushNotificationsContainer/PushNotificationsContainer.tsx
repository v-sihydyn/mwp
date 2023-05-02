import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../API';
import { updateUserMutation } from './mutations/updateUserMutation';
import { getUserQuery } from './queries/getUserQuery';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(
    'Message handled in the background!',
    JSON.stringify(remoteMessage, null, 2),
  );
});

export const PushNotificationsContainer = () => {
  const [enabled, setEnabled] = useState(false);
  const [token, setToken] = useState('');

  const navigation = useNavigation();

  const { userId } = useAuthContext();

  const { data } = useQuery<GetUserQuery, GetUserQueryVariables>(getUserQuery, {
    variables: { id: userId },
  });

  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUserMutation);

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.warn('Authorization status:', authStatus);
        setEnabled(true);
        await getDeviceToken();
      }
    }
    requestUserPermission();
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Handle notifications that are received while the application is in Foreground state
    messaging().onMessage(handleNotification);

    // Handle the notification that opened the app from Background state
    messaging().onNotificationOpenedApp(handleNotification);

    // Handle the notification that opened the app from Quit state
    messaging().getInitialNotification().then(handleNotification);
  }, [enabled]);

  useEffect(() => {
    if (!token || !data?.getUser?.id) {
      return;
    }
    const user = data.getUser;
    doUpdateUser({
      variables: {
        input: {
          id: user.id,
          _version: user._version,
          fcmToken: token,
        },
      },
    });
  }, [token, data?.getUser?.id]);

  const handleNotification = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    if (!remoteMessage) {
      return;
    }
    console.log(JSON.stringify(remoteMessage, null, 2));

    // if (remoteMessage.data?.postId) {
    //   navigation.navigate('Post', { id: remoteMessage.data?.postId });
    // }
  };

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const newToken = await messaging().getToken();
    setToken(newToken);
  };

  // console.log('Token: ', token);

  return null;
};
