import { WorkoutPlanRoutine, WorkoutRoutineExercise } from '../../../../API';
import { Tabs } from 'react-native-collapsible-tab-view';
import { WorkoutExerciseCard } from '../../../../components/WorkoutExerciseCard';
import { ListEmptyComponent } from '../ListEmptyComponent/ListEmptyComponent';
import React from 'react';

type WorkoutPlanRoutineTabsProps = {
  routine: WorkoutPlanRoutine;
  onEditExercise: (exerciseId: string) => void;
};

export const WorkoutPlanRoutineTab = ({
  routine,
  onEditExercise,
}: WorkoutPlanRoutineTabsProps) => {
  const exercises = routine?.WorkoutRoutineExercises
    ?.items as WorkoutRoutineExercise[];

  return (
    <Tabs.FlatList
      data={exercises}
      renderItem={({ item }) =>
        item && (
          <WorkoutExerciseCard
            name={item.name}
            muscleGroup={item.muscleGroup}
            setsConfig={item.setsConfig}
            color={item.color}
            restTimeInSeconds={item.restTimeInSeconds}
            onPress={() => onEditExercise(item.id)}
          />
        )
      }
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 94,
      }}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};
