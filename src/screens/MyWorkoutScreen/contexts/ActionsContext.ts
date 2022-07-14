import { createContext} from 'react';


type ActionsContextType = {
  onOpenWorkoutPlanSheet: () => void;
  onCloseWorkoutPlanSheet: () => void;

  onOpenWorkoutActionsSheet: () => void;
  onCloseWorkoutActionsSheet: () => void;

  onOpenRenameWorkoutPlanModal: () => void;
  onCloseRenameWorkoutPlanModal: () => void;
}

export const ActionsContext = createContext<ActionsContextType>({
  onOpenWorkoutPlanSheet: () => {},
  onCloseWorkoutPlanSheet: () => {},

  onOpenWorkoutActionsSheet: () => {},
  onCloseWorkoutActionsSheet: () => {
    alert('1')
  },

  onOpenRenameWorkoutPlanModal: () => {},
  onCloseRenameWorkoutPlanModal: () => {},
})
