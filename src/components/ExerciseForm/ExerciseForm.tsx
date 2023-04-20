import {
  View,
  StyleSheet,
  Text,
  Switch,
  Pressable,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import { Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { ColorPicker } from '../ColorPicker';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { getBlankSetItem } from './helpers';
import { FormSetControl } from './FormSetControl';
import { MUSCLE_SELECT_OPTIONS } from '../../constants/muscleSelectOptions';
import { MuscleGroup } from '../../API';
import * as yup from 'yup';
import { TimeIntervalPicker, ValueMap } from '../TimeIntervalPicker';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export const ExerciseForm = () => {
  const { control, watch, setValue, getFieldState, formState } =
    useFormContext();
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'sets',
  });
  const { isDirty: isSetsDirty } = getFieldState('sets', formState);

  const color = watch('color');
  const setsValue = watch('sets');
  const restTimeMins = watch('restTimeMins');
  const restTimeSecs = watch('restTimeSecs');
  const isRestTimeSet = restTimeMins > 0 || restTimeSecs > 0;

  const allSetsCount = (setsValue as ExerciseFormData['sets']).reduce(
    (acc, cur) => {
      return acc + Number(cur.sets || 0);
    },
    0,
  );

  const [canSetRestTime, setCanSetRestTime] = useState(
    allSetsCount > 1 && isRestTimeSet,
  );

  useEffect(() => {
    if (isSetsDirty && allSetsCount < 2 && canSetRestTime) {
      setCanSetRestTime(false);
    }
  }, [allSetsCount, sets, canSetRestTime, isSetsDirty]);

  useEffect(() => {
    if (!canSetRestTime) {
      setValue('restTimeMins', null);
      setValue('restTimeSecs', null);
    }
  }, [canSetRestTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const addSet = () => {
    append(getBlankSetItem());
  };

  return (
    <View style={styles.form}>
      <FormInput
        name="name"
        control={control}
        placeholder="Name"
        placeholderTextColor={colors.placeholder}
        variant="underlined"
        style={styles.inputWrapper}
        inputStyle={styles.formInput}
      />
      <FormSelect name="muscleGroup" control={control}>
        {MUSCLE_SELECT_OPTIONS.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </FormSelect>
      <View>
        <Text style={styles.label}>Sets (weight field is optional):</Text>
        <View style={styles.setsContainer}>
          <View style={{ marginBottom: 12 }}>
            {sets.map((set, index) => (
              <View key={index}>
                <FormSetControl key={index} index={index} control={control} />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 1,
                      flexGrow: 1,
                      backgroundColor: colors.surface,
                    }}
                  />
                  {sets.length > 1 && (
                    <Pressable onPress={() => remove(index)}>
                      <View style={styles.deleteSetButton}>
                        <Icon name="trash" color={colors.red} />
                      </View>
                    </Pressable>
                  )}
                  <View
                    style={{
                      height: 1,
                      flexGrow: 1,
                      backgroundColor: colors.surface,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
          <Pressable onPress={addSet}>
            <View style={styles.button}>
              <View style={styles.buttonIconWrapper}>
                <Icon size={10} name="plus" />
              </View>
              <Text style={styles.buttonText}>Add Different Set</Text>
            </View>
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={{ fontSize: 16, color: colors.text }}>
              Rest between sets:
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: colors.green }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={canSetRestTime}
              onValueChange={() => {
                setCanSetRestTime((prevValue) => !prevValue);
              }}
              disabled={allSetsCount < 2}
              style={[Platform.OS === 'android' && { height: 10 }]}
            />
          </View>

          {canSetRestTime && (
            <View
              style={[
                {
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  flexGrow: 1,
                },
                isIos && {
                  flexDirection: 'column',
                },
                isAndroid && {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: colors.text,
                  },
                  isIos && { alignSelf: 'flex-start' },
                ]}>
                Time:
              </Text>

              <TimeIntervalPicker
                initialValue={{
                  hours: 0,
                  minutes: Number(restTimeMins),
                  seconds: Number(restTimeSecs),
                }}
                onChange={(value: ValueMap) => {
                  setValue('restTimeMins', value.minutes);
                  setValue('restTimeSecs', value.seconds);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.colorPickerContainer}>
        <Text style={[styles.label, { paddingLeft: 4 }]}>Choose color:</Text>
        <ColorPicker
          value={color}
          onChange={(value) => {
            setValue('color', value);
          }}
        />
      </View>

      <FormInput
        name="description"
        control={control}
        placeholder="Notes"
        placeholderTextColor={colors.placeholder}
        variant="underlined"
        style={styles.inputWrapper}
        inputStyle={styles.formInput}
        multiline={true}
      />
    </View>
  );
};

export type SetData = {
  sets: string | null;
  reps: string | null;
  weight: string | null;
};

export type ExerciseFormData = {
  name: string;
  muscleGroup: MuscleGroup | null;
  sets: SetData[];
  restTimeMins?: number | null;
  restTimeSecs?: number | null;
  color?: string | null;
  description?: string | null;
};

export const blankInitialValues: ExerciseFormData = {
  name: '',
  muscleGroup: null,
  sets: [getBlankSetItem()],
  restTimeMins: null,
  restTimeSecs: null,
  color: '#000000',
  description: '',
};

export const validationSchema = yup.object().shape({
  name: yup.string().max(30).required("Name can't be empty"),
  muscleGroup: yup.string().required("Muscle can't be empty"),
  sets: yup.array().of(
    yup.object().shape({
      sets: yup.string().nullable().required(),
      reps: yup.string().nullable().required(),
      weight: yup.string().nullable(),
    }),
  ),

  description: yup.string().max(50),
});

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  formInput: {
    color: colors.text,
    borderBottomColor: colors.text,
    fontSize: 16,
  },
  label: {
    color: colors.text3,
    fontSize: 16,
    marginBottom: 20,
  },
  setsContainer: {
    backgroundColor: colors.surface2,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  setInput: {
    backgroundColor: colors.page,
    width: 60,
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  setLabel: {
    color: colors.text,
    fontSize: 16,
  },
  setsFieldsDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#313233',
  },
  setsDivider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.surface,
  },
  deleteSetButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
    backgroundColor: colors.surface,
    marginBottom: 16,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  colorPickerContainer: {
    backgroundColor: colors.surface2,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
});
