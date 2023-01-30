import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WorkoutHistoryItem } from './components/WorkoutHistoryItem/WorkoutHistoryItem';

const WORKOUTS = [
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
  {
    date: '4d ago',
    workout: {
      name: 'Legs',
      exercisesCount: 4,
      duration: '48:05',
    },
  },
];

export const StatisticsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Workout History</Text>

      <FlatList
        data={WORKOUTS}
        renderItem={({ item, index }) => (
          <WorkoutHistoryItem
            item={item}
            isFirst={index === 0}
            isLast={index == WORKOUTS.length - 1}
          />
        )}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
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
  title: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
});
