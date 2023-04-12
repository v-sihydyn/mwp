import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const PLAYER_CURRENT_TIME_KEY = 'workoutPlayerCurrentTime';

export const recordStartTime = async () => {
  try {
    const now = Date.now();
    await AsyncStorage.setItem(PLAYER_CURRENT_TIME_KEY, String(now));
  } catch (err) {
    console.log(err);
  }
};

export const getElapsedTime = async () => {
  try {
    const startTime = await AsyncStorage.getItem(PLAYER_CURRENT_TIME_KEY);

    return dayjs().diff(dayjs(Number(startTime)), 'second');
  } catch (err) {
    console.log(err);
  }
};

export const clearStartTime = async () => {
  try {
    await AsyncStorage.removeItem(PLAYER_CURRENT_TIME_KEY);
  } catch (err) {
    console.log(err);
  }
};
