import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanRoutineMutation,
  CreateWorkoutPlanRoutineMutationVariables,
} from '../API';
import { createWorkoutPlanRoutineMutation } from './mutations/createWorkoutPlanRoutineMutation';

export const useWorkoutPlanRoutineActions = () => {
  const [createWorkoutPlanRoutine, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanRoutineMutation,
    CreateWorkoutPlanRoutineMutationVariables
  >(createWorkoutPlanRoutineMutation);

  return {
    createWorkoutPlanRoutine,
    createLoading,
  };
};
