import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon';
import { colors } from '../../styles/colors';

type SortableListItemProps = {
  isActive: boolean;
  onDrag: (...args: any[]) => any;
  leftSlot?: React.ReactElement;
  children: React.ReactNode;
};

export const SortableListItem = ({
  isActive,
  onDrag,
  leftSlot,
  children,
}: SortableListItemProps) => {
  return (
    <View style={[styles.root, { opacity: isActive ? 0.5 : 1 }]}>
      {leftSlot}

      <View style={{ flex: 1, marginRight: 16 }}>{children}</View>

      <TouchableOpacity
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        activeOpacity={1}
        disabled={isActive}
        onPressIn={onDrag}
        delayLongPress={0}>
        <Icon name="bars" size={16} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 12,

    marginVertical: 2,
  },
});
