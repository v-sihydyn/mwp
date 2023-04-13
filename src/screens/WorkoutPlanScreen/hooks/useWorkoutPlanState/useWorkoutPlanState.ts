import { useWorkoutPlansByUser } from '../useWorkoutPlansByUser/useWorkoutPlansByUser';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useMemo, useState } from 'react';

export const useWorkoutPlanState = () => {
  const { userId } = useAuthContext();
  const {
    workoutPlans,
    areWorkoutPlansLoading,
    error: workoutPlansFetchError,
  } = useWorkoutPlansByUser(userId);

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const selectedPlan = useMemo(() => {
    const plan = workoutPlans.find((x) => x?.id === selectedPlanId);

    return plan ?? null;
  }, [workoutPlans, selectedPlanId]);

  const routines = useMemo(() => {
    return selectedPlan?.WorkoutPlanRoutines?.items ?? [];
  }, [selectedPlan]);

  return {
    workoutPlans,
    areWorkoutPlansLoading,
    workoutPlansFetchError,

    selectedPlanId,
    selectedPlan,
    routines,

    setSelectedPlanId,
  };
};
