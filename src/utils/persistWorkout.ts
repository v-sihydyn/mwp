import AsyncStorage from '@react-native-async-storage/async-storage';
import { DraftWorkout, DraftWorkoutExercise } from '../types/draftWorkout';

const STORAGE_KEY = 'DRAFT_WORKOUT_';

type PersistedData = {
  workout: DraftWorkout;
  exercises: DraftWorkoutExercise[];
  totalTimeInSeconds: number;
  currentSetId: string | null;
  restTimeInSeconds: number;
};

export const persistDraftWorkoutData = async (
  routineId: string,
  data: PersistedData,
) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY + routineId, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getPersistedDraftWorkoutData = async (routineId: string) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY + routineId);

    return JSON.parse(data!) as PersistedData;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteDraftWorkoutData = async (routineId: string) => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY + routineId);
  } catch (e) {
    console.log(e);
  }
};
