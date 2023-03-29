import { NetworkStatus, useLazyQuery } from '@apollo/client';
import {
  ModelSortDirection,
  WorkoutsByDateQuery,
  WorkoutsByDateQueryVariables,
  WorkoutStatus,
} from '../../../../API';
import { workoutsByDateQuery } from './queuries/workoutsByDateQuery';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export const useWorkoutsList = (filterDate: string | null) => {
  const [fetch, { data, refetch, loading, networkStatus, error }] =
    useLazyQuery<WorkoutsByDateQuery, WorkoutsByDateQueryVariables>(
      workoutsByDateQuery,
      {},
    );

  useEffect(() => {
    const variables: WorkoutsByDateQueryVariables = {
      status: WorkoutStatus.FINISHED,
      sortDirection: ModelSortDirection.DESC,
    };
    let start;
    let end;

    if (filterDate) {
      start = dayjs.utc(filterDate).startOf('day').toISOString();
      end = dayjs.utc(filterDate).endOf('day').toISOString();
      variables.dateFinished = {
        between: [start, end],
      };
    }

    fetch({
      variables,
    });
  }, [filterDate]);

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
