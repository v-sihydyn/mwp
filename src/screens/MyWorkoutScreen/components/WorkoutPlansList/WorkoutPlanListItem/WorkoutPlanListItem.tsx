import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../../../styles/colors';
import { Icon } from '../../../../../components/Icon/Icon';

type Props = {
  name: string;
  isSelected: boolean;
  style?: StyleProp<ViewStyle>;
};

export const WorkoutPlanListItem = ({ name, isSelected, style }: Props) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.name}>{name}</Text>
      {isSelected && <Icon name="check-circle" color={colors.text} size={16} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  icon: {
    marginRight: 30,
  },
  name: {
    color: colors.text,
  },
});
