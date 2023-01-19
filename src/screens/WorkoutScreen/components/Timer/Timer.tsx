import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

type TimerProps = {};

const MIN_RADIUS = 56;

//  animate={{ opacity: 0.3, scale: 1.4 }}

export const Timer = (props: TimerProps) => {
  return (
    <View style={styles.root}>
      <View style={[styles.dot, styles.center]}>
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
            { backgroundColor: colors.lime },
            styles.shadow,
          ]}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            styles.dot,
            styles.shadow,
            { backgroundColor: colors.black, shadowColor: colors.black },
          ]}
        />
        <Text style={styles.text}>01:50</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dot: {
    width: MIN_RADIUS,
    height: MIN_RADIUS,
    borderRadius: MIN_RADIUS,
    backgroundColor: colors.black,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
