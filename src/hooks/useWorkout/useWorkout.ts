import { useApolloClient, useMutation } from '@apollo/client';
import { createWorkoutMutation } from './mutations/createWorkoutMutation';
import {
  BulkCreateWorkoutExercisesMutation,
  BulkCreateWorkoutExercisesMutationVariables,
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables,
  ModelSortDirection,
  WorkoutRoutineExercise,
  WorkoutsByUserQuery,
  WorkoutsByUserQueryVariables,
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
import { workoutsByUserQuery } from '../../screens/StatisticsScreen/hooks/useWorkoutsList/queuries/workoutsByUserQuery';

type Set = {
  sets: string;
  reps: string;
  weight: string | null;
};

export const useWorkout = () => {
  const { userId } = useAuthContext();
  const client = useApolloClient();
  const [createWorkout] = useMutation<
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables
  >(createWorkoutMutation);
  const [bulkCreateWorkoutExercises] = useMutation<
    BulkCreateWorkoutExercisesMutation,
    BulkCreateWorkoutExercisesMutationVariables
  >(bulkCreateWorkoutExercisesMutation);

  const createDraftWorkoutAndExercises = (
    workoutName: string,
    exercises: WorkoutRoutineExercise[],
  ) => {
    const draftWorkout: DraftWorkout = {
      name: workoutName,
      status: WorkoutStatus.INPROGRESS,
      dateFinished: null,
      totalTimeInSeconds: null,
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
          workoutRoutineExerciseId: e.id,
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
          name: workout.name,
          status: WorkoutStatus.FINISHED,
          dateFinished: new Date().toISOString(),
          totalTimeInSeconds: workout.totalTimeInSeconds,
          userID: userId,
        },
      },
    });

    if (!workoutData?.data?.createWorkout?.id) return;

    const exercisesData = await bulkCreateWorkoutExercises({
      variables: {
        exercises: exercises.map((dwe, index) => ({
          workoutID: workoutData.data!.createWorkout!.id,
          name: dwe.name,
          description: dwe.description,
          muscleGroup: dwe.muscleGroup,
          color: dwe.color,
          restTimeInSeconds: dwe.restTimeInSeconds,
          setsConfig: JSON.stringify(
            dwe.sets.filter((set) => set.status === 'completed'),
          ),
          sortOrder: Number.isNaN(Number(dwe.sortOrder))
            ? index
            : dwe.sortOrder,
        })),
        routineExercisesToUpdate,
      },
    });

    const savedWorkout = workoutData.data.createWorkout;
    const savedExercises =
      exercisesData.data?.bulkCreateWorkoutExercises?.exercises ?? [];

    client.cache.updateQuery<WorkoutsByUserQuery, WorkoutsByUserQueryVariables>(
      {
        query: workoutsByUserQuery,
        variables: {
          userID: userId,
          filter: {
            status: {
              eq: WorkoutStatus.FINISHED,
            },
          },
          sortDirection: ModelSortDirection.DESC,
        },
      },
      (data) => {
        if (!data?.workoutsByUser) return;

        return {
          workoutsByUser: {
            ...data.workoutsByUser,
            items: [
              {
                ...savedWorkout,
                WorkoutExercises: {
                  items: savedExercises ?? [],
                  __typename: 'ModelWorkoutExerciseConnection',
                  nextToken: null,
                  startedAt: null,
                },
              },
              ...(data.workoutsByUser.items ?? []),
            ],
          },
        };
      },
    );
  };

  return { createDraftWorkoutAndExercises, saveWorkout };
};
