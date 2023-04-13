import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { WorkoutSummary } from '../WorkoutScreen/components/WorkoutSummary/WorkoutSummary';
import React, { useEffect } from 'react';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Icon } from '../../components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { openDeleteWorkoutModal } from '../../components/modals/DeleteWorkoutModal/DeleteWorkoutModal';
import { useMutation } from '@apollo/client';
import { deleteWorkoutAndExercisesMutation } from './mutations/deleteWorkoutAndExercisesMutation';
import {
  DeleteWorkoutAndExercisesMutation,
  DeleteWorkoutAndExercisesMutationVariables,
  ModelSortDirection,
  Workout,
  WorkoutsByUserQuery,
  WorkoutsByUserQueryVariables,
  WorkoutStatus,
} from '../../API';
import { Toast } from 'native-base';
import { workoutsByUserQuery } from '../StatisticsScreen/hooks/useWorkoutsList/queuries/workoutsByUserQuery';
import { useAuthContext } from '../../contexts/AuthContext';
import { WorkoutDetailsRouteProp } from '../../types/navigation';

export const WorkoutDetailsScreen = () => {
  const { userId } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute<WorkoutDetailsRouteProp>();
  const { id, title, workout, workoutExercises } = route.params;
  const [deleteWorkout, { loading: deleteLoading }] = useMutation<
    DeleteWorkoutAndExercisesMutation,
    DeleteWorkoutAndExercisesMutationVariables
  >(deleteWorkoutAndExercisesMutation);

  const handleDelete = async () => {
    if (deleteLoading) return;

    const deleteConfirmed = await openDeleteWorkoutModal().catch(() => {});

    if (deleteConfirmed) {
      try {
        await deleteWorkout({
          variables: {
            workoutId: id,
          },
          update(cache, { data }) {
            if (!data?.deleteWorkoutAndExercises) return;

            const deletedWorkoutId = data?.deleteWorkoutAndExercises.id;

            cache.updateQuery<
              WorkoutsByUserQuery,
              WorkoutsByUserQueryVariables
            >(
              {
                query: workoutsByUserQuery,
                variables: {
                  userID: userId,
                  filter: {
                    status: {
                      eq: WorkoutStatus.FINISHED,
                    },
                    _deleted: {
                      ne: true,
                    },
                  },
                  sortDirection: ModelSortDirection.DESC,
                },
              },
              (data) => {
                if (!data?.workoutsByUser?.items) return;

                return {
                  workoutsByUser: {
                    ...data.workoutsByUser,
                    items: (data?.workoutsByUser?.items ?? []).filter(
                      (_workout: Workout | null) => {
                        return _workout?.id !== deletedWorkoutId;
                      },
                    ),
                  },
                };
              },
            );
          },
        });

        navigation.goBack();
      } catch (e) {
        Toast.show({
          title: 'Failed to delete workout',
          description: (e as Error).message,
          duration: 3000,
          backgroundColor: colors.red,
        });
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={handleDelete}
          style={{ marginRight: 16, backgroundColor: colors.black }}
          icon={<Icon name="trash" color={colors.red} size={16} />}>
          <Text style={{ fontWeight: 'bold' }}>Delete</Text>
        </CustomButton>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <WorkoutSummary
        title={title}
        workout={workout}
        exercises={workoutExercises}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
});
