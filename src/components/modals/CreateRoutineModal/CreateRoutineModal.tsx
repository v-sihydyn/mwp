import { Keyboard, Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import { useWorkoutPlanRoutineActions } from '../../../hooks/useWorkoutPlanRoutineActions/useWorkoutPlanRoutineActions';
import { WorkoutPlanRoutine } from '../../../API';
import { KeyboardAvoidingModal } from '../../KeyboardAvoidingModal';
import { usePrevious } from '../../../hooks/usePrevious';

type Props = InstanceProps<WorkoutPlanRoutine | null> & {
  workoutPlanId: string;
  userId: string;
};

export const CreateRoutineModal = ({
  workoutPlanId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { doCreateWorkoutPlanRoutine, createLoading } =
    useWorkoutPlanRoutineActions();
  const [name, setName] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen && !prevIsOpen) {
      timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);

      return;
    }

    if (!isOpen && prevIsOpen) {
      Keyboard.dismiss();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, prevIsOpen]);

  const handleSubmit = async () => {
    if (createLoading) return;
    if (!name) return onResolve();

    try {
      const response = await doCreateWorkoutPlanRoutine(name, workoutPlanId);

      onResolve(response?.data?.createWorkoutPlanRoutine ?? null);
    } catch (e) {
      Toast.show({
        title: 'Failed to create a routine',
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
        <Text style={modalStyles.modalTitle}>New Routine</Text>
      </NBModal.Header>
      <NBModal.Body padding={4} paddingTop={2}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={modalStyles.modalInput}
          ref={inputRef}
          selectionColor={colors.green}
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

export const openCreateRoutineModal = create<Props, WorkoutPlanRoutine | null>(
  CreateRoutineModal,
);
