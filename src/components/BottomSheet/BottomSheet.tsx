import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  LayoutChangeEvent,
  Pressable,
  PanResponder,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import createAnimatedComponent = Animated.createAnimatedComponent;

export type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode | ((rendered: boolean) => React.ReactNode);
};

const AnimatedPressable = createAnimatedComponent(Pressable);

const deviceHeight = Dimensions.get('window').height;

export const BottomSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  children,
}) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null); // ref?
  const [rendered, setRendered] = useState(isVisible);
  const [didCalculateContentHeight, setDidCalculateContentHeight] =
    useState(false);
  const modalY = useRef(new Animated.Value(deviceHeight));
  const innerContentHeight = useRef(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        return gestureState.dy > 15;
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], {
            useNativeDriver: false,
          })(e, gestureState);
        }
      },
      onPanResponderRelease: (_e, gestureState) => {
        if (innerContentHeight.current! / 2 - gestureState.dy < 0) {
          Animated.timing(pan, {
            toValue: { x: 0, y: innerContentHeight.current! },
            duration: 150,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) {
              setRendered(false);
              onClose();
            }
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            overshootClamping: true,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const backButtonHandler = useCallback(() => {
    onClose();

    return true;
  }, []);

  useEffect(() => {
    if (isVisible) {
      pan.setValue({ x: 0, y: 0 });
      setRendered(true);

      BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

      Animated.spring(modalY.current, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 0,
        restSpeedThreshold: 50,
        restDisplacementThreshold: 20,
      }).start();
    } else {
      if (rendered) {
        Animated.spring(modalY.current, {
          toValue: contentHeight!,
          useNativeDriver: false,
          bounciness: 0,
          restSpeedThreshold: 50,
          restDisplacementThreshold: 20,
        }).start(({ finished }) => {
          if (finished) {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              backButtonHandler,
            );
            setRendered(false);
          }
        });
      }
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
          <Animated.View
            {...panResponder.panHandlers}
            style={{ transform: [{ translateY: pan.y }] }}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              innerContentHeight.current = height;
            }}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              {typeof children === 'function' ? children(rendered) : children}
            </TouchableWithoutFeedback>
          </Animated.View>
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
