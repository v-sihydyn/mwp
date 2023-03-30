import { Select } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';

export type ValueMap = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimeIntervalPickerProps = {
  initialValue?: ValueMap;
  onChange: (value: ValueMap) => void;
};

export const TimeIntervalPicker = ({
  initialValue,
  onChange,
}: TimeIntervalPickerProps) => {
  const [minutes, setMinutes] = useState(
    typeof initialValue?.minutes !== 'undefined'
      ? String(initialValue.minutes)
      : '0',
  );
  const [seconds, setSeconds] = useState(
    typeof initialValue?.seconds !== 'undefined'
      ? String(initialValue.seconds)
      : '0',
  );

  const handleMinutesChange = (value: string) => {
    setMinutes(value);
    onChange({
      hours: 0,
      minutes: Number(value),
      seconds: Number(seconds),
    });
  };

  const handleSecondsChange = (value: string) => {
    setSeconds(value);
    onChange({
      hours: 0,
      minutes: Number(minutes),
      seconds: Number(value),
    });
  };

  return (
    <View style={styles.root}>
      <Select
        selectedValue={minutes}
        onValueChange={handleMinutesChange}
        variant="underlined"
        width={24}
        fontSize={15}
        marginRight={4}>
        {MINUTE_OPTIONS.map(({ label, value }) => (
          <Select.Item key={value} label={label} value={value} />
        ))}
      </Select>
      <Select
        selectedValue={seconds}
        onValueChange={handleSecondsChange}
        variant="underlined"
        width={24}
        fontSize={15}>
        {SECOND_OPTIONS.map(({ label, value }) => (
          <Select.Item key={value} label={label} value={value} />
        ))}
      </Select>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexGrow: 1,
  },
});

const MINUTE_OPTIONS = Array.from({ length: 60 }).map((_, index) => ({
  label: String(index).padStart(2, '0') + ' min.',
  value: String(index),
}));

const SECOND_OPTIONS = Array.from({ length: 60 }).map((_, index) => ({
  label: String(index).padStart(2, '0') + ' sec.',
  value: String(index),
}));
