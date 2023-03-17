import { Text, View } from 'react-native';
import { AddCustomExerciseButton } from '../AddCustomExerciseButton/AddCustomExerciseButton';
import { PreviousExerciseSelector } from '../PrevioutExerciseSelector/PreviousExerciseSelector';
import { colors } from '../../../../styles/colors';
import { Filters } from '../Filters/Filters';
import React from 'react';

export const ListHeader = () => {
  return (
    <View style={{ paddingVertical: 12 }}>
      <AddCustomExerciseButton style={{ marginBottom: 18 }} />
      <PreviousExerciseSelector />
      <Text style={{ color: colors.text2, fontSize: 18, marginVertical: 16 }}>
        Full exercises catalog
      </Text>
      <Filters />
    </View>
  );
};
