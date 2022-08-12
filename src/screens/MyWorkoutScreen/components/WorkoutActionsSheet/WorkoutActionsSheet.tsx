import React from 'react';
import { WorkoutPlanActions } from '../WorkoutPlanActions/WorkoutPlanActions';
import { BottomSheet, Props as BottomSheetProps } from '../../../../components/BottomSheet/BottomSheet';

type Props = BottomSheetProps;

// deprecated, need to delete
export const WorkoutActionsSheet = ({ isVisible, onClose }: Props) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <WorkoutPlanActions onSheetClose={onClose} />
    </BottomSheet>
  );
};
