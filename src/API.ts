/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type DeletePlanAndRoutinesResponse = {
  __typename: "DeletePlanAndRoutinesResponse",
  id: string,
};

export type DeleteWorkoutAndExercisesResponse = {
  __typename: "DeleteWorkoutAndExercisesResponse",
  id: string,
};

export type CreateWorkoutExerciseInput = {
  id?: string | null,
  setsConfig: string,
  sortOrder?: number | null,
  workoutID: string,
  name: string,
  description?: string | null,
  muscleGroup?: MuscleGroup | null,
  color?: string | null,
  restTimeInSeconds?: number | null,
  _version?: number | null,
};

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
  WEIGHTLIFTING = "WEIGHTLIFTING",
}


export type RoutineExerciseToUpdateInput = {
  id: string,
  setsConfig: string,
};

export type BulkCreateWorkoutExercisesResponse = {
  __typename: "BulkCreateWorkoutExercisesResponse",
  exercises:  Array<WorkoutExercise >,
  updatedRoutineExercises:  Array<RoutineExerciseToUpdateResponse | null >,
};

export type WorkoutExercise = {
  __typename: "WorkoutExercise",
  id: string,
  name: string,
  description?: string | null,
  muscleGroup?: MuscleGroup | null,
  color?: string | null,
  restTimeInSeconds?: number | null,
  setsConfig: string,
  sortOrder?: number | null,
  workoutID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type RoutineExerciseToUpdateResponse = {
  __typename: "RoutineExerciseToUpdateResponse",
  id: string,
  setsConfig: string,
};

export type ModelWorkoutExerciseConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  color?: ModelStringInput | null,
  restTimeInSeconds?: ModelIntInput | null,
  setsConfig?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  workoutID?: ModelIDInput | null,
  and?: Array< ModelWorkoutExerciseConditionInput | null > | null,
  or?: Array< ModelWorkoutExerciseConditionInput | null > | null,
  not?: ModelWorkoutExerciseConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelMuscleGroupInput = {
  eq?: MuscleGroup | null,
  ne?: MuscleGroup | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateWorkoutExerciseInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  muscleGroup?: MuscleGroup | null,
  color?: string | null,
  restTimeInSeconds?: number | null,
  setsConfig?: string | null,
  sortOrder?: number | null,
  workoutID?: string | null,
  _version?: number | null,
};

export type DeleteWorkoutExerciseInput = {
  id: string,
  _version?: number | null,
};

export type CreateWorkoutInput = {
  id?: string | null,
  name: string,
  status: WorkoutStatus,
  dateFinished?: string | null,
  totalTimeInSeconds?: number | null,
  userID: string,
  _version?: number | null,
};

export enum WorkoutStatus {
  INPROGRESS = "INPROGRESS",
  FINISHED = "FINISHED",
}


export type ModelWorkoutConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelWorkoutStatusInput | null,
  dateFinished?: ModelStringInput | null,
  totalTimeInSeconds?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelWorkoutConditionInput | null > | null,
  or?: Array< ModelWorkoutConditionInput | null > | null,
  not?: ModelWorkoutConditionInput | null,
};

export type ModelWorkoutStatusInput = {
  eq?: WorkoutStatus | null,
  ne?: WorkoutStatus | null,
};

