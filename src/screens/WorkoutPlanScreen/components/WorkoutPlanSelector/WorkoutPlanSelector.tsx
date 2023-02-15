import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';

type Props = {
  label: string | null;
  onPress: () => void;
};

export const WorkoutPlanSelector = ({ label, onPress }: Props) => {
  return (
    <Ripple
      rippleColor="#ffffff"
      rippleContainerBorderRadius={12}
      onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.suffix}>
          <Icon name="chevron-down" color="#ffffff" />
        </View>
      </View>
    </Ripple>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 20;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
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
