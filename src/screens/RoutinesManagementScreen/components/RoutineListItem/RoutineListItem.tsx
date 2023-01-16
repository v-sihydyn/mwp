import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';
import { Menu } from 'native-base';
import { Icon } from '../../../../components/Icon/Icon';

type RoutineListItemProps = {
  name: string;
  onInitiateRename: () => Promise<void>;
  onInitiateDuplicate: () => Promise<void>;
  onInitiateDelete: () => Promise<void>;
};

export const RoutineListItem: React.FC<RoutineListItemProps> = ({
  name,
  onInitiateRename,
  onInitiateDuplicate,
  onInitiateDelete,
}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{name}</Text>
      <Menu
        padding={3}
        backgroundColor={colors.page}
        placement="bottom right"
        trigger={(triggerProps) => (
          <Pressable {...triggerProps} hitSlop={20}>
            <Icon name="ellipsis-v" color="#ffffff" />
          </Pressable>
        )}>
        <Menu.Item
          onPress={onInitiateRename}
          _pressed={{ backgroundColor: colors.surface2 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Icon
              name="pencil-alt"
              color={colors.text}
              size={16}
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: colors.text, fontSize: 16 }}>Rename</Text>
          </View>
        </Menu.Item>
        <Menu.Item
          onPress={onInitiateDuplicate}
          _pressed={{ backgroundColor: colors.surface2 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Icon
              name="copy"
              color={colors.text}
              size={16}
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: colors.text, fontSize: 16 }}>Duplicate</Text>
          </View>
        </Menu.Item>
        <Menu.Item
          onPress={onInitiateDelete}
          _pressed={{ backgroundColor: colors.surface2 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Icon
              name="trash"
              color={colors.red}
              size={16}
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: colors.red, fontSize: 16 }}>Delete</Text>
          </View>
        </Menu.Item>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 12,
    backgroundColor: colors.surface2,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
