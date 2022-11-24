import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';

const COLORS = [
  '#000000',
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
];

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center' }}>
      {COLORS.map((color, index) => {
        const isSelected = color === value;

        return (
          <Pressable key={index} onPress={() => onChange(color)}>
            <View
              style={[
                styles.colorItem,
                { backgroundColor: color },
                isSelected && styles.selectedColorItem,
                isSelected &&
                  color === '#000000' && { borderColor: colors.text },
              ]}
            />
            {isSelected && (
              <Icon
                name="check"
                color={colors.text}
                size={16}
                style={styles.selectedIndicator}
              />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  colorItem: {
    width: 36,
    height: 36,
    borderRadius: 36,
    margin: 4,
  },
  selectedColorItem: {
    width: 42,
    height: 42,
    borderRadius: 42,
    borderWidth: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 17,
    left: 17,
  },
});
