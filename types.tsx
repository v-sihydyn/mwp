/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Exercise } from './src/screens/ExerciseCatalogScreen/exercises';
import { DraftWorkout, DraftWorkoutExercise } from './src/types/draftWorkout';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: undefined;
  EditProfile: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  RoutineReminders: undefined;
  RoutinesManagement: undefined;
  ExerciseCatalog: {
    workoutPlanId: string;
    workoutRoutineId: string;
  };
  AddExerciseToRoutine: {
    workoutPlanId: string;
    workoutRoutineId: string;
    exercise?: Exercise;
  };
  ConfigureWorkout: {
    workoutRoutineId: string;
  };
  Workout: {
    workoutRoutineId: string;
    restTimeInSeconds: number;
    draftWorkout: DraftWorkout;
    draftWorkoutExercises: DraftWorkoutExercise[];
    displayedExerciseIndex?: number;
    currentSetId?: string | null;
    totalTimeInSeconds?: number;
  };
  WorkoutDetails: {
    id: string;
    title: string;
    workout: DraftWorkout;
    workoutExercises: DraftWorkoutExercise[];
  };
  EditRoutineExercise: {
    workoutPlanId: string;
    workoutRoutineId: string;
    exerciseId: string;
  };
  NotFound: undefined;
};

// ExerciseCatalog

export type ExerciseCatalogNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExerciseCatalog'
>;
export type ExerciseCatalogRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseCatalog'
>;

// AddExerciseToRoutine

export type AddExerciseToRoutineNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;
export type AddExerciseToRoutineRouteProp = RouteProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;

// EditRoutineExercise

export type EditRoutineExerciseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditRoutineExercise'
>;
export type EditRoutineExerciseRouteProp = RouteProp<
  RootStackParamList,
  'EditRoutineExercise'
>;

// EditRoutineExercise

export type ConfigureWorkoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConfigureWorkout'
>;
export type ConfigureWorkoutRouteProp = RouteProp<
  RootStackParamList,
  'ConfigureWorkout'
>;

// WorkoutDetails

export type WorkoutDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WorkoutDetails'
>;
export type WorkoutDetailsRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutDetails'
>;

// Workout

export type WorkoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Workout'
>;
export type WorkoutRouteProp = RouteProp<RootStackParamList, 'Workout'>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  WorkoutPlan: undefined;
  Statistics: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
