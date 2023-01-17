import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../../styles/colors';

type Props = {
  onPress: () => void;
};

export const WorkoutPlanSelector = ({ onPress }: Props) => {
  return (
    <Ripple
      rippleColor="#ffffff"
      rippleContainerBorderRadius={12}
      onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>My Workout Plan</Text>
        <View style={styles.suffix}>
          <FontAwesome5 name="chevron-down" color="#ffffff" />
        </View>
      </View>
    </Ripple>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 20;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    height: 44,
    width: SCREEN_WIDTH - (SCREEN_PADDING * 2 + 20 + 40),
    backgroundColor: colors.surface,
    borderRadius: 12,
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
