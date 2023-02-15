import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';

type Props = {
  onPress: () => void;
};

export const WorkoutPlanActionsButton = ({ onPress }: Props) => {
  return (
    <Ripple
      onPress={onPress}
      rippleColor="#ffffff"
      rippleContainerBorderRadius={12}>
      <View style={styles.wrapper}>
        <Icon name="ellipsis-v" color="#ffffff" />
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 44,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
});
