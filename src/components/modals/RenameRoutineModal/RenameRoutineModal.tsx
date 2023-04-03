import { Keyboard, Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import {
  WorkoutPlan,
  WorkoutPlanRoutine,
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../../../API';
import { useWorkoutPlanRoutineActions } from '../../../hooks/useWorkoutPlanRoutineActions';
import { workoutPlansByUserIDQuery } from '../../../screens/WorkoutPlanScreen/hooks/queries/workoutPlansByUserIDQuery';
import { KeyboardAvoidingModal } from '../../KeyboardAvoidingModal/KeyboardAvoidingModal';
import { usePrevious } from '../../../hooks/usePrevious';

type Props = InstanceProps<{ name: string; _version: number }> & {
  routine: Pick<WorkoutPlanRoutine, 'id' | 'name' | '_version'>;
  workoutPlanId: string;
  userId: string;
};

export const RenameRoutineModal = ({
  routine,
  workoutPlanId,
  userId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { updateWorkoutPlanRoutine, updateLoading } =
    useWorkoutPlanRoutineActions();
  const [name, setName] = useState<string>(routine.name);
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
      const response = await updateWorkoutPlanRoutine({
        variables: {
          input: {
            id: routine.id,
            name,
            workoutPlanID: workoutPlanId,
            _version: routine._version,
          },
        },
        update(cache, { data }) {
          if (!data?.updateWorkoutPlanRoutine) return;

          // @ts-ignore
          cache.updateQuery<
            WorkoutPlansByUserIDQuery,
            WorkoutPlansByUserIDQueryVariables
          >(
            {
              query: workoutPlansByUserIDQuery,
              variables: {
                userID: userId,
              },
            },
            (data) => {
              if (!data?.workoutPlansByUserID?.items) return;

              return {
                workoutPlansByUserID: {
                  ...data.workoutPlansByUserID,
                  items: (data?.workoutPlansByUserID?.items ?? []).map(
                    (_plan: WorkoutPlan | null) => {
                      const plan = _plan! || {};

                      return {
                        ...plan,
                        WorkoutPlanRoutines: {
                          ...plan.WorkoutPlanRoutines,
                          items: plan.WorkoutPlanRoutines?.items.map((r) => ({
                            ...r,
                            name: r?.id === routine.id ? name : r?.name,
                          })),
                        },
                      };
                    },
                  ),
                },
              };
            },
          );
        },
      });
      if (response?.data?.updateWorkoutPlanRoutine) {
        const updatedRoutine = response.data.updateWorkoutPlanRoutine;
        onResolve({
          name: updatedRoutine.name,
          _version: updatedRoutine._version,
        });
      }
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

export const openRenameRoutineModal = create<
  Props,
  { name: string; _version: number }
>(RenameRoutineModal);
