import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanRoutineMutation,
  CreateWorkoutPlanRoutineMutationVariables,
  DeleteWorkoutPlanRoutineMutation,
  DeleteWorkoutPlanRoutineMutationVariables,
  UpdateWorkoutPlanRoutineMutation,
  UpdateWorkoutPlanRoutineMutationVariables,
} from '../API';
import { createWorkoutPlanRoutineMutation } from './mutations/createWorkoutPlanRoutineMutation';
import { updateWorkoutPlanRoutineMutation } from './mutations/updateWorkoutPlanRoutineMutation';
import { deleteWorkoutPlanRoutineMutation } from './mutations/deleteWorkoutPlanRoutineMutation';

export const useWorkoutPlanRoutineActions = () => {
  const [createWorkoutPlanRoutine, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanRoutineMutation,
    CreateWorkoutPlanRoutineMutationVariables
  >(createWorkoutPlanRoutineMutation);
  const [updateWorkoutPlanRoutine, { loading: updateLoading }] = useMutation<
    UpdateWorkoutPlanRoutineMutation,
    UpdateWorkoutPlanRoutineMutationVariables
  >(updateWorkoutPlanRoutineMutation);
  const [deleteWorkoutPlanRoutine, { loading: deleteLoading }] = useMutation<
    DeleteWorkoutPlanRoutineMutation,
    DeleteWorkoutPlanRoutineMutationVariables
  >(deleteWorkoutPlanRoutineMutation);

  return {
    createWorkoutPlanRoutine,
    createLoading,
    updateWorkoutPlanRoutine,
    updateLoading,
    deleteWorkoutPlanRoutine,
    deleteLoading,
  };
};
