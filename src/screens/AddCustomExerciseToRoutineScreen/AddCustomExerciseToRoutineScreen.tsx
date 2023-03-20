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
  WorkoutPlanRoutine,
} from '../../API';
import { yupResolver } from '@hookform/resolvers/yup';
import { createWorkoutRoutineExerciseMutation } from './mutations/createWorkoutRoutineExerciseMutation';
import { useMutation } from '@apollo/client';
import { Toast } from 'native-base';
import { AddCustomExerciseToRoutineRouteProp } from '../../../types';
import { routineFragment } from '../../fragments/routineFragment';

export const AddCustomExerciseToRoutineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AddCustomExerciseToRoutineRouteProp>();
  const { workoutRoutineId } = route.params;
  const routineCacheKey = `WorkoutPlanRoutine:${workoutRoutineId}`;

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

          const routine = cache.readFragment<WorkoutPlanRoutine>({
            id: routineCacheKey,
            fragment: routineFragment,
            fragmentName: 'Routine',
          });

          cache.writeFragment<WorkoutPlanRoutine>({
            id: routineCacheKey,
            fragment: routineFragment,
            fragmentName: 'Routine',
            data: {
              ...routine!,
              WorkoutRoutineExercises: {
                ...routine!.WorkoutRoutineExercises,
                __typename: 'ModelWorkoutRoutineExerciseConnection',
                items: (routine?.WorkoutRoutineExercises?.items ?? []).concat(
                  newExercise,
                ),
              },
            },
          });
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
