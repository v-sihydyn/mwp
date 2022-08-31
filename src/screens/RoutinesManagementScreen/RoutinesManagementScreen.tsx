import React, { useCallback } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { RoutineListItem } from './components/RoutineListItem/RoutineListItem';
import SortableList from '../../components/SortableList/SortableList';
import { AddRoutineButton } from './components/AddRoutineButton/AddRoutineButton';

const ROUTINES = [
  {
    name: 'Legs',
  },
  {
    name: 'Pull A',
  },
  {
    name: 'Push A',
  },
  {
    name: 'Push B',
  },
  {
    name: 'Pull B',
  },
  {
    name: 'Delts',
  },
  {
    name: 'Arms',
  },
  {
    name: 'Legs',
  },
  {
    name: 'Pull A',
  },
  {
    name: 'Push A',
  },
  {
    name: 'Push B',
  },
  {
    name: 'Pull B',
  },
  {
    name: 'Delts',
  },
  {
    name: 'Arms',
  },
];

const window = Dimensions.get('window');

const SortableExample = () => {
  const renderRow = useCallback(({ data }) => {
    return <RoutineListItem name={data.name} />;
  }, []);

  return (
    <SortableList
      style={{ flex: 1 }}
      contentContainerStyle={{
        width: window.width,
        ...Platform.select({
          ios: {
            paddingHorizontal: 30,
          },
          android: {
            paddingHorizontal: 0,
          },
        }),
      }}
      data={ROUTINES}
      renderRow={renderRow}
      renderFooter={() => (
        <View style={{ padding: 12 }}>
          <AddRoutineButton />
        </View>
      )}
    />
  );
};

interface RoutinesManagementScreenProps {}

export const RoutinesManagementScreen: React.FC<RoutinesManagementScreenProps> = gestureHandlerRootHOC(() => {
  return (
    <View style={styles.container}>
      <SortableExample />
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
