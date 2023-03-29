import React, { useEffect, useState } from 'react';
import { colors } from '../../styles/colors';
import { StyleSheet, View, FlatList } from 'react-native';
import { ExerciseListItem } from '../../components/ExerciseListItem/ExerciseListItem';

import { ListHeader } from './components/ListHeader/ListHeader';
import { Exercise, EXERCISES } from './exercises';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExerciseCatalogRouteProp } from '../../../types';
import { ExerciseFilterInput } from './components/ExerciseFilterInput/ExerciseFilterInput';

export const ExerciseCatalogScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ExerciseCatalogRouteProp>();
  const { workoutPlanId, workoutRoutineId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filterEquipment, setFilterEquipment] = useState('');

  const sq = searchQuery.trim().toLowerCase();
  let exercises = EXERCISES.filter((x) => x.name.toLowerCase().includes(sq));

  if (filterMuscle) {
    exercises = exercises.filter((x) => x.muscleGroup === filterMuscle);
  }

  if (filterEquipment) {
    exercises = exercises.filter((x) => x.equipment === filterEquipment);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ExerciseFilterInput onChange={(q) => setSearchQuery(q)} />
      ),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGoToAddExerciseScreen = (exercise: Exercise) => {
    navigation.navigate('AddExerciseToRoutine', {
      workoutPlanId,
      workoutRoutineId,
      exercise,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item, index }) => (
          <ExerciseListItem
            key={index}
            item={item}
            onPress={() => handleGoToAddExerciseScreen(item)}
          />
        )}
        style={styles.list}
        ListHeaderComponent={() => (
          <ListHeader
            filterMuscle={filterMuscle}
            onFilterMuscleChange={(value) => setFilterMuscle(value)}
            filterEquipment={filterEquipment}
            onFilterEquipmentChange={(value) => setFilterEquipment(value)}
          />
        )}
        bounces={false}
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
