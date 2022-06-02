import React from 'react';
import { WorkoutPlansList } from '../WorkoutPlansList/WorkoutPlansList';
import { Modal, Props as ModalProps } from '../../../../components/Modal/Modal';

type Props = ModalProps;

export const WorkoutPlanModal = ({ isVisible, onClose }: Props) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <WorkoutPlansList />
    </Modal>
  );
};

