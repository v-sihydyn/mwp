import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  name: string;
  isSelected: boolean;
  style?: StyleProp<ViewStyle>;
};

export const WorkoutPlanListItem = ({ name, isSelected, style }: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        e.stopPropagation();
      }}>
      <View style={[styles.root, style]}>
        <Text style={styles.name}>{name}</Text>
        {isSelected && <FontAwesome5 name="check-circle" color="#ffffff" size={16} />}
      </View>
    </TouchableWithoutFeedback>
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
    color: '#ffffff',
  },
});