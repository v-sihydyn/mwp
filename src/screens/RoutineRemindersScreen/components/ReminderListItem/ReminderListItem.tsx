import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableWithoutFeedback, Button } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../../../styles/colors';
import Portal from '../../../../components/Portal/Portal';
import { BottomSheet } from '../../../../components/BottomSheet/BottomSheet';
import Layout from '../../../../constants/Layout';
import dayjs from 'dayjs';

import DatePicker from 'react-native-date-picker'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type RemindersListProps = {
  routineName: string;
  time: string | null;
  repeatWeekdays: string[];
};

export const ReminderListItem: React.FC<RemindersListProps> = ({ routineName, time, repeatWeekdays }) => {
  const [_time, _setTime] = useState<string | null>(time);
  const [_repeatWeekdays, _setRepeatWeekdays] = useState(repeatWeekdays);
  const [draftTime, setDraftTime] = useState<Date>(new Date());
  const [draftRepeatWeekdays, setDraftRepeatWeekdays] = useState<string[]>([])

  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleRootPress = () => {
    let _draftTime = dayjs();

    if (_time) {
      const [hours, minutes] = _time.split(':')
      _draftTime = _draftTime.hour(Number(hours)).minute(Number(minutes));
    }

    setDraftTime(_draftTime.toDate());
    setDraftRepeatWeekdays(_repeatWeekdays);

    setSheetOpen(true)
  };

  const handleRemoveReminder = () => {
    _setTime(null);
    _setRepeatWeekdays([])
  }

  return (
    <TouchableWithoutFeedback onPress={handleRootPress}>
      <View style={styles.root}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>{routineName}</Text>
          {_time && <Text style={styles.time}>{_time}</Text>}
          {_repeatWeekdays.length > 0 && (
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              {_repeatWeekdays.map((weekday) => (
                <Text key={weekday} style={[styles.weekday, _repeatWeekdays.includes(weekday) && { color: colors.green }]}>{weekday}</Text>
              ))}
            </View>
          )}
        </View>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={false ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleRemoveReminder()}
          value={_repeatWeekdays.length > 0}
          style={{ height: 20 }}
          disabled={_repeatWeekdays.length === 0}
        />

        {/*@TODO: move sheet to parent*/}
        <Portal>
          <BottomSheet isVisible={isSheetOpen} onClose={() => setSheetOpen(false)} >
            <View style={{ backgroundColor: colors.surface2, width: '100%', }}>
              <Text style={{ color: colors.text }}>Reminder Time</Text>
              <View style={{ width: '100%' }}>
                <DatePicker
                  date={draftTime}
                  onDateChange={setDraftTime}
                  androidVariant="iosClone"
                  mode="time"
                  textColor={colors.text}
                  fadeToColor="none"
                  style={{ width: Layout.window.width }}
                />
              </View>

              <Text style={{ color: colors.text }}>Repeat Weekdays Time</Text>
              <View style={{ flexDirection: 'row', marginTop: 6 }}>
                {WEEKDAYS.map((weekday) => (
                  <TouchableWithoutFeedback key={weekday} onPress={() => {
                    if (!draftRepeatWeekdays.includes(weekday)) {
                      setDraftRepeatWeekdays(x => [...x, weekday])
                    } else {
                      setDraftRepeatWeekdays(x => x.filter(wd => wd !== weekday))
                    }
                  }}>
                    <Text style={[styles.weekday, draftRepeatWeekdays.includes(weekday) && { color: colors.green }]}>{weekday}</Text>
                  </TouchableWithoutFeedback>

                ))}
              </View>
              <Button onPress={() => {
                if (draftRepeatWeekdays.length > 0) {
                  _setTime(dayjs(draftTime).format('HH:mm'));
                } else {
                  _setTime(null);
                }

                _setRepeatWeekdays(draftRepeatWeekdays);

                setDraftRepeatWeekdays([]);
                setSheetOpen(false)
              }} title="Apply Reminders" />
            </View>


          </BottomSheet>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
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
