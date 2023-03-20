import { StyleSheet, Text, View } from 'react-native';
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
import {
  AddExerciseToRoutineRouteProp,
  EditRoutineExerciseRouteProp,
} from '../../../types';
import { useAuthContext } from '../../contexts/AuthContext';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useApolloClient, useMutation } from '@apollo/client';
import { exerciseFragment } from '../../fragments/exerciseFragment';
import {
  DeleteWorkoutRoutineExerciseMutation,
  DeleteWorkoutRoutineExerciseMutationVariables,
  UpdateWorkoutRoutineExerciseMutation,
  UpdateWorkoutRoutineExerciseMutationVariables,
  WorkoutPlanRoutine,
} from '../../API';
import { Toast } from 'native-base';
import { updateWorkoutRoutineExerciseMutation } from './mutations/updateWorkoutRoutineExerciseMutation';
import { openDeleteRoutineModal } from '../../components/modals/DeleteRoutineModal/DeleteRoutineModal';
import { openDeleteExerciseModal } from '../../components/modals/DeleteExerciseModal/DeleteExerciseModal';
import { deleteWorkoutRoutineExerciseMutation } from './mutations/deleteWorkoutRoutineExerciseMutation';
import { routineFragment } from '../../fragments/routineFragment';

export const EditRoutineExerciseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<EditRoutineExerciseRouteProp>();
  const client = useApolloClient();
  const { workoutRoutineId, exerciseId } = route.params;
  const exerciseCacheKey = `WorkoutRoutineExercise:${exerciseId}`;
  const routineCacheKey = `WorkoutPlanRoutine:${workoutRoutineId}`;
  const exercise = client.readFragment({
    id: exerciseCacheKey,
    fragment: exerciseFragment,
  });

  let restTimeMins;
  let restTimeSecs;

  if (!isNaN(exercise.restTimeInSeconds)) {
    restTimeMins = Math.floor(exercise.restTimeInSeconds / 60);
    restTimeSecs = exercise.restTimeInSeconds % 60;
  }

  const initialValues: ExerciseFormData = {
    name: exercise.name ?? blankInitialValues.name,
    muscleGroup: exercise.muscleGroup ?? blankInitialValues.muscleGroup,
    sets: exercise.setsConfig
      ? JSON.parse(exercise.setsConfig)
      : blankInitialValues.sets,
    restTimeMins: restTimeMins
      ? String(restTimeMins)
      : blankInitialValues.restTimeMins,
    restTimeSecs: restTimeSecs
      ? String(restTimeSecs)
      : blankInitialValues.restTimeSecs,
    color: exercise.color ?? blankInitialValues.color,
    description: exercise.description ?? blankInitialValues.description,
  };

  const formMethods = useForm<ExerciseFormData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...initialValues,
    },
  });
  const { handleSubmit } = formMethods;
  const [updateWorkoutRoutineExercise, { loading: updateLoading }] =
    useMutation<
      UpdateWorkoutRoutineExerciseMutation,
      UpdateWorkoutRoutineExerciseMutationVariables
    >(updateWorkoutRoutineExerciseMutation);
  const [deleteWorkoutRoutineExercise, { loading: deleteLoading }] =
    useMutation<
      DeleteWorkoutRoutineExerciseMutation,
      DeleteWorkoutRoutineExerciseMutationVariables
    >(deleteWorkoutRoutineExerciseMutation);

  const onSubmit = async (values: ExerciseFormData) => {
    if (updateLoading) return;

    try {
      let restTimeInSeconds = null;
      const _restTimeMins = Number(values.restTimeMins);
      const _restTimeSecs = Number(values.restTimeSecs);

      if (!Number.isNaN(_restTimeMins) && !Number.isNaN(_restTimeSecs)) {
        restTimeInSeconds = _restTimeMins * 60 + _restTimeSecs;
      }

      await updateWorkoutRoutineExercise({
        variables: {
          input: {
            id: exerciseId,
            name: values.name,
            muscleGroup: values.muscleGroup,
            color: values.color,
            description: values.description,
            workoutPlanRoutineID: workoutRoutineId,
            setsConfig: JSON.stringify(values.sets),
            restTimeInSeconds,
            _version: exercise._version,
          },
        },
        update(cache, { data }) {
          const updatedExercise = data?.updateWorkoutRoutineExercise;
          if (!updatedExercise) return;

          cache.writeFragment({
            id: exerciseCacheKey,
            fragment: exerciseFragment,
            data: updatedExercise,
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

  const handleOpenDeleteExerciseModal = async () => {
    if (deleteLoading) return;

    try {
      const deleteConfirmed = await openDeleteExerciseModal().catch(() => {});

      if (deleteConfirmed) {
        await deleteWorkoutRoutineExercise({
          variables: {
            input: {
              id: exerciseId,
              _version: exercise._version,
            },
          },
          update(cache, { data }) {
            if (!data?.deleteWorkoutRoutineExercise?.id) return;

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
                  items: (routine?.WorkoutRoutineExercises?.items ?? []).filter(
                    (x) => x?.id !== data?.deleteWorkoutRoutineExercise?.id,
                  ),
                },
              },
            });
          },
        });

        navigation.navigate('Root', {
          screen: 'WorkoutPlan',
        });
      }
    } catch (e) {
      console.warn(e);
      Toast.show({
        title: 'Failed to delete the exercise',
        description: (e as Error).message,
        duration: 3000,
        backgroundColor: colors.red,
      });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 16, flexDirection: 'row' }}>
          <CustomButton
            onPress={handleOpenDeleteExerciseModal}
            icon={<Icon name="trash" color={colors.red} size={16} />}
            style={{
              backgroundColor: colors.black,
              marginRight: 12,
            }}>
            <Text style={{ fontWeight: 'bold' }}>Delete</Text>
          </CustomButton>

          <CustomButton
            onPress={doSubmit}
            icon={<Icon name="check" color={colors.text} size={16} />}>
            <Text style={{ fontWeight: 'bold' }}>Done</Text>
          </CustomButton>
        </View>
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
