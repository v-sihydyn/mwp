import { NetworkStatus, useLazyQuery } from '@apollo/client';
import {
  ModelSortDirection,
  Workout,
  WorkoutsByUserQuery,
  WorkoutsByUserQueryVariables,
  WorkoutStatus,
} from '../../../../API';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { workoutsByUserQuery } from './queuries/workoutsByUserQuery';
import { useAuthContext } from '../../../../contexts/AuthContext';

export const useWorkoutsList = (filterDate: string | null) => {
  const { userId } = useAuthContext();
  const [fetch, { data, refetch, loading, networkStatus, error }] =
    useLazyQuery<WorkoutsByUserQuery, WorkoutsByUserQueryVariables>(
      workoutsByUserQuery,
      {},
    );

  useEffect(() => {
    const variables: WorkoutsByUserQueryVariables = {
      userID: userId,
      sortDirection: ModelSortDirection.DESC,
      filter: {
        status: {
          eq: WorkoutStatus.FINISHED,
        },
      },
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
  }, [filterDate, userId]);

  const workouts = (data?.workoutsByUser?.items ?? [])
    .filter((x) => !x?._deleted)
    .map((workout) => ({
      ...workout,
      __typename: 'Workout',
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
