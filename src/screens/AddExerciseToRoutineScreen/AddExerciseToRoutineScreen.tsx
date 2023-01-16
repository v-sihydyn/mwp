import React from 'react';
import { colors } from '../../styles/colors';
import { StyleSheet, View, FlatList } from 'react-native';
import { ExerciseListItem } from '../../components/ExerciseListItem/ExerciseListItem';

import { ListHeader } from './components/ListHeader/ListHeader';

const EXERCISES = [
  {
    id: 1,
    name: 'Air bike',
    muscleGroup: 'Core',
    requiredEquipment: 'Body weight',
    image: 'imageUrl',
  },
  {
    id: 2,
    name: 'Air Twisting Crunch',
    muscleGroup: 'Core',
    requiredEquipment: 'Body weight',
    image: 'imageUrl',
  },
  {
    id: 3,
    name: 'Alternate Biceps Curl (with band)',
    muscleGroup: 'Biceps',
    requiredEquipment: 'Band',
    image: 'imageUrl',
  },
  {
    id: 4,
    name: 'Alternate Lateral Pulldown',
    muscleGroup: 'Back',
    requiredEquipment: 'Cable',
    image: 'imageUrl',
  },
  {
    id: 5,
    name: 'Assisted Chest Dip (kneeling)',
    muscleGroup: 'Chest',
    requiredEquipment: 'Leverage machine',
    image: 'imageUrl',
  },
  {
    id: 6,
    name: 'Assisted Parallel Close Grip Pull-up',
    muscleGroup: 'Back',
    requiredEquipment: 'Leverage machine',
    image: 'imageUrl',
  },
];

export const AddExerciseToRoutineScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={EXERCISES}
        renderItem={({ item }) => (
          <ExerciseListItem key={item.id} item={item} onPress={() => {}} />
        )}
        style={styles.list}
        ListHeaderComponent={ListHeader}
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
