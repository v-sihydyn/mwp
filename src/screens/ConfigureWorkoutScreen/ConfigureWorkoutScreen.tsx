import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { AddRoutineButton } from '../RoutinesManagementScreen/components/AddRoutineButton/AddRoutineButton';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import React, { useState } from 'react';
import { ExerciseListItem } from '../../components/ExerciseListItem/ExerciseListItem';
import { SortableListItem } from '../../components/SortableList/SortableListItem';
import { Icon } from '../../components/Icon/Icon';

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
  {
    id: 7,
    name: 'Assisted Parallel Close Grip Pull-up 2',
    muscleGroup: 'Back',
    requiredEquipment: 'Leverage machine',
    image: 'imageUrl',
  },
];

type ExtractArrElementType<T extends any[]> = T extends (infer A)[] ? A : never;
type Exercise = ExtractArrElementType<typeof EXERCISES>;

const ListHeader = () => (
  <Text style={styles.title}>Reorder & Remove Exercises</Text>
);

export const ConfigureWorkoutScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES);

  // @TODO: implement leave animation
  const renderItem = ({ item, drag, isActive }: RenderItemParams<Exercise>) => {
    return (
      <SortableListItem
        isActive={isActive}
        onDrag={drag}
        leftSlot={
          <TouchableOpacity
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            style={{ marginRight: 16 }}>
            <Icon name="trash" size={16} color={colors.red} />
          </TouchableOpacity>
        }>
        <ExerciseListItem item={item} displayImage={false} />
      </SortableListItem>
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={exercises}
        onDragEnd={({ data: _data }) => setExercises(_data)}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={false}
        ListHeaderComponent={ListHeader}
        style={styles.list}
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
  title: {
    color: colors.text2,
    fontSize: 18,
    marginVertical: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
});