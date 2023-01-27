import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

export default function Navigation() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
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
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="MyWorkout">
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
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarActiveBackgroundColor: '#181a1c',
          tabBarInactiveBackgroundColor: '#181a1c',
          tabBarItemStyle: {
            padding: 10,
            height: 60,
          },
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
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarActiveBackgroundColor: '#181a1c',
          tabBarInactiveBackgroundColor: '#181a1c',
          tabBarItemStyle: {
            padding: 10,
            height: 60,
          },
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabBarIcon = ({
  size = 18,
  ...props
}: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  size?: number;
}) => {
  return <FontAwesome5 size={size} style={{ marginBottom: -3 }} {...props} />;
};
