import { Text, TouchableOpacity } from 'react-native';
import { Modal as NBModal, IModalProps as INBModalProps } from 'native-base';
import React from 'react';
import { create } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';

type Props = INBModalProps & {
  onResolve: (value?: any) => void;
  onReject: (reason?: any) => void;
};

export const ConfirmLogoutModal = ({ isOpen, onResolve, onReject }: Props) => {
  return (
    <NBModal isOpen={isOpen} onClose={() => onReject('close reject')}>
      <NBModal.Content backgroundColor={colors.surface2}>
        <NBModal.Header
          backgroundColor={colors.surface2}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Logout</Text>
        </NBModal.Header>
        <NBModal.Body padding={4} paddingTop={2}>
          <Text style={modalStyles.modalSubtitle}>Are you sure?</Text>
        </NBModal.Body>
        <NBModal.Footer
          backgroundColor={colors.surface2}
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

export const openConfirmLogoutModal = create(ConfirmLogoutModal);
