import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, LayoutChangeEvent, Pressable } from 'react-native';
import createAnimatedComponent = Animated.createAnimatedComponent;
import { WorkoutPlanActions } from '../WorkoutPlanActions/WorkoutPlanActions';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const AnimatedPressable = createAnimatedComponent(Pressable);

const deviceHeight = Dimensions.get('window').height;

export const WorkoutActionsModal = ({ isVisible, onClose }: Props) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [rendered, setRendered] = useState(isVisible);
  const [didCalculateContentHeight, setDidCalculateContentHeight] = useState(false);
  const modalY = useRef(new Animated.Value(deviceHeight));

  useEffect(() => {
    if (isVisible) {
      setRendered(true);
      Animated.spring(modalY.current, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 0,
        restSpeedThreshold: 100,
        restDisplacementThreshold: 40,
      }).start();
    } else {
      Animated.spring(modalY.current, {
        toValue: contentHeight!,
        useNativeDriver: false,
        bounciness: 0,
        restSpeedThreshold: 100,
        restDisplacementThreshold: 40,
      }).start(({ finished }) => {
        if (finished) {
          setRendered(false);
        }
      });
    }
  }, [isVisible, contentHeight, modalY.current, contentHeight]);

  if (!rendered) return null;

  const onWrapperLayout = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;

    if (!didCalculateContentHeight) {
      modalY.current.setValue(height);
      setContentHeight(height);
      setDidCalculateContentHeight(true);
    }
  };

  // @TODO: implement swipe down
  return (
    <View style={StyleSheet.absoluteFill}>
      <AnimatedPressable style={[styles.backdrop]} onPress={onClose}>
        <Animated.View
          style={[
            styles.wrapper,
            {
              position: 'absolute',
              bottom: didCalculateContentHeight ? 0 : -deviceHeight,
              transform: [{ translateY: modalY.current }],
            },
          ]}
          onLayout={onWrapperLayout}>
          <WorkoutPlanActions />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
});
