import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import { colors } from '../../../../../styles/colors';
import { MuscleGroup } from '../../../../../API';
import { MUSCLE_VALUES_MAP } from '../../../../../constants/muscleSelectOptions';
import { DraftSet } from '../../../../../types/draftWorkout';

type WorkoutExerciseCardProps = {
  name: string;
  muscleGroup?: MuscleGroup | null;
  sets?: DraftSet[];
  setsConfig?: string;
  color?: string | null;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const WorkoutExerciseCard = ({
  name,
  muscleGroup,
  sets,
  setsConfig,
  color,
  style,
  onPress,
}: WorkoutExerciseCardProps) => {
  const [contentDimensions, setContentDimensions] = useState<{
    height?: number;
    width?: number;
  }>({});

  const displayMuscleGroup = muscleGroup
    ? MUSCLE_VALUES_MAP[muscleGroup]
    : null;

  const _sets = useMemo<
    { sets: string; reps: string; weight: string }[]
  >(() => {
    try {
      if (sets?.length) {
        return sets;
      }

      if (setsConfig) {
        return JSON.parse(setsConfig);
      }

      return [];
    } catch (e) {
      return [];
    }
  }, [sets, setsConfig]);

  return (
    <Pressable onPress={onPress} style={[styles.root, style]}>
      <View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: '100%',
            height: contentDimensions.height,
            backgroundColor:
              !color || color === '#000000' ? colors.surface2 : color,
            alignSelf: 'flex-end',
            borderRadius: 12,
          }}
        />
        <View
          style={styles.content}
          onLayout={(e) => {
            setContentDimensions({
              width: e.nativeEvent.layout.width,
              height: e.nativeEvent.layout.height,
            });
          }}>
          {/*<Image*/}
          {/*  style={styles.image}*/}
          {/*  source={{*/}
          {/*    uri: 'https://dummyimage.com/60x60/fff/aaa',*/}
          {/*  }}*/}
          {/*/>*/}
          <View style={{ flexDirection: 'column', margin: 16 }}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{displayMuscleGroup}</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        {_sets.map((set, index) => (
          <View
            key={index}
            style={[
              styles.set,
              index === _sets.length - 1 && { marginBottom: 0 },
            ]}>
            <View
              style={[
                styles.colorIndicator,
                { backgroundColor: color || '#000000' },
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
    flexDirection: 'row',
    backgroundColor: colors.surface2,
    borderRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'space-between',
    width: '98%',
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
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  setItem: {
    color: colors.text,
    marginRight: 40,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 30,
  },
});
