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
import { Icon } from '../Icon/Icon';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormInput } from './FormInput/FormInput';
import { FormSelect } from './FormSelect/FormSelect';
import { getBlankSetItem } from './helpers';
import { FormSetControl } from './FormSetControl/FormSetControl';
import { MUSCLE_SELECT_OPTIONS } from '../../constants/muscleSelectOptions';

export const ExerciseForm = () => {
  const { control, watch, setValue } = useFormContext();
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'sets',
  });
  const [canSetRestTime, setCanSetRestTime] = useState(false);
  const color = watch('color');

  useEffect(() => {
    if (sets.length < 2 && canSetRestTime) {
      setCanSetRestTime(false);
    }
  }, [sets, canSetRestTime]);

  useEffect(() => {
    if (!canSetRestTime) {
      setValue('restTimeMins', null);
      setValue('restTimeSecs', null);
      // @TODO edit
    }
  }, [canSetRestTime]);

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
              disabled={sets.length < 2}
              style={[Platform.OS === 'android' && { height: 10 }]}
            />
          </View>

          {canSetRestTime && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <Text style={{ fontSize: 16, color: colors.text }}>Time:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  marginLeft: 10,
                }}>
                <FormInput
                  name="restTimeMins"
                  control={control}
                  inputStyle={styles.setInput}
                  variant="unstyled"
                  width={60}
                  maxLength={2}
                  keyboardType="numeric"
                />
                <Text style={styles.setLabel}>Minutes</Text>
                <View style={styles.setsFieldsDivider}></View>
                <FormInput
                  name="restTimeSecs"
                  control={control}
                  inputStyle={styles.setInput}
                  variant="unstyled"
                  width={60}
                  maxLength={2}
                  keyboardType="numeric"
                />
                <Text style={styles.setLabel}>Seconds</Text>
              </View>
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
