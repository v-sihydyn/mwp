import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../../styles/colors';
import { PieChart } from '../../../../components/PieChart/PieChart';
import { Icon } from '../../../../components/Icon/Icon';

const chartData = [
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
      <Text style={styles.title}>Nice workout!</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PieChart
          initialValues={chartData}
          size={300}
          strokeWidth={90}
          radius={90}
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
    padding: 20,

    height: 500,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
});
