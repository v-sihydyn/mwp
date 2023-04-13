import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { colors } from '../../../../styles/colors';
import React from 'react';
import { Icon } from '../../../../components/Icon';
import { openCreatePlanModal } from '../../../../components/modals/CreatePlanModal/CreatePlanModal';

export const CreateWorkoutPlanSection = () => {
  const { width: windowWidth } = useWindowDimensions();

  const handleCreateWorkoutPlan = async () => {
    await openCreatePlanModal().catch(() => {});
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: 'center', justifyContent: 'center' },
      ]}>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 30,
        }}>
        Create your first workout plan
      </Text>
      <Pressable onPress={handleCreateWorkoutPlan}>
        <View style={[styles.button, { width: windowWidth - 40 }]}>
          <View style={styles.buttonIconWrapper}>
            <Icon size={10} name="plus" />
          </View>
          <Text style={styles.buttonText}>Create</Text>
        </View>
      </Pressable>
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
  button: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#515151',
    height: 56,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});
