import { useMutation } from '@apollo/client';
import { createWorkoutMutation } from './mutations/createWorkoutMutation';
import {
  BulkCreateWorkoutExercisesMutation,
  BulkCreateWorkoutExercisesMutationVariables,
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  WorkoutRoutineExercise,
  WorkoutStatus,
} from '../../../../API';
import {
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../../../types/draftWorkout';
import { bulkCreateWorkoutExercisesMutation } from './mutations/bulkCreateWorkoutExercisesMutation';
import { useAuthContext } from '../../../../contexts/AuthContext';

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

  return { saveWorkout };
};
