import { StyleSheet, View } from 'react-native';
import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { useState } from 'react';
import { WorkoutPlanModal } from './components/WorkoutPlanModal/WorkoutPlanModal';
import Portal from '../../components/Portal/Portal';
import { WorkoutActionsModal } from './components/WorkoutActionsModal/WorkoutActionsModal';

export const MyWorkoutScreen = () => {
  const [isWorkoutPlanModalVisible, setWorkoutPlanModalVisible] = useState(false);
  const [isWorkoutActionsModalVisible, setWorkoutActionsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WorkoutPlanSelector onPress={() => setWorkoutPlanModalVisible(true)} />
        <WorkoutPlanActionsButton onPress={() => setWorkoutActionsModalVisible(true)} />
      </View>

      <Portal>
        <WorkoutPlanModal isVisible={isWorkoutPlanModalVisible} onClose={() => setWorkoutPlanModalVisible(false)} />
        <WorkoutActionsModal
          isVisible={isWorkoutActionsModalVisible}
          onClose={() => setWorkoutActionsModalVisible(false)}
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2e',
    flex: 1,
    padding: 20,
    paddingTop: 40,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
