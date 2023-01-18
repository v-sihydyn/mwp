import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';

type WorkoutExerciseSetProps = {
  index: number;
  reps: number;
  weight: number;
};

export const WorkoutExerciseSet = ({
  index,
  reps,
  weight,
}: WorkoutExerciseSetProps) => {
  const isActive = false;
  const isFinished = false;
  const isBeforeRest = false;
  const isSkipped = false;

  return (
    <View
      style={[
        styles.root,
        isActive && styles.activeSet,
        isFinished && styles.finishedSet,
        isBeforeRest && styles.beforeRestSet,
        isSkipped && styles.skippedSet,
      ]}>
      <View style={styles.counter}>
        <Text style={styles.counterText}>{index}</Text>
      </View>

      {/* @TODO: edit reps */}
      <TextInput
        value={String(reps)}
        keyboardType="numeric"
        style={styles.setInput}
      />
      <Text style={styles.setLabel}>Reps</Text>
      {/* @TODO: edit weight */}
      <TextInput
        value={String(weight)}
        keyboardType="numeric"
        style={styles.setInput}
      />
      <Text style={[styles.setLabel, { marginRight: 0 }]}>Kg</Text>

      {/*<Icon name="check" color={colors.green} size={14} style={styles.icon} />*/}
      {/*<Icon name="times" color={colors.red} size={14} style={styles.icon} />*/}
      {/*<Icon*/}
      {/*  name="stopwatch"*/}
      {/*  color={colors.text}*/}
      {/*  size={14}*/}
      {/*  style={styles.icon}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  activeSet: {
    backgroundColor: colors.green,
  },
  finishedSet: {
    backgroundColor: colors.surface2,
  },
  beforeRestSet: {
    backgroundColor: colors.lime,
  },
  skippedSet: {
    backgroundColor: colors.surface2,
    opacity: 0.7,
  },
  counter: {
    marginRight: 30,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    color: colors.surface,
  },
  setInput: {
    backgroundColor: colors.black,
    width: 50,
    height: 40,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 8,
  },
  setLabel: {
    color: colors.text,
    fontSize: 16,
    marginRight: 40,
  },
  icon: {
    marginLeft: 'auto',
  },
});
