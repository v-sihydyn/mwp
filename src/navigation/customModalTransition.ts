import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  TransitionPreset,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { Animated } from 'react-native';

function forVerticalIOS({
  current,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateY = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-screen.height, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  return {
    cardStyle: {
      transform: [{ translateY: translateY }],
    },
  };
}

export const ModalSlideFromTopIOS: TransitionPreset = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: forVerticalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};
