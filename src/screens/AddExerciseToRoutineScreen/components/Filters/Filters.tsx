import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckIcon, ChevronDownIcon, Select } from 'native-base';
import { colors } from '../../../../styles/colors';
import { MUSCLE_SELECT_OPTIONS } from '../../../../constants/muscleSelectOptions';

type FiltersProps = {};

const EQUIPMENT_SELECT_OPTIONS = [
  {
    label: 'Any equipment',
    value: '',
  },
  {
    label: 'Assisted',
    value: 'Assisted',
  },
  {
    label: 'Band',
    value: 'Band',
  },
  {
    label: 'Barbell',
    value: 'Barbell',
  },
  {
    label: 'Body weight',
    value: 'Body weight',
  },
  {
    label: 'Dumbbell',
    value: 'Dumbbell',
  },
  {
    label: 'Leverage machine',
    value: 'Leverage machine',
  },
];

const CATEGORY_SELECT_OPTIONS = [
  {
    label: 'Any category',
    value: '',
  },
  {
    label: 'Regular',
    value: 'Regular',
  },
  {
    label: 'Stretch',
    value: 'Stretch',
  },
];

export const Filters: React.FC<FiltersProps> = () => {
  const [filterMuscle, setFilterMuscle] = useState<string>('');
  const [filterEquipment, setFilterEquipment] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');

  return (
    <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
      <View style={{ flex: 17 }}>
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
          onValueChange={setFilterMuscle}>
          {MUSCLE_SELECT_OPTIONS.map((option) => (
            <Select.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Select>
      </View>
      <View style={{ flex: 22, marginLeft: 12 }}>
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
          onValueChange={setFilterEquipment}>
          {EQUIPMENT_SELECT_OPTIONS.map((option) => (
            <Select.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Select>
      </View>
      <View style={{ flex: 18, marginLeft: 12 }}>
        <Text style={{ color: colors.text2, fontSize: 13 }}>Category</Text>
        <Select
          selectedValue={filterCategory}
          color={colors.text}
          fontSize={13}
          variant="underlined"
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          dropdownIcon={<ChevronDownIcon size={4} />}
          onValueChange={setFilterCategory}>
          {CATEGORY_SELECT_OPTIONS.map((option) => (
            <Select.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Select>
      </View>
    </View>
  );
};
