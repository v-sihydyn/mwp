import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal } from 'native-base';
import React, { useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';

type Props = InstanceProps<string> & {
  initialValue: string;
};

export const EditSetRepsModal = ({
  initialValue,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <NBModal isOpen={isOpen} onClose={() => {}}>
      <NBModal.Content backgroundColor={colors.page}>
        <NBModal.Header
          backgroundColor={colors.page}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Edit reps</Text>
        </NBModal.Header>
        <NBModal.Body padding={4} paddingTop={2}>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={modalStyles.modalInput}
          />
        </NBModal.Body>
        <NBModal.Footer
          backgroundColor={colors.page}
          padding={4}
          borderTopWidth={0}>
          <TouchableOpacity
            style={[modalStyles.modalButton, { marginRight: 40 }]}
            onPress={() => {}}>
            <Text style={modalStyles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyles.modalButton}
            onPress={() => onResolve(value)}>
            <Text style={modalStyles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  );
};

export const openEditRepsModal = create(EditSetRepsModal);
