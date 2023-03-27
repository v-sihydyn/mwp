import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import React from 'react';

type TimerProps = {
  type: 'exercise' | 'rest';
};

const MIN_RADIUS = 56;

const TimerAnimationComponent = ({ type }: TimerProps) => {
  return (
    <MotiView
      from={{ opacity: 0.8, scale: 1.1 }}
      animate={{ opacity: 0.4, scale: 1.3 }}
      transition={{
        type: 'timing',
        duration: 1000,
        easing: Easing.out(Easing.ease),
        loop: true,
      }}
      style={[
        StyleSheet.absoluteFillObject,
        styles.dot,
        {
          backgroundColor: type === 'rest' ? colors.lime : colors.surface2,
        },
        styles.shadow,
      ]}
    />
  );
};

export const TimerAnimation = React.memo(TimerAnimationComponent);

const styles = StyleSheet.create({
  dot: {
    width: MIN_RADIUS,
    height: MIN_RADIUS,
    borderRadius: MIN_RADIUS,
    backgroundColor: colors.black,
  },
  shadow: {
    shadowColor: colors.lime,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
