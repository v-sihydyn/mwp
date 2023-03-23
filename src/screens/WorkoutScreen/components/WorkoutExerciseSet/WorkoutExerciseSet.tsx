import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../../../../styles/colors';
import { openEditRepsModal } from '../../../../components/modals/EditSetRepsModal/EditSetRepsModal';
import { DraftSetStatus } from '../../../../types/draftWorkout';
import { Icon } from '../../../../components/Icon/Icon';

type WorkoutExerciseSetProps = {
  index: number;
  reps: string;
  weight: string;
  status: DraftSetStatus;
  isActive: boolean;
};

export const WorkoutExerciseSet = React.memo(
  ({ index, reps, weight, isActive, status }: WorkoutExerciseSetProps) => {
    const isCompleted = status === 'completed';
    const isRest = status === 'rest';
    const isSkipped = status === 'skipped';

    const handleEditReps = async (currentReps: string) => {
      if (isCompleted) return;

      const newValue = await openEditRepsModal({
        initialValue: currentReps,
      });
      Alert.alert('new value: ' + newValue);
    };

    const handleEditWeight = async (currentWeight: string) => {
      if (isCompleted) return;

      const newValue = await openEditRepsModal({
        initialValue: currentWeight,
      });
      Alert.alert('new value: ' + newValue);
    };

    return (
      <View
        style={[
          styles.root,
          isActive && !isCompleted && styles.activeSet,
          isCompleted && !isActive && styles.finishedSet,
          isRest && styles.restSet,
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

        {isCompleted && !isActive && (
          <Icon
            name="check"
            color={colors.green}
            size={14}
            style={styles.icon}
          />
        )}
        {isSkipped && (
          <Icon name="times" color={colors.red} size={14} style={styles.icon} />
        )}
        {isRest && (
          <Icon
            name="stopwatch"
            color={colors.text}
            size={14}
            style={styles.icon}
          />
        )}
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
  restSet: {
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
