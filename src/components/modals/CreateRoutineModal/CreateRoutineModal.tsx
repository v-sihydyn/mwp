import { Text, TextInput, TouchableOpacity } from 'react-native';
import { Modal as NBModal, Toast } from 'native-base';
import React, { useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import { modalStyles } from '../modalStyles';
import { colors } from '../../../styles/colors';
import { useWorkoutPlanRoutineActions } from '../../../hooks/useWorkoutPlanRoutineActions';
import {
  WorkoutPlan,
  WorkoutPlanRoutine,
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../../../API';
import { workoutPlansByUserIDQuery } from '../../../screens/WorkoutPlanScreen/hooks/queries/workoutPlansByUserIDQuery';

type Props = InstanceProps<WorkoutPlanRoutine | null> & {
  workoutPlanId: string;
  userId: string;
};

export const CreateRoutineModal = ({
  workoutPlanId,
  userId,
  isOpen,
  onResolve,
  onReject,
}: Props) => {
  const { createWorkoutPlanRoutine, createLoading } =
    useWorkoutPlanRoutineActions();
  const [name, setName] = useState<string>('');

  const handleSubmit = async () => {
    if (createLoading) return;
    if (!name) return onResolve();

    try {
      const response = await createWorkoutPlanRoutine({
        variables: {
          input: {
            name,
            workoutPlanID: workoutPlanId,
          },
        },
        // refetchQueries: ['WorkoutPlansByUserID'],
        update(cache, { data }) {
          const newRoutine = data?.createWorkoutPlanRoutine;
          if (!newRoutine) return;

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
                          items:
                            plan.id === workoutPlanId
                              ? [
                                  ...(plan.WorkoutPlanRoutines?.items ?? []),
                                  newRoutine,
                                ]
                              : plan.WorkoutPlanRoutines?.items,
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
    <NBModal isOpen={isOpen} onClose={() => onReject()}>
      <NBModal.Content backgroundColor={colors.page}>
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

export const openCreateRoutineModal = create<Props, WorkoutPlanRoutine | null>(
  CreateRoutineModal,
);
