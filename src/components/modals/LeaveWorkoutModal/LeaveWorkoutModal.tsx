import { Text, TouchableOpacity } from 'react-native';
import { Modal as NBModal } from 'native-base';
import React from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';

type Props = InstanceProps<void>;

export const LeaveWorkoutModal = ({ isOpen, onResolve, onReject }: Props) => {
  return (
    <NBModal isOpen={isOpen} onClose={() => onReject()}>
      <NBModal.Content backgroundColor={colors.page}>
        <NBModal.Header
          backgroundColor={colors.page}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Leave workout</Text>
        </NBModal.Header>
        <NBModal.Body padding={4} paddingTop={2}>
          <Text style={modalStyles.modalSubtitle}>
            You will be able to resume later
          </Text>
        </NBModal.Body>
        <NBModal.Footer
          backgroundColor={colors.page}
          padding={4}
          borderTopWidth={0}>
          <TouchableOpacity
            style={[modalStyles.modalButton, { marginRight: 40 }]}
            onPress={() => onReject()}>
            <Text style={modalStyles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.modalButton}
            onPress={() => onResolve()}>
            <Text style={modalStyles.modalButtonText}>Ok</Text>
          </TouchableOpacity>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  );
};

export const openLeaveWorkoutModal = create<Props>(LeaveWorkoutModal);
