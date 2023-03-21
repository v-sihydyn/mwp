import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../../styles/colors';

type ListHeaderProps = {
  onRestMinutesChange: (value: string) => void;
  onRestSecondsChange: (value: string) => void;
};

// @TODO use numeric inputs; limits seconds to 59
export const ListHeader = ({
  onRestSecondsChange,
  onRestMinutesChange,
}: ListHeaderProps) => {
  const [restMinutes, setRestMinutes] = useState('');
  const [restSeconds, setRestSeconds] = useState('');

  return (
    <View>
      <Text style={styles.title}>Rest Between Exercises</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <Text style={{ fontSize: 16, color: colors.text }}>Time:</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            marginLeft: 10,
          }}>
          <TextInput
            value={restMinutes}
            onChangeText={(value) => {
              setRestMinutes(value);
              onRestMinutesChange(value);
            }}
            keyboardType="numeric"
            style={styles.setInput}
          />
          <Text style={styles.setLabel}>Minutes</Text>
          <View style={styles.setsFieldsDivider} />
          <TextInput
            value={restSeconds}
            onChangeText={(value) => {
              setRestSeconds(value);
              onRestSecondsChange(value);
            }}
            keyboardType="numeric"
            style={styles.setInput}
          />
          <Text style={styles.setLabel}>Seconds</Text>
        </View>
      </View>
      <Text style={styles.title}>Reorder & Remove Exercises</Text>
    </View>
  );
};

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
