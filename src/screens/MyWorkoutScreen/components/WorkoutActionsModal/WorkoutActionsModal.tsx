import React from 'react';
import { WorkoutPlanActions } from '../WorkoutPlanActions/WorkoutPlanActions';
import { BottomSheet, Props as BottomSheetProps } from '../../../../components/BottomSheet/BottomSheet';

type Props = BottomSheetProps;

export const WorkoutActionsModal = ({ isVisible, onClose }: Props) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <WorkoutPlanActions />
    </BottomSheet>
  );
};
