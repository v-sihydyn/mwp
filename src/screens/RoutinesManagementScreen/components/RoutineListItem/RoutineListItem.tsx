import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';
import { FontAwesome5 } from '@expo/vector-icons';

const Icon = (props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string }) => (
  <FontAwesome5 size={18} style={{ marginBottom: -3 }} {...props} />
);

type RoutineListItemProps = {
  name: string;
};

export const RoutineListItem: React.FC<RoutineListItemProps> = ({ name, panHandlers }) => {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Pressable hitSlop={20} onPress={() => alert(1)}>
          <Icon name="ellipsis-v" color="#ffffff" />
        </Pressable>
      </View>
      <View {...panHandlers}>
        <Icon name="bars" color="#ffffff" />
      </View>
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
    backgroundColor: colors.surface,
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
