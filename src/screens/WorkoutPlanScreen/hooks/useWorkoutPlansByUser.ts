import { useQuery } from '@apollo/client';
import { workoutPlansByUserIDQuery } from './queries/workoutPlansByUserIDQuery';
import {
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../../../API';

export const useWorkoutPlansByUser = (userId: string) => {
  const { data, loading } = useQuery<
    WorkoutPlansByUserIDQuery,
    WorkoutPlansByUserIDQueryVariables
  >(workoutPlansByUserIDQuery, {
    variables: {
      userID: userId,
    },
  });

  const workoutPlans = data?.workoutPlansByUserID?.items! ?? [];

  return {
    workoutPlans,
    areWorkoutPlansLoading: loading,
  };
};
