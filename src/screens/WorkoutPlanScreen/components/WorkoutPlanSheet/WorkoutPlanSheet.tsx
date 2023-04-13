import React from 'react';
import {
  BottomSheet,
  Props as BottomSheetProps,
} from '../../../../components/BottomSheet';
import { WorkoutPlan } from '../../../../API';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../../styles/colors';
import { WorkoutPlanListItem } from './WorkoutPlanListItem/WorkoutPlanListItem';
import { AddWorkoutPlanButton } from '../AddWorkoutPlanButton/AddWorkoutPlanButton';

type Props = Omit<BottomSheetProps, 'children'> & {
  selectedPlanId: string | null;
  workoutPlans: WorkoutPlan[];
  onCreatePlan: () => Promise<void>;
  onSelectPlan: (plan: WorkoutPlan) => void;
};

export const WorkoutPlanSheet = ({
  selectedPlanId,
  workoutPlans,
  onCreatePlan,
  isVisible,
  onClose,
  onSelectPlan,
}: Props) => {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.root}>
        {workoutPlans.map((plan, index) => (
          <WorkoutPlanListItem
            key={plan.id}
            name={plan.name}
            isSelected={plan.id === selectedPlanId}
            onPress={() => {
              onSelectPlan(plan);
              onClose();
            }}
            style={index !== workoutPlans.length - 1 && styles.notLastItem}
          />
        ))}
        <AddWorkoutPlanButton onCreatePlan={onCreatePlan} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  notLastItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#535353',
  },
});
