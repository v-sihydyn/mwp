import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanRoutineMutation,
  CreateWorkoutPlanRoutineMutationVariables,
  UpdateWorkoutPlanRoutineMutation,
  UpdateWorkoutPlanRoutineMutationVariables,
} from '../API';
import { createWorkoutPlanRoutineMutation } from './mutations/createWorkoutPlanRoutineMutation';
import { updateWorkoutPlanRoutineMutation } from './mutations/updateWorkoutPlanRoutineMutation';

export const useWorkoutPlanRoutineActions = () => {
  const [createWorkoutPlanRoutine, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanRoutineMutation,
    CreateWorkoutPlanRoutineMutationVariables
  >(createWorkoutPlanRoutineMutation);
  const [updateWorkoutPlanRoutine, { loading: updateLoading }] = useMutation<
    UpdateWorkoutPlanRoutineMutation,
    UpdateWorkoutPlanRoutineMutationVariables
  >(updateWorkoutPlanRoutineMutation);

  return {
    createWorkoutPlanRoutine,
    createLoading,
    updateWorkoutPlanRoutine,
    updateLoading,
  };
};
