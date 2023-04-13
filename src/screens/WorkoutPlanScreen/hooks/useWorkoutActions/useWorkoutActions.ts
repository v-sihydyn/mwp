import { useCallback } from 'react';
import {
  deleteDraftWorkoutData,
  getPersistedDraftWorkoutData,
} from '../../../../utils/persistWorkout';
import { openBeforeWorkoutStartModal } from '../../../../components/modals/BeforeWorkoutStartModal/BeforeWorkoutStartModal';
import { DraftWorkoutExercise } from '../../../../types/draftWorkout';
import { WorkoutRoutineExercise } from '../../../../API';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from '../../../../hooks/useWorkout/useWorkout';

export const useWorkoutActions = () => {
  const navigation = useNavigation();
  const { createDraftWorkoutAndExercises } = useWorkout();

  const playWorkout = useCallback(
    async ({
      routineId,
      exercises,
      routineName,
    }: {
      routineId: string;
      exercises: WorkoutRoutineExercise[];
      routineName: string;
    }) => {
      const persistedWorkoutData = await getPersistedDraftWorkoutData(
        routineId,
      );

      if (persistedWorkoutData) {
        const shouldResumeWorkout = await openBeforeWorkoutStartModal().catch(
          () => {},
        );
        if (typeof shouldResumeWorkout === 'undefined') return;

        if (shouldResumeWorkout) {
          let displayedExerciseIndex;
          const draftWorkoutExercises: DraftWorkoutExercise[] =
            persistedWorkoutData.exercises.map((e, exerciseIdx) => ({
              ...e,
              sets: e.sets.map((s) => {
                if (
                  s.id === persistedWorkoutData.currentSetId &&
                  persistedWorkoutData.currentSetId !== null
                ) {
                  displayedExerciseIndex = exerciseIdx;
                  return {
                    ...s,
                    status: 'inprogress',
                  };
                }

                return s;
              }),
            }));

          navigation.navigate('Workout', {
            workoutRoutineId: routineId,
            restTimeInSeconds: persistedWorkoutData.restTimeInSeconds,
            draftWorkout: persistedWorkoutData.workout,
            draftWorkoutExercises,
            displayedExerciseIndex,
            currentSetId: persistedWorkoutData.currentSetId,
            totalTimeInSeconds: persistedWorkoutData.totalTimeInSeconds,
          });
          return;
        } else {
          await deleteDraftWorkoutData(routineId);
        }
      }

      if (exercises.length > 1) {
        navigation.navigate('ConfigureWorkout', {
          workoutRoutineId: routineId,
        });
      } else {
        const { draftWorkout, draftWorkoutExercises } =
          createDraftWorkoutAndExercises(
            routineName,
            exercises as WorkoutRoutineExercise[],
          );

        draftWorkoutExercises[0].sets[0].status = 'inprogress';

        navigation.navigate('Workout', {
          workoutRoutineId: routineId,
          restTimeInSeconds: 0,
          draftWorkout,
          draftWorkoutExercises,
        });
      }
    },
    [],
  );

  return {
    playWorkout,
  };
};
