import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const ConfigureWorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ConfigureWorkoutScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flexDirection: 'column',
    position: 'relative',
  },
});
