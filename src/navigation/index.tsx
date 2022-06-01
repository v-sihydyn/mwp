/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { MyWorkoutScreen } from '../screens/MyWorkoutScreen/MyWorkoutScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen/StatisticsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

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
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
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
    <BottomTab.Navigator initialRouteName="MyWorkoutScreen">
      <BottomTab.Screen
        name="MyWorkoutScreen"
        component={MyWorkoutScreen}
        options={({ navigation }: RootTabScreenProps<'MyWorkoutScreen'>) => ({
          title: 'My Workout',
          tabBarIcon: ({ focused }) => <TabBarIcon name="dumbbell" color={focused ? '#ffffff' : '#b5b5b5'} />,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#d3d3d3',
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon name="chart-bar" color={focused ? '#ffffff' : '#b5b5b5'} />,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#d3d3d3',
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
