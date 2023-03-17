import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import { colors } from '../../../../../styles/colors';
import { WorkoutRoutineExercise } from '../../../../../API';
import { MUSCLE_VALUES_MAP } from '../../../../../constants/muscleSelectOptions';

type WorkoutExerciseCardProps = {
  item: WorkoutRoutineExercise;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const WorkoutExerciseCard = ({
  item,
  style,
  onPress,
}: WorkoutExerciseCardProps) => {
  const displayMuscleGroup = item.muscleGroup
    ? MUSCLE_VALUES_MAP[item.muscleGroup]
    : null;

  const sets = useMemo<{ sets: string; reps: string; weight: string }[]>(() => {
    try {
      return JSON.parse(item.setsConfig);
    } catch (e) {
      return [];
    }
  }, [item.setsConfig]);

  return (
    <Pressable onPress={onPress} style={[styles.root, style]}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://dummyimage.com/60x60/fff/aaa',
          }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{displayMuscleGroup}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        {sets.map((set, index) => (
          <View
            key={index}
            style={[
              styles.set,
              index === sets.length - 1 && { marginBottom: 0 },
            ]}>
            <View
              style={[
                styles.colorIndicator,
                { backgroundColor: item.color || '#000000' },
              ]}
            />
            <Text style={styles.setItem}>{set.sets} sets</Text>
            <Text style={styles.setItem}>{set.reps} reps</Text>
            {set.weight && <Text style={styles.setItem}>{set.weight} kg</Text>}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 14,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.surface2,
    borderRadius: 12,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#d3d3d3',
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 60,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  set: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  setItem: {
    color: colors.text,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
