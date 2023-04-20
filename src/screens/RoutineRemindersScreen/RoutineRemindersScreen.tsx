import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../styles/colors';
import { ReminderListItem } from './components/ReminderListItem';
import { BottomSheet } from '../../components/BottomSheet';
import DatePicker from 'react-native-date-picker';
import Layout from '../../constants/Layout';
import dayjs from 'dayjs';
import { Portal } from '../../components/Portal';
import color from 'color';
import Ripple from 'react-native-material-ripple';

interface RoutineRemindersScreenProps {}

type Reminder = {
  id: number;
  routineName: string;
  time: string | null;
  repeatWeekdays: string[];
};

const REMINDERS: Reminder[] = [
  {
    id: 1,
    routineName: '12',
    time: '16:03',
    repeatWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 2,
    routineName: '2',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 3,
    routineName: '3',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 4,
    routineName: 'Pull A',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 5,
    routineName: 'Pull B',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 6,
    routineName: 'Push A',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 7,
    routineName: 'Push B',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 8,
    routineName: 'Legs',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 9,
    routineName: 'g',
    time: null,
    repeatWeekdays: [],
  },
  {
    id: 10,
    routineName: 'hfg',
    time: null,
    repeatWeekdays: [],
  },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const RoutineRemindersScreen: React.FC<
  RoutineRemindersScreenProps
> = () => {
  const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);
  const [draftTime, setDraftTime] = useState<Date>(new Date());
  const [draftRepeatWeekdays, setDraftRepeatWeekdays] = useState<string[]>([]);
  const [draftReminderIndex, setDraftReminderIndex] = useState<number | null>(
    null,
  );
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleOpenSheet = ({
    time,
    repeatWeekdays,
    index,
  }: {
    time: string | null;
    repeatWeekdays: string[];
    index: number;
  }) => {
    let _draftTime = dayjs();

    if (time) {
      const [hours, minutes] = time.split(':');
      _draftTime = _draftTime.hour(Number(hours)).minute(Number(minutes));
    }

    setDraftTime(_draftTime.toDate());
    setDraftRepeatWeekdays(repeatWeekdays);
    setDraftReminderIndex(index);

    setSheetOpen(true);
  };

  const handleApplyReminders = () => {
    const _editedReminder = reminders.find(
      (_, idx) => idx === draftReminderIndex,
    );
    const editedReminder = { ..._editedReminder! };

    if (draftRepeatWeekdays.length > 0) {
      editedReminder.time = dayjs(draftTime).format('HH:mm');
    } else {
      editedReminder.time = null;
    }

    editedReminder.repeatWeekdays = draftRepeatWeekdays;

    setReminders((rms) =>
      rms.map((r, rIdx) => {
        return rIdx === draftReminderIndex ? editedReminder : r;
      }),
    );

    setDraftRepeatWeekdays([]);
    setSheetOpen(false);
  };

  const handleDeleteReminders = (index: number) => {
    const _editedReminder = reminders.find((_, idx) => idx === index);
    const editedReminder = { ..._editedReminder! };
    editedReminder.time = null;
    editedReminder.repeatWeekdays = [];

    setReminders((rms) =>
      rms.map((r, rIdx) => {
        return rIdx === index ? editedReminder : r;
      }),
    );
  };

  const weekdayActiveColor = color(colors.surface2).lighten(0.24).hex();

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={({ item, index }) => (
          <ReminderListItem
            key={index}
            item={item}
            index={index}
            onPress={handleOpenSheet}
            onDeleteHandlers={handleDeleteReminders}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        bounces={false}
      />

      <Portal>
        <BottomSheet
          isVisible={isSheetOpen}
          onClose={() => setSheetOpen(false)}>
          <View style={styles.timePickerSheet}>
            <Text style={styles.timePickerSheetTitle}>Reminder Time</Text>
            <View style={{ width: '100%' }}>
              <DatePicker
                date={draftTime}
                onDateChange={setDraftTime}
                androidVariant="iosClone"
                mode="time"
                textColor={colors.text}
                fadeToColor="none"
                style={{ width: Layout.window.width - 40 }}
              />
            </View>
            <Text style={[styles.timePickerSheetTitle, { marginBottom: 12 }]}>
              Repeat Weekdays Time
            </Text>
            <View style={styles.timePickerSheetWeekdays}>
              {WEEKDAYS.map((weekday) => {
                const isWeekdaySelected = draftRepeatWeekdays.includes(weekday);

                return (
                  <TouchableWithoutFeedback
                    key={weekday}
                    onPress={() => {
                      if (!isWeekdaySelected) {
                        setDraftRepeatWeekdays((x) => [...x, weekday]);
                      } else {
                        setDraftRepeatWeekdays((x) =>
                          x.filter((wd) => wd !== weekday),
                        );
                      }
                    }}>
                    <View
                      style={[
                        styles.timePickerSheetWeekdayWrapper,
                        isWeekdaySelected && {
                          borderColor: colors.green,
                          backgroundColor: weekdayActiveColor,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.timePickerSheetWeekday,
                          isWeekdaySelected && { color: colors.text },
                        ]}>
                        {weekday}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <Ripple rippleColor="#ffffff" onPress={handleApplyReminders}>
              <View style={styles.timePickerSheetBtn}>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: '700',
                    fontSize: 16,
                  }}>
                  Apply Reminders
                </Text>
              </View>
            </Ripple>
          </View>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  weekday: {
    marginRight: 14,
    color: colors.text2,
  },
  timePickerSheet: {
    backgroundColor: colors.page,
    width: '100%',
    padding: 20,
  },
  timePickerSheetTitle: {
    color: colors.text,
    fontSize: 18,
  },
  timePickerSheetWeekdays: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  timePickerSheetWeekdayWrapper: {
    marginRight: 8,
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  timePickerSheetWeekday: {
    color: colors.text3,
  },
  timePickerSheetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    height: 35,
    borderRadius: 12,
  },
});
