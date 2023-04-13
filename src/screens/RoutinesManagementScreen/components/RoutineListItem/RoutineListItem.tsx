import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';
import { Menu } from 'native-base';
import { Icon } from '../../../../components/Icon';

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
  const commonItemProps = {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 1,
    paddingRight: 1,
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{name}</Text>
      <Menu
        padding={0}
        backgroundColor={colors.page}
        borderRadius={12}
        placement="bottom right"
        trigger={(triggerProps) => (
          <Pressable {...triggerProps} hitSlop={20}>
            <Icon name="ellipsis-v" color="#ffffff" />
          </Pressable>
        )}>
        <Menu.Item
          {...commonItemProps}
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
              style={{ marginRight: 12 }}
            />
            <Text style={{ color: colors.text, fontSize: 15 }}>Rename</Text>
          </View>
        </Menu.Item>
        <Menu.Item
          {...commonItemProps}
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
              style={{ marginRight: 12 }}
            />
            <Text style={{ color: colors.text, fontSize: 15 }}>Duplicate</Text>
          </View>
        </Menu.Item>
        <Menu.Item
          {...commonItemProps}
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
              style={{ marginRight: 12 }}
            />
            <Text style={{ color: colors.red, fontSize: 15 }}>Delete</Text>
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
