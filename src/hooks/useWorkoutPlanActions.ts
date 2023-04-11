import { useMutation } from '@apollo/client';
import {
  CreateWorkoutPlanMutation,
  CreateWorkoutPlanMutationVariables,
  DeletePlanAndRoutinesMutation,
  DeletePlanAndRoutinesMutationVariables,
  UpdateWorkoutPlanMutation,
  UpdateWorkoutPlanMutationVariables,
  WorkoutPlan,
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../API';
import { createWorkoutPlanMutation } from './mutations/createWorkoutPlanMutation';
import { updateWorkoutPlanMutation } from './mutations/updateWorkoutPlanMutation';
import { deletePlanAndRoutinesMutation } from './mutations/deleteWorkoutPlanMutation';
import { workoutPlansByUserIDQuery } from '../screens/WorkoutPlanScreen/hooks/queries/workoutPlansByUserIDQuery';
import { useAuthContext } from '../contexts/AuthContext';

export const useWorkoutPlanActions = () => {
  const { userId } = useAuthContext();
  const [createWorkoutPlan, { loading: createLoading }] = useMutation<
    CreateWorkoutPlanMutation,
    CreateWorkoutPlanMutationVariables
  >(createWorkoutPlanMutation);
  const [updateWorkoutPlan, { loading: updateLoading }] = useMutation<
    UpdateWorkoutPlanMutation,
    UpdateWorkoutPlanMutationVariables
  >(updateWorkoutPlanMutation);
  const [deleteWorkoutPlan, { loading: deleteLoading }] = useMutation<
    DeletePlanAndRoutinesMutation,
    DeletePlanAndRoutinesMutationVariables
  >(deletePlanAndRoutinesMutation);

  const doCreateWorkoutPlan = (name: string) => {
    return createWorkoutPlan({
      variables: {
        input: {
          name,
          userID: userId,
        },
      },
      update(cache, { data }) {
        if (!data?.createWorkoutPlan) return;
        const createdPlan = data?.createWorkoutPlan;

        cache.updateQuery<
          WorkoutPlansByUserIDQuery,
          WorkoutPlansByUserIDQueryVariables
        >(
          {
            query: workoutPlansByUserIDQuery,
            variables: {
              userID: userId,
            },
          },
          (updateData) => {
            if (!updateData?.workoutPlansByUserID?.items) return;

            return {
              workoutPlansByUserID: {
                ...updateData.workoutPlansByUserID,
                items: (updateData?.workoutPlansByUserID?.items ?? []).concat(
                  createdPlan,
                ),
              },
            };
          },
        );
      },
    });
  };

  const doDeleteWorkoutPlan = (planId: string) => {
    return deleteWorkoutPlan({
      variables: {
        planId,
      },
      update(cache, { data }) {
        if (!data?.deletePlanAndRoutines) return;
        const deletedPlanId = data?.deletePlanAndRoutines.id;

        cache.updateQuery<
          WorkoutPlansByUserIDQuery,
          WorkoutPlansByUserIDQueryVariables
        >(
          {
            query: workoutPlansByUserIDQuery,
            variables: {
              userID: userId,
            },
          },
          (updateData) => {
            if (!updateData?.workoutPlansByUserID?.items) return;

            return {
              workoutPlansByUserID: {
                ...updateData.workoutPlansByUserID,
                items: (updateData?.workoutPlansByUserID?.items ?? []).filter(
                  (_plan: WorkoutPlan | null) => {
                    return _plan?.id !== deletedPlanId;
                  },
                ),
              },
            };
          },
        );
      },
    });
  };

  return {
    doCreateWorkoutPlan,
    createLoading,
    updateWorkoutPlan,
    updateLoading,
    doDeleteWorkoutPlan,
    deleteLoading,
  };
};
