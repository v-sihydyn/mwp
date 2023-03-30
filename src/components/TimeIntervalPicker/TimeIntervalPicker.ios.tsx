import { colors } from '../../styles/colors';
import {
  TimePicker,
  ValueMap as TimePickerValueMap,
} from 'react-native-simple-time-picker';
import React, { useState } from 'react';

export type ValueMap = TimePickerValueMap;

type TimeIntervalPickerProps = {
  initialValue?: ValueMap;
  onChange: (value: ValueMap) => void;
};

const DEFAULT_VALUE: ValueMap = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const TimeIntervalPicker = ({
  initialValue,
  onChange,
}: TimeIntervalPickerProps) => {
  const [time, setTime] = useState<ValueMap>(initialValue || DEFAULT_VALUE);

  return (
    <TimePicker
      value={time}
      onChange={(value) => {
        setTime(value);
        onChange(value);
      }}
      pickerShows={['minutes', 'seconds']}
      textColor={colors.text}
      zeroPadding={true}
      dropdownIconColor={colors.text}
      minutesUnit="min."
      secondsUnit="sec."
    />
  );
};
