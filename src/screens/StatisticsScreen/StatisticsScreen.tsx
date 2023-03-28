import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors } from '../../styles/colors';
import { WorkoutHistoryItem } from './components/WorkoutHistoryItem/WorkoutHistoryItem';
import { Icon } from '../../components/Icon/Icon';
import React, { useMemo, useState } from 'react';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { CalendarList } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import Portal from '../../components/Portal/Portal';
import { MarkedDates } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { useWorkoutsList } from './hooks/useWorkoutsList/useWorkoutsList';
import { FullscreenLoader } from '../../components/FullscreenLoader/FullscreenLoader';

const DATES_WITH_WORKOUT_RECORDS = [
  '2023-01-31',
  '2023-01-30',
  '2023-01-28',
  '2023-01-18',
  '2023-01-08',
];

export const StatisticsScreen = () => {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const { workouts, loading } = useWorkoutsList();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const markedDates = useMemo<MarkedDates>(() => {
    const result = DATES_WITH_WORKOUT_RECORDS.reduce<Record<string, object>>(
      (acc, date) => {
        const obj: MarkingProps = {
          disabled: false,
          customStyles: {
            text: {
              color: colors.text,
            },
          },
        };

        if (date === filterDate) {
          obj.selected = true;
          obj.selectedColor = colors.green;
        }

        acc[date] = obj;

        return acc;
      },
      {},
    );

    if (!filterDate) {
      result[currentDate] = {
        selected: true,
        selectedColor: colors.green,
      };
    }

    return result;
  }, [filterDate]);

  const handleClearFilterDate = () => {
    setFilterDate(null);
  };

  const handleGoToDetails = () => {
    navigation.navigate('WorkoutDetails');
  };

  const leftIcon = filterDate ? (
    <Pressable onPress={handleClearFilterDate}>
      <Icon name={'times-circle'} color={colors.red} size={18} />
    </Pressable>
  ) : (
    <Icon name={'calendar'} color={colors.text} size={18} />
  );
  const filterButtonText = filterDate
    ? `Workouts of ${dayjs(filterDate).format('MM/DD/YYYY')}`
    : 'All workouts';

  if (loading) return <FullscreenLoader />;

  return (
    <View style={[styles.container]}>
      <FlatList
        data={workouts}
        renderItem={({ item, index }) =>
          item && (
            <WorkoutHistoryItem
              item={item}
              isFirst={index === 0}
              isLast={index === workouts.length - 1}
              onPress={handleGoToDetails}
            />
          )
        }
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Pressable
        onPress={() => setIsFilterSheetOpen(true)}
        style={[styles.filterButton, { width: windowWidth - 40 }]}>
        {leftIcon}
        <Text style={styles.filterButtonText}>{filterButtonText}</Text>
        <Icon name="chevron-up" color={colors.text} size={12} />
      </Pressable>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: windowWidth,
          backgroundColor: colors.page,
          height: 20,
          alignSelf: 'center',
          opacity: 0.9,
        }}
      />

      <Portal>
        <BottomSheet
          isVisible={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          withHandle={true}>
          <CalendarList
            style={{ height: 320 }}
            markingType="custom"
            markedDates={markedDates}
            onDayPress={({ dateString }) => {
              if (DATES_WITH_WORKOUT_RECORDS.includes(dateString)) {
                setFilterDate(dateString);
                setIsFilterSheetOpen(false);
              }
            }}
            horizontal={true}
            pagingEnabled={true}
            disabledByDefault={true}
            disableAllTouchEventsForDisabledDays={true}
            theme={{
              calendarBackground: colors.page,
              textDisabledColor: '#747678',
              textMonthFontSize: 14,
              textDayFontSize: 13,
              textMonthFontWeight: 'bold',
              textDayHeaderFontSize: 13,
              monthTextColor: '#a5a7a8',
            }}
          />
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
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
    borderRadius: 12,
  },
  filterButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
