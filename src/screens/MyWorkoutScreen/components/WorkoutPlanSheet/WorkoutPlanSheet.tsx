import React from 'react';
import { WorkoutPlansList } from '../WorkoutPlansList/WorkoutPlansList';
import { BottomSheet, Props as BottomSheetProps } from '../../../../components/BottomSheet/BottomSheet';

type Props = BottomSheetProps;

export const WorkoutPlanSheet = ({ isVisible, onClose }: Props) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <WorkoutPlansList />
    </BottomSheet>
  );
};

