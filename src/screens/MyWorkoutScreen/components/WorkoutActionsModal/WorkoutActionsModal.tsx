import React from 'react';
import { WorkoutPlanActions } from '../WorkoutPlanActions/WorkoutPlanActions';
import { Modal, Props as ModalProps } from '../../../../components/Modal/Modal';

type Props = ModalProps;


export const WorkoutActionsModal = ({ isVisible, onClose }: Props) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <WorkoutPlanActions />
    </Modal>
  );
};
