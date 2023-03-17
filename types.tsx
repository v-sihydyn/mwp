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
  AddExerciseToRoutine: {
    workoutPlanId: string;
    workoutRoutineId: string;
  };
  AddCustomExerciseToRoutine: {
    workoutPlanId: string;
    workoutRoutineId: string;
  };
  ConfigureWorkout: undefined;
  Workout: undefined;
  WorkoutDetails: undefined;
  EditRoutineExercise: undefined;
  NotFound: undefined;
};

// AddExerciseToRoutine

export type AddExerciseToRoutineNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;
export type AddExerciseToRoutineRouteProp = RouteProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;

// AddCustomExerciseToRoutine

export type AddCustomExerciseToRoutineNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'AddCustomExerciseToRoutine'>;
export type AddCustomExerciseToRoutineRouteProp = RouteProp<
  RootStackParamList,
  'AddCustomExerciseToRoutine'
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
