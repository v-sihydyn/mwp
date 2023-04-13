import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  DisplayWorkoutExercise,
  DraftWorkout,
  DraftWorkoutExercise,
} from './draftWorkout';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Exercise } from './exercise';

export type AuthStackNavigatorParamList = {
  'Sign in': undefined;
  'Sign up': undefined;
  'Confirm email': { email?: string };
  'Forgot password': undefined;
  'New password': undefined;
};

export type SignInNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Sign in'
>;

export type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Sign up'
>;

export type ConfirmEmailNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Confirm email'
>;
export type ConfirmEmailRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'Confirm email'
>;

export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Forgot password'
>;

export type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'New password'
>;
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
    workoutExercises: DisplayWorkoutExercise[];
  };
  EditRoutineExercise: {
    workoutPlanId: string;
    workoutRoutineId: string;
    exerciseId: string;
  };
  NotFound: undefined;
};
export type ExerciseCatalogNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExerciseCatalog'
>;
export type ExerciseCatalogRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseCatalog'
>;
export type AddExerciseToRoutineNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;
export type AddExerciseToRoutineRouteProp = RouteProp<
  RootStackParamList,
  'AddExerciseToRoutine'
>;
export type EditRoutineExerciseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditRoutineExercise'
>;
export type EditRoutineExerciseRouteProp = RouteProp<
  RootStackParamList,
  'EditRoutineExercise'
>;
export type ConfigureWorkoutNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConfigureWorkout'
>;
export type ConfigureWorkoutRouteProp = RouteProp<
  RootStackParamList,
  'ConfigureWorkout'
>;
export type WorkoutDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WorkoutDetails'
>;
export type WorkoutDetailsRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutDetails'
>;
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
