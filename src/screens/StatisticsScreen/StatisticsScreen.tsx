import {
  FlatList,
  Pressable,
  RefreshControl,
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
import { useWorkoutsList } from './hooks/useWorkoutsList/useWorkoutsList';
import { FullscreenLoader } from '../../components/FullscreenLoader/FullscreenLoader';
import { Workout } from '../../API';
import { DisplayWorkoutExercise, DraftWorkout } from '../../types/draftWorkout';
import { ListEmptyComponent } from './components/ListEmptyComponent/ListEmptyComponent';
import { ApiErrorMessage } from '../../components/ApiErrorMessage/ApiErrorMessage';

export const StatisticsScreen = () => {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const { workouts, refetch, refetching, loading, error } =
    useWorkoutsList(filterDate);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const currentDate = dayjs().format('YYYY-MM-DD');

  const markedDates = useMemo<MarkedDates>(() => {
    const result: MarkedDates = {};

    if (!filterDate) {
      result[currentDate] = {
        selected: true,
        selectedColor: colors.green,
      };
    } else {
      result[filterDate] = {
        selected: true,
        selectedColor: colors.green,
      };
      if (filterDate !== currentDate) {
        result[currentDate] = {
          customStyles: {
            text: {
              color: colors.green,
            },
          },
        };
      }
    }

    return result;
  }, [filterDate, currentDate]);

  const handleClearFilterDate = () => {
    setFilterDate(null);
  };

  const handleGoToDetails = (item: Workout) => {
    const workout: DraftWorkout = {
      name: item.name,
      status: item.status,
      dateFinished: item.dateFinished,
      totalTimeInSeconds: item.totalTimeInSeconds,
    };

    const workoutExercises: DisplayWorkoutExercise[] = (
      item.WorkoutExercises?.items ?? []
    ).map((e) => ({
      name: e?.name ?? '',
      description: e?.description,
      sets: JSON.parse(e?.setsConfig ?? ''),
      sortOrder: e?.sortOrder,
      restTimeInSeconds: e?.restTimeInSeconds || 0,
      muscleGroup: e?.muscleGroup,
      color: e?.color,
    }));

    navigation.navigate('WorkoutDetails', {
      id: item.id,
      title: item.name ?? '',
      workout,
      workoutExercises,
    });
  };

  const leftIcon = filterDate ? (
    <Pressable onPress={handleClearFilterDate}>
      <Icon name={'times-circle'} color={colors.red} size={18} />
    </Pressable>
  ) : (
    <Icon name={'calendar'} color={colors.text} size={18} />
  );
  const filterButtonText = filterDate
    ? `Workouts of ${dayjs(filterDate).format('DD.MM.YYYY')}`
    : 'All workouts';

  if (loading) return <FullscreenLoader />;

  if (error) {
    return (
      <View style={styles.container}>
        <ApiErrorMessage
          title="Failed to fetch workouts"
          message={error.message}
          onRetry={() => {
            if (!refetching) refetch();
          }}
        />
      </View>
    );
  }

  const isFilterDateVisible = Boolean(filterDate) || workouts.length > 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        renderItem={({ item, index }) =>
          item && (
            <WorkoutHistoryItem
              item={item as Workout}
              isFirst={index === 0}
              isLast={index === workouts.length - 1}
              onPress={() => handleGoToDetails(item as Workout)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refetching}
            onRefresh={refetch}
            tintColor={colors.green}
          />
        }
      />

      {isFilterDateVisible && (
        <>
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
        </>
      )}

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
              if (dayjs(dateString) <= dayjs(currentDate)) {
                setFilterDate(dateString);
                setIsFilterSheetOpen(false);
              }
            }}
            horizontal={true}
            pagingEnabled={true}
            disabledByDefault={false}
            disableAllTouchEventsForDisabledDays={true}
            futureScrollRange={0}
            theme={{
              calendarBackground: colors.page,
              textDayStyle: { color: colors.text },
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
