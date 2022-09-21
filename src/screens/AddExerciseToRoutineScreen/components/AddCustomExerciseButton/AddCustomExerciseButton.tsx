import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';

interface AddCustomExerciseButtonProps {}

export const AddCustomExerciseButton: React.FC<AddCustomExerciseButtonProps> = () => {
  return (
    <Pressable onPress={() => alert('add routine')}>
      <View style={styles.root}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 size={10} name="plus" />
        </View>
        <Text style={styles.title}>Add Custom</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#515151',
    height: 40,
    width: '100%'
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  iconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});
