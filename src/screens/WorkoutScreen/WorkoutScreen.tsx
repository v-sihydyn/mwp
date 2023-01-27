import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { colors } from '../../styles/colors';
import React, { useState } from 'react';
import { WorkoutExerciseSet } from './components/WorkoutExerciseSet/WorkoutExerciseSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { MaterialTabBar } from '../../components/MaterialTabBar/TabBar';
import { Timer } from './components/Timer/Timer';
import PortalHost from '../../components/Portal/PortalHost';
import Portal from '../../components/Portal/Portal';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { WorkoutSummary } from './components/WorkoutSummary/WorkoutSummary';

// const tabNames = ['1', '2', '3'];
const tabNames = ['1', '2', '3', '4', '5', '6', '7', '8'];

type WorkoutScreenProps = {};

export const WorkoutScreen = (props: WorkoutScreenProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const [isWorkoutSummarySheetOpen, setIsWorkoutSummarySheetOpen] =
    useState(false);

  const renderHeader = () => null;

  const renderTabBar = (props: any) => (
    <MaterialTabBar
      {...props}
      style={{
        marginTop: 20,
        width: windowWidth - 40,
        alignSelf: 'center',
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      tabStyle={{
        width: 38,
        height: 38,
        borderRadius: 38,
      }}
      indicatorStyle={{
        height: 0,
      }}
      labelStyle={{
        fontWeight: '700',
        fontSize: 14,
        color: colors.text,
      }}
      activeColor={colors.text}
      activeBgColor={colors.green}
      inactiveColor={colors.text}
      inactiveBgColor={colors.black}
      scrollEnabled
    />
  );

  return (
    <PortalHost>
      <View style={styles.container}>
        <Timer />
        <Tabs.Container
          lazy={true}
          renderHeader={renderHeader}
          renderTabBar={renderTabBar}
          tabBarHeight={58}
          headerContainerStyle={{
            backgroundColor: colors.page,
            elevation: 0,
            shadowOpacity: 0,
          }}>
          {tabNames.map((name) => {
            return (
              <Tabs.Tab name={name} key={name}>
                {/*@TODO: FlatList?*/}
                <Tabs.ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.exerciseWrapper}>
                    <Text style={styles.title}>Exercise Name</Text>
                    {/* @TODO: edit notes */}
                    <Text style={styles.note}>Exercise note</Text>
                    <WorkoutExerciseSet index={1} reps={10} weight={20} />
                    <WorkoutExerciseSet index={2} reps={10} weight={20} />
                    <WorkoutExerciseSet index={3} reps={10} weight={20} />
                    <WorkoutExerciseSet index={4} reps={10} weight={20} />
                  </View>
                </Tabs.ScrollView>
              </Tabs.Tab>
            );
          })}
        </Tabs.Container>
        <View style={styles.actionBar}>
          {/* SET INFO */}

          {/*<View style={styles.currentSetWrapper}>*/}
          {/*  <CustomButton*/}
          {/*    onPress={() => alert('Done')}*/}
          {/*    style={{*/}
          {/*      marginRight: 20,*/}
          {/*      height: 40,*/}
          {/*      width: 60,*/}
          {/*      backgroundColor: colors.black,*/}
          {/*    }}*/}
          {/*    icon={<Icon name="times" color={colors.red} size={16} />}*/}
          {/*  />*/}
          {/*  /!* @TODO: edit reps *!/*/}
          {/*  <TextInput*/}
          {/*    value={'8'}*/}
          {/*    keyboardType="numeric"*/}
          {/*    style={styles.setInput}*/}
          {/*  />*/}
          {/*  <Text style={styles.setLabel}>Reps</Text>*/}
          {/*  /!* @TODO: edit weight *!/*/}
          {/*  <TextInput*/}
          {/*    value={'54.3'}*/}
          {/*    keyboardType="numeric"*/}
          {/*    style={styles.setInput}*/}
          {/*  />*/}
          {/*  <Text style={[styles.setLabel, { marginRight: 0 }]}>Kg</Text>*/}

          {/*  <CustomButton*/}
          {/*    onPress={() => alert('Done')}*/}
          {/*    style={{ marginLeft: 'auto', height: 40, width: 60 }}*/}
          {/*    icon={<Icon name="check" color={colors.text} size={16} />}*/}
          {/*  />*/}
          {/*</View>*/}

          {/* SKIP REST BUTTON */}

          {/*<CustomButton*/}
          {/*  style={{ backgroundColor: colors.black, height: '100%' }}*/}
          {/*  onPress={() => alert('1')}*/}
          {/*  icon={<Icon name="forward" color={colors.lime} size={16} />}>*/}
          {/*  <Text style={{ fontSize: 16 }}>Skip Rest</Text>*/}
          {/*</CustomButton>*/}

          {/* PLAY EXERCISE BUTTON */}

          {/*<CustomButton*/}
          {/*  style={{ backgroundColor: colors.green, height: '100%' }}*/}
          {/*  onPress={() => alert('1')}>*/}
          {/*  <Text style={{ fontSize: 16 }}>Play this exercise</Text>*/}
          {/*</CustomButton>*/}

          {/* FINISH BUTTON */}

          <CustomButton
            style={{ backgroundColor: colors.green, height: '100%' }}
            onPress={() => setIsWorkoutSummarySheetOpen(true)}>
            <Text style={{ fontSize: 16 }}>Finish</Text>
          </CustomButton>
        </View>
      </View>
      <Portal>
        <BottomSheet
          isVisible={isWorkoutSummarySheetOpen}
          onClose={() => setIsWorkoutSummarySheetOpen(false)}
          withHandle={true}>
          <WorkoutSummary />
        </BottomSheet>
      </Portal>
    </PortalHost>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  //
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  note: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 18,
  },
  exerciseWrapper: {
    padding: 20,
    flex: 1,
  },

  //
  actionBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,

    backgroundColor: '#181a1c',
    width: '100%',
    height: 70,
  },
  currentSetWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  setInput: {
    backgroundColor: colors.text,
    color: colors.black,
    width: 50,
    height: 40,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 8,
  },
  setLabel: {
    color: '#707172',
    fontSize: 16,
    marginRight: 40,
  },
});
