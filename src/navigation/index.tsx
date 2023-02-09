import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { MyWorkoutScreen } from '../screens/MyWorkoutScreen/MyWorkoutScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen/StatisticsScreen';
import { RootStackParamList, RootTabParamList } from '../../types';
import { RoutineRemindersScreen } from '../screens/RoutineRemindersScreen/RoutineRemindersScreen';
import { ModalSlideFromBottomIOS } from './customModalTransition';
import { RoutinesManagementScreen } from '../screens/RoutinesManagementScreen/RoutinesManagementScreen';
import { colors } from '../styles/colors';
import { AddExerciseToRoutineScreen } from '../screens/AddExerciseToRoutineScreen/AddExerciseToRoutineScreen';
import { ExerciseFilterInput } from '../screens/AddExerciseToRoutineScreen/components/ExerciseFilterInput/ExerciseFilterInput';
import { AddCustomExerciseToRoutineScreen } from '../screens/AddCustomExerciseToRoutineScreen/AddCustomExerciseToRoutineScreen';
import { ConfigureWorkoutScreen } from '../screens/ConfigureWorkoutScreen/ConfigureWorkoutScreen';
import { WorkoutScreen } from '../screens/WorkoutScreen/WorkoutScreen';
import { WorkoutDetailsScreen } from '../screens/WorkoutDetailsScreen/WorkoutDetailsScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { Icon, IconProps } from '../components/Icon/Icon';
import { EditRoutineExerciseScreen } from '../screens/EditRoutineExerciseScreen/EditRoutineExerciseScreen';

export default function Navigation() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false, title: '' }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />

      <Stack.Group
        screenOptions={{
          ...ModalSlideFromBottomIOS,
          headerStyle: { backgroundColor: colors.page },
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="RoutineReminders"
          component={RoutineRemindersScreen}
          options={{
            title: 'Routine Reminders',
          }}
        />
        <Stack.Screen
          name="RoutinesManagement"
          component={RoutinesManagementScreen}
          options={{
            title: 'Routines Management',
          }}
        />
        <Stack.Screen
          name="AddExerciseToRoutine"
          component={AddExerciseToRoutineScreen}
          options={{
            title: '',
            headerRight: () => <ExerciseFilterInput />,
          }}
        />
        <Stack.Screen
          name="AddCustomExerciseToRoutine"
          component={AddCustomExerciseToRoutineScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="ConfigureWorkout"
          component={ConfigureWorkoutScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            title: '',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="WorkoutDetails"
          component={WorkoutDetailsScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="EditRoutineExercise"
          component={EditRoutineExerciseScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MyWorkout"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#181a1c' },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#b3b3b3',
        tabBarActiveBackgroundColor: '#181a1c',
        tabBarInactiveBackgroundColor: '#181a1c',
      }}>
      <BottomTab.Screen
        name="MyWorkout"
        component={MyWorkoutScreen}
        options={{
          title: 'My Workout',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="dumbbell"
              color={focused ? '#ffffff' : '#b5b5b5'}
              size={14}
            />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="chart-bar"
              color={focused ? '#ffffff' : '#b5b5b5'}
              size={14}
            />
          ),
          headerStyle: { backgroundColor: colors.page },
          headerTitle: 'Workout History',
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="user-circle"
              solid
              color={focused ? '#ffffff' : '#b5b5b5'}
              size={14}
            />
          ),
          headerStyle: { backgroundColor: colors.page },
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = (props: IconProps) => {
  return <Icon style={{ marginBottom: -3 }} {...props} />;
};
