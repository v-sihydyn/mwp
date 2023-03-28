import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';
import { Workout } from '../../../../API';
import dayjs from 'dayjs';
import { formatTime } from '../../../../utils/formatTime';

type WorkoutHistoryItemProps = {
  item: Workout;
  isFirst: boolean;
  isLast: boolean;
  onPress: () => void;
};

export const WorkoutHistoryItem = ({
  item,
  isFirst,
  isLast,
  onPress,
}: WorkoutHistoryItemProps) => {
  const formattedDateFinished = item.dateFinished
    ? dayjs(item.dateFinished).format('DD.MM.YYYY HH:mm')
    : null;
  const formattedWorkoutTotalTime = item.totalTimeInSeconds
    ? formatTime(item.totalTimeInSeconds)
    : null;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Text style={styles.date}>{formattedDateFinished}</Text>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
          }}>
          <View
            style={{
              backgroundColor: isFirst ? 'transparent' : colors.surface2,
              flex: 1,
              width: 2,
            }}
          />
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: colors.green,
              borderRadius: 8,
            }}
          />
          <View
            style={{
              backgroundColor: isLast ? 'transparent' : colors.surface2,
              flex: 1,
              width: 2,
            }}
          />
        </View>

        <View style={styles.workoutOverview}>
          <View style={styles.workoutOverviewContent}>
            <Text style={styles.workoutName}>
              {item.WorkoutPlanRoutine?.name || '-'}
            </Text>
          </View>
          <View style={styles.workoutOverviewFooter}>
            <View style={[styles.workoutOverviewFooterSection, { width: 90 }]}>
              <Text style={styles.exerciseCount}>
                {item.WorkoutExercises?.items.length || '-'}
              </Text>
              <Icon name="dumbbell" color={colors.text} size={14} />
            </View>
            <View style={styles.divider} />
            <View
              style={[styles.workoutOverviewFooterSection, { flexGrow: 1 }]}>
              <Text style={styles.workoutDuration}>
                {formattedWorkoutTotalTime || '-'}
              </Text>
              <Icon name="clock" color={colors.text} size={14} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: colors.text3,
    maxWidth: 100,
  },
  workoutOverview: {
    borderRadius: 12,
    backgroundColor: colors.surface,
    width: 220,
    marginVertical: 10,
  },
  workoutOverviewContent: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: colors.surface2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutOverviewFooter: {
    paddingVertical: 8,
    // paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flex: 1,
  },
  workoutOverviewFooterSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
  },
  workoutName: {
    color: colors.text,
    fontWeight: 'bold',
  },
  exerciseCount: {
    color: colors.text,
    marginRight: 8,
  },
  workoutDuration: {
    color: colors.text,
    marginRight: 8,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: '#313233',
    marginHorizontal: 'auto',
  },
});
