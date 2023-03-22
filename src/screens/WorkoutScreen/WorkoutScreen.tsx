import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { CollapsibleRef, Tabs } from 'react-native-collapsible-tab-view';
import { colors } from '../../styles/colors';
import React, { useMemo, useRef, useState } from 'react';
import { WorkoutExerciseSet } from './components/WorkoutExerciseSet/WorkoutExerciseSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { MaterialTabBar } from '../../components/MaterialTabBar/TabBar';
import { Timer } from './components/Timer/Timer';
import Portal from '../../components/Portal/Portal';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { WorkoutSummary } from './components/WorkoutSummary/WorkoutSummary';
import { useRoute } from '@react-navigation/native';
import { WorkoutRouteProp } from '../../../types';
import { Icon } from '../../components/Icon/Icon';
import { DraftSetStatus, DraftWorkoutExercise } from '../../types/draftWorkout';
import { PagerViewProps } from 'react-native-pager-view';

export const WorkoutScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isWorkoutSummarySheetOpen, setIsWorkoutSummarySheetOpen] =
    useState(false);
  const route = useRoute<WorkoutRouteProp>();
  const { draftWorkoutExercises } = route.params;
  const [exercises, setExercises] = useState(() => {
    const result = draftWorkoutExercises
      .slice()
      .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));

    result[0].sets[0].status = 'inprogress';

    return result;
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetId, setCurrentSetId] = useState<string | null>(
    exercises[0].sets[0].id,
  );
  const tabContainerRef = useRef<CollapsibleRef>();

  const currentExercise =
    exercises.find((_, index) => index === currentExerciseIndex) ?? null;
  const currentSet = currentExercise?.sets?.find(
    (set) => set.id === currentSetId,
  );

  const areAllSetsProcessed = useMemo(() => {
    return exercises.every((e) =>
      e.sets.every(
        (set) => set.status === 'completed' || set.status === 'skipped',
      ),
    );
  }, [exercises]);

  const handleProcessSet = ({
    exerciseIndex,
    setId,
    status,
  }: {
    exerciseIndex: number;
    setId: string | null;
    status: DraftSetStatus;
  }) => {
    const _currentExercise = exercises[exerciseIndex];
    let currentSetIndex;

    _currentExercise.sets.forEach((set, setIdx) => {
      if (set.id === setId) {
        set.status = status;
        currentSetIndex = setIdx;
      }
    });

    setExercises((ex) =>
      ex.map((value, idx) =>
        idx === exerciseIndex ? _currentExercise : value,
      ),
    );

    const nextExerciseIndex = currentExerciseIndex + 1;

    if (
      currentExerciseIndex === exercises.length - 1 &&
      currentSetIndex === _currentExercise.sets.length - 1
    ) {
      setCurrentSetId(null);
      return;
    }

    if (currentSetIndex === _currentExercise.sets.length - 1) {
      tabContainerRef?.current?.jumpToTab(String(nextExerciseIndex + 1));
      setCurrentExerciseIndex(nextExerciseIndex);
      const nextSetId = exercises[nextExerciseIndex].sets[0].id;
      setCurrentSetId(nextSetId);
      updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
    } else {
      if (currentSetIndex !== undefined) {
        const nextSetId =
          exercises[currentExerciseIndex].sets[currentSetIndex + 1].id;
        setCurrentSetId(nextSetId);
        updateSetStatus(currentExerciseIndex, nextSetId, 'inprogress');
      }
    }
  };

  const updateSetStatus = (
    exerciseIndex: number,
    setId: string,
    status: DraftSetStatus,
  ) => {
    const updater = (ex: DraftWorkoutExercise[]) =>
      ex.map((exercise, exerciseIdx) =>
        exerciseIdx === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      status,
                    }
                  : set,
              ),
            }
          : exercise,
      );

    setExercises(updater);
  };

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
    <View style={styles.container}>
      <Timer />
      <Tabs.Container
        pagerProps={
          {
            onPageSelected: (e) =>
              setCurrentExerciseIndex(e.nativeEvent.position),
          } as Omit<PagerViewProps, 'onPageScroll' | 'initialPage'>
        }
        ref={tabContainerRef}
        lazy={true}
        renderHeader={renderHeader}
        renderTabBar={renderTabBar}
        tabBarHeight={58}
        headerContainerStyle={{
          backgroundColor: colors.page,
          elevation: 0,
          shadowOpacity: 0,
        }}>
        {exercises.map((exercise, exerciseIndex) => {
          return (
            <Tabs.Tab name={String(exerciseIndex + 1)} key={exerciseIndex + 1}>
              <Tabs.FlatList
                data={exercise.sets}
                renderItem={({ item: set, index: setIndex }) => (
                  <WorkoutExerciseSet
                    index={setIndex + 1}
                    isActive={
                      exerciseIndex === currentExerciseIndex &&
                      set.id === currentSetId
                    }
                    status={set.status}
                    reps={set.reps}
                    weight={set.weight || ''}
                  />
                )}
                contentContainerStyle={styles.exerciseWrapper}
                bounces={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                  <>
                    <Text style={styles.title}>{exercise.name}</Text>
                    {/* @TODO: edit notes */}
                    {Boolean(exercise.description) && (
                      <Text style={styles.note} numberOfLines={2}>
                        {exercise.description}
                      </Text>
                    )}
                  </>
                )}
              />
            </Tabs.Tab>
          );
        })}
      </Tabs.Container>
      <View style={styles.actionBar}>
        {/* SET INFO */}

        {currentSet?.status === 'inprogress' && (
          <View style={styles.currentSetWrapper}>
            <CustomButton
              onPress={() =>
                handleProcessSet({
                  exerciseIndex: currentExerciseIndex,
                  setId: currentSetId,
                  status: 'skipped',
                })
              }
              style={{
                marginRight: 20,
                height: 40,
                width: 60,
                backgroundColor: colors.black,
              }}
              icon={<Icon name="times" color={colors.red} size={16} />}
            />
            {/* @TODO: edit reps */}
            <TextInput
              value={currentSet?.reps ?? ''}
              keyboardType="numeric"
              style={styles.setInput}
            />
            <Text style={styles.setLabel}>Reps</Text>
            {/* @TODO: edit weight */}
            <TextInput
              value={currentSet?.weight ?? ''}
              keyboardType="numeric"
              style={styles.setInput}
            />
            <Text style={[styles.setLabel, { marginRight: 0 }]}>Kg</Text>

            <CustomButton
              onPress={() =>
                handleProcessSet({
                  exerciseIndex: currentExerciseIndex,
                  setId: currentSetId,
                  status: 'completed',
                })
              }
              style={{ marginLeft: 'auto', height: 40, width: 60 }}
              icon={<Icon name="check" color={colors.text} size={16} />}
            />
          </View>
        )}

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

        {areAllSetsProcessed && (
          <CustomButton
            style={{ backgroundColor: colors.green, height: '100%' }}
            onPress={() => setIsWorkoutSummarySheetOpen(true)}>
            <Text style={{ fontSize: 16 }}>Finish</Text>
          </CustomButton>
        )}
      </View>

      <Portal>
        <BottomSheet
          isVisible={isWorkoutSummarySheetOpen}
          onClose={() => setIsWorkoutSummarySheetOpen(false)}
          withHandle={true}>
          <View
            style={{
              position: 'relative',
              height: windowHeight - 150,
            }}>
            <WorkoutSummary
              title="Nice workout!"
              listStyle={{ paddingBottom: 80 }}
            />

            <CustomButton
              style={[
                styles.button,
                {
                  width: windowWidth - 40,
                },
              ]}
              onPress={() => {}}>
              Ok
            </CustomButton>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: windowWidth,
                backgroundColor: colors.page,
                height: 20,
                alignSelf: 'center',
                opacity: 0.9,
              }}
            />
          </View>
        </BottomSheet>
      </Portal>
    </View>
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
    paddingTop: 20,
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
  button: {
    paddingVertical: 14,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});
