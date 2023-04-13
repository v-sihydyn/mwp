import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersByUsernameQuery,
  UsersByUsernameQueryVariables,
} from '../../API';
import { deleteUser, getUser, updateUser, usersByUsername } from './queries';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/core';
import { Auth } from 'aws-amplify';
import { styles } from './styles';
import { CustomInput } from './CustomInput';
import { IEditableUser } from './types';
import { ApiErrorMessage } from '../../components/ApiErrorMessage';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { colors } from '../../styles/colors';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  // const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>(null);
  const { control, handleSubmit, setValue } = useForm<IEditableUser>();
  const { userId, user: authUser } = useAuthContext();
  const { data, loading, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, { variables: { id: userId } });
  const [getUsersByUsername] = useLazyQuery<
    UsersByUsernameQuery,
    UsersByUsernameQueryVariables
  >(usersByUsername, { fetchPolicy: 'network-only' });
  const [doUpdateUser, { loading: updateLoading, error: updateError }] =
    useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);
  const [doDeleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation<DeleteUserMutation, DeleteUserMutationVariables>(deleteUser);

  const user = data?.getUser;

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
    }
  }, [user, setValue]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error.message}
      />
    );
  }

  if (updateError) {
    return (
      <ApiErrorMessage
        title="Error updating the user"
        message={updateError.message}
      />
    );
  }

  if (deleteError) {
    return (
      <ApiErrorMessage
        title="Error deleting the user"
        message={deleteError.message}
      />
    );
  }

  const onSubmit = async (userData: IEditableUser) => {
    const input: UpdateUserInput = {
      id: userId,
      ...userData,
      _version: user?._version,
    };

    // if (selectedPhoto?.uri) {
    //   input.image = await uploadMedia(selectedPhoto.uri);
    // }

    await doUpdateUser({
      variables: {
        input,
      },
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // const uploadMedia = async (uri: string) => {
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const uriParts = uri.split('.');
  //     const extension = uriParts[uriParts.length - 1];
  //
  //     const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
  //     return s3Response.key;
  //   } catch (e) {
  //     Alert.alert('Error uploading the file', (e as Error).message);
  //   }
  // };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: startDeleting,
      },
    ]);
  };

  const startDeleting = async () => {
    if (!user) {
      return;
    }

    await doDeleteUser({
      variables: { input: { id: userId, _version: user._version } },
    });

    authUser?.deleteUser((err) => {
      if (err) {
        console.log(err);
      }

      Auth.signOut();
    });
  };

  // const onChangePhoto = () => {
  //   launchImageLibrary(
  //     { mediaType: 'photo' },
  //     ({ didCancel, errorCode, assets }) => {
  //       if (!didCancel && !errorCode && assets && assets.length > 0) {
  //         setSelectedPhoto(assets[0]);
  //       }
  //     },
  //   );
  // };

  const validateUsername = async (username: string) => {
    try {
      const response = await getUsersByUsername({ variables: { username } });

      if (response.error) {
        Alert.alert('Failed to fetch username');

        return 'Failed to fetch username';
      }

      const users = response.data?.usersByUsername?.items;

      if (users && users.length > 0 && users?.[0]?.id !== userId) {
        return 'Username is already taken';
      }
    } catch (e) {
      Alert.alert('Failed to fetch username');
    }
  };

  return (
    <View style={styles.page}>
      {/*<Image*/}
      {/*  source={{*/}
      {/*    uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE,*/}
      {/*  }}*/}
      {/*  style={styles.avatar}*/}
      {/*/>*/}
      {/*<Text onPress={onChangePhoto} style={styles.textButton}>*/}
      {/*  Change profile photo*/}
      {/*</Text>*/}

      <CustomInput
        name="name"
        control={control}
        label="Name"
        rules={{ required: 'Name is required' }}
      />
      <CustomInput
        name="username"
        control={control}
        label="Username"
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be more than 3 characters',
          },
          validate: validateUsername,
        }}
      />

      <CustomButton onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>
          {updateLoading ? 'Submitting...' : 'Submit'}
        </Text>
      </CustomButton>
      <Text onPress={confirmDelete} style={styles.textButtonDanger}>
        {deleteLoading ? 'Deleting...' : 'DELETE USER'}
      </Text>
    </View>
  );
};
