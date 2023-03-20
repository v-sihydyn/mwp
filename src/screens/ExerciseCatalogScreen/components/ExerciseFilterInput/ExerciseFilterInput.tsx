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
            <SmallCloseIcon
              size={5}
              mr="2"
              style={{
                borderRadius: 20,
                color: colors.surface2,
                backgroundColor: colors.text2,
              }}
              onPress={() => handleChange('')}
            />
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
