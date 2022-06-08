import React from 'react';
import Ripple from 'react-native-material-ripple';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../../../styles/colors';

export const AddWorkoutPlanButton = () => {
  return (
    <Ripple rippleColor="#ffffff">
      <View style={styles.root}>
        <FontAwesome5 style={styles.prefix} name="plus-circle" color="#ffffff" size={18} />
        <Text style={styles.label}>Add Workout Plan</Text>
        <FontAwesome5  style={styles.suffix} name="dumbbell" color="#f2e70c" size={22} />
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    height: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  prefix: {
    marginRight: 12,
  },
  label: {
    color: colors.text,
  },
  suffix: {
    marginLeft: 'auto',
  },
});
