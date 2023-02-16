// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MuscleGroup = {
  "BACK": "BACK",
  "BICEPS": "BICEPS",
  "CARDIO": "CARDIO",
  "CHEST": "CHEST",
  "CORE": "CORE",
  "FOREARMS": "FOREARMS",
  "FULLBODY": "FULLBODY",
  "LEGS": "LEGS",
  "NECK": "NECK",
  "SHOULDERS": "SHOULDERS",
  "TRICEPS": "TRICEPS",
  "WEIGHTLIFTING": "WEIGHTLIFTING"
};

const ExerciseEquipment = {
  "BARBELL": "BARBELL",
  "BODYWEIGHT": "BODYWEIGHT",
  "DUMBBELL": "DUMBBELL",
  "EZBARBELL": "EZBARBELL",
  "KETTLEBELL": "KETTLEBELL",
  "LEVERAGEMACHINE": "LEVERAGEMACHINE",
  "SLEDMACHINE": "SLEDMACHINE",
  "SMITHMACHINE": "SMITHMACHINE",
  "WEIGHTED": "WEIGHTED"
};

const WorkoutStatus = {
  "INPROGRESS": "INPROGRESS",
  "FINISHED": "FINISHED"
};

const { WorkoutExercise, WorkoutRoutineExercise, Workout, WorkoutPlanRoutine, Exercise, User, WorkoutPlan } = initSchema(schema);

export {
  WorkoutExercise,
  WorkoutRoutineExercise,
  Workout,
  WorkoutPlanRoutine,
  Exercise,
  User,
  WorkoutPlan,
  MuscleGroup,
  ExerciseEquipment,
  WorkoutStatus
};