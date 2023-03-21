import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/colors';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import React, { useCallback, useEffect, useState } from 'react';
import { ExerciseListItem } from '../../components/ExerciseListItem/ExerciseListItem';
import { SortableListItem } from '../../components/SortableList/SortableListItem';
import { Icon } from '../../components/Icon/Icon';
import { ListHeader } from './ListHeader/ListHeader';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfigureWorkoutRouteProp } from '../../../types';
import { useApolloClient } from '@apollo/client';
import { routineFragment } from '../../fragments/routineFragment';
import {
  Workout,
  WorkoutPlanRoutine,
  WorkoutRoutineExercise,
  WorkoutStatus,
} from '../../API';
import {
  DraftSet,
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../types/draftWorkout';

type Set = {
  sets: string;
  reps: string;
  weight: string | null;
};

export const ConfigureWorkoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ConfigureWorkoutRouteProp>();
  const { workoutRoutineId } = route.params;
  const client = useApolloClient();
  const routine = client.readFragment<WorkoutPlanRoutine>({
    id: `WorkoutPlanRoutine:${workoutRoutineId}`,
    fragment: routineFragment,
    fragmentName: 'Routine',
  });

  const [exercises, setExercises] = useState<WorkoutRoutineExercise[]>(() => {
    return (
      (routine?.WorkoutRoutineExercises?.items ??
        []) as WorkoutRoutineExercise[]
    ).filter((x) => !x?._deleted);
  });
  const [restMinutes, setRestMinutes] = useState('');
  const [restSeconds, setRestSeconds] = useState('');

  const playWorkout = () => {
    let restTimeInSeconds = 0;
    const _restTimeMins = Number(restMinutes);
    const _restTimeSecs = Number(restSeconds);

    if (!Number.isNaN(_restTimeMins) && !Number.isNaN(_restTimeSecs)) {
      restTimeInSeconds = _restTimeMins * 60 + _restTimeSecs;
    }

    const draftWorkout: DraftWorkout = {
      status: WorkoutStatus.INPROGRESS,
      dateFinished: null,
      totalTimeInSeconds: null,
      workoutWorkoutPlanRoutineId: workoutRoutineId,
    };
    const draftWorkoutExercises: DraftWorkoutExercise[] = exercises.map((e) => {
      const sets: DraftSet[] = [];
      const setsConfig: Set[] = JSON.parse(e.setsConfig);

      setsConfig.forEach((config) => {
        const setsCount = Number(config.sets);

        if (setsCount > 1) {
          Array.from({ length: setsCount }).forEach(() => {
            sets.push({
              reps: config.reps,
              weight: config.weight,
              status: 'idle',
            });
          });
        } else {
          sets.push({
            reps: config.reps,
            weight: config.weight,
            status: 'idle',
          });
        }
      });

      return {
        name: e?.name,
        description: e?.description,
        sets,
      };
    });

    navigation.navigate('Workout', {
      restTimeInSeconds,
      draftWorkout,
      draftWorkoutExercises,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={playWorkout}
          style={{ marginRight: 16 }}
          icon={
            <Icon
              name="play-circle"
              color={colors.text}
              size={16}
              solid={true}
            />
          }>
          Start
        </CustomButton>
      ),
    });
  }, []);

  const handleRemoveExercise = (id: string) => {
    if (exercises.length < 2) return;

    setExercises((ex) => ex.filter((x) => x.id !== id));
  };

  // @TODO: implement leave animation
  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<WorkoutRoutineExercise>) => {
    return (
      <SortableListItem
        isActive={isActive}
        onDrag={drag}
        leftSlot={
          <TouchableOpacity
            onPress={() => handleRemoveExercise(item.id)}
            disabled={exercises.length < 2}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            style={{ marginRight: 16 }}>
            <Icon name="trash" size={16} color={colors.red} />
          </TouchableOpacity>
        }>
        <ExerciseListItem item={item} displayImage={false} />
      </SortableListItem>
    );
  };

  const renderListHeader = useCallback(
    () => (
      <ListHeader
        onRestMinutesChange={(value: string) => setRestMinutes(value)}
        onRestSecondsChange={(value: string) => setRestSeconds(value)}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={exercises}
        onDragEnd={({ data: _data }) => setExercises(_data)}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={false}
        ListHeaderComponent={renderListHeader}
        showsVerticalScrollIndicator={false}
        bounces={false}
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
  list: {
    paddingHorizontal: 20,
  },
});
