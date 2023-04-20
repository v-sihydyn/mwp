import React from 'react';
import { View, Text } from 'react-native';
import { CheckIcon, ChevronDownIcon, Select } from 'native-base';
import { colors } from '../../../../styles/colors';
import { MUSCLE_SELECT_OPTIONS } from '../../../../constants/muscleSelectOptions';
import { ExerciseEquipment } from '../../../../API';

type FiltersProps = {
  filterMuscle: string;
  onFilterMuscleChange: (value: string) => void;
  filterEquipment: string;
  onFilterEquipmentChange: (value: string) => void;
};

const EQUIPMENT_SELECT_OPTIONS = [
  {
    label: 'Barbell',
    value: ExerciseEquipment.BARBELL,
  },
  {
    label: 'Body weight',
    value: ExerciseEquipment.BODYWEIGHT,
  },
  {
    label: 'Dumbbell',
    value: ExerciseEquipment.DUMBBELL,
  },
  {
    label: 'EZ Barbell',
    value: ExerciseEquipment.EZBARBELL,
  },
  {
    label: 'Kettlebell',
    value: ExerciseEquipment.KETTLEBELL,
  },
  {
    label: 'Leverage machine',
    value: ExerciseEquipment.LEVERAGEMACHINE,
  },
  {
    label: 'Sled machine',
    value: ExerciseEquipment.SLEDMACHINE,
  },
  {
    label: 'Smith machine',
    value: ExerciseEquipment.SMITHMACHINE,
  },
  {
    label: 'Weighted',
    value: ExerciseEquipment.WEIGHTED,
  },
];

export const Filters = ({
  filterMuscle,
  onFilterMuscleChange,
  filterEquipment,
  onFilterEquipmentChange,
}: FiltersProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1,
      }}>
      <View style={{ width: '47%' }}>
        <Text style={{ color: colors.text2, fontSize: 13 }}>Muscle</Text>
        <Select
          selectedValue={filterMuscle}
          color={colors.text}
          fontSize={13}
          variant="underlined"
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          dropdownIcon={<ChevronDownIcon size={4} />}
          onValueChange={onFilterMuscleChange}>
          <Select.Item key={''} label="Any muscle" value={''} />
          {MUSCLE_SELECT_OPTIONS.map((option) => (
            <Select.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Select>
      </View>
      <View style={{ width: '47%' }}>
        <Text style={{ color: colors.text2, fontSize: 13 }}>Equipment</Text>
        <Select
          selectedValue={filterEquipment}
          color={colors.text}
          fontSize={13}
          variant="underlined"
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          dropdownIcon={<ChevronDownIcon size={4} />}
          onValueChange={onFilterEquipmentChange}>
          <Select.Item key={''} label="Any equipment" value={''} />
          {EQUIPMENT_SELECT_OPTIONS.map((option) => (
            <Select.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Select>
      </View>
    </View>
  );
};
