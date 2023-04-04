import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';

export const ListEmptyComponent = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Lets add some exercises</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    color: colors.text3,
    top: -20,
  },
});
