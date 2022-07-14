import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import Modal from 'react-native-modal'

import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { WorkoutPlanSheet } from './components/WorkoutPlanSheet/WorkoutPlanSheet';
import Portal from '../../components/Portal/Portal';
import { WorkoutActionsSheet } from './components/WorkoutActionsSheet/WorkoutActionsSheet';
import { WorkoutRoutinesList } from './components/WorkoutRoutinesList/WorkoutRoutinesList';
import { RoutineToolbar } from './components/RoutineToolbar/RoutineToolbar';
import { colors } from '../../styles/colors';
import { ActionsContext } from './contexts/ActionsContext';

const tabs = [
  {
    title: '1',
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

export const MyWorkoutScreen = () => {
  const [isWorkoutPlanSheetVisible, setWorkoutPlanSheetVisible] = useState(false);
  const [isWorkoutActionsSheetVisible, setWorkoutActionsSheetVisible] = useState(false);
  const [isRenameWorkoutPlanModalVisible, setRenameWorkoutPlanModalVisible] = useState(false);

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
      <StickyParallaxHeader
        foreground={header}
        parallaxHeight={80}
        headerHeight={0}
        tabs={tabs}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabsContainerBackgroundColor={colors.page}
      />
      <RoutineToolbar />
      <Portal>
        <ActionsContext.Provider
          value={{
            onOpenWorkoutPlanSheet,
            onCloseWorkoutPlanSheet,

            onOpenWorkoutActionsSheet,
            onCloseWorkoutActionsSheet,

            onOpenRenameWorkoutPlanModal,
            onCloseRenameWorkoutPlanModal,
          }}>
          <WorkoutPlanSheet isVisible={isWorkoutPlanSheetVisible} onClose={onCloseWorkoutPlanSheet} />
          <WorkoutActionsSheet isVisible={isWorkoutActionsSheetVisible} onClose={onCloseWorkoutActionsSheet} />
          <Modal
            isVisible={isRenameWorkoutPlanModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
          >
            <View style={styles.modal}>
              <View style={styles.modalTitleWrapper}>
                <Text style={styles.modalTitle}>Rename Workout Plan</Text>
              </View>
              <TextInput value="My Workout Plan" autoFocus={true} selectTextOnFocus={true} style={styles.modalInput} />
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalButton, { marginRight: 40 }]} onPress={onCloseRenameWorkoutPlanModal}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onCloseRenameWorkoutPlanModal}>
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
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7,
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
  modalTitleWrapper: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'left'
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
