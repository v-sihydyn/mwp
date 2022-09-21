import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { colors } from '../../../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Menu } from 'native-base';

type IconProps = React.ComponentProps<typeof FontAwesome5>;

const Icon = ({
  size = 18,
  ...props
}: {
  name: IconProps['name'];
  style?: IconProps['style'];
  color: string;
  size?: IconProps['size'];
}) => <FontAwesome5 size={size} style={{ marginBottom: -3 }} {...props} />;

type RoutineListItemProps = {
  name: string;

  isActive: boolean;
  onDrag: (...args: any[]) => any;
  onInitiateRename: () => Promise<void>;
  onInitiateDuplicate: () => Promise<void>;
  onInitiateDelete: () => Promise<void>;

  panHandlers?: any; // for sortable list
};

export const RoutineListItem: React.FC<RoutineListItemProps> = ({
  name,
  onDrag,
  isActive,
  onInitiateRename,
  onInitiateDuplicate,
  onInitiateDelete,
}) => {
  return (
    <View style={[styles.root, { opacity: isActive ? 0.5 : 1 }]}>
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
          <Menu.Item onPress={onInitiateRename} _pressed={{ backgroundColor: colors.surface2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Icon name="pencil-alt" color={colors.text} size={16} style={{ marginRight: 8 }} />
              <Text style={{ color: colors.text, fontSize: 16 }}>Rename</Text>
            </View>
          </Menu.Item>
          <Menu.Item onPress={onInitiateDuplicate} _pressed={{ backgroundColor: colors.surface2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Icon name="copy" color={colors.text} size={16} style={{ marginRight: 8 }} />
              <Text style={{ color: colors.text, fontSize: 16 }}>Duplicate</Text>
            </View>
          </Menu.Item>
          <Menu.Item onPress={onInitiateDelete} _pressed={{ backgroundColor: colors.surface2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Icon name="trash" color={colors.red} size={16} style={{ marginRight: 8 }} />
              <Text style={{ color: colors.red, fontSize: 16 }}>Delete</Text>
            </View>
          </Menu.Item>
        </Menu>
      </View>

      <TouchableOpacity hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }} activeOpacity={1} disabled={isActive} onPressIn={onDrag} delayLongPress={0}>
        <Icon name="bars" color="#ffffff" />
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
  },
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

  menuItem: {},
});
