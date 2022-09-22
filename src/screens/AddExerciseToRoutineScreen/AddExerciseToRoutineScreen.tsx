import React from 'react';
import { colors } from '../../styles/colors';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ExerciseListItem } from './components/ExerciseListItem/ExerciseListItem';
import { AddCustomExerciseButton } from './components/AddCustomExerciseButton/AddCustomExerciseButton';
import { PreviousExerciseSelector } from './components/PrevioutExerciseSelector/PreviousExerciseSelector';
import { Filters } from './components/Filters/Filters';

const EXERCISES = [
  {
    id: 1,
    name: 'Air bike',
    muscleGroup: 'Core',
    requiredEquipment: 'Body weight',
    image: null,
  },
  {
    id: 2,
    name: 'Air Twisting Crunch',
    muscleGroup: 'Core',
    requiredEquipment: 'Body weight',
    image: null,
  },
  {
    id: 3,
    name: 'Alternate Biceps Curl (with band)',
    muscleGroup: 'Biceps',
    requiredEquipment: 'Band',
    image: null,
  },
  {
    id: 4,
    name: 'Alternate Lateral Pulldown',
    muscleGroup: 'Back',
    requiredEquipment: 'Cable',
    image: null,
  },
  {
    id: 5,
    name: 'Assisted Chest Dip (kneeling)',
    muscleGroup: 'Chest',
    requiredEquipment: 'Leverage machine',
    image: null,
  },
  {
    id: 6,
    name: 'Assisted Parallel Close Grip Pull-up',
    muscleGroup: 'Back',
    requiredEquipment: 'Leverage machine',
    image: null,
  },
];

const Header = () => {
  return (
    <View style={{ paddingVertical: 12 }}>
      <AddCustomExerciseButton style={{ marginBottom: 18 }} />
      <PreviousExerciseSelector />
      <Text style={{ color: colors.text2, fontSize: 18, marginVertical: 16 }}>Full exercises catalog</Text>
      <Filters />
    </View>
  )
}

export const AddExerciseToRoutineScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISES}
        renderItem={({ item }) => <ExerciseListItem key={item.id} item={item} onPress={() => {}} />}
        style={styles.list}
        ListHeaderComponent={Header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  list: { paddingHorizontal: 20 },
});
