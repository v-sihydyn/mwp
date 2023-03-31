import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import { useWorkoutPlanActions } from '../../../hooks/useWorkoutPlanActions';
import { KeyboardAvoidingModal } from '../../KeyboardAvoidingModal/KeyboardAvoidingModal';

type Props = InstanceProps<string | null> & {
  userId: string;
};

export const CreatePlanModal = ({
  userId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { createWorkoutPlan, createLoading } = useWorkoutPlanActions();
  const [name, setName] = useState<string>('My Workout Plan'); // @TODO: name must be unique

  const handleSubmit = async () => {
    if (createLoading) return;
    if (!name) return onResolve();

    try {
      const response = await createWorkoutPlan({
        variables: {
          input: {
            name,
            userID: userId,
          },
        },
        refetchQueries: ['WorkoutPlansByUserID'],
      });
      onResolve(response?.data?.createWorkoutPlan?.id ?? null);
    } catch (e) {
      Toast.show({
        title: 'Failed to create a plan',
        description: (e as Error).message,
        duration: 3000,
        backgroundColor: colors.red,
      });
    }
  };

  return (
    <KeyboardAvoidingModal isOpen={isOpen} onClose={() => onReject()}>
      <NBModal.Header
        backgroundColor={colors.page}
        padding={4}
        borderBottomWidth={0}>
        <Text style={modalStyles.modalTitle}>Create Workout Plan</Text>
      </NBModal.Header>
      <NBModal.Body padding={4} paddingTop={2}>
        <TextInput
          value={name}
          onChangeText={setName}
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
          onPress={() => onReject()}>
          <Text style={modalStyles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={modalStyles.modalButton}
          onPress={handleSubmit}>
          <Text style={modalStyles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </NBModal.Footer>
    </KeyboardAvoidingModal>
  );
};

export const openCreatePlanModal = create<Props, string | null>(
  CreatePlanModal,
);
