import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { MyWorkoutScreen } from '../screens/MyWorkoutScreen/MyWorkoutScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen/StatisticsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import { RoutineRemindersScreen } from '../screens/RoutineRemindersScreen/RoutineRemindersScreen';
import { ModalSlideFromTopIOS } from './customModalTransition';
import { RoutinesManagementScreen } from '../screens/RoutinesManagementScreen/RoutinesManagementScreen';
import { colors } from '../styles/colors';
import { AddExerciseToRoutineScreen } from '../screens/AddExerciseToRoutineScreen/AddExerciseToRoutineScreen';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
    {/*<Stack.Navigator initialRouteName={'AddExerciseToRoutine'}>*/}
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

      <Stack.Group
        screenOptions={{
          ...ModalSlideFromTopIOS,
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
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="MyWorkout">
      <BottomTab.Screen
        name="MyWorkout"
        component={MyWorkoutScreen}
        options={({ navigation }: RootTabScreenProps<'MyWorkout'>) => ({
          title: 'My Workout',
          tabBarIcon: ({ focused }) => <TabBarIcon name="dumbbell" color={focused ? '#ffffff' : '#b5b5b5'} />,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarActiveBackgroundColor: '#181a1c',
          tabBarInactiveBackgroundColor: '#181a1c',
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon name="chart-bar" color={focused ? '#ffffff' : '#b5b5b5'} />,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarActiveBackgroundColor: '#181a1c',
          tabBarInactiveBackgroundColor: '#181a1c',
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string }) {
  return <FontAwesome5 size={18} style={{ marginBottom: -3 }} {...props} />;
}
