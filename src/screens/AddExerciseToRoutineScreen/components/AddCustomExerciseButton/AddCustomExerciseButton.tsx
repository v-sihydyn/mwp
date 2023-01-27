import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../../../../components/Icon/Icon';

type AddCustomExerciseButtonProps = {
  style?: StyleProp<ViewStyle>;
};

export const AddCustomExerciseButton: React.FC<
  AddCustomExerciseButtonProps
> = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('AddCustomExerciseToRoutine')}>
      <View style={[styles.root, style]}>
        <View style={styles.iconWrapper}>
          <Icon size={10} name="plus" />
        </View>
        <Text style={styles.text}>Add Custom</Text>
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
  text: {
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
