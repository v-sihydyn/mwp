import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, IModalProps as INBModalProps } from 'native-base';
import React from 'react';
import { create } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';

type Props = INBModalProps & {
  onResolve: (value: any) => void;
  onReject: (reason: any) => void;
};

export const DuplicateRoutineModal = ({
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  return (
    <NBModal isOpen={isOpen} onClose={() => onReject('close reject')}>
      <NBModal.Content backgroundColor={colors.page}>
        <NBModal.Header
          backgroundColor={colors.page}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Duplicate Routine</Text>
        </NBModal.Header>
        <NBModal.Body padding={4} paddingTop={2}>
          <TextInput
            value="My Workout Plan"
            selectTextOnFocus={true}
            style={modalStyles.modalInput}
          />
        </NBModal.Body>
        <NBModal.Footer
          backgroundColor={colors.page}
          padding={4}
          borderTopWidth={0}>
          <TouchableOpacity
            style={[modalStyles.modalButton, { marginRight: 40 }]}
            onPress={() => onReject('close reject')}>
            <Text style={modalStyles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.modalButton}
            onPress={() => onResolve('close resolve')}>
            <Text style={modalStyles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  );
};

export const openDuplicateRoutineModal = create(DuplicateRoutineModal);
