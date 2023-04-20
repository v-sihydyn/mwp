import { MuscleGroup } from '../../API';

export type SetData = {
  sets: string | null;
  reps: string | null;
  weight: string | null;
};

export type ExerciseFormData = {
  name: string;
  muscleGroup: MuscleGroup | null;
  sets: SetData[];
  restTimeMins?: number | null;
  restTimeSecs?: number | null;
  color: string;
  description?: string | null;
};
