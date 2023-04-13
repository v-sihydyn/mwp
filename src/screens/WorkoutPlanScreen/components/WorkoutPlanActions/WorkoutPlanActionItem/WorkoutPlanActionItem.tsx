import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../../styles/colors';
import Ripple from 'react-native-material-ripple';
import { Icon } from '../../../../../components/Icon';

type Props = {
  name: string;
  icon: string;
  onPress?: () => void;
};

export const WorkoutPlanActionItem = ({ name, icon, onPress }: Props) => {
  return (
    <Ripple
      rippleColor="#ffffff"
      onPress={() => {
        onPress?.();
      }}>
      <View style={styles.root}>
        <Icon style={styles.icon} name={icon} color="#ffffff" size={16} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  icon: {
    marginRight: 20,
  },
  name: {
    color: colors.text,
  },
});
