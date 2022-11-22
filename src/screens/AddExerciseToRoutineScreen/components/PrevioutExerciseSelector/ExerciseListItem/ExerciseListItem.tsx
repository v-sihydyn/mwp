import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../../styles/colors';

type ExerciseListItemProps = {
  item: {
    id: number;
    name: string;
    muscleGroup: string;
    image: string | null;
    color?: string | null;
  };
  onPress: () => void;
};

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.colorIndicatorWrap}>
          <View style={[styles.colorIndicator, { backgroundColor: item.color || colors.surface2 }]} />
        </View>

        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
        </View>
        {item.image && (
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    backgroundColor: colors.surface2,
    marginVertical: 12,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  muscleGroup: {
    color: '#d3d3d3',
    fontSize: 13,
  },
  colorIndicatorWrap: {
    marginTop: 18,
    marginRight: 20,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
