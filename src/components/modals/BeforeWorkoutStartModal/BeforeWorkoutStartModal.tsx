import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, IModalProps as INBModalProps } from 'native-base';
import React from 'react';
import { create } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';

type Props = INBModalProps & {
  onResolve: (value?: any) => void;
  onReject: (reason?: any) => void;
};

export const BeforeWorkoutStartModal = ({
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  return (
    <NBModal isOpen={isOpen} onClose={() => onReject('close reject')}>
      <NBModal.Content backgroundColor={colors.surface2}>
        <NBModal.Header
          backgroundColor={colors.surface2}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Play Routine</Text>
        </NBModal.Header>
        <NBModal.Body padding={4} paddingTop={2}>
          <Text style={modalStyles.modalSubtitle}>
            You haven't finished your previous workout
          </Text>
        </NBModal.Body>
        <NBModal.Footer
          backgroundColor={colors.surface2}
          padding={4}
          borderTopWidth={0}>
          <TouchableOpacity
            style={[modalStyles.modalButton, { marginRight: 40 }]}
            onPress={() => onResolve()}>
            <Text style={modalStyles.modalButtonText}>Start new</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.modalButton}
            onPress={() => onResolve()}>
            <Text style={modalStyles.modalButtonText}>Resume previous</Text>
          </TouchableOpacity>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  );
};

export const openBeforeWorkoutStartModal = create(BeforeWorkoutStartModal);