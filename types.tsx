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
  };
  ConfigureWorkout: undefined;
  Workout: undefined;
  WorkoutDetails: undefined;
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
