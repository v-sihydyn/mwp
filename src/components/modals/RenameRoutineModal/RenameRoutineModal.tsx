import { Keyboard, Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import { WorkoutPlanRoutine } from '../../../API';
import { useWorkoutPlanRoutineActions } from '../../../hooks/useWorkoutPlanRoutineActions';
import { KeyboardAvoidingModal } from '../../KeyboardAvoidingModal/KeyboardAvoidingModal';
import { usePrevious } from '../../../hooks/usePrevious';

type Props = InstanceProps<{ name: string; _version: number }> & {
  routine: Partial<Pick<WorkoutPlanRoutine, 'id' | 'name' | '_version'>>;
  workoutPlanId: string;
  userId: string;
};

export const RenameRoutineModal = ({
  routine,
  workoutPlanId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { updateWorkoutPlanRoutine, updateLoading } =
    useWorkoutPlanRoutineActions();
  const [name, setName] = useState<string>(routine.name!);
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
    if (updateLoading) return;
    if (!name) return onResolve();

    try {
      await updateWorkoutPlanRoutine({
        variables: {
          input: {
            id: routine.id!,
            name,
            workoutPlanID: workoutPlanId,
            _version: routine._version,
          },
        },
      });
      onResolve();
    } catch (e) {
      Toast.show({
        title: 'Failed to rename a routine',
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
        <Text style={modalStyles.modalTitle}>Rename Routine</Text>
      </NBModal.Header>
      <NBModal.Body padding={4} paddingTop={2}>
        <TextInput
          value={name}
          onChangeText={setName}
          selectTextOnFocus={true}
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

export const openRenameRoutineModal = create<Props>(RenameRoutineModal);
