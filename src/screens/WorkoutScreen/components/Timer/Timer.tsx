import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../../../styles/colors';
import { useEffect, useRef } from 'react';

type TimerProps = {};

export const Timer = (props: TimerProps) => {
  const sizeValue = useRef(new Animated.Value(56)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sizeValue, {
          toValue: 66,
          useNativeDriver: false,
          duration: 1000,
        }),
        Animated.timing(sizeValue, {
          toValue: 56,
          useNativeDriver: false,
          duration: 1000,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.root}>
      <Animated.View
        style={[styles.outer, { width: sizeValue, height: sizeValue }]}>
        <View style={styles.inner}>
          <Text style={styles.text}>01:50</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  outer: {
    borderRadius: 70,
    backgroundColor: colors.surface2,
    // opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  inner: {
    width: 46,
    height: 46,
    borderRadius: 46,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
