import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export const ListEmptyComponent = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.heading}>No workouts yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  heading: {
    color: colors.text,
    fontSize: 18,
  },
});
