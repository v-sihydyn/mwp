import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import { CollapsibleRef, Tabs } from 'react-native-collapsible-tab-view';
import { colors } from '../../styles/colors';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { useTimer } from 'use-timer';
import { formatTime } from '../../utils/formatTime';

const MILISECOND = 1000;

export const WorkoutScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isWorkoutSummarySheetOpen, setIsWorkoutSummarySheetOpen] =
    useState(false);
  const route = useRoute<WorkoutRouteProp>();
  const {
    draftWorkoutExercises,
    restTimeInSeconds: restTimeBetweenExercisesInSeconds,
  } = route.params;
  const [exercises, setExercises] = useState(() => {
    const result = draftWorkoutExercises
      .slice()
      .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));

    result[0].sets[0].status = 'inprogress';

    return result;
  });
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(0);
  const exerciseTimer = useTimer();
  const restTimer = useTimer({
    timerType: 'DECREMENTAL',
    endTime: 0,
  });
  const restTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetId, setCurrentSetId] = useState<string | null>(
    exercises[0].sets[0].id,
  );
  const tabContainerRef = useRef<CollapsibleRef>();

  useEffect(() => {
    exerciseTimer.start();
  }, []);

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

    setTotalTimeInSeconds((time) => time + exerciseTimer.time);
    exerciseTimer.reset();

    const nextExerciseIndex = currentExerciseIndex + 1;

    const isLastExerciseAndLastSet =
      currentExerciseIndex === exercises.length - 1 &&
      currentSetIndex === _currentExercise.sets.length - 1;
    const isLastSetOfNotLastExercise =
      currentExerciseIndex < exercises.length - 1 &&
      currentSetIndex === _currentExercise.sets.length - 1;

    if (isLastExerciseAndLastSet) {
      processLastSet();
      return;
    }

    if (isLastSetOfNotLastExercise) {
      goToNextExercise({ nextExerciseIndex, currentStatus: status });
    } else {
      if (currentSetIndex !== undefined) {
        goToNextSet({ currentSetIndex, currentStatus: status });
      }
    }
  };

  const processLastSet = () => {
    setCurrentSetId(null);
  };

  const goToNextExercise = ({
    nextExerciseIndex,
    currentStatus,
  }: {
    nextExerciseIndex: number;
    currentStatus: DraftSetStatus;
  }) => {
    tabContainerRef?.current?.jumpToTab(String(nextExerciseIndex + 1));
    setCurrentExerciseIndex(nextExerciseIndex);
    const nextSetId = exercises[nextExerciseIndex].sets[0].id;
    setCurrentSetId(nextSetId);

    if (restTimeBetweenExercisesInSeconds && currentStatus === 'completed') {
      updateSetStatus(nextExerciseIndex, nextSetId, 'rest');
      restTimer.start();
      restTimer.advanceTime(-restTimeBetweenExercisesInSeconds);

      if (currentExercise) {
        restTimeoutId.current = setTimeout(() => {
          updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
          exerciseTimer.start();
          // if (currentSetId) {
          //   updateSetStatus(currentExerciseIndex, currentSetId, 'completed');
          // }
        }, restTimeBetweenExercisesInSeconds * MILISECOND);
      }
    } else {
      updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
      exerciseTimer.start();
    }
  };

  const goToNextSet = ({
    currentSetIndex,
    currentStatus,
  }: {
    currentSetIndex: number;
    currentStatus: DraftSetStatus;
  }) => {
    const nextSetId =
      exercises[currentExerciseIndex].sets[currentSetIndex + 1].id;
    setCurrentSetId(nextSetId);

    if (currentExercise?.restTimeInSeconds && currentStatus === 'completed') {
      updateSetStatus(currentExerciseIndex, nextSetId, 'rest');

      restTimer.start();
      restTimer.advanceTime(-currentExercise.restTimeInSeconds);

      restTimeoutId.current = setTimeout(() => {
        updateSetStatus(currentExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        // if (currentSetId) {
        //   updateSetStatus(currentExerciseIndex, currentSetId, 'completed');
        // }
      }, currentExercise.restTimeInSeconds * MILISECOND);
    } else {
      updateSetStatus(currentExerciseIndex, nextSetId, 'inprogress');
      exerciseTimer.start();
    }
  };

  const skipRest = () => {
    const _currentExercise = exercises[currentExerciseIndex];
    const currentSetIndex = _currentExercise.sets.findIndex(
      (set) => set.id === currentSetId,
    );
    const isLastSet = currentSetIndex === _currentExercise.sets.length - 1;
    const isFirstSet = currentSetIndex === 0;

    if (isLastSet && currentExercise?.restTimeInSeconds) {
      processSkip(currentExercise.restTimeInSeconds);
    } else if (isFirstSet && restTimeBetweenExercisesInSeconds) {
      processSkip(restTimeBetweenExercisesInSeconds);
    }

    exerciseTimer.start();
  };

  const processSkip = (restTime: number) => {
    setTotalTimeInSeconds((time) => time + (restTime - restTimer.time));
    restTimer.reset();

    if (currentSetId) {
      updateSetStatus(currentExerciseIndex, currentSetId, 'inprogress');
    }

    if (restTimeoutId.current) {
      clearTimeout(restTimeoutId.current);
      restTimeoutId.current = null;
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

  const isSetInProgress = currentSet?.status === 'inprogress';
  const isSetIdle = currentSet?.status === 'idle';
  const isSetCompleted = currentSet?.status === 'completed';

  const isExercise = isSetInProgress || isSetIdle || isSetCompleted;
  const isSetRest = currentSet?.status === 'rest';

  return (
    <View style={styles.container}>
      {areAllSetsProcessed && <Text style={styles.mainTitle}>Finished</Text>}
      {isExercise && (
        <Timer displayTime={formatTime(exerciseTimer.time)} type="exercise" />
      )}
      {isSetRest && (
        <Timer displayTime={formatTime(restTimer.time)} type="rest" />
      )}
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

        {isSetRest && (
          <CustomButton
            style={{ backgroundColor: colors.black, height: '100%' }}
            onPress={() => skipRest()}
            icon={<Icon name="forward" color={colors.lime} size={16} />}>
            <Text style={{ fontSize: 16 }}>Skip Rest</Text>
          </CustomButton>
        )}

        {/* PLAY EXERCISE BUTTON */}

        {isSetIdle && (
          <CustomButton
            style={{ backgroundColor: colors.green, height: '100%' }}
            onPress={() => {
              if (currentSetId) {
                updateSetStatus(
                  currentExerciseIndex,
                  currentSetId,
                  'inprogress',
                );

                exerciseTimer.start();
              }
            }}>
            <Text style={{ fontSize: 16 }}>Play this exercise</Text>
          </CustomButton>
        )}

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
  mainTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
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
