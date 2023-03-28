import { useMutation } from '@apollo/client';
import { createWorkoutMutation } from './mutations/createWorkoutMutation';
import {
  BulkCreateWorkoutExercisesMutation,
  BulkCreateWorkoutExercisesMutationVariables,
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  WorkoutStatus,
} from '../../../../API';
import {
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../../../types/draftWorkout';
import { bulkCreateWorkoutExercisesMutation } from './mutations/bulkCreateWorkoutExercisesMutation';

export const useWorkout = () => {
  const [createWorkout] = useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(createWorkoutMutation);
  const [bulkCreateWorkoutExercises] = useMutation<
    BulkCreateWorkoutExercisesMutation,
    BulkCreateWorkoutExercisesMutationVariables
  >(bulkCreateWorkoutExercisesMutation);

  const saveWorkout = async ({
    workout,
    exercises,
  }: {
    workout: DraftWorkout;
    exercises: DraftWorkoutExercise[];
  }) => {
    const workoutData = await createWorkout({
      variables: {
        input: {
          status: WorkoutStatus.FINISHED,
          dateFinished: new Date().toISOString(),
          totalTimeInSeconds: workout.totalTimeInSeconds,
          // _version: number | null,
          workoutWorkoutPlanRoutineId: workout.workoutWorkoutPlanRoutineId,
        },
      },
    });

    if (!workoutData?.data?.createWorkout?.id) return;

    const exercisesData = await bulkCreateWorkoutExercises({
      variables: {
        exercises: exercises.map((dwe) => ({
          workoutID: workoutData.data!.createWorkout!.id,
          setsConfig: JSON.stringify(
            dwe.sets.filter((set) => set.status === 'completed'),
          ),
          sortOrder: dwe.sortOrder,
          workoutExerciseWorkoutRoutineExerciseId:
            dwe.workoutExerciseWorkoutRoutineExerciseId,
        })),
      },
    });

    const savedWorkout = workoutData.data.createWorkout;
    const savedExercises =
      exercisesData.data?.bulkCreateWorkoutExercises?.exercises ?? [];

    return {
      savedWorkout,
      savedExercises,
    };
  };

  return { saveWorkout };
};
