import { NetworkStatus, useQuery } from '@apollo/client';
import {
  ModelSortDirection,
  WorkoutsByDateQuery,
  WorkoutsByDateQueryVariables,
  WorkoutStatus,
} from '../../../../API';
import { workoutsByDateQuery } from './queuries/workoutsByDateQuery';

export const useWorkoutsList = () => {
  const { data, refetch, loading, networkStatus, error } = useQuery<
    WorkoutsByDateQuery,
    WorkoutsByDateQueryVariables
  >(workoutsByDateQuery, {
    variables: {
      status: WorkoutStatus.FINISHED,
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const workouts = (data?.workoutsByDate?.items ?? [])
    .filter((x) => !x?._deleted)
    .map((workout) => ({
      ...workout,
      WorkoutExercises: {
        ...workout!.WorkoutExercises,
        items: workout!
          .WorkoutExercises!.items.slice()
          .sort((a, b) => Number(a!.sortOrder) - Number(b!.sortOrder)),
      },
    }));
  const refetching = networkStatus === NetworkStatus.refetch;

  return { workouts, refetch, refetching, loading, error };
};
