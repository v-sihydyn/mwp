import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../../../../styles/colors';
import { openEditRepsModal } from '../../../../components/modals/EditSetRepsModal/EditSetRepsModal';

type WorkoutExerciseSetProps = {
  index: number;
  reps: number;
  weight: number;
};

export const WorkoutExerciseSet = React.memo(
  ({ index, reps, weight }: WorkoutExerciseSetProps) => {
    const isActive = false;
    const isFinished = false;
    const isBeforeRest = false;
    const isSkipped = false;

    const handleEditReps = async (currentReps: number) => {
      const newValue = await openEditRepsModal({
        initialValue: String(currentReps),
      });
      Alert.alert('new value: ' + newValue);
    };

    const handleEditWeight = async (currentWeight: number) => {
      const newValue = await openEditRepsModal({
        initialValue: String(currentWeight),
      });
      Alert.alert('new value: ' + newValue);
    };

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

        <Pressable onPress={() => handleEditReps(reps)}>
          <View style={styles.set}>
            <Text style={styles.setText}>{reps}</Text>
          </View>
        </Pressable>
        <Text style={styles.setLabel}>Reps</Text>
        <Pressable onPress={() => handleEditWeight(weight)}>
          <View style={styles.set}>
            <Text style={styles.setText}>{weight}</Text>
          </View>
        </Pressable>
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
  },
);

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
  set: {
    backgroundColor: colors.black,
    width: 50,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setText: {
    color: colors.text,
    fontSize: 16,
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
