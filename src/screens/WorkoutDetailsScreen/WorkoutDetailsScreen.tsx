import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { WorkoutSummary } from '../WorkoutScreen/components/WorkoutSummary/WorkoutSummary';
import React, { useEffect } from 'react';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { Icon } from '../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { openDeleteWorkoutModal } from '../../components/modals/DeleteWorkoutModal/DeleteWorkoutModal';

export const WorkoutDetailsScreen = () => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await openDeleteWorkoutModal();
      // onDelete(); @TODO delete workout
      navigation.goBack();
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          onPress={handleDelete}
          style={{ marginRight: 16, backgroundColor: colors.black }}
          icon={<Icon name="trash" color={colors.red} size={16} />}>
          <Text style={{ fontWeight: 'bold' }}>Delete</Text>
        </CustomButton>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <WorkoutSummary title="Workout Routine 1" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
});
