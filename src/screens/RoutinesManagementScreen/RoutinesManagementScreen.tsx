import React, { useCallback } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { SortableExample } from '../../components/SortableList/SortableExample';
import { DraggableRealExample } from '../../components/Draggable/DraggableRealExample';
import { AddRoutineButton } from './components/AddRoutineButton/AddRoutineButton';

const ROUTINES = [
  {
    id: 1,
    name: 'Legs',
  },
  {
    id: 2,
    name: 'Pull A',
  },
  {
    id: 3,
    name: 'Push A',
  },
  {
    name: 'Push B',
    id: 4
  },
  {
    name: 'Pull B',
    id: 5,
  },
  {
    name: 'Delts',
    id: 6
  },
  {
    name: 'Arms',
    id: 7
  },
  {
    name: 'Legs',
    id: 8
  },
  {
    name: 'Pull A',
    id: 9
  },
  {
    name: 'Push A',
    id: 10
  },
  {
    name: 'Push B',
    id: 11
  },
  {
    name: 'Pull B',
    id: 12
  },
  {
    name: 'Delts',
    id: 13
  },
  {
    name: 'Arms',
    id: 14
  },
];



interface RoutinesManagementScreenProps {}

export const RoutinesManagementScreen: React.FC<RoutinesManagementScreenProps> = gestureHandlerRootHOC(() => {
  return (
    <View style={styles.container}>
      <DraggableRealExample data={ROUTINES} />
      {/*<SortableExample data={ROUTINES} />*/}

      {/*<AddRoutineButton />*/}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    position: 'relative',
  },
});
