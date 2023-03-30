import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { openConfirmLogoutModal } from '../../components/modals/ConfirmLogoutModal/ConfirmLogoutModal';
import { Auth } from 'aws-amplify';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApolloClient } from '@apollo/client';
import { GetUserQuery, GetUserQueryVariables } from '../../API';
import { getUserQuery } from '../../queries/getUserQuery';
import Octicons from 'react-native-vector-icons/Octicons';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const client = useApolloClient();
  const { userId } = useAuthContext();
  const userQuery = client.cache.readQuery<GetUserQuery, GetUserQueryVariables>(
    {
      query: getUserQuery,
      variables: { id: userId },
    },
  );
  const user = userQuery?.getUser ?? null;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={handleLogout}
          hitSlop={20}>
          <Octicons name="sign-out" color={colors.text} size={18} />
        </Pressable>
      ),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    try {
      const confirmed = await openConfirmLogoutModal();

      if (confirmed) {
        await Auth.signOut();
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 120,
    marginBottom: 12,
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: colors.text2,
    fontSize: 14,
  },
});
