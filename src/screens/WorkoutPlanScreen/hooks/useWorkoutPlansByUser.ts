import { useQuery } from '@apollo/client';
import { workoutPlansByUserIDQuery } from './queries/workoutPlansByUserIDQuery';
import {
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../../../API';
import { useMemo } from 'react';

export const useWorkoutPlansByUser = (userId: string) => {
  const { data, loading, error } = useQuery<
    WorkoutPlansByUserIDQuery,
    WorkoutPlansByUserIDQueryVariables
  >(workoutPlansByUserIDQuery, {
    variables: {
      userID: userId,
    },
  });

  const workoutPlans = useMemo(
    () =>
      (data?.workoutPlansByUserID?.items! ?? []).map((plan) => ({
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
