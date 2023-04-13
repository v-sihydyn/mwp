import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../../styles/colors';
import { ChartData, PieChart } from '../../../../components/PieChart/PieChart';
import { Icon } from '../../../../components/Icon';
import * as React from 'react';
import { WorkoutExerciseCard } from '../../../../components/WorkoutExerciseCard';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../../../types/draftWorkout';
import { formatTime } from '../../../../utils/formatTime';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import { MUSCLE_VALUES_MAP } from '../../../../constants/muscleSelectOptions';
import { MuscleGroup } from '../../../../API';

type WorkoutSummaryProps = {
  title: string;
  workout: DraftWorkout;
  exercises: DraftWorkoutExercise[];
  listStyle?: StyleProp<ViewStyle>;
};

export const WorkoutSummary = React.memo(
  ({ title, workout, exercises, listStyle }: WorkoutSummaryProps) => {
    const insets = useSafeAreaInsets();
    const formattedWorkoutTotalTime = workout.totalTimeInSeconds
      ? formatTime(workout.totalTimeInSeconds)
      : null;
    const formattedDateFinished = dayjs(workout.dateFinished).format(
      'DD.MM.YYYY HH:mm',
    );

    const chartData: ChartData[] = Object.entries(
      groupBy(exercises, (item) => item.muscleGroup),
    ).map(([muscleGroup, value]) => ({
      value: value.length,
      muscleGroup: MUSCLE_VALUES_MAP[muscleGroup as MuscleGroup],
      exerciseCount: String(value.length),
    }));

    return (
      <View style={[styles.root, { paddingBottom: insets.bottom }]}>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                    paddingBottom: 8,
                  }}>
                  <View style={{ marginBottom: 20 }}>
                    <PieChart
                      initialValues={chartData}
                      size={300}
                      strokeWidth={90}
                      radius={90}
                      gapColor={colors.surface2}
                      centerLabel={
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            width: 89,
                            height: 89,
                            justifyContent: 'center',
                            alignItems: 'center',

                            borderWidth: 1,
                            borderColor: 'transparent', // @TODO: investigate this hack for centering on android
                          }}>
                          <Text
                            style={{
                              color: colors.text,
                              fontSize: 16,
                              fontWeight: 'bold',
                              marginRight: 8,
                            }}>
                            {exercises.length}
                          </Text>
                          <Icon name="dumbbell" color={colors.text} size={16} />
                        </View>
                      }
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    {formattedWorkoutTotalTime && (
                      <>
                        <View style={styles.workoutDetails}>
                          <Text style={styles.workoutDetailsTitle}>
                            Workout time
                          </Text>
                          <Text style={styles.workoutDetailsText}>
                            {formattedWorkoutTotalTime}
                          </Text>
                        </View>
                        <View style={styles.detailsDivider} />
                      </>
                    )}
                    {Boolean(workout.dateFinished) && (
                      <View style={styles.workoutDetails}>
                        <Text style={styles.workoutDetailsTitle}>Date</Text>
                        <Text style={styles.workoutDetailsText}>
                          {formattedDateFinished}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
            data={exercises}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item: exercise }) => (
              <WorkoutExerciseCard
                name={exercise.name}
                muscleGroup={exercise.muscleGroup}
                sets={exercise.sets}
                color={exercise.color}
                style={{ marginHorizontal: 20 }}
              />
            )}
            contentContainerStyle={listStyle}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
    position: 'relative',
  },
  header: {
    backgroundColor: colors.surface2,
    padding: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    color: colors.text3,
    textAlign: 'center',
    marginBottom: 30,
  },
  workoutDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  workoutDetailsTitle: {
    color: colors.text2,
    fontSize: 13,
    marginBottom: 8,
  },
  workoutDetailsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsDivider: {
    width: 2,
    backgroundColor: '#313233',
  },
});
