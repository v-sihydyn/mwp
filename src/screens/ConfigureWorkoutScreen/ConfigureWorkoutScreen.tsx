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
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ConfigureWorkoutRouteProp } from '../../../types';
import { useApolloClient } from '@apollo/client';
import { routineFragment } from '../../fragments/routineFragment';
import {
  WorkoutPlanRoutine,
  WorkoutRoutineExercise,
  WorkoutStatus,
} from '../../API';
import {
  DraftSet,
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../types/draftWorkout';
import { nanoid } from 'nanoid';
import { ValueMap } from '../../components/TimeIntervalPicker/TimeIntervalPicker';

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
    )
      .filter((x) => !x?._deleted)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  });
  const [restTime, setRestTime] = useState<ValueMap>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const playWorkout = async () => {
    let restTimeInSeconds = 0;
    const _restTimeMins = Number(restTime.minutes);
    const _restTimeSecs = Number(restTime.seconds);

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
              id: nanoid(),
              sets: 1,
              reps: config.reps,
              weight: config.weight,
              status: 'idle',
            });
          });
        } else {
          sets.push({
            id: nanoid(),
            sets: 1,
            reps: config.reps,
            weight: config.weight,
            status: 'idle',
          });
        }
      });

      return {
        name: e.name,
        description: e.description,
        muscleGroup: e.muscleGroup,
        color: e.color,
        sets,
        sortOrder: e.sortOrder,
        restTimeInSeconds: e.restTimeInSeconds ?? 0,
        workoutExerciseWorkoutRoutineExerciseId: e.id,
      };
    });

    navigation.dispatch(
      StackActions.replace('Workout', {
        restTimeInSeconds,
        draftWorkout,
        draftWorkoutExercises,
      }),
    );
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
  }, [playWorkout]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const onTimeChange = useCallback((value: ValueMap) => setRestTime(value), []);

  const ListHeaderComponent = useCallback(
    () => <ListHeader onRestTimeChange={onTimeChange} />,
    [],
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={exercises}
        onDragEnd={({ data: _data }) => {
          setExercises(
            _data.map((d, idx) => ({
              ...d,
              sortOrder: idx,
            })),
          );
        }}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={false}
        ListHeaderComponent={ListHeaderComponent}
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
