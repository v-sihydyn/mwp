import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import React from 'react';
import { colors } from '../../../../styles/colors';

type ButtonProps = {
  onPress: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const CustomButton = ({
  icon,
  onPress,
  children,
  style,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, style]}>
      {icon}
      {Boolean(children) && (
        <Text style={[styles.text, Boolean(icon) && { marginLeft: 8 }]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.green,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
  },
});
