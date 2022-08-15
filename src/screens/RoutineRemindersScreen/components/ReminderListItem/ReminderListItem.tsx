import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '../../../../styles/colors';

type RemindersListProps = {
  routineName: string;
  time: string | null;
  repeatWeekdays: string[];
};

export const ReminderListItem: React.FC<RemindersListProps> = ({ routineName, time, repeatWeekdays }) => {
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.title}>{routineName}</Text>
        {time && <Text style={styles.time}>{time}</Text>}
        {repeatWeekdays.length > 0 && (
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            {repeatWeekdays.map((weekday) => (
              <Text style={styles.weekday}>{weekday}</Text>
            ))}
          </View>
        )}
      </View>

      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(f) => f}
        value={false}
        style={{ height: 20 }}
      />
    </View>
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
