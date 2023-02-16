import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanMutation,
  CreateWorkoutPlanMutationVariables,
  DeleteWorkoutPlanMutation,
  DeleteWorkoutPlanMutationVariables,
  UpdateWorkoutPlanMutation,
  UpdateWorkoutPlanMutationVariables,
} from '../API';
import { createWorkoutPlanMutation } from './mutations/createWorkoutPlanMutation';
import { updateWorkoutPlanMutation } from './mutations/updateWorkoutPlanMutation';
import { deleteWorkoutPlanMutation } from './mutations/deleteWorkoutPlanMutation';

export const useWorkoutPlanActions = () => {
  const [createWorkoutPlan, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanMutation,
    CreateWorkoutPlanMutationVariables
  >(createWorkoutPlanMutation);
  const [updateWorkoutPlan, { loading: updateLoading }] = useMutation<
    UpdateWorkoutPlanMutation,
    UpdateWorkoutPlanMutationVariables
  >(updateWorkoutPlanMutation);
  const [deleteWorkoutPlan, { loading: deleteLoading }] = useMutation<
    DeleteWorkoutPlanMutation,
    DeleteWorkoutPlanMutationVariables
  >(deleteWorkoutPlanMutation);

  // @TODO: mb handle errors here

  return {
    createWorkoutPlan,
    createLoading,
    updateWorkoutPlan,
    updateLoading,
    deleteWorkoutPlan,
    deleteLoading,
  };
};
