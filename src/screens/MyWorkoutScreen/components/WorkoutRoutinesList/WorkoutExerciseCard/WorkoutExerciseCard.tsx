import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../../../styles/colors';

type Props = {
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const WorkoutExerciseCard: React.FC<Props> = ({ name, style }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.root, style]}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://dummyimage.com/60x60/fff/aaa',
            }}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>Chest</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.colorIndicator} />
          <Text style={styles.footerItem}>3 sets</Text>
          <Text style={styles.footerItem}>10 reps</Text>
          <Text style={styles.footerItem}>70 kg</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 12,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  content: {
    padding: 12,
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
    padding: 20,
    paddingRight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footerItem: {
    color: colors.text,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    backgroundColor: 'darkviolet',
    borderRadius: 4,
  },
});
