import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanRoutineMutation,
  CreateWorkoutPlanRoutineMutationVariables,
  DeleteWorkoutPlanRoutineMutation,
  DeleteWorkoutPlanRoutineMutationVariables,
  UpdateWorkoutPlanRoutineMutation,
  UpdateWorkoutPlanRoutineMutationVariables,
  WorkoutPlan,
} from '../../API';
import { createWorkoutPlanRoutineMutation } from './mutations/createWorkoutPlanRoutineMutation';
import { updateWorkoutPlanRoutineMutation } from './mutations/updateWorkoutPlanRoutineMutation';
import { deleteWorkoutPlanRoutineMutation } from './mutations/deleteWorkoutPlanRoutineMutation';
import { planFragment } from '../../fragments/planFragment';

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

  const doCreateWorkoutPlanRoutine = (name: string, planId: string) => {
    return createWorkoutPlanRoutine({
      variables: {
        input: {
          name,
          workoutPlanID: planId,
        },
      },
      update(cache, { data }) {
        const newRoutine = data?.createWorkoutPlanRoutine;
        if (!newRoutine) return;

        const planKey = `WorkoutPlan:${planId}`;
        const plan = cache.readFragment<WorkoutPlan>({
          id: planKey,
          fragment: planFragment,
          fragmentName: 'Plan',
        });

        cache.writeFragment<WorkoutPlan>({
          id: planKey,
          fragment: planFragment,
          fragmentName: 'Plan',
          data: {
            ...plan!,
            WorkoutPlanRoutines: {
              ...plan?.WorkoutPlanRoutines,
              startedAt: null,
              nextToken: null,
              __typename: 'ModelWorkoutPlanRoutineConnection',
              items: (plan?.WorkoutPlanRoutines?.items ?? []).concat(
                newRoutine,
              ),
            },
          },
        });
      },
    });
  };

  const doDeleteWorkoutPlanRoutine = (
    routineId: string,
    routineVersion: number | undefined,
    planId: string,
  ) => {
    return deleteWorkoutPlanRoutine({
      variables: {
        input: {
          id: routineId,
          _version: routineVersion,
        },
      },
      update(cache, { data }) {
        if (!data?.deleteWorkoutPlanRoutine) return;

        const planKey = `WorkoutPlan:${planId}`;
        const plan = cache.readFragment<WorkoutPlan>({
          id: planKey,
          fragment: planFragment,
          fragmentName: 'Plan',
        });

        cache.writeFragment<WorkoutPlan>({
          id: planKey,
          fragment: planFragment,
          fragmentName: 'Plan',
          data: {
            ...plan!,
            WorkoutPlanRoutines: {
              ...plan?.WorkoutPlanRoutines,
              startedAt: null,
              nextToken: null,
              __typename: 'ModelWorkoutPlanRoutineConnection',
              items: (plan?.WorkoutPlanRoutines?.items ?? []).filter(
                (x) => x?.id !== routineId,
              ),
            },
          },
        });
      },
    });
  };

  return {
    doCreateWorkoutPlanRoutine,
    createLoading,
    updateWorkoutPlanRoutine,
    updateLoading,
    doDeleteWorkoutPlanRoutine,
    deleteLoading,
  };
};
