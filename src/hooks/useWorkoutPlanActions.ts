import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanMutation,
  CreateWorkoutPlanMutationVariables,
  UpdateWorkoutPlanMutation,
  UpdateWorkoutPlanMutationVariables,
} from '../API';
import { createWorkoutPlanMutation } from './mutations/createWorkoutPlanMutation';
import { updateWorkoutPlanMutation } from './mutations/updateWorkoutPlanMutation';

export const useWorkoutPlanActions = () => {
  const [createWorkoutPlan, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanMutation,
    CreateWorkoutPlanMutationVariables
  >(createWorkoutPlanMutation);
  const [updateWorkoutPlan, { loading: updateLoading }] = useMutation<
    UpdateWorkoutPlanMutation,
    UpdateWorkoutPlanMutationVariables
  >(updateWorkoutPlanMutation, {
    refetchQueries: ['WorkoutPlansByUserID'], // @TODO: update cache instead
  });

  return {
    createWorkoutPlan,
    createLoading,
    updateWorkoutPlan,
    updateLoading,
  };
};