export type Workout = {
  __typename: "Workout",
  id: string,
  name: string,
  status: WorkoutStatus,
  dateFinished?: string | null,
  totalTimeInSeconds?: number | null,
  userID: string,
  WorkoutExercises?: ModelWorkoutExerciseConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelWorkoutExerciseConnection = {
  __typename: "ModelWorkoutExerciseConnection",
  items:  Array<WorkoutExercise | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateWorkoutInput = {
  id: string,
  name?: string | null,
  status?: WorkoutStatus | null,
  dateFinished?: string | null,
  totalTimeInSeconds?: number | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteWorkoutInput = {
  id: string,
  _version?: number | null,
};

export type CreateExerciseInput = {
  id?: string | null,
  name: string,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  _version?: number | null,
};

export enum ExerciseEquipment {
  BARBELL = "BARBELL",
  BODYWEIGHT = "BODYWEIGHT",
  DUMBBELL = "DUMBBELL",
  EZBARBELL = "EZBARBELL",
  KETTLEBELL = "KETTLEBELL",
  LEVERAGEMACHINE = "LEVERAGEMACHINE",
  SLEDMACHINE = "SLEDMACHINE",
  SMITHMACHINE = "SMITHMACHINE",
  WEIGHTED = "WEIGHTED",
}


export type ModelExerciseConditionInput = {
  name?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  equipment?: ModelExerciseEquipmentInput | null,
  and?: Array< ModelExerciseConditionInput | null > | null,
  or?: Array< ModelExerciseConditionInput | null > | null,
  not?: ModelExerciseConditionInput | null,
};

export type ModelExerciseEquipmentInput = {
  eq?: ExerciseEquipment | null,
  ne?: ExerciseEquipment | null,
};

export type Exercise = {
  __typename: "Exercise",
  id: string,
  name: string,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateExerciseInput = {
  id: string,
  name?: string | null,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  _version?: number | null,
};

export type DeleteExerciseInput = {
  id: string,
  _version?: number | null,
};

export type CreateWorkoutRoutineExerciseInput = {
  id?: string | null,
  name: string,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  color?: string | null,
  description?: string | null,
  restTimeInSeconds?: number | null,
  sortOrder?: number | null,
  workoutPlanRoutineID: string,
  setsConfig: string,
  _version?: number | null,
};

export type ModelWorkoutRoutineExerciseConditionInput = {
  name?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  equipment?: ModelExerciseEquipmentInput | null,
  color?: ModelStringInput | null,
  description?: ModelStringInput | null,
  restTimeInSeconds?: ModelIntInput | null,
  sortOrder?: ModelIntInput | null,
  workoutPlanRoutineID?: ModelIDInput | null,
  setsConfig?: ModelStringInput | null,
  and?: Array< ModelWorkoutRoutineExerciseConditionInput | null > | null,
  or?: Array< ModelWorkoutRoutineExerciseConditionInput | null > | null,
  not?: ModelWorkoutRoutineExerciseConditionInput | null,
};

export type WorkoutRoutineExercise = {
  __typename: "WorkoutRoutineExercise",
  id: string,
  name: string,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  color?: string | null,
  description?: string | null,
  restTimeInSeconds?: number | null,
  sortOrder?: number | null,
  workoutPlanRoutineID: string,
  setsConfig: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateWorkoutRoutineExerciseInput = {
  id: string,
  name?: string | null,
  muscleGroup?: MuscleGroup | null,
  equipment?: ExerciseEquipment | null,
  color?: string | null,
  description?: string | null,
  restTimeInSeconds?: number | null,
  sortOrder?: number | null,
  workoutPlanRoutineID?: string | null,
  setsConfig?: string | null,
  _version?: number | null,
};

export type DeleteWorkoutRoutineExerciseInput = {
  id: string,
  _version?: number | null,
};

export type CreateWorkoutPlanRoutineInput = {
  id?: string | null,
  name: string,
  sortOrder?: number | null,
  workoutPlanID: string,
  _version?: number | null,
};

export type ModelWorkoutPlanRoutineConditionInput = {
  name?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  workoutPlanID?: ModelIDInput | null,
  and?: Array< ModelWorkoutPlanRoutineConditionInput | null > | null,
  or?: Array< ModelWorkoutPlanRoutineConditionInput | null > | null,
  not?: ModelWorkoutPlanRoutineConditionInput | null,
};

export type WorkoutPlanRoutine = {
  __typename: "WorkoutPlanRoutine",
  id: string,
  name: string,
  sortOrder?: number | null,
  workoutPlanID: string,
  WorkoutRoutineExercises?: ModelWorkoutRoutineExerciseConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelWorkoutRoutineExerciseConnection = {
  __typename: "ModelWorkoutRoutineExerciseConnection",
  items:  Array<WorkoutRoutineExercise | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateWorkoutPlanRoutineInput = {
  id: string,
  name?: string | null,
  sortOrder?: number | null,
  workoutPlanID?: string | null,
  _version?: number | null,
};

export type DeleteWorkoutPlanRoutineInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email?: string | null,
  image?: string | null,
  username?: string | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  image?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email?: string | null,
  image?: string | null,
  username?: string | null,
  WorkoutPlans?: ModelWorkoutPlanConnection | null,
  Workouts?: ModelWorkoutConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelWorkoutPlanConnection = {
  __typename: "ModelWorkoutPlanConnection",
  items:  Array<WorkoutPlan | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type WorkoutPlan = {
  __typename: "WorkoutPlan",
  id: string,
  name: string,
  userID: string,
  createdAt: string,
  WorkoutPlanRoutines?: ModelWorkoutPlanRoutineConnection | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelWorkoutPlanRoutineConnection = {
  __typename: "ModelWorkoutPlanRoutineConnection",
  items:  Array<WorkoutPlanRoutine | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelWorkoutConnection = {
  __typename: "ModelWorkoutConnection",
  items:  Array<Workout | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  image?: string | null,
  username?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateWorkoutPlanInput = {
  id?: string | null,
  name: string,
  userID: string,
  createdAt?: string | null,
  _version?: number | null,
};

export type ModelWorkoutPlanConditionInput = {
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelWorkoutPlanConditionInput | null > | null,
  or?: Array< ModelWorkoutPlanConditionInput | null > | null,
  not?: ModelWorkoutPlanConditionInput | null,
};

export type UpdateWorkoutPlanInput = {
  id: string,
  name?: string | null,
  userID?: string | null,
  createdAt?: string | null,
  _version?: number | null,
};

export type DeleteWorkoutPlanInput = {
  id: string,
  _version?: number | null,
};

export type ModelWorkoutExerciseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  color?: ModelStringInput | null,
  restTimeInSeconds?: ModelIntInput | null,
  setsConfig?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  workoutID?: ModelIDInput | null,
  and?: Array< ModelWorkoutExerciseFilterInput | null > | null,
  or?: Array< ModelWorkoutExerciseFilterInput | null > | null,
  not?: ModelWorkoutExerciseFilterInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelWorkoutFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelWorkoutStatusInput | null,
  dateFinished?: ModelStringInput | null,
  totalTimeInSeconds?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  _deleted?: ModelBooleanInput | null,
  and?: Array< ModelWorkoutFilterInput | null > | null,
  or?: Array< ModelWorkoutFilterInput | null > | null,
  not?: ModelWorkoutFilterInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelExerciseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  equipment?: ModelExerciseEquipmentInput | null,
  and?: Array< ModelExerciseFilterInput | null > | null,
  or?: Array< ModelExerciseFilterInput | null > | null,
  not?: ModelExerciseFilterInput | null,
};

export type ModelExerciseConnection = {
  __typename: "ModelExerciseConnection",
  items:  Array<Exercise | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelWorkoutRoutineExerciseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  muscleGroup?: ModelMuscleGroupInput | null,
  equipment?: ModelExerciseEquipmentInput | null,
  color?: ModelStringInput | null,
  description?: ModelStringInput | null,
  restTimeInSeconds?: ModelIntInput | null,
  sortOrder?: ModelIntInput | null,
  workoutPlanRoutineID?: ModelIDInput | null,
  setsConfig?: ModelStringInput | null,
  _deleted?: ModelBooleanInput | null,
  and?: Array< ModelWorkoutRoutineExerciseFilterInput | null > | null,
  or?: Array< ModelWorkoutRoutineExerciseFilterInput | null > | null,
  not?: ModelWorkoutRoutineExerciseFilterInput | null,
};

export type ModelWorkoutPlanRoutineFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  workoutPlanID?: ModelIDInput | null,
  _deleted?: ModelBooleanInput | null,
  and?: Array< ModelWorkoutPlanRoutineFilterInput | null > | null,
  or?: Array< ModelWorkoutPlanRoutineFilterInput | null > | null,
  not?: ModelWorkoutPlanRoutineFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  image?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelWorkoutPlanFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  _deleted?: ModelBooleanInput | null,
  and?: Array< ModelWorkoutPlanFilterInput | null > | null,
  or?: Array< ModelWorkoutPlanFilterInput | null > | null,
  not?: ModelWorkoutPlanFilterInput | null,
};

export type ModelSubscriptionWorkoutExerciseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  muscleGroup?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  restTimeInSeconds?: ModelSubscriptionIntInput | null,
  setsConfig?: ModelSubscriptionStringInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  workoutID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionWorkoutExerciseFilterInput | null > | null,
  or?: Array< ModelSubscriptionWorkoutExerciseFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionWorkoutFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  dateFinished?: ModelSubscriptionStringInput | null,
  totalTimeInSeconds?: ModelSubscriptionIntInput | null,
  userID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionWorkoutFilterInput | null > | null,
  or?: Array< ModelSubscriptionWorkoutFilterInput | null > | null,
};

export type ModelSubscriptionExerciseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  muscleGroup?: ModelSubscriptionStringInput | null,
  equipment?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExerciseFilterInput | null > | null,
  or?: Array< ModelSubscriptionExerciseFilterInput | null > | null,
};

export type ModelSubscriptionWorkoutRoutineExerciseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  muscleGroup?: ModelSubscriptionStringInput | null,
  equipment?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  restTimeInSeconds?: ModelSubscriptionIntInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  workoutPlanRoutineID?: ModelSubscriptionIDInput | null,
  setsConfig?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWorkoutRoutineExerciseFilterInput | null > | null,
  or?: Array< ModelSubscriptionWorkoutRoutineExerciseFilterInput | null > | null,
};

export type ModelSubscriptionWorkoutPlanRoutineFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  workoutPlanID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionWorkoutPlanRoutineFilterInput | null > | null,
  or?: Array< ModelSubscriptionWorkoutPlanRoutineFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionWorkoutPlanFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWorkoutPlanFilterInput | null > | null,
  or?: Array< ModelSubscriptionWorkoutPlanFilterInput | null > | null,
};

export type DeletePlanAndRoutinesMutationVariables = {
  planId: string,
};

export type DeletePlanAndRoutinesMutation = {
  deletePlanAndRoutines?:  {
    __typename: "DeletePlanAndRoutinesResponse",
    id: string,
  } | null,
};

export type DeleteWorkoutAndExercisesMutationVariables = {
  workoutId: string,
};

export type DeleteWorkoutAndExercisesMutation = {
  deleteWorkoutAndExercises?:  {
    __typename: "DeleteWorkoutAndExercisesResponse",
    id: string,
  } | null,
};

export type BulkCreateWorkoutExercisesMutationVariables = {
  exercises: Array< CreateWorkoutExerciseInput >,
  routineExercisesToUpdate?: Array< RoutineExerciseToUpdateInput | null > | null,
};

export type BulkCreateWorkoutExercisesMutation = {
  bulkCreateWorkoutExercises?:  {
    __typename: "BulkCreateWorkoutExercisesResponse",
    exercises:  Array< {
      __typename: "WorkoutExercise",
      id: string,
      name: string,
      description?: string | null,
      muscleGroup?: MuscleGroup | null,
      color?: string | null,
      restTimeInSeconds?: number | null,
      setsConfig: string,
      sortOrder?: number | null,
      workoutID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } >,
    updatedRoutineExercises:  Array< {
      __typename: "RoutineExerciseToUpdateResponse",
      id: string,
      setsConfig: string,
    } | null >,
  } | null,
};

export type CreateWorkoutExerciseMutationVariables = {
  input: CreateWorkoutExerciseInput,
  condition?: ModelWorkoutExerciseConditionInput | null,
};

export type CreateWorkoutExerciseMutation = {
  createWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWorkoutExerciseMutationVariables = {
  input: UpdateWorkoutExerciseInput,
  condition?: ModelWorkoutExerciseConditionInput | null,
};

export type UpdateWorkoutExerciseMutation = {
  updateWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWorkoutExerciseMutationVariables = {
  input: DeleteWorkoutExerciseInput,
  condition?: ModelWorkoutExerciseConditionInput | null,
};

export type DeleteWorkoutExerciseMutation = {
  deleteWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateWorkoutMutationVariables = {
  input: CreateWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type CreateWorkoutMutation = {
  createWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWorkoutMutationVariables = {
  input: UpdateWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type UpdateWorkoutMutation = {
  updateWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWorkoutMutationVariables = {
  input: DeleteWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type DeleteWorkoutMutation = {
  deleteWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateExerciseMutationVariables = {
  input: CreateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type CreateExerciseMutation = {
  createExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateExerciseMutationVariables = {
  input: UpdateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type UpdateExerciseMutation = {
  updateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteExerciseMutationVariables = {
  input: DeleteExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type DeleteExerciseMutation = {
  deleteExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateWorkoutRoutineExerciseMutationVariables = {
  input: CreateWorkoutRoutineExerciseInput,
  condition?: ModelWorkoutRoutineExerciseConditionInput | null,
};

export type CreateWorkoutRoutineExerciseMutation = {
  createWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWorkoutRoutineExerciseMutationVariables = {
  input: UpdateWorkoutRoutineExerciseInput,
  condition?: ModelWorkoutRoutineExerciseConditionInput | null,
};

export type UpdateWorkoutRoutineExerciseMutation = {
  updateWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWorkoutRoutineExerciseMutationVariables = {
  input: DeleteWorkoutRoutineExerciseInput,
  condition?: ModelWorkoutRoutineExerciseConditionInput | null,
};

export type DeleteWorkoutRoutineExerciseMutation = {
  deleteWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateWorkoutPlanRoutineMutationVariables = {
  input: CreateWorkoutPlanRoutineInput,
  condition?: ModelWorkoutPlanRoutineConditionInput | null,
};

export type CreateWorkoutPlanRoutineMutation = {
  createWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWorkoutPlanRoutineMutationVariables = {
  input: UpdateWorkoutPlanRoutineInput,
  condition?: ModelWorkoutPlanRoutineConditionInput | null,
};

export type UpdateWorkoutPlanRoutineMutation = {
  updateWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWorkoutPlanRoutineMutationVariables = {
  input: DeleteWorkoutPlanRoutineInput,
  condition?: ModelWorkoutPlanRoutineConditionInput | null,
};

export type DeleteWorkoutPlanRoutineMutation = {
  deleteWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateWorkoutPlanMutationVariables = {
  input: CreateWorkoutPlanInput,
  condition?: ModelWorkoutPlanConditionInput | null,
};

export type CreateWorkoutPlanMutation = {
  createWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWorkoutPlanMutationVariables = {
  input: UpdateWorkoutPlanInput,
  condition?: ModelWorkoutPlanConditionInput | null,
};

export type UpdateWorkoutPlanMutation = {
  updateWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWorkoutPlanMutationVariables = {
  input: DeleteWorkoutPlanInput,
  condition?: ModelWorkoutPlanConditionInput | null,
};

export type DeleteWorkoutPlanMutation = {
  deleteWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetWorkoutExerciseQueryVariables = {
  id: string,
};

export type GetWorkoutExerciseQuery = {
  getWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWorkoutExercisesQueryVariables = {
  filter?: ModelWorkoutExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutExercisesQuery = {
  listWorkoutExercises?:  {
    __typename: "ModelWorkoutExerciseConnection",
    items:  Array< {
      __typename: "WorkoutExercise",
      id: string,
      name: string,
      description?: string | null,
      muscleGroup?: MuscleGroup | null,
      color?: string | null,
      restTimeInSeconds?: number | null,
      setsConfig: string,
      sortOrder?: number | null,
      workoutID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWorkoutExercisesQueryVariables = {
  filter?: ModelWorkoutExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWorkoutExercisesQuery = {
  syncWorkoutExercises?:  {
    __typename: "ModelWorkoutExerciseConnection",
    items:  Array< {
      __typename: "WorkoutExercise",
      id: string,
      name: string,
      description?: string | null,
      muscleGroup?: MuscleGroup | null,
      color?: string | null,
      restTimeInSeconds?: number | null,
      setsConfig: string,
      sortOrder?: number | null,
      workoutID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutExercisesByWorkoutIDAndSortOrderQueryVariables = {
  workoutID: string,
  sortOrder?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutExercisesByWorkoutIDAndSortOrderQuery = {
  workoutExercisesByWorkoutIDAndSortOrder?:  {
    __typename: "ModelWorkoutExerciseConnection",
    items:  Array< {
      __typename: "WorkoutExercise",
      id: string,
      name: string,
      description?: string | null,
      muscleGroup?: MuscleGroup | null,
      color?: string | null,
      restTimeInSeconds?: number | null,
      setsConfig: string,
      sortOrder?: number | null,
      workoutID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetWorkoutQueryVariables = {
  id: string,
};

export type GetWorkoutQuery = {
  getWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWorkoutsQueryVariables = {
  filter?: ModelWorkoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutsQuery = {
  listWorkouts?:  {
    __typename: "ModelWorkoutConnection",
    items:  Array< {
      __typename: "Workout",
      id: string,
      name: string,
      status: WorkoutStatus,
      dateFinished?: string | null,
      totalTimeInSeconds?: number | null,
      userID: string,
      WorkoutExercises?:  {
        __typename: "ModelWorkoutExerciseConnection",
        items:  Array< {
          __typename: "WorkoutExercise",
          id: string,
          name: string,
          description?: string | null,
          muscleGroup?: MuscleGroup | null,
          color?: string | null,
          restTimeInSeconds?: number | null,
          setsConfig: string,
          sortOrder?: number | null,
          workoutID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWorkoutsQueryVariables = {
  filter?: ModelWorkoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWorkoutsQuery = {
  syncWorkouts?:  {
    __typename: "ModelWorkoutConnection",
    items:  Array< {
      __typename: "Workout",
      id: string,
      name: string,
      status: WorkoutStatus,
      dateFinished?: string | null,
      totalTimeInSeconds?: number | null,
      userID: string,
      WorkoutExercises?:  {
        __typename: "ModelWorkoutExerciseConnection",
        items:  Array< {
          __typename: "WorkoutExercise",
          id: string,
          name: string,
          description?: string | null,
          muscleGroup?: MuscleGroup | null,
          color?: string | null,
          restTimeInSeconds?: number | null,
          setsConfig: string,
          sortOrder?: number | null,
          workoutID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutsByDateQueryVariables = {
  status: WorkoutStatus,
  dateFinished?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutsByDateQuery = {
  workoutsByDate?:  {
    __typename: "ModelWorkoutConnection",
    items:  Array< {
      __typename: "Workout",
      id: string,
      name: string,
      status: WorkoutStatus,
      dateFinished?: string | null,
      totalTimeInSeconds?: number | null,
      userID: string,
      WorkoutExercises?:  {
        __typename: "ModelWorkoutExerciseConnection",
        items:  Array< {
          __typename: "WorkoutExercise",
          id: string,
          name: string,
          description?: string | null,
          muscleGroup?: MuscleGroup | null,
          color?: string | null,
          restTimeInSeconds?: number | null,
          setsConfig: string,
          sortOrder?: number | null,
          workoutID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutsByUserQueryVariables = {
  userID: string,
  dateFinished?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutsByUserQuery = {
  workoutsByUser?:  {
    __typename: "ModelWorkoutConnection",
    items:  Array< {
      __typename: "Workout",
      id: string,
      name: string,
      status: WorkoutStatus,
      dateFinished?: string | null,
      totalTimeInSeconds?: number | null,
      userID: string,
      WorkoutExercises?:  {
        __typename: "ModelWorkoutExerciseConnection",
        items:  Array< {
          __typename: "WorkoutExercise",
          id: string,
          name: string,
          description?: string | null,
          muscleGroup?: MuscleGroup | null,
          color?: string | null,
          restTimeInSeconds?: number | null,
          setsConfig: string,
          sortOrder?: number | null,
          workoutID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetExerciseQueryVariables = {
  id: string,
};

export type GetExerciseQuery = {
  getExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListExercisesQueryVariables = {
  filter?: ModelExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExercisesQuery = {
  listExercises?:  {
    __typename: "ModelExerciseConnection",
    items:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      muscleGroup?: MuscleGroup | null,
      equipment?: ExerciseEquipment | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncExercisesQueryVariables = {
  filter?: ModelExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncExercisesQuery = {
  syncExercises?:  {
    __typename: "ModelExerciseConnection",
    items:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      muscleGroup?: MuscleGroup | null,
      equipment?: ExerciseEquipment | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetWorkoutRoutineExerciseQueryVariables = {
  id: string,
};

export type GetWorkoutRoutineExerciseQuery = {
  getWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWorkoutRoutineExercisesQueryVariables = {
  filter?: ModelWorkoutRoutineExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutRoutineExercisesQuery = {
  listWorkoutRoutineExercises?:  {
    __typename: "ModelWorkoutRoutineExerciseConnection",
    items:  Array< {
      __typename: "WorkoutRoutineExercise",
      id: string,
      name: string,
      muscleGroup?: MuscleGroup | null,
      equipment?: ExerciseEquipment | null,
      color?: string | null,
      description?: string | null,
      restTimeInSeconds?: number | null,
      sortOrder?: number | null,
      workoutPlanRoutineID: string,
      setsConfig: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWorkoutRoutineExercisesQueryVariables = {
  filter?: ModelWorkoutRoutineExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWorkoutRoutineExercisesQuery = {
  syncWorkoutRoutineExercises?:  {
    __typename: "ModelWorkoutRoutineExerciseConnection",
    items:  Array< {
      __typename: "WorkoutRoutineExercise",
      id: string,
      name: string,
      muscleGroup?: MuscleGroup | null,
      equipment?: ExerciseEquipment | null,
      color?: string | null,
      description?: string | null,
      restTimeInSeconds?: number | null,
      sortOrder?: number | null,
      workoutPlanRoutineID: string,
      setsConfig: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutRoutineExercisesByWorkoutPlanRoutineIDQueryVariables = {
  workoutPlanRoutineID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutRoutineExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutRoutineExercisesByWorkoutPlanRoutineIDQuery = {
  workoutRoutineExercisesByWorkoutPlanRoutineID?:  {
    __typename: "ModelWorkoutRoutineExerciseConnection",
    items:  Array< {
      __typename: "WorkoutRoutineExercise",
      id: string,
      name: string,
      muscleGroup?: MuscleGroup | null,
      equipment?: ExerciseEquipment | null,
      color?: string | null,
      description?: string | null,
      restTimeInSeconds?: number | null,
      sortOrder?: number | null,
      workoutPlanRoutineID: string,
      setsConfig: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetWorkoutPlanRoutineQueryVariables = {
  id: string,
};

export type GetWorkoutPlanRoutineQuery = {
  getWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWorkoutPlanRoutinesQueryVariables = {
  filter?: ModelWorkoutPlanRoutineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutPlanRoutinesQuery = {
  listWorkoutPlanRoutines?:  {
    __typename: "ModelWorkoutPlanRoutineConnection",
    items:  Array< {
      __typename: "WorkoutPlanRoutine",
      id: string,
      name: string,
      sortOrder?: number | null,
      workoutPlanID: string,
      WorkoutRoutineExercises?:  {
        __typename: "ModelWorkoutRoutineExerciseConnection",
        items:  Array< {
          __typename: "WorkoutRoutineExercise",
          id: string,
          name: string,
          muscleGroup?: MuscleGroup | null,
          equipment?: ExerciseEquipment | null,
          color?: string | null,
          description?: string | null,
          restTimeInSeconds?: number | null,
          sortOrder?: number | null,
          workoutPlanRoutineID: string,
          setsConfig: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWorkoutPlanRoutinesQueryVariables = {
  filter?: ModelWorkoutPlanRoutineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWorkoutPlanRoutinesQuery = {
  syncWorkoutPlanRoutines?:  {
    __typename: "ModelWorkoutPlanRoutineConnection",
    items:  Array< {
      __typename: "WorkoutPlanRoutine",
      id: string,
      name: string,
      sortOrder?: number | null,
      workoutPlanID: string,
      WorkoutRoutineExercises?:  {
        __typename: "ModelWorkoutRoutineExerciseConnection",
        items:  Array< {
          __typename: "WorkoutRoutineExercise",
          id: string,
          name: string,
          muscleGroup?: MuscleGroup | null,
          equipment?: ExerciseEquipment | null,
          color?: string | null,
          description?: string | null,
          restTimeInSeconds?: number | null,
          sortOrder?: number | null,
          workoutPlanRoutineID: string,
          setsConfig: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutPlanRoutinesByWorkoutPlanIDQueryVariables = {
  workoutPlanID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutPlanRoutineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutPlanRoutinesByWorkoutPlanIDQuery = {
  workoutPlanRoutinesByWorkoutPlanID?:  {
    __typename: "ModelWorkoutPlanRoutineConnection",
    items:  Array< {
      __typename: "WorkoutPlanRoutine",
      id: string,
      name: string,
      sortOrder?: number | null,
      workoutPlanID: string,
      WorkoutRoutineExercises?:  {
        __typename: "ModelWorkoutRoutineExerciseConnection",
        items:  Array< {
          __typename: "WorkoutRoutineExercise",
          id: string,
          name: string,
          muscleGroup?: MuscleGroup | null,
          equipment?: ExerciseEquipment | null,
          color?: string | null,
          description?: string | null,
          restTimeInSeconds?: number | null,
          sortOrder?: number | null,
          workoutPlanRoutineID: string,
          setsConfig: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      image?: string | null,
      username?: string | null,
      WorkoutPlans?:  {
        __typename: "ModelWorkoutPlanConnection",
        items:  Array< {
          __typename: "WorkoutPlan",
          id: string,
          name: string,
          userID: string,
          createdAt: string,
          WorkoutPlanRoutines?:  {
            __typename: "ModelWorkoutPlanRoutineConnection",
            items:  Array< {
              __typename: "WorkoutPlanRoutine",
              id: string,
              name: string,
              sortOrder?: number | null,
              workoutPlanID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      Workouts?:  {
        __typename: "ModelWorkoutConnection",
        items:  Array< {
          __typename: "Workout",
          id: string,
          name: string,
          status: WorkoutStatus,
          dateFinished?: string | null,
          totalTimeInSeconds?: number | null,
          userID: string,
          WorkoutExercises?:  {
            __typename: "ModelWorkoutExerciseConnection",
            items:  Array< {
              __typename: "WorkoutExercise",
              id: string,
              name: string,
              description?: string | null,
              muscleGroup?: MuscleGroup | null,
              color?: string | null,
              restTimeInSeconds?: number | null,
              setsConfig: string,
              sortOrder?: number | null,
              workoutID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      image?: string | null,
      username?: string | null,
      WorkoutPlans?:  {
        __typename: "ModelWorkoutPlanConnection",
        items:  Array< {
          __typename: "WorkoutPlan",
          id: string,
          name: string,
          userID: string,
          createdAt: string,
          WorkoutPlanRoutines?:  {
            __typename: "ModelWorkoutPlanRoutineConnection",
            items:  Array< {
              __typename: "WorkoutPlanRoutine",
              id: string,
              name: string,
              sortOrder?: number | null,
              workoutPlanID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      Workouts?:  {
        __typename: "ModelWorkoutConnection",
        items:  Array< {
          __typename: "Workout",
          id: string,
          name: string,
          status: WorkoutStatus,
          dateFinished?: string | null,
          totalTimeInSeconds?: number | null,
          userID: string,
          WorkoutExercises?:  {
            __typename: "ModelWorkoutExerciseConnection",
            items:  Array< {
              __typename: "WorkoutExercise",
              id: string,
              name: string,
              description?: string | null,
              muscleGroup?: MuscleGroup | null,
              color?: string | null,
              restTimeInSeconds?: number | null,
              setsConfig: string,
              sortOrder?: number | null,
              workoutID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByUsernameQuery = {
  usersByUsername?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      image?: string | null,
      username?: string | null,
      WorkoutPlans?:  {
        __typename: "ModelWorkoutPlanConnection",
        items:  Array< {
          __typename: "WorkoutPlan",
          id: string,
          name: string,
          userID: string,
          createdAt: string,
          WorkoutPlanRoutines?:  {
            __typename: "ModelWorkoutPlanRoutineConnection",
            items:  Array< {
              __typename: "WorkoutPlanRoutine",
              id: string,
              name: string,
              sortOrder?: number | null,
              workoutPlanID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      Workouts?:  {
        __typename: "ModelWorkoutConnection",
        items:  Array< {
          __typename: "Workout",
          id: string,
          name: string,
          status: WorkoutStatus,
          dateFinished?: string | null,
          totalTimeInSeconds?: number | null,
          userID: string,
          WorkoutExercises?:  {
            __typename: "ModelWorkoutExerciseConnection",
            items:  Array< {
              __typename: "WorkoutExercise",
              id: string,
              name: string,
              description?: string | null,
              muscleGroup?: MuscleGroup | null,
              color?: string | null,
              restTimeInSeconds?: number | null,
              setsConfig: string,
              sortOrder?: number | null,
              workoutID: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetWorkoutPlanQueryVariables = {
  id: string,
};

export type GetWorkoutPlanQuery = {
  getWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWorkoutPlansQueryVariables = {
  filter?: ModelWorkoutPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutPlansQuery = {
  listWorkoutPlans?:  {
    __typename: "ModelWorkoutPlanConnection",
    items:  Array< {
      __typename: "WorkoutPlan",
      id: string,
      name: string,
      userID: string,
      createdAt: string,
      WorkoutPlanRoutines?:  {
        __typename: "ModelWorkoutPlanRoutineConnection",
        items:  Array< {
          __typename: "WorkoutPlanRoutine",
          id: string,
          name: string,
          sortOrder?: number | null,
          workoutPlanID: string,
          WorkoutRoutineExercises?:  {
            __typename: "ModelWorkoutRoutineExerciseConnection",
            items:  Array< {
              __typename: "WorkoutRoutineExercise",
              id: string,
              name: string,
              muscleGroup?: MuscleGroup | null,
              equipment?: ExerciseEquipment | null,
              color?: string | null,
              description?: string | null,
              restTimeInSeconds?: number | null,
              sortOrder?: number | null,
              workoutPlanRoutineID: string,
              setsConfig: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWorkoutPlansQueryVariables = {
  filter?: ModelWorkoutPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWorkoutPlansQuery = {
  syncWorkoutPlans?:  {
    __typename: "ModelWorkoutPlanConnection",
    items:  Array< {
      __typename: "WorkoutPlan",
      id: string,
      name: string,
      userID: string,
      createdAt: string,
      WorkoutPlanRoutines?:  {
        __typename: "ModelWorkoutPlanRoutineConnection",
        items:  Array< {
          __typename: "WorkoutPlanRoutine",
          id: string,
          name: string,
          sortOrder?: number | null,
          workoutPlanID: string,
          WorkoutRoutineExercises?:  {
            __typename: "ModelWorkoutRoutineExerciseConnection",
            items:  Array< {
              __typename: "WorkoutRoutineExercise",
              id: string,
              name: string,
              muscleGroup?: MuscleGroup | null,
              equipment?: ExerciseEquipment | null,
              color?: string | null,
              description?: string | null,
              restTimeInSeconds?: number | null,
              sortOrder?: number | null,
              workoutPlanRoutineID: string,
              setsConfig: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type WorkoutPlansByUserIDAndCreatedAtQueryVariables = {
  userID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWorkoutPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WorkoutPlansByUserIDAndCreatedAtQuery = {
  workoutPlansByUserIDAndCreatedAt?:  {
    __typename: "ModelWorkoutPlanConnection",
    items:  Array< {
      __typename: "WorkoutPlan",
      id: string,
      name: string,
      userID: string,
      createdAt: string,
      WorkoutPlanRoutines?:  {
        __typename: "ModelWorkoutPlanRoutineConnection",
        items:  Array< {
          __typename: "WorkoutPlanRoutine",
          id: string,
          name: string,
          sortOrder?: number | null,
          workoutPlanID: string,
          WorkoutRoutineExercises?:  {
            __typename: "ModelWorkoutRoutineExerciseConnection",
            items:  Array< {
              __typename: "WorkoutRoutineExercise",
              id: string,
              name: string,
              muscleGroup?: MuscleGroup | null,
              equipment?: ExerciseEquipment | null,
              color?: string | null,
              description?: string | null,
              restTimeInSeconds?: number | null,
              sortOrder?: number | null,
              workoutPlanRoutineID: string,
              setsConfig: string,
              createdAt: string,
              updatedAt: string,
              _version: number,
              _deleted?: boolean | null,
              _lastChangedAt: number,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
            startedAt?: number | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateWorkoutExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutExerciseFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoutExerciseSubscription = {
  onCreateWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWorkoutExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutExerciseFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoutExerciseSubscription = {
  onUpdateWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWorkoutExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutExerciseFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoutExerciseSubscription = {
  onDeleteWorkoutExercise?:  {
    __typename: "WorkoutExercise",
    id: string,
    name: string,
    description?: string | null,
    muscleGroup?: MuscleGroup | null,
    color?: string | null,
    restTimeInSeconds?: number | null,
    setsConfig: string,
    sortOrder?: number | null,
    workoutID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoutSubscription = {
  onCreateWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoutSubscription = {
  onUpdateWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWorkoutSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoutSubscription = {
  onDeleteWorkout?:  {
    __typename: "Workout",
    id: string,
    name: string,
    status: WorkoutStatus,
    dateFinished?: string | null,
    totalTimeInSeconds?: number | null,
    userID: string,
    WorkoutExercises?:  {
      __typename: "ModelWorkoutExerciseConnection",
      items:  Array< {
        __typename: "WorkoutExercise",
        id: string,
        name: string,
        description?: string | null,
        muscleGroup?: MuscleGroup | null,
        color?: string | null,
        restTimeInSeconds?: number | null,
        setsConfig: string,
        sortOrder?: number | null,
        workoutID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionExerciseFilterInput | null,
  owner?: string | null,
};

export type OnCreateExerciseSubscription = {
  onCreateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionExerciseFilterInput | null,
  owner?: string | null,
};

export type OnUpdateExerciseSubscription = {
  onUpdateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionExerciseFilterInput | null,
  owner?: string | null,
};

export type OnDeleteExerciseSubscription = {
  onDeleteExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateWorkoutRoutineExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutRoutineExerciseFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoutRoutineExerciseSubscription = {
  onCreateWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWorkoutRoutineExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutRoutineExerciseFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoutRoutineExerciseSubscription = {
  onUpdateWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWorkoutRoutineExerciseSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutRoutineExerciseFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoutRoutineExerciseSubscription = {
  onDeleteWorkoutRoutineExercise?:  {
    __typename: "WorkoutRoutineExercise",
    id: string,
    name: string,
    muscleGroup?: MuscleGroup | null,
    equipment?: ExerciseEquipment | null,
    color?: string | null,
    description?: string | null,
    restTimeInSeconds?: number | null,
    sortOrder?: number | null,
    workoutPlanRoutineID: string,
    setsConfig: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateWorkoutPlanRoutineSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanRoutineFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoutPlanRoutineSubscription = {
  onCreateWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWorkoutPlanRoutineSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanRoutineFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoutPlanRoutineSubscription = {
  onUpdateWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWorkoutPlanRoutineSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanRoutineFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoutPlanRoutineSubscription = {
  onDeleteWorkoutPlanRoutine?:  {
    __typename: "WorkoutPlanRoutine",
    id: string,
    name: string,
    sortOrder?: number | null,
    workoutPlanID: string,
    WorkoutRoutineExercises?:  {
      __typename: "ModelWorkoutRoutineExerciseConnection",
      items:  Array< {
        __typename: "WorkoutRoutineExercise",
        id: string,
        name: string,
        muscleGroup?: MuscleGroup | null,
        equipment?: ExerciseEquipment | null,
        color?: string | null,
        description?: string | null,
        restTimeInSeconds?: number | null,
        sortOrder?: number | null,
        workoutPlanRoutineID: string,
        setsConfig: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    image?: string | null,
    username?: string | null,
    WorkoutPlans?:  {
      __typename: "ModelWorkoutPlanConnection",
      items:  Array< {
        __typename: "WorkoutPlan",
        id: string,
        name: string,
        userID: string,
        createdAt: string,
        WorkoutPlanRoutines?:  {
          __typename: "ModelWorkoutPlanRoutineConnection",
          items:  Array< {
            __typename: "WorkoutPlanRoutine",
            id: string,
            name: string,
            sortOrder?: number | null,
            workoutPlanID: string,
            WorkoutRoutineExercises?:  {
              __typename: "ModelWorkoutRoutineExerciseConnection",
              nextToken?: string | null,
              startedAt?: number | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Workouts?:  {
      __typename: "ModelWorkoutConnection",
      items:  Array< {
        __typename: "Workout",
        id: string,
        name: string,
        status: WorkoutStatus,
        dateFinished?: string | null,
        totalTimeInSeconds?: number | null,
        userID: string,
        WorkoutExercises?:  {
          __typename: "ModelWorkoutExerciseConnection",
          items:  Array< {
            __typename: "WorkoutExercise",
            id: string,
            name: string,
            description?: string | null,
            muscleGroup?: MuscleGroup | null,
            color?: string | null,
            restTimeInSeconds?: number | null,
            setsConfig: string,
            sortOrder?: number | null,
            workoutID: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateWorkoutPlanSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanFilterInput | null,
  owner?: string | null,
};

export type OnCreateWorkoutPlanSubscription = {
  onCreateWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWorkoutPlanSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWorkoutPlanSubscription = {
  onUpdateWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWorkoutPlanSubscriptionVariables = {
  filter?: ModelSubscriptionWorkoutPlanFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWorkoutPlanSubscription = {
  onDeleteWorkoutPlan?:  {
    __typename: "WorkoutPlan",
    id: string,
    name: string,
    userID: string,
    createdAt: string,
    WorkoutPlanRoutines?:  {
      __typename: "ModelWorkoutPlanRoutineConnection",
      items:  Array< {
        __typename: "WorkoutPlanRoutine",
        id: string,
        name: string,
        sortOrder?: number | null,
        workoutPlanID: string,
        WorkoutRoutineExercises?:  {
          __typename: "ModelWorkoutRoutineExerciseConnection",
          items:  Array< {
            __typename: "WorkoutRoutineExercise",
            id: string,
            name: string,
            muscleGroup?: MuscleGroup | null,
            equipment?: ExerciseEquipment | null,
            color?: string | null,
            description?: string | null,
            restTimeInSeconds?: number | null,
            sortOrder?: number | null,
            workoutPlanRoutineID: string,
            setsConfig: string,
            createdAt: string,
            updatedAt: string,
            _version: number,
            _deleted?: boolean | null,
            _lastChangedAt: number,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
          startedAt?: number | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
