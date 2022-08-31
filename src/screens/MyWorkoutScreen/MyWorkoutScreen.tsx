import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import Modal from 'react-native-modal';

import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { WorkoutPlanSheet } from './components/WorkoutPlanSheet/WorkoutPlanSheet';
import Portal from '../../components/Portal/Portal';
import { WorkoutRoutinesList } from './components/WorkoutRoutinesList/WorkoutRoutinesList';
import { RoutineToolbar } from './components/RoutineToolbar/RoutineToolbar';
import { colors } from '../../styles/colors';
import { ActionsContext } from './contexts/ActionsContext';
import { WorkoutPlanActions } from './components/WorkoutPlanActions/WorkoutPlanActions';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { RootTabScreenProps } from '../../../types';

const tabs = [
  {
    title: '12',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Product Design',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Development',
    content: <WorkoutRoutinesList />,
  },
  {
    title: 'Project Management',
    content: <WorkoutRoutinesList />,
  },
];

type Props = RootTabScreenProps<'MyWorkout'>;

export const MyWorkoutScreen = ({ navigation }: Props) => {
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] = useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] = useState(false);
  const [isRenameWorkoutPlanModalVisible, setRenameWorkoutPlanModalVisible] = useState(false);
  const [isDeleteWorkoutPlanModalVisible, setDeleteWorkoutPlanModalVisible] = useState(false);
  const [isRenamePlanRoutineModalVisible, setRenamePlanRoutineModalVisible] = useState(false);
  const [isDeletePlanRoutineModalVisible, setDeletePlanRoutineModalVisible] = useState(false);

  const onOpenWorkoutPlanSheet = () => {
    setWorkoutPlanSheetVisible(true);
  };

  const onCloseWorkoutPlanSheet = () => {
    setWorkoutPlanSheetVisible(false);
  };

  const onOpenWorkoutActionsSheet = () => {
    setWorkoutActionsSheetVisible(true);
  };

  const onCloseWorkoutActionsSheet = () => {
    setWorkoutActionsSheetVisible(false);
  };

  const onOpenRenameWorkoutPlanModal = () => {
    setRenameWorkoutPlanModalVisible(true);
  };

  const onCloseRenameWorkoutPlanModal = () => {
    setRenameWorkoutPlanModalVisible(false);
  };

  const onOpenDeleteWorkoutPlanModal = () => {
    setDeleteWorkoutPlanModalVisible(true);
  };

  const onCloseDeleteWorkoutPlanModal = () => {
    setDeleteWorkoutPlanModalVisible(false);
  };

  const onOpenRenamePlanRoutineModal = () => {
    setRenamePlanRoutineModalVisible(true);
  };

  const onCloseRenamePlanRoutineModal = () => {
    setRenamePlanRoutineModalVisible(false);
  };

  const onOpenDeletePlanRoutineModal = () => {
    setDeletePlanRoutineModalVisible(true);
  };

  const onCloseDeletePlanRoutineModal = () => {
    setDeletePlanRoutineModalVisible(false);
  };

  const handleGoToRoutinesList = () => {
    navigation.navigate('RoutinesManagement');
  };

  const handleGoToReminders = () => {
    navigation.navigate('RoutineReminders');
  };

  const header = useMemo(() => {
    return (
      <View style={[styles.header]}>
        <WorkoutPlanSelector onPress={onOpenWorkoutPlanSheet} />
        <WorkoutPlanActionsButton onPress={onOpenWorkoutActionsSheet} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <StickyParallaxHeader
        foreground={header}
        parallaxHeight={80}
        headerHeight={0}
        tabs={tabs}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabsContainerBackgroundColor={colors.page}
      />
      <RoutineToolbar onRenameRoutine={onOpenRenamePlanRoutineModal} onDeleteRoutine={onOpenDeletePlanRoutineModal} />
      <Portal>
        <ActionsContext.Provider
          value={{
            onOpenWorkoutPlanSheet,
            onCloseWorkoutPlanSheet,

            onOpenWorkoutActionsSheet,
            onCloseWorkoutActionsSheet,

            onOpenRenameWorkoutPlanModal,
            onCloseRenameWorkoutPlanModal,

            onOpenDeleteWorkoutPlanModal,
            onCloseDeleteWorkoutPlanModal,

            onOpenRenamePlanRoutineModal,
            onCloseRenamePlanRoutineModal,

            onOpenDeletePlanRoutineModal,
            onCloseDeletePlanRoutineModal,
          }}>
          <WorkoutPlanSheet isVisible={isWorkoutPlanSheetVisible} onClose={onCloseWorkoutPlanSheet} />

          <BottomSheet isVisible={isWorkoutActionsSheetVisible} onClose={onCloseWorkoutActionsSheet}>
            <WorkoutPlanActions
              onSheetClose={onCloseWorkoutActionsSheet}
              onGoToRoutinesList={handleGoToRoutinesList}
              onGoToReminders={handleGoToReminders}
            />
          </BottomSheet>
          {/*@TODO: take out each modal to separate components*/}
          {/*rename plan*/}
          <Modal
            isVisible={isRenameWorkoutPlanModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Rename Workout Plan</Text>
              <TextInput value="My Workout Plan" selectTextOnFocus={true} style={styles.modalInput} />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { marginRight: 40 }]}
                  onPress={onCloseRenameWorkoutPlanModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onCloseRenameWorkoutPlanModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/*delete plan*/}
          <Modal
            isVisible={isDeleteWorkoutPlanModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Delete Workout Plan</Text>
              <Text style={styles.modalSubtitle}>Are you sure you want to delete "My Workout Plan"?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { marginRight: 40 }]}
                  onPress={onCloseDeleteWorkoutPlanModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onCloseDeleteWorkoutPlanModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/*rename routine*/}
          <Modal
            isVisible={isRenamePlanRoutineModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Rename Routine</Text>
              <TextInput value="Chest routine" selectTextOnFocus={true} style={styles.modalInput} />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { marginRight: 40 }]}
                  onPress={onCloseRenamePlanRoutineModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onCloseRenamePlanRoutineModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/*delete routine*/}
          <Modal
            isVisible={isDeletePlanRoutineModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Delete Routine</Text>
              <Text style={styles.modalSubtitle}>Are you sure you want to delete "Chest routine"?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { marginRight: 40 }]}
                  onPress={onCloseDeletePlanRoutineModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onCloseDeletePlanRoutineModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ActionsContext.Provider>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    paddingTop: 40,
    flexDirection: 'column',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },

  //
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },

  // modal styles
  modal: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: colors.surface2,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,

    width: '100%',
    marginBottom: 12,
  },
  modalSubtitle: {
    color: colors.text,
    fontSize: 16,
    width: '100%',
  },
  modalInput: {
    width: '100%',
    color: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
    marginBottom: 30,
    fontSize: 16,
  },
  modalActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {},
  modalButtonText: {
    color: 'green',
    fontSize: 16,
  },
});
