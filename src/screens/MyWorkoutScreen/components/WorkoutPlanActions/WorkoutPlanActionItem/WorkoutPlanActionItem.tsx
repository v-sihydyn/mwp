import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../../../../styles/colors';

type Props = {
  name: string;
  icon: string;
};

export const WorkoutPlanActionItem = ({ name, icon }: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        e.stopPropagation();
      }}>
      <View style={styles.root}>
        <FontAwesome5 style={styles.icon} name={icon} color="#ffffff" size={16} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
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
