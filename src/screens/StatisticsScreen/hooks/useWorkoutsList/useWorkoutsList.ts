import { useQuery } from '@apollo/client';
import {
  ModelSortDirection,
  WorkoutsByDateQuery,
  WorkoutsByDateQueryVariables,
  WorkoutStatus,
} from '../../../../API';
import { workoutsByDateQuery } from './queuries/workoutsByDateQuery';

export const useWorkoutsList = () => {
  const { data, loading } = useQuery<
    WorkoutsByDateQuery,
    WorkoutsByDateQueryVariables
  >(workoutsByDateQuery, {
    variables: {
      status: WorkoutStatus.FINISHED,
      sortDirection: ModelSortDirection.DESC,
    },
  });

  const workouts = (data?.workoutsByDate?.items ?? []).filter(
    (x) => !x?._deleted,
  );

  return { workouts, loading };
};
