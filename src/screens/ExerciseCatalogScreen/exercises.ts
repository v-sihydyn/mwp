import {
  ExerciseEquipment,
  MuscleGroup,
  WorkoutRoutineExercise,
} from '../../API';

export type Exercise = Pick<
  WorkoutRoutineExercise,
  'name' | 'muscleGroup' | 'equipment'
>;

export const EXERCISES: Exercise[] = [
  {
    name: 'Pull-ups',
    muscleGroup: MuscleGroup.BACK,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Pull-ups (supinated grip)',
    muscleGroup: MuscleGroup.BICEPS,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Dips',
    muscleGroup: MuscleGroup.CHEST,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Dips (narrow grip)',
    muscleGroup: MuscleGroup.TRICEPS,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Push-ups',
    muscleGroup: MuscleGroup.CHEST,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Diamond push-ups',
    muscleGroup: MuscleGroup.TRICEPS,
    equipment: ExerciseEquipment.BODYWEIGHT,
  },
  {
    name: 'Dumbbell seated shoulder press',
    muscleGroup: MuscleGroup.SHOULDERS,
    equipment: ExerciseEquipment.DUMBBELL,
  },
  {
    name: 'Dumbbell lateral raise',
    muscleGroup: MuscleGroup.SHOULDERS,
    equipment: ExerciseEquipment.DUMBBELL,
  },
  {
    name: 'Dumbbell biceps curl',
    muscleGroup: MuscleGroup.BICEPS,
    equipment: ExerciseEquipment.DUMBBELL,
  },
  {
    name: 'Dumbbell hammer curl',
    muscleGroup: MuscleGroup.BICEPS,
    equipment: ExerciseEquipment.DUMBBELL,
  },
  {
    name: 'Dumbbell triceps extension',
    muscleGroup: MuscleGroup.TRICEPS,
    equipment: ExerciseEquipment.DUMBBELL,
  },
];
