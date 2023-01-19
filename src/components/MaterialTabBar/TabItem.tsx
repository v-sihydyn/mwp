import React, { useMemo } from 'react';
import { StyleSheet, Pressable, Platform } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { TabName } from 'react-native-collapsible-tab-view/src/types';
import { MaterialTabItemProps } from './types';

export const TABBAR_HEIGHT = 48;
const DEFAULT_COLOR = 'rgba(0, 0, 0, 1)';

/**
 * Any additional props are passed to the pressable component.
 */
export const MaterialTabItem = <T extends TabName = string>(
  props: MaterialTabItemProps<T>,
): React.ReactElement => {
  const {
    name,
    index,
    onPress,
    onLayout,
    scrollEnabled,
    indexDecimal,
    label,
    style,
    labelStyle,
    activeColor = DEFAULT_COLOR,
    activeBgColor = DEFAULT_COLOR,
    inactiveColor = DEFAULT_COLOR,
    inactiveBgColor = DEFAULT_COLOR,
    inactiveOpacity = 1,
    pressColor = '#DDDDDD',
    pressOpacity = Platform.OS === 'ios' ? 0.2 : 1,
    ...rest
  } = props;

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        indexDecimal.value,
        [index - 1, index, index + 1],
        [inactiveOpacity, 1, inactiveOpacity],
        Animated.Extrapolate.CLAMP,
      ),
    };
  });

  const isActive = useDerivedValue(() =>
    withTiming(index <= indexDecimal.value ? 1 : 0),
  );

  const labelColorStyle = useAnimatedStyle(() => ({
    color: isActive.value ? activeColor : inactiveColor,
  }));

  const renderedLabel = useMemo(() => {
    if (typeof label === 'string') {
      return (
        <Animated.Text
          style={[styles.label, stylez, labelColorStyle, labelStyle]}>
          {label}
        </Animated.Text>
      );
    }

    return label(props);
  }, [label, labelStyle, props, stylez]);

  const tabBgColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isActive.value,
      [0, 1],
      [inactiveBgColor, activeBgColor],
    ),
  }));

  return (
    <>
      {index > 0 && (
        <Animated.View
          style={[
            {
              flexGrow: 1,
              height: 3,
            },
            tabBgColorStyle,
          ]}
        />
      )}
      <Pressable
        onLayout={onLayout}
        style={({ pressed }) => [
          { opacity: pressed ? pressOpacity : 1 },
          !scrollEnabled && styles.grow,
        ]}
        onPress={() => onPress(name)}
        android_ripple={{
          borderless: true,
          color: pressColor,
        }}
        {...rest}>
        <Animated.View
          style={[styles.item, tabBgColorStyle, style, tabBgColorStyle]}>
          {renderedLabel}
        </Animated.View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: TABBAR_HEIGHT,
  },
  label: {
    margin: 4,
  },
});
