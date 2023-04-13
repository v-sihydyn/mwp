import { useWindowDimensions } from 'react-native';
import { colors } from '../../../../styles/colors';
import {
  MaterialTabItem,
  TabBarProps,
} from 'react-native-collapsible-tab-view';
import React from 'react';
import { MaterialTabBar } from '../../../../components/MaterialTabBar/TabBar';

type WorkoutRoutineTabBarProps = TabBarProps<string>;

export const WorkoutRoutineTabBar = (props: WorkoutRoutineTabBarProps) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <MaterialTabBar
      {...props}
      width={windowWidth - 105 - 20}
      style={{
        marginLeft: 20,
        flex: 1,
      }}
      indicatorStyle={{
        backgroundColor: colors.text,
        height: 1,
      }}
      labelStyle={{
        fontWeight: '700',
        textTransform: 'capitalize',
        fontSize: 15,
        margin: 0,
      }}
      tabStyle={{
        marginRight: 20,
        paddingHorizontal: 0,
        height: 30,
      }}
      activeColor={colors.text}
      inactiveColor="#b5b5b5"
      scrollEnabled={true}
      TabItemComponent={MaterialTabItem}
    />
  );
};
