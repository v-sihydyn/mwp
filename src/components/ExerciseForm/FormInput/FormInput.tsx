import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextInput,
  ViewStyle,
} from 'react-native';
import { Control, Controller, Path } from 'react-hook-form';
import React from 'react';
import { Input, IInputProps } from 'native-base';
import { colors } from '../../../styles/colors';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type FormInputProps<ContentType> = {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  inputStyle?: StyleProp<ViewStyle>;
} & IInputProps;

export const FormInput = <ContentType,>({
  control,
  name,
  placeholder = '',
  secureTextEntry = false,
  placeholderTextColor,
  style,
  inputStyle,
  ...props
}: FormInputProps<ContentType>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View style={style}>
            <Input
              {...props}
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              style={inputStyle}
              secureTextEntry={secureTextEntry}
              borderBottomColor={error && colors.red}
              focusOutlineColor={error ? colors.red : colors.green}
            />
            {error && error.message && <ErrorMessage error={error} />}
          </View>
        </>
      )}
    />
  );
};
