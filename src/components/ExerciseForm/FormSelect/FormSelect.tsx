import { View, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { CheckIcon, ChevronDownIcon, Select } from 'native-base';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';

type FormSelectProps<ContentType extends FieldValues> = {
  name: Path<ContentType>;
  control: Control<ContentType, object>;
  children: React.ReactNode;
};

export const FormSelect = <ContentType extends FieldValues>({
  name,
  control,
  children,
}: FormSelectProps<ContentType>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Select
            selectedValue={value}
            style={{
              paddingLeft: 4,
            }}
            color={colors.text}
            fontSize={16}
            variant="underlined"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            placeholder="Muscle"
            placeholderTextColor={colors.placeholder}
            dropdownIcon={<ChevronDownIcon size={4} />}
            onValueChange={onChange}
            borderBottomColor={error && colors.red}>
            {children}
          </Select>
          {error && error.message && <ErrorMessage error={error} />}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
