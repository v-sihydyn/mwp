import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../../components/Icon/Icon';

type WorkoutHistoryItemProps = {
  item: {
    date: string;
    workout: {
      name: string;
      exercisesCount: number;
      duration: string;
    };
  };
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
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <Text style={styles.date}>{item.date}</Text>

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
            <Text style={styles.workoutName}>{item.workout.name}</Text>
          </View>
          <View style={styles.workoutOverviewFooter}>
            <View style={styles.workoutOverviewFooterSection}>
              <Text style={styles.exerciseCount}>
                {item.workout.exercisesCount}
              </Text>
              <Icon name="dumbbell" color={colors.text} size={14} />
            </View>
            <View style={styles.divider} />
            <View style={styles.workoutOverviewFooterSection}>
              <Text style={styles.workoutDuration}>
                {item.workout.duration}
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
    padding: 4,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flex: 1,
  },
  workoutOverviewFooterSection: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: 32,
    backgroundColor: '#313233',
    marginHorizontal: 'auto',
  },
});
