import { Control, Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { IEditableUser, IEditableUserField } from './types';
import { colors } from '../../styles/colors';

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

export const CustomInput = ({
  control,
  name,
  label,
  multiline,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[
              styles.input,
              { borderColor: error ? colors.red : colors.green },
            ]}
            multiline={multiline}
          />
          {error && <Text style={{ color: colors.red }}>{error.message}</Text>}
        </View>
      </View>
    )}
  />
);
