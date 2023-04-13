import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CustomButton } from '../../../../components/CustomButton/CustomButton';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon';
import React from 'react';
import { DraftSet } from '../../../../types/draftWorkout';
import { openEditRepsModal } from '../../../../components/modals/EditSetRepsModal/EditSetRepsModal';
import { openEditWeightModal } from '../../../../components/modals/EditSetWeightModal/EditSetWeightModal';

type CurrentSetToolbarProps = {
  currentSet: DraftSet;
  onSkip: () => void;
  onComplete: () => void;
  onUpdateReps: (value: string) => void;
  onUpdateWeight: (value: string) => void;
};

export const CurrentSetToolbar = ({
  currentSet,
  onSkip,
  onComplete,
  onUpdateWeight,
  onUpdateReps,
}: CurrentSetToolbarProps) => {
  const handleEditReps = async (currentReps: string) => {
    const newReps = await openEditRepsModal({
      initialValue: currentReps,
    }).catch(() => {});

    if (typeof newReps === 'string' && newReps.length > 0) {
      onUpdateReps(newReps);
    }
  };

  const handleEditWeight = async (currentWeight: string) => {
    const newWeight = await openEditWeightModal({
      initialValue: currentWeight,
    }).catch(() => {});

    if (typeof newWeight === 'string' && newWeight.length > 0) {
      onUpdateWeight(newWeight);
    }
  };

  return (
    <View style={styles.root}>
      <CustomButton
        onPress={onSkip}
        style={{
          marginRight: 'auto',
          height: 40,
          width: 60,
          backgroundColor: colors.black,
        }}
        icon={<Icon name="times" color={colors.red} size={16} />}
      />
      <Pressable onPress={() => handleEditReps(currentSet.reps)}>
        <View style={styles.set}>
          <Text style={styles.setText}>{currentSet.reps}</Text>
        </View>
      </Pressable>
      <Text style={styles.setLabel}>Reps</Text>
      <Pressable onPress={() => handleEditWeight(currentSet.weight || '')}>
        <View style={styles.set}>
          <Text style={styles.setText}>{currentSet.weight}</Text>
        </View>
      </Pressable>
      <Text style={[styles.setLabel, { marginRight: 0 }]}>Kg</Text>

      <CustomButton
        onPress={onComplete}
        style={{ marginLeft: 'auto', height: 40, width: 60 }}
        icon={<Icon name="check" color={colors.text} size={16} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  set: {
    backgroundColor: colors.text,
    width: 50,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  setLabel: {
    color: '#707172',
    fontSize: 16,
    marginRight: 25,
  },
});
