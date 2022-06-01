import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';

type Props = {
  onPress: () => void;
}

export const WorkoutPlanSelector = ({ onPress }: Props) => {
  return (
    <Ripple rippleColor="#ffffff" rippleContainerBorderRadius={8} onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>My Workout Plan</Text>
        <View style={styles.suffix}>
          <FontAwesome5 name="chevron-down" color="#ffffff" />
        </View>
      </View>
    </Ripple>
  );
};

const screenWidth = Dimensions.get('window').width;
const SCREEN_PADDING = 20;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    height: 40,
    width: screenWidth - (SCREEN_PADDING * 2 + 20 + 40),
    backgroundColor: '#121212',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#ffffff',
    fontWeight: '700',
  },
  suffix: {},
});
