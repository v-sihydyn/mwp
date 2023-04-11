import { View, Text } from 'react-native';
import { CustomButton } from '../../../../components/CustomButton/CustomButton';
import { Icon } from '../../../../components/Icon/Icon';
import { colors } from '../../../../styles/colors';
import { Tabs } from 'react-native-collapsible-tab-view';
import React from 'react';

type EmptyWorkoutPlanTabProps = {
  onCreateRoutine: () => void;
};

export const EmptyWorkoutPlanTab = ({
  onCreateRoutine,
}: EmptyWorkoutPlanTabProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CustomButton
        icon={<Icon name="plus-circle" size={14} color={colors.text} />}
        onPress={onCreateRoutine}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 16,
        }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Add your first routine
        </Text>
      </CustomButton>
    </View>
  );
};
