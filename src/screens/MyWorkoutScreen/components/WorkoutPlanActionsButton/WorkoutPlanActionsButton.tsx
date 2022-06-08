import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../../styles/colors';

type Props = {
  onPress: () => void;
};

export const WorkoutPlanActionsButton = ({ onPress }: Props) => {
  return (
    <Ripple onPress={onPress} rippleColor="#ffffff" rippleContainerBorderRadius={8}>
      <View style={styles.wrapper}>
        <FontAwesome5 name="ellipsis-v" color="#ffffff" />
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
});
