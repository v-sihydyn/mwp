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
};

export type DraftSetStatus = 'idle' | 'inprogress' | 'rest' | 'skipped';

export type DraftSet = {
  reps: string;
  weight: string | null;
  status: DraftSetStatus;
};
