import { useMutation } from '@apollo/client';
import { createWorkoutMutation } from './mutations/createWorkoutMutation';
import {
  BulkCreateWorkoutExercisesMutation,
  BulkCreateWorkoutExercisesMutationVariables,
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  WorkoutRoutineExercise,
  WorkoutStatus,
} from '../../API';
import {
  DraftSet,
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../types/draftWorkout';
import { bulkCreateWorkoutExercisesMutation } from './mutations/bulkCreateWorkoutExercisesMutation';
import { useAuthContext } from '../../contexts/AuthContext';
import { nanoid } from 'nanoid';

type Set = {
  sets: string;
  reps: string;
  weight: string | null;
};

export const useWorkout = () => {
  const { userId } = useAuthContext();
  const [createWorkout] = useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(createWorkoutMutation);
  const [bulkCreateWorkoutExercises] = useMutation<
    BulkCreateWorkoutExercisesMutation,
    BulkCreateWorkoutExercisesMutationVariables
  >(bulkCreateWorkoutExercisesMutation);

  const createDraftWorkoutAndExercises = (
    workoutRoutineId: string,
    exercises: WorkoutRoutineExercise[],
  ) => {
    const draftWorkout: DraftWorkout = {
      status: WorkoutStatus.INPROGRESS,
      dateFinished: null,
      totalTimeInSeconds: null,
      workoutWorkoutPlanRoutineId: workoutRoutineId,
    };

    const draftWorkoutExercises: DraftWorkoutExercise[] = exercises
      .map((e) => {
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
          setsConfig: e.setsConfig,
          sortOrder: e.sortOrder,
          restTimeInSeconds: e.restTimeInSeconds ?? 0,
          workoutExerciseWorkoutRoutineExerciseId: e.id,
        };
      })
      .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));

    return {
      draftWorkout,
      draftWorkoutExercises,
    };
  };

  const saveWorkout = async ({
    workout,
    exercises,
    routineExercisesToUpdate,
  }: {
    workout: DraftWorkout;
    exercises: DraftWorkoutExercise[];
    routineExercisesToUpdate: Pick<
      WorkoutRoutineExercise,
      'id' | 'setsConfig'
    >[];
  }) => {
    const workoutData = await createWorkout({
      variables: {
        input: {
          status: WorkoutStatus.FINISHED,
          dateFinished: new Date().toISOString(),
          totalTimeInSeconds: workout.totalTimeInSeconds,
          userID: userId,
          workoutWorkoutPlanRoutineId: workout.workoutWorkoutPlanRoutineId,
        },
      },
    });

    if (!workoutData?.data?.createWorkout?.id) return;

    const exercisesData = await bulkCreateWorkoutExercises({
      variables: {
        exercises: exercises.map((dwe, index) => ({
          workoutID: workoutData.data!.createWorkout!.id,
          setsConfig: JSON.stringify(
            dwe.sets.filter((set) => set.status === 'completed'),
          ),
          sortOrder: Number.isNaN(Number(dwe.sortOrder))
            ? index
            : dwe.sortOrder,
          workoutExerciseWorkoutRoutineExerciseId:
            dwe.workoutExerciseWorkoutRoutineExerciseId,
        })),
        routineExercisesToUpdate,
      },
    });

    const savedWorkout = workoutData.data.createWorkout;
    const savedExercises =
      exercisesData.data?.bulkCreateWorkoutExercises?.exercises ?? [];
    const updatedRoutineExercises =
      exercisesData.data?.bulkCreateWorkoutExercises?.updatedRoutineExercises ??
      [];

    return {
      savedWorkout,
      savedExercises,
      updatedRoutineExercises,
    };
  };

  return { createDraftWorkoutAndExercises, saveWorkout };
};
