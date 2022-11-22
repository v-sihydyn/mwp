import React from 'react';
import { Pressable, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type AddCustomExerciseButtonProps = {
  style?: StyleProp<ViewStyle>;
};

export const AddCustomExerciseButton: React.FC<AddCustomExerciseButtonProps> = ({ style }) => {
  return (
    <Pressable onPress={() => alert('add routine')}>
      <View style={[styles.root, style]}>
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
    borderRadius: 20,
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#515151',
    height: 56,
    width: '100%',
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
