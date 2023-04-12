import { MuscleGroup, Workout } from '../API';

export type DraftWorkout = Pick<
  Workout,
  'name' | 'status' | 'dateFinished' | 'totalTimeInSeconds'
>;

export type DraftWorkoutExercise = {
  name: string;
  description?: string | null;
  sets: DraftSet[];
  setsConfig: string;
  sortOrder?: number | null;
  restTimeInSeconds: number;
  muscleGroup?: MuscleGroup | null;
  color?: string | null;
  workoutRoutineExerciseId: string | null;
};

export type DisplayWorkoutExercise = Omit<
  DraftWorkoutExercise,
  'workoutRoutineExerciseId' | 'setsConfig'
>;

export type DraftSetStatus =
  | 'idle'
  | 'inprogress'
  | 'rest'
  | 'skipped'
  | 'completed';

export type DraftSet = {
  id: string;
  reps: string;
  weight: string | null;
  status: DraftSetStatus;
  sets: number;
};
