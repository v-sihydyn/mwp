import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/colors';
import { Exercise } from '../../types/exercise';

type ExerciseListItemProps = {
  item: Exercise;
  displayImage?: boolean;
  onPress?: () => void;
};

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  item,
  displayImage = true,
  onPress = () => {},
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        {/*{displayImage && item.image && (*/}
        {/*  <Image*/}
        {/*    style={styles.image}*/}
        {/*    source={{*/}
        {/*      uri: 'https://dummyimage.com/60x60/fff/aaa',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
          <Text style={styles.equipment}>{item.equipment}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface2,
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  muscleGroup: {
    color: '#d3d3d3',
    fontSize: 13,
  },
  equipment: {
    color: '#d3d3d3',
    fontSize: 13,
    marginTop: 'auto',
  },
});
