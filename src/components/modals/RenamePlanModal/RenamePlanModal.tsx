import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import { useWorkoutPlanActions } from '../../../hooks/useWorkoutPlanActions';
import { WorkoutPlan } from '../../../API';

type Props = InstanceProps<WorkoutPlan> & {
  workoutPlan: Omit<WorkoutPlan, 'WorkoutPlanRoutines'>;
  userId: string;
};

export const RenamePlanModal = ({
  workoutPlan,
  userId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { updateWorkoutPlan, updateLoading } = useWorkoutPlanActions();
  const [name, setName] = useState<string>(workoutPlan.name);

  const handleSubmit = async () => {
    if (updateLoading) return;
    if (!name) return onResolve();

    try {
      const response = await updateWorkoutPlan({
        variables: {
          input: {
            id: workoutPlan.id,
            name,
            userID: userId,
            _version: workoutPlan._version,
          },
        },
        update(cache, { data }) {
          if (!data?.updateWorkoutPlan) return;

          cache.modify({
            id: cache.identify(data.updateWorkoutPlan),
            fields: {
              workoutPlansByUserID(existingItems = [], { INVALIDATE }) {
                return INVALIDATE;
              },
            },
          });
        },
      });
      if (response?.data?.updateWorkoutPlan) {
        const { WorkoutPlanRoutines, ...workoutPlan } =
          response.data.updateWorkoutPlan;
        onResolve(workoutPlan);
      }
    } catch (e) {
      Toast.show({
        title: 'Failed to rename a plan',
        description: (e as Error).message,
        duration: 3000,
        backgroundColor: colors.red,
      });
    }
  };

  return (
    <NBModal isOpen={isOpen} onClose={() => onReject()}>
      <NBModal.Content backgroundColor={colors.page}>
        <NBModal.Header
          backgroundColor={colors.page}
          padding={4}
          borderBottomWidth={0}>
          <Text style={modalStyles.modalTitle}>Rename Workout Plan</Text>
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
      </NBModal.Content>
    </NBModal>
  );
};

export const openRenamePlanModal = create<Props, WorkoutPlan>(RenamePlanModal);
