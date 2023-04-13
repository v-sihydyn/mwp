import React from 'react';
import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import { colors } from '../../../../../styles/colors';
import { Icon } from '../../../../../components/Icon';

type Props = {
  name: string;
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const WorkoutPlanListItem = ({
  name,
  isSelected,
  onPress,
  style,
}: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, style]}>
      <Text style={styles.name}>{name}</Text>
      {isSelected && <Icon name="check-circle" color={colors.text} size={16} />}
    </Pressable>
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
