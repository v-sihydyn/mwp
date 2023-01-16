import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styles/colors';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AddRoutineButton } from './components/AddRoutineButton/AddRoutineButton';
import { openRenameRoutineModal } from '../../components/modals/RenameRoutineModal/RenameRoutineModal';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { RoutineListItem } from './components/RoutineListItem/RoutineListItem';
import { openDuplicateRoutineModal } from '../../components/modals/DuplicateRoutineModal/DuplicateRoutineModal';
import { openDeleteRoutineModal } from '../../components/modals/DeleteRoutineModal/DeleteRoutineModal';
import { SortableListItem } from '../../components/SortableList/SortableListItem';

type Routine = {
  id: number;
  name: string;
};

const ROUTINES: Routine[] = [
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
    id: 4,
  },
  {
    name: 'Pull B',
    id: 5,
  },
  {
    name: 'Delts',
    id: 6,
  },
  {
    name: 'Arms',
    id: 7,
  },
  {
    name: 'Legs',
    id: 8,
  },
  {
    name: 'Pull A',
    id: 9,
  },
  {
    name: 'Push A',
    id: 10,
  },
  {
    name: 'Push B',
    id: 11,
  },
  {
    name: 'Pull B',
    id: 12,
  },
  {
    name: 'Delts',
    id: 13,
  },
  {
    name: 'Arms',
    id: 14,
  },
];

export const RoutinesManagementScreen = gestureHandlerRootHOC(() => {
  const [routines, setRoutines] = useState<Routine[]>(ROUTINES);

  const handleOpenRenameRoutineModal = async () => {
    try {
      const resp = await openRenameRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const handleOpenDuplicateRoutineModal = async () => {
    try {
      const resp = await openDuplicateRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };
  const handleOpenDeleteRoutineModal = async () => {
    try {
      const resp = await openDeleteRoutineModal();

      console.log('promise modal resolve: ', resp);
    } catch (e) {
      console.log('promise modal reject: ', e);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Routine>) => {
    return (
      <SortableListItem isActive={isActive} onDrag={drag}>
        <RoutineListItem
          name={item.name}
          onInitiateRename={handleOpenRenameRoutineModal}
          onInitiateDuplicate={handleOpenDuplicateRoutineModal}
          onInitiateDelete={handleOpenDeleteRoutineModal}
        />
      </SortableListItem>
    );
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={routines}
        onDragEnd={({ data: _data }) => setRoutines(_data)}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshing={false}
        ListFooterComponent={() => (
          <View style={{ padding: 12 }}>
            <AddRoutineButton />
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
});
