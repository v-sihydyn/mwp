import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import { ReminderListItem } from './components/ReminderListItem/ReminderListItem';

interface RoutineRemindersScreenProps {}

type Reminder = {
  routineName: string;
  time: string | null;
  repeatWeekdays: string[];
};

const reminders: Reminder[] = [
  {
    routineName: '1',
    time: '04:03',
    repeatWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    routineName: '2',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: '3',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'Pull A',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'Pull B',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'Push A',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'Push B',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'Legs',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'g',
    time: null,
    repeatWeekdays: [],
  },
  {
    routineName: 'hfg',
    time: null,
    repeatWeekdays: [],
  },
];

export const RoutineRemindersScreen: React.FC<RoutineRemindersScreenProps> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={({ item, index }) => (
          <ReminderListItem key={index} routineName={item.routineName} time={item.time} repeatWeekdays={item.repeatWeekdays} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    // padding: 20,
    paddingTop: 20,
    flexDirection: 'column',
    position: 'relative',
  },
});
