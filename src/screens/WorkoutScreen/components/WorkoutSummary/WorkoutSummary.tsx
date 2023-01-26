import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { colors } from '../../../../styles/colors';
import { PieChart } from '../../../../components/PieChart/PieChart';
import { Icon } from '../../../../components/Icon/Icon';
import * as React from 'react';
import { WorkoutExerciseCard } from '../../../MyWorkoutScreen/components/WorkoutRoutinesList/WorkoutExerciseCard/WorkoutExerciseCard';

import { CustomButton } from '../../../../components/CustomButton/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const chartData = [
  {
    value: 3,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 3,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 1,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 2,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 1,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 2,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 2,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 2,
    textLine1: 'Back',
    textLine: '1',
  },
  {
    value: 2,
    textLine1: 'Back',
    textLine: '1',
  },
];

export const WorkoutSummary = () => {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <TouchableWithoutFeedback>
      <View style={[styles.root, { paddingBottom: insets.bottom }]}>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <TouchableWithoutFeedback>
                <View style={styles.header}>
                  <Text style={styles.title}>Nice workout!</Text>
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
                              3
                            </Text>
                            <Icon
                              name="dumbbell"
                              color={colors.text}
                              size={16}
                            />
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
                      <View style={styles.workoutDetails}>
                        <Text style={styles.workoutDetailsTitle}>
                          Workout time
                        </Text>
                        <Text style={styles.workoutDetailsText}>00:30</Text>
                      </View>
                      <View style={styles.detailsDivider} />
                      <View style={styles.workoutDetails}>
                        <Text style={styles.workoutDetailsTitle}>Date</Text>
                        <Text style={styles.workoutDetailsText}>
                          26.01.2023 12:00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={() => (
              <WorkoutExerciseCard
                name="Barbell Bench Press"
                style={{ marginHorizontal: 20 }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />

          <CustomButton
            style={[
              styles.button,
              {
                width: windowWidth - 40,
              },
            ]}
            onPress={() => {}}>
            Ok
          </CustomButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
    position: 'relative',

    height: Dimensions.get('window').height - 150,
  },
  header: {
    backgroundColor: colors.surface2,
    padding: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    color: colors.text,
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
  button: {
    paddingVertical: 14,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
