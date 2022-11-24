import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Switch,
} from 'react-native';
import { colors } from '../../styles/colors';
import { CheckIcon, ChevronDownIcon, Select } from 'native-base';
import React, { useEffect, useState } from 'react';
import { MUSCLE_SELECT_OPTIONS } from '../../constants/muscleSelectOptions';
import { Icon } from '../../components/Icon/Icon';
import { ColorPicker } from './components/ColorPicker/ColorPicker';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from './components/CustomButton/CustomButton';

export const AddCustomExerciseToRoutineScreen = () => {
  const navigation = useNavigation();
  const [muscle, setMuscle] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={() => alert('Done')}
          style={{ marginRight: 16 }}
          icon={<Icon name="check" color={colors.text} size={16} />}>
          Done
        </CustomButton>
      ),
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.placeholder}
          style={styles.formInput}
        />
        <View style={{ marginBottom: 20 }}>
          <Select
            selectedValue={muscle}
            style={{ fontSize: 16, paddingLeft: 4 }}
            color={colors.text}
            fontSize={13}
            variant="underlined"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            placeholderTextColor={colors.placeholder}
            dropdownIcon={<ChevronDownIcon size={4} />}
            onValueChange={setMuscle}>
            {MUSCLE_SELECT_OPTIONS.map((option) => (
              <Select.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Select>
        </View>
        <View>
          <Text style={styles.label}>Sets (weight field is optional):</Text>
          <View style={styles.setsContainer}>
            <View style={{ marginBottom: 12 }}>
              <View>
                <View style={styles.set}>
                  <TextInput
                    value="1"
                    keyboardType="numeric"
                    style={styles.setInput}
                  />
                  <Text style={styles.setLabel}>Sets</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput
                    value="1"
                    keyboardType="numeric"
                    style={styles.setInput}
                  />
                  <Text style={styles.setLabel}>Reps</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput
                    value="1"
                    keyboardType="numeric"
                    style={styles.setInput}
                  />
                  <Text style={styles.setLabel}>Kg</Text>
                </View>
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
                    }}></View>
                  <View style={styles.deleteSetButton}>
                    <Icon name="trash" color={colors.red} />
                  </View>
                  <View
                    style={{
                      height: 1,
                      flexGrow: 1,
                      backgroundColor: colors.surface,
                    }}></View>
                </View>
              </View>
              <View>
                <View style={styles.set}>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Sets</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Reps</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Kg</Text>
                </View>
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
                    }}></View>
                  <View style={styles.deleteSetButton}>
                    <Icon name="trash" color={colors.red} />
                  </View>
                  <View
                    style={{
                      height: 1,
                      flexGrow: 1,
                      backgroundColor: colors.surface,
                    }}></View>
                </View>
              </View>
              <View>
                <View style={styles.set}>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Sets</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Reps</Text>
                  <View style={styles.setsFieldsDivider}></View>
                  <TextInput value="1" style={styles.setInput} />
                  <Text style={styles.setLabel}>Kg</Text>
                </View>
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
                    }}></View>
                  <View style={styles.deleteSetButton}>
                    <Icon name="trash" color={colors.red} />
                  </View>
                  <View
                    style={{
                      height: 1,
                      flexGrow: 1,
                      backgroundColor: colors.surface,
                    }}></View>
                </View>
              </View>
            </View>

            <View style={styles.button}>
              <View style={styles.buttonIconWrapper}>
                <Icon size={10} name="plus" />
              </View>
              <Text style={styles.buttonText}>Add Different Set</Text>
            </View>

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
                value={true}
                style={{ height: 10 }}
              />
            </View>

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
                <TextInput
                  value="1"
                  keyboardType="numeric"
                  style={styles.setInput}
                />
                <Text style={styles.setLabel}>Minutes</Text>
                <View style={styles.setsFieldsDivider}></View>
                <TextInput
                  value="30"
                  keyboardType="numeric"
                  style={styles.setInput}
                />
                <Text style={styles.setLabel}>Seconds</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.colorPickerContainer}>
          <Text style={[styles.label, { paddingLeft: 4 }]}>Choose color:</Text>
          <ColorPicker value={selectedColor} onChange={setSelectedColor} />
        </View>

        <TextInput
          placeholder="Notes"
          placeholderTextColor={colors.placeholder}
          style={styles.formInput}
          multiline={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flexDirection: 'column',
    position: 'relative',
  },
  form: {
    padding: 20,
  },
  formInput: {
    width: '100%',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    fontSize: 16,
    marginBottom: 20,
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
  set: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setInput: {
    backgroundColor: colors.page,
    width: 70,
    height: 40,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
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
});
