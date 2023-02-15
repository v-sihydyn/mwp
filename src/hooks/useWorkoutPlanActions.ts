import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanMutation,
  CreateWorkoutPlanMutationVariables,
} from '../API';
import { createWorkoutPlanMutation } from './mutations/createWorkoutPlanMutation';

export const useWorkoutPlanActions = () => {
  const [createWorkoutPlan, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanMutation,
    CreateWorkoutPlanMutationVariables
  >(createWorkoutPlanMutation, {
    refetchQueries: ['WorkoutPlansByUserID'],
  });

  return {
    createWorkoutPlan,
    createLoading,
  };
};
