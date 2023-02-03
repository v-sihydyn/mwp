import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import React, { useEffect } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ExerciseForm } from '../../components/ExerciseForm/ExerciseForm';

export const EditRoutineExerciseScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 16, flexDirection: 'row' }}>
          <CustomButton
            onPress={() => console.log('Delete')}
            icon={<Icon name="trash" color={colors.red} size={16} />}
            style={{
              backgroundColor: colors.black,
              marginRight: 12,
            }}>
            <Text style={{ fontWeight: 'bold' }}>Delete</Text>
          </CustomButton>

          <CustomButton
            onPress={() => console.log('Done')}
            icon={<Icon name="check" color={colors.text} size={16} />}>
            <Text style={{ fontWeight: 'bold' }}>Done</Text>
          </CustomButton>
        </View>
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
