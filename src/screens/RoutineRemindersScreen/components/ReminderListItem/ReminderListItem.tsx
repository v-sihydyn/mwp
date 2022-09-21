import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';

type OnPressArgs = { time: string | null; repeatWeekdays: string[]; index: number };

type RemindersListProps = {
  item: {
    routineName: string;
    time: string | null;
    repeatWeekdays: string[];
  };
  index: number;
  onPress: (args: OnPressArgs) => void;
  onDeleteHandlers: (index: number) => void;
};

export const ReminderListItem: React.FC<RemindersListProps> = ({ item, index, onPress, onDeleteHandlers }) => {
  const { time, repeatWeekdays, routineName } = item

  const handleRootPress = () => {
    onPress({ time, repeatWeekdays, index });
  };

  const handleRemoveReminder = () => {
    onDeleteHandlers(index);
  };

  return (
    <Pressable onPress={handleRootPress}>
      <View style={styles.root}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>{routineName}</Text>
          {time && <Text style={styles.time}>{time}</Text>}
          {repeatWeekdays.length > 0 && (
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              {repeatWeekdays.map((weekday) => (
                <Text
                  key={weekday}
                  style={styles.weekday}>
                  {weekday}
                </Text>
              ))}
            </View>
          )}
        </View>

        <Switch
          trackColor={{ false: '#767577', true: colors.green }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleRemoveReminder()}
          value={repeatWeekdays.length > 0}
          style={{ height: 20 }}
          disabled={repeatWeekdays.length === 0}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: colors.text,
    fontSize: 16,
    marginTop: 6,
  },
  weekday: {
    marginRight: 14,
    color: colors.text2,
  },
});
