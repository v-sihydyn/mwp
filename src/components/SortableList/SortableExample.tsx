import { Dimensions, Platform, View } from 'react-native';
import React, { useCallback } from 'react';
import { RoutineListItem } from '../../screens/RoutinesManagementScreen/components/RoutineListItem/RoutineListItem';
import SortableList from './SortableList';
import { AddRoutineButton } from '../../screens/RoutinesManagementScreen/components/AddRoutineButton/AddRoutineButton';

const window = Dimensions.get('window');

export const SortableExample = ({ data }: { data: any[] }) => {
  const renderRow = useCallback(({ data: _data }) => {
    return <RoutineListItem name={_data.name} />;
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
      data={data}
      renderRow={renderRow}
      renderFooter={() => (
        <View style={{ padding: 12 }}>
          <AddRoutineButton />
        </View>
      )}
    />
  );
};
