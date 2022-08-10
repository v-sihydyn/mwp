import { createContext} from 'react';


type ActionsContextType = {
  onOpenWorkoutPlanSheet: () => void;
  onCloseWorkoutPlanSheet: () => void;

  onOpenWorkoutActionsSheet: () => void;
  onCloseWorkoutActionsSheet: () => void;

  onOpenRenameWorkoutPlanModal: () => void;
  onCloseRenameWorkoutPlanModal: () => void;

  onOpenDeleteWorkoutPlanModal: () => void;
  onCloseDeleteWorkoutPlanModal: () => void;

  onOpenRenamePlanRoutineModal: () => void;
  onCloseRenamePlanRoutineModal: () => void;

  onOpenDeletePlanRoutineModal: () => void;
  onCloseDeletePlanRoutineModal: () => void;
}

export const ActionsContext = createContext<ActionsContextType>({
  onOpenWorkoutPlanSheet: () => {},
  onCloseWorkoutPlanSheet: () => {},

  onOpenWorkoutActionsSheet: () => {},
  onCloseWorkoutActionsSheet: () => {},

  onOpenRenameWorkoutPlanModal: () => {},
  onCloseRenameWorkoutPlanModal: () => {},

  onOpenDeleteWorkoutPlanModal: () => {},
  onCloseDeleteWorkoutPlanModal: () => {},

  onOpenRenamePlanRoutineModal: () => {},
  onCloseRenamePlanRoutineModal: () => {},

  onOpenDeletePlanRoutineModal: () => {},
  onCloseDeletePlanRoutineModal: () => {},
})
