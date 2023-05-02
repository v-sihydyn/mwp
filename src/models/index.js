// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const WorkoutStatus = {
  "INPROGRESS": "INPROGRESS",
  "FINISHED": "FINISHED"
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

const ModelAttributeTypes = {
  "BINARY": "binary",
  "BINARY_SET": "binarySet",
  "BOOL": "bool",
  "LIST": "list",
  "MAP": "map",
  "NUMBER": "number",
  "NUMBER_SET": "numberSet",
  "STRING": "string",
  "STRING_SET": "stringSet",
  "NULL": "_null"
};

const { WorkoutExercise, Workout, Exercise, WorkoutRoutineExercise, WorkoutPlanRoutine, User, WorkoutPlan, DeletePlanAndRoutinesResponse, DeleteWorkoutAndExercisesResponse, BulkCreateWorkoutExercisesResponse, RoutineExerciseToUpdateResponse, CreateRoutineReminderResponse, DeleteRoutineReminderResponse } = initSchema(schema);

export {
  WorkoutExercise,
  Workout,
  Exercise,
  WorkoutRoutineExercise,
  WorkoutPlanRoutine,
  User,
  WorkoutPlan,
  WorkoutStatus,
  ExerciseEquipment,
  MuscleGroup,
  ModelAttributeTypes,
  DeletePlanAndRoutinesResponse,
  DeleteWorkoutAndExercisesResponse,
  BulkCreateWorkoutExercisesResponse,
  RoutineExerciseToUpdateResponse,
  CreateRoutineReminderResponse,
  DeleteRoutineReminderResponse
};