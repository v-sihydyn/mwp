import { useQuery } from '@apollo/client';
import { workoutPlansByUserIDQuery } from './queries/workoutPlansByUserIDQuery';
import {
  ModelSortDirection,
  WorkoutPlansByUserIDAndCreatedAtQuery,
  WorkoutPlansByUserIDAndCreatedAtQueryVariables,
} from '../../../../API';
import { useMemo } from 'react';

export const useWorkoutPlansByUser = (userId: string) => {
  const { data, loading, error } = useQuery<
    WorkoutPlansByUserIDAndCreatedAtQuery,
    WorkoutPlansByUserIDAndCreatedAtQueryVariables
  >(workoutPlansByUserIDQuery, {
    variables: {
      userID: userId,
      sortDirection: ModelSortDirection.ASC,
    },
  });

  const workoutPlans = useMemo(
    () =>
      (data?.workoutPlansByUserIDAndCreatedAt?.items! ?? []).map((plan) => ({
        ...plan,
        WorkoutPlanRoutines: {
          ...plan!.WorkoutPlanRoutines,
          items: plan!
            .WorkoutPlanRoutines!.items.slice()
            .sort((a, b) => {
              return (
                new Date(a!.createdAt).getTime() -
                new Date(b!.createdAt).getTime()
              );
            })
            .map((routine) => ({
              ...routine,
              WorkoutRoutineExercises: {
                ...routine!.WorkoutRoutineExercises,
                items: routine!
                  .WorkoutRoutineExercises!.items.slice()
                  .sort((a, b) => {
                    return (
                      new Date(a!.createdAt).getTime() -
                      new Date(b!.createdAt).getTime()
                    );
                  }),
              },
            })),
        },
      })),
    [data],
  );

  return {
    workoutPlans,
    areWorkoutPlansLoading: loading,
    error,
  };
};
