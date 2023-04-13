import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useDisclose } from 'native-base';
import { colors } from '../../../../styles/colors';
import { ExerciseListItem } from './ExerciseListItem/ExerciseListItem';
import { Icon } from '../../../../components/Icon';

type PreviousExerciseSelectorProps = {};

const EXERCISES = [
  {
    id: 1,
    name: 'Warm Up Push 2*10',
    muscleGroup: 'Shoulders',
    image: null,
    color: 'darkviolet',
  },
  {
    id: 2,
    name: 'BB Incline Bench Press 4*6-8',
    muscleGroup: 'Shoulders',
    image: null,
    color: 'darkviolet',
  },
  {
    id: 3,
    name: 'Alternate Biceps Curl (with band)',
    muscleGroup: 'Biceps',
    image: 'https://dummyimage.com/60x60/fff/aaa',
  },
  {
    id: 4,
    name: 'Air bike',
    muscleGroup: 'Core',
    image: 'https://dummyimage.com/60x60/fff/aaa',
  },
];

export const PreviousExerciseSelector: React.FC<
  PreviousExerciseSelectorProps
> = () => {
  const { isOpen, onToggle } = useDisclose();

  return (
    <>
      <Pressable onPress={onToggle}>
        <View style={styles.root}>
          <Text style={styles.label}>Previous exercises (39)</Text>
          <Icon
            size={10}
            color={colors.text}
            name={isOpen ? 'chevron-up' : 'chevron-down'}
          />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.list}>
          {EXERCISES.map((e) => (
            <ExerciseListItem key={e.id} item={e} onPress={() => {}} />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    position: 'relative',
    top: -8,
    paddingTop: 8,
    backgroundColor: colors.surface2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: -1,
    zIndex: -1,
  },
});
