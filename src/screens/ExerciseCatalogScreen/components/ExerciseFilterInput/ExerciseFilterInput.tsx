import React, { useState } from 'react';
import { Input, SearchIcon, SmallCloseIcon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../../styles/colors';

type ExerciseFilterInputProps = {
  onChange: (value: string) => void;
};

export const ExerciseFilterInput = ({ onChange }: ExerciseFilterInputProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (text: string) => {
    setSearchQuery(text);
    onChange(text);
  };

  return (
    <View style={styles.root}>
      <Input
        value={searchQuery}
        onChangeText={handleChange}
        fontSize={16}
        color={colors.text}
        placeholderTextColor={colors.text2}
        backgroundColor={colors.surface2}
        borderRadius={12}
        variant="borderless"
        placeholder="Exercise name or muscle"
        InputLeftElement={<SearchIcon size={5} ml="2" />}
        InputRightElement={
          searchQuery.length > 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#8D8D93',
                marginRight: 8,
              }}>
              <SmallCloseIcon
                size={4}
                style={{
                  color: colors.surface2,
                }}
                onPress={() => handleChange('')}
              />
            </View>
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 280,
    paddingRight: 20,
  },
});
