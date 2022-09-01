import DraggableFlatList, { RenderItemParams, OpacityDecorator } from 'react-native-draggable-flatlist';
import React, { useState } from 'react';
import { Item } from './utils';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { RoutineListItem } from '../../screens/RoutinesManagementScreen/components/RoutineListItem/RoutineListItem';
import { AddRoutineButton } from '../../screens/RoutinesManagementScreen/components/AddRoutineButton/AddRoutineButton';

export const DraggableRealExample = ({ data }) => {
  const [items, setItems] = useState(data);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <RoutineListItem name={item.name} isActive={isActive} onDrag={drag} />
    );
  };

  return (
    <DraggableFlatList
      data={items}
      onDragEnd={({ data: _data }) => setItems(_data)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshing={false}
      ListFooterComponent={() => (
        <View style={{ padding: 12,  }}>
          <AddRoutineButton />
        </View>
      )}
    />
  );
};
