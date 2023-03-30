import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../styles/colors';
import {
  TimeIntervalPicker,
  ValueMap,
} from '../../../components/TimeIntervalPicker/TimeIntervalPicker';

type ListHeaderProps = {
  onRestTimeChange: (value: ValueMap) => void;
};

export const ListHeader = React.memo(
  ({ onRestTimeChange }: ListHeaderProps) => {
    return (
      <View>
        <Text style={styles.title}>Rest Between Exercises</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 0,
          }}></View>
        <TimeIntervalPicker onChange={onRestTimeChange} />
        <Text style={styles.title}>Reorder & Remove Exercises</Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    color: colors.text2,
    fontSize: 18,
    marginVertical: 16,
  },

  setInput: {
    backgroundColor: colors.surface2,
    width: 70,
    height: 40,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  setLabel: {
    color: colors.text,
    fontSize: 16,
  },
  setsFieldsDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#313233',
  },
  setsDivider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.surface,
  },
});
