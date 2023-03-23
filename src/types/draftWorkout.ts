import { Workout } from '../API';

export type DraftWorkout = Pick<
  Workout,
  | 'status'
  | 'dateFinished'
  | 'totalTimeInSeconds'
  | 'workoutWorkoutPlanRoutineId'
>;

export type DraftWorkoutExercise = {
  name: string;
  description?: string | null;
  sets: DraftSet[];
  sortOrder?: number | null;
  restTimeInSeconds: number;
};

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
};
