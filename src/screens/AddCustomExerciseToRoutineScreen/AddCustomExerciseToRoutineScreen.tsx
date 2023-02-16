import { StyleSheet, Text } from 'react-native';
import { colors } from '../../styles/colors';
import React, { useEffect } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ExerciseForm } from '../../components/ExerciseForm/ExerciseForm';

export const AddCustomExerciseToRoutineScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={() => console.log('Done')}
          style={{ marginRight: 16 }}
          icon={<Icon name="check" color={colors.text} size={16} />}>
          <Text style={{ fontWeight: 'bold' }}>Done</Text>
        </CustomButton>
      ),
    });
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20}
      bounces={false}>
      <ExerciseForm />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flexDirection: 'column',
    position: 'relative',
  },
});