import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../../../../styles/colors';

type ActionItemProps = {
  name: string;
  icon: string;
  onPress: () => void;
}

export const ActionItem: React.FC<ActionItemProps> = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.root}>
        <FontAwesome5 name={icon} color={colors.text} size={14} style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  name: {
    color: colors.text
  }
})
