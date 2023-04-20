import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ExerciseFormData } from '../types';

type FormSetControlProps = {
  control: Control<ExerciseFormData, object>;
  index: number;
};

export const FormSetControl = ({ index, control }: FormSetControlProps) => {
  return (
    <View style={styles.set}>
      <Controller
        control={control}
        name={`sets.${index}.sets`}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
            maxLength={2}
            style={[
              styles.setInput,
              {
                borderColor: error ? colors.red : 'transparent',
              },
            ]}
          />
        )}
      />
      <Text style={styles.setLabel}>Sets</Text>
      <Divider />
      <Controller
        control={control}
        name={`sets.${index}.reps`}
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
            maxLength={3}
            style={[
              styles.setInput,
              {
                borderColor: error ? colors.red : 'transparent',
              },
            ]}
          />
        )}
      />
      <Text style={styles.setLabel}>Reps</Text>
      <Divider />
      <Controller
        control={control}
        name={`sets.${index}.weight`}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
            style={styles.setInput}
          />
        )}
      />
      <Text style={styles.setLabel}>Kg</Text>
    </View>
  );
};

const Divider = () => <View style={styles.setsFieldsDivider} />;

const styles = StyleSheet.create({
  set: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
});
