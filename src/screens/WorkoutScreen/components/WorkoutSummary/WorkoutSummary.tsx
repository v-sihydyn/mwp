import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { PieChart } from '../../../../components/PieChart/PieChart';
import { Icon } from '../../../../components/Icon/Icon';

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
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Nice workout!</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
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
                    width: 90,
                    height: 90,
                    justifyContent: 'center',
                    alignItems: 'center',
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
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutDetailsTitle}>Workout time</Text>
              <Text style={styles.workoutDetailsText}>00:30</Text>
            </View>
            <View style={styles.detailsDivider} />
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutDetailsTitle}>Date</Text>
              <Text style={styles.workoutDetailsText}>26.01.2023 12:00</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.page,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    height: 500, // @TODO: remove
  },
  header: {
    backgroundColor: colors.surface2,
    padding: 20,
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
});
