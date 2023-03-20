import { StyleSheet, Text } from 'react-native';
import { colors } from '../../styles/colors';
import React, { useEffect } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  blankInitialValues,
  ExerciseForm,
  ExerciseFormData,
  validationSchema,
} from '../../components/ExerciseForm/ExerciseForm';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CreateWorkoutRoutineExerciseMutation,
  CreateWorkoutRoutineExerciseMutationVariables,
  WorkoutPlan,
  WorkoutPlansByUserIDQuery,
  WorkoutPlansByUserIDQueryVariables,
} from '../../API';
import { yupResolver } from '@hookform/resolvers/yup';
import { createWorkoutRoutineExerciseMutation } from './mutations/createWorkoutRoutineExerciseMutation';
import { useMutation } from '@apollo/client';
import { Toast } from 'native-base';
import { AddCustomExerciseToRoutineRouteProp } from '../../../types';
import { workoutPlansByUserIDQuery } from '../WorkoutPlanScreen/hooks/queries/workoutPlansByUserIDQuery';
import { useAuthContext } from '../../contexts/AuthContext';

export const AddCustomExerciseToRoutineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddCustomExerciseToRoutineRouteProp>();
  const { workoutPlanId, workoutRoutineId } = route.params;
  const { userId } = useAuthContext();

  const formMethods = useForm<ExerciseFormData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...blankInitialValues,
    },
  });
  const { handleSubmit } = formMethods;
  const [createWorkoutRoutineExercise, { loading }] = useMutation<
    CreateWorkoutRoutineExerciseMutation,
    CreateWorkoutRoutineExerciseMutationVariables
  >(createWorkoutRoutineExerciseMutation);

  const onSubmit = async (values: ExerciseFormData) => {
    if (loading) return;

    try {
      let restTimeInSeconds = null;
      const restTimeMins = Number(values.restTimeMins);
      const restTimeSecs = Number(values.restTimeSecs);

      if (!Number.isNaN(restTimeMins) && !Number.isNaN(restTimeSecs)) {
        restTimeInSeconds = restTimeMins * 60 + restTimeSecs;
      }

      await createWorkoutRoutineExercise({
        variables: {
          input: {
            name: values.name,
            muscleGroup: values.muscleGroup,
            color: values.color,
            description: values.description,
            workoutPlanRoutineID: workoutRoutineId,
            setsConfig: JSON.stringify(values.sets),
            restTimeInSeconds,
          },
        },
        update(cache, { data }) {
          const newExercise = data?.createWorkoutRoutineExercise;
          if (!newExercise) return;

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
                              ? (plan.WorkoutPlanRoutines?.items ?? []).map(
                                  (routine) =>
                                    routine?.id === workoutRoutineId
                                      ? {
                                          ...routine,
                                          WorkoutRoutineExercises: {
                                            ...routine.WorkoutRoutineExercises,
                                            items: [
                                              ...(routine
                                                ?.WorkoutRoutineExercises
                                                ?.items ?? []),
                                              newExercise,
                                            ],
                                          },
                                        }
                                      : routine,
                                )
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

      navigation.navigate('Root', {
        screen: 'WorkoutPlan',
      });
    } catch (e) {
      Toast.show({
        title: 'Failed to create an exercise',
        description: (e as Error).message,
        duration: 3000,
        backgroundColor: colors.red,
      });
    }
  };

  const doSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={doSubmit}
          style={{ marginRight: 16 }}
          icon={<Icon name="check" color={colors.text} size={16} />}>
          <Text style={{ fontWeight: 'bold' }}>Done</Text>
        </CustomButton>
      ),
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      bounces={false}>
      <FormProvider {...formMethods}>
        <ExerciseForm />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.page,
    flexDirection: 'column',
    position: 'relative',
  },
});
