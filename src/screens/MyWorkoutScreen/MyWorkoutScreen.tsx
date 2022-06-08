import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

import { WorkoutPlanSelector } from './components/WorkoutPlanSelector/WorkoutPlanSelector';
import { WorkoutPlanActionsButton } from './components/WorkoutPlanActionsButton/WorkoutPlanActionsButton';
import { WorkoutPlanModal } from './components/WorkoutPlanModal/WorkoutPlanModal';
import Portal from '../../components/Portal/Portal';
import { WorkoutActionsModal } from './components/WorkoutActionsModal/WorkoutActionsModal';
import { WorkoutRoutinesList } from './components/WorkoutRoutinesList/WorkoutRoutinesList';
import { RoutineToolbar } from './components/RoutineToolbar/RoutineToolbar';
import { colors } from '../../styles/colors';

const tabs = [
  {
    title: '1',
    content: (
      <WorkoutRoutinesList />
    ),
  },
  {
    title: 'Product Design',
    content: <WorkoutRoutinesList />
  },
  {
    title: 'Development',
    content: <WorkoutRoutinesList />
  },
  {
    title: 'Project Management',
    content: <WorkoutRoutinesList />
  },
];

export const MyWorkoutScreen = () => {
  const [isWorkoutPlanModalVisible, setWorkoutPlanModalVisible] = useState(false);
  const [isWorkoutActionsModalVisible, setWorkoutActionsModalVisible] = useState(false);

  const header = useMemo(() => {
    return (
      <View
        style={[styles.header]}
        onLayout={(e) => console.log('header height: ', e.nativeEvent.layout.height)}>
        <WorkoutPlanSelector onPress={() => setWorkoutPlanModalVisible(true)} />
        <WorkoutPlanActionsButton onPress={() => setWorkoutActionsModalVisible(true)} />
      </View>
    )
  }, [])

  return (
    <View style={styles.container}>
      <StickyParallaxHeader
        foreground={header}
        parallaxHeight={80}
        headerHeight={0}
        tabs={tabs}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabsContainerBackgroundColor={colors.page}
      >
      </StickyParallaxHeader>
      <RoutineToolbar />

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



  content: {
    // height: 1000,
    // marginTop: 50
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    // backgroundColor: 'lightgreen'
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white'
  },
});
