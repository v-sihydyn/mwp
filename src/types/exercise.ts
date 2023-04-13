import { WorkoutRoutineExercise } from '../API';

export type Exercise = Pick<
  WorkoutRoutineExercise,
  'name' | 'muscleGroup' | 'equipment'
>;
