import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { openConfirmLogoutModal } from '../../components/modals/ConfirmLogoutModal/ConfirmLogoutModal';
import { Auth } from 'aws-amplify';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={handleLogout}
          hitSlop={20}>
          <Icon
            name="sign-out-alt" // @TODO: mb use alternative icon font
            color={colors.text}
            size={18}
            light={true}
          />
        </Pressable>
      ),
    });
  }, []);

  const handleLogout = async () => {
    try {
      await openConfirmLogoutModal();
      await Auth.signOut();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/120' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@gmail.com</Text>
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
