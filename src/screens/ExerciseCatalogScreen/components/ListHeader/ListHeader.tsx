import { Text, View } from 'react-native';
import { AddCustomExerciseButton } from '../AddCustomExerciseButton/AddCustomExerciseButton';
import { PreviousExerciseSelector } from '../PrevioutExerciseSelector/PreviousExerciseSelector';
import { colors } from '../../../../styles/colors';
import { Filters } from '../Filters/Filters';
import React from 'react';

type ListHeaderProps = {
  filterMuscle: string;
  onFilterMuscleChange: (value: string) => void;
  filterEquipment: string;
  onFilterEquipmentChange: (value: string) => void;
};

export const ListHeader = ({
  filterMuscle,
  onFilterMuscleChange,
  filterEquipment,
  onFilterEquipmentChange,
}: ListHeaderProps) => {
  return (
    <View style={{ paddingVertical: 12 }}>
      <AddCustomExerciseButton style={{ marginBottom: 18 }} />
      <PreviousExerciseSelector />
      <Text style={{ color: colors.text2, fontSize: 18, marginVertical: 16 }}>
        Full exercises catalog
      </Text>
      <Filters
        filterMuscle={filterMuscle}
        onFilterMuscleChange={onFilterMuscleChange}
        filterEquipment={filterEquipment}
        onFilterEquipmentChange={onFilterEquipmentChange}
      />
    </View>
  );
};
