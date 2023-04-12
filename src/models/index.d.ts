import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum WorkoutStatus {
  INPROGRESS = "INPROGRESS",
  FINISHED = "FINISHED"
}

export enum ExerciseEquipment {
  BARBELL = "BARBELL",
  BODYWEIGHT = "BODYWEIGHT",
  DUMBBELL = "DUMBBELL",
  EZBARBELL = "EZBARBELL",
  KETTLEBELL = "KETTLEBELL",
  LEVERAGEMACHINE = "LEVERAGEMACHINE",
  SLEDMACHINE = "SLEDMACHINE",
  SMITHMACHINE = "SMITHMACHINE",
  WEIGHTED = "WEIGHTED"
}

export enum MuscleGroup {
  BACK = "BACK",
  BICEPS = "BICEPS",
  CARDIO = "CARDIO",
  CHEST = "CHEST",
  CORE = "CORE",
  FOREARMS = "FOREARMS",
  FULLBODY = "FULLBODY",
  LEGS = "LEGS",
  NECK = "NECK",
  SHOULDERS = "SHOULDERS",
  TRICEPS = "TRICEPS",
  WEIGHTLIFTING = "WEIGHTLIFTING"
}

export enum ModelAttributeTypes {
  BINARY = "binary",
  BINARY_SET = "binarySet",
  BOOL = "bool",
  LIST = "list",
  MAP = "map",
  NUMBER = "number",
  NUMBER_SET = "numberSet",
  STRING = "string",
  STRING_SET = "stringSet",
  NULL = "_null"
}

type EagerDeletePlanAndRoutinesResponse = {
  readonly id: string;
}

type LazyDeletePlanAndRoutinesResponse = {
  readonly id: string;
}

export declare type DeletePlanAndRoutinesResponse = LazyLoading extends LazyLoadingDisabled ? EagerDeletePlanAndRoutinesResponse : LazyDeletePlanAndRoutinesResponse

export declare const DeletePlanAndRoutinesResponse: (new (init: ModelInit<DeletePlanAndRoutinesResponse>) => DeletePlanAndRoutinesResponse)

type EagerDeleteWorkoutAndExercisesResponse = {
  readonly id: string;
}

type LazyDeleteWorkoutAndExercisesResponse = {
  readonly id: string;
}

export declare type DeleteWorkoutAndExercisesResponse = LazyLoading extends LazyLoadingDisabled ? EagerDeleteWorkoutAndExercisesResponse : LazyDeleteWorkoutAndExercisesResponse

export declare const DeleteWorkoutAndExercisesResponse: (new (init: ModelInit<DeleteWorkoutAndExercisesResponse>) => DeleteWorkoutAndExercisesResponse)

type EagerBulkCreateWorkoutExercisesResponse = {
  readonly exercises: WorkoutExercise[];
  readonly updatedRoutineExercises: (RoutineExerciseToUpdateResponse | null)[];
}

type LazyBulkCreateWorkoutExercisesResponse = {
  readonly exercises: AsyncCollection<WorkoutExercise>;
  readonly updatedRoutineExercises: (RoutineExerciseToUpdateResponse | null)[];
}

export declare type BulkCreateWorkoutExercisesResponse = LazyLoading extends LazyLoadingDisabled ? EagerBulkCreateWorkoutExercisesResponse : LazyBulkCreateWorkoutExercisesResponse

export declare const BulkCreateWorkoutExercisesResponse: (new (init: ModelInit<BulkCreateWorkoutExercisesResponse>) => BulkCreateWorkoutExercisesResponse)

type EagerRoutineExerciseToUpdateResponse = {
  readonly id: string;
  readonly setsConfig: string;
}

type LazyRoutineExerciseToUpdateResponse = {
  readonly id: string;
  readonly setsConfig: string;
}

export declare type RoutineExerciseToUpdateResponse = LazyLoading extends LazyLoadingDisabled ? EagerRoutineExerciseToUpdateResponse : LazyRoutineExerciseToUpdateResponse

export declare const RoutineExerciseToUpdateResponse: (new (init: ModelInit<RoutineExerciseToUpdateResponse>) => RoutineExerciseToUpdateResponse)

type EagerWorkoutExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutExercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly color?: string | null;
  readonly restTimeInSeconds?: number | null;
  readonly setsConfig: string;
  readonly sortOrder?: number | null;
  readonly workoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutExercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly color?: string | null;
  readonly restTimeInSeconds?: number | null;
  readonly setsConfig: string;
  readonly sortOrder?: number | null;
  readonly workoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutExercise = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutExercise : LazyWorkoutExercise

export declare const WorkoutExercise: (new (init: ModelInit<WorkoutExercise>) => WorkoutExercise) & {
  copyOf(source: WorkoutExercise, mutator: (draft: MutableModel<WorkoutExercise>) => MutableModel<WorkoutExercise> | void): WorkoutExercise;
}

type EagerWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status: WorkoutStatus | keyof typeof WorkoutStatus;
  readonly dateFinished?: string | null;
  readonly totalTimeInSeconds?: number | null;
  readonly userID: string;
  readonly WorkoutExercises?: (WorkoutExercise | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Workout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status: WorkoutStatus | keyof typeof WorkoutStatus;
  readonly dateFinished?: string | null;
  readonly totalTimeInSeconds?: number | null;
  readonly userID: string;
  readonly WorkoutExercises: AsyncCollection<WorkoutExercise>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Workout = LazyLoading extends LazyLoadingDisabled ? EagerWorkout : LazyWorkout

export declare const Workout: (new (init: ModelInit<Workout>) => Workout) & {
  copyOf(source: Workout, mutator: (draft: MutableModel<Workout>) => MutableModel<Workout> | void): Workout;
}

type EagerExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly equipment?: ExerciseEquipment | keyof typeof ExerciseEquipment | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Exercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly equipment?: ExerciseEquipment | keyof typeof ExerciseEquipment | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Exercise = LazyLoading extends LazyLoadingDisabled ? EagerExercise : LazyExercise

export declare const Exercise: (new (init: ModelInit<Exercise>) => Exercise) & {
  copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise>) => MutableModel<Exercise> | void): Exercise;
}

type EagerWorkoutRoutineExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutRoutineExercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly equipment?: ExerciseEquipment | keyof typeof ExerciseEquipment | null;
  readonly color?: string | null;
  readonly description?: string | null;
  readonly restTimeInSeconds?: number | null;
  readonly sortOrder?: number | null;
  readonly workoutPlanRoutineID: string;
  readonly setsConfig: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutRoutineExercise = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutRoutineExercise, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly muscleGroup?: MuscleGroup | keyof typeof MuscleGroup | null;
  readonly equipment?: ExerciseEquipment | keyof typeof ExerciseEquipment | null;
  readonly color?: string | null;
  readonly description?: string | null;
  readonly restTimeInSeconds?: number | null;
  readonly sortOrder?: number | null;
  readonly workoutPlanRoutineID: string;
  readonly setsConfig: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutRoutineExercise = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutRoutineExercise : LazyWorkoutRoutineExercise

export declare const WorkoutRoutineExercise: (new (init: ModelInit<WorkoutRoutineExercise>) => WorkoutRoutineExercise) & {
  copyOf(source: WorkoutRoutineExercise, mutator: (draft: MutableModel<WorkoutRoutineExercise>) => MutableModel<WorkoutRoutineExercise> | void): WorkoutRoutineExercise;
}

type EagerWorkoutPlanRoutine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutPlanRoutine, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sortOrder?: number | null;
  readonly workoutPlanID: string;
  readonly WorkoutRoutineExercises?: (WorkoutRoutineExercise | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutPlanRoutine = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutPlanRoutine, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sortOrder?: number | null;
  readonly workoutPlanID: string;
  readonly WorkoutRoutineExercises: AsyncCollection<WorkoutRoutineExercise>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WorkoutPlanRoutine = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutPlanRoutine : LazyWorkoutPlanRoutine

export declare const WorkoutPlanRoutine: (new (init: ModelInit<WorkoutPlanRoutine>) => WorkoutPlanRoutine) & {
  copyOf(source: WorkoutPlanRoutine, mutator: (draft: MutableModel<WorkoutPlanRoutine>) => MutableModel<WorkoutPlanRoutine> | void): WorkoutPlanRoutine;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly username?: string | null;
  readonly WorkoutPlans?: (WorkoutPlan | null)[] | null;
  readonly Workouts?: (Workout | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly username?: string | null;
  readonly WorkoutPlans: AsyncCollection<WorkoutPlan>;
  readonly Workouts: AsyncCollection<Workout>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerWorkoutPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutPlan, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly userID: string;
  readonly createdAt: string;
  readonly WorkoutPlanRoutines?: (WorkoutPlanRoutine | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyWorkoutPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WorkoutPlan, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly userID: string;
  readonly createdAt: string;
  readonly WorkoutPlanRoutines: AsyncCollection<WorkoutPlanRoutine>;
  readonly updatedAt?: string | null;
}

export declare type WorkoutPlan = LazyLoading extends LazyLoadingDisabled ? EagerWorkoutPlan : LazyWorkoutPlan

export declare const WorkoutPlan: (new (init: ModelInit<WorkoutPlan>) => WorkoutPlan) & {
  copyOf(source: WorkoutPlan, mutator: (draft: MutableModel<WorkoutPlan>) => MutableModel<WorkoutPlan> | void): WorkoutPlan;
}