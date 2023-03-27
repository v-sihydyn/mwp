import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
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
import {
  DraftSet,
  DraftSetStatus,
  DraftWorkoutExercise,
} from '../../types/draftWorkout';
import { PagerViewProps } from 'react-native-pager-view';
import { useTimer } from 'use-timer';
import { formatTime } from '../../utils/formatTime';
import { MaterialTabItem } from '../../components/MaterialTabBar/TabItem';
import { CurrentSetToolbar } from './components/CurrentSetToolbar/CurrentSetToolbar';

const MILISECOND = 1000;

type PlayerState = 'playing' | 'set-rest' | 'exercise-rest' | 'finished';

export const WorkoutScreen = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isWorkoutSummarySheetOpen, setIsWorkoutSummarySheetOpen] =
    useState(false);
  const route = useRoute<WorkoutRouteProp>();
  const [playerState, setPlayerState] = useState<PlayerState>('playing');
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
  const exerciseTimer = useTimer({
    autostart: true,
  });
  const restTimer = useTimer({
    timerType: 'DECREMENTAL',
    endTime: 0,
  });
  const restTimeoutId = useRef<NodeJS.Timeout | null>(null);

  const [displayedExerciseIndex, setDisplayedExerciseIndex] = useState(0);
  const [currentSetId, setCurrentSetId] = useState<string | null>(
    exercises[0].sets[0].id,
  );
  const tabContainerRef = useRef<CollapsibleRef>();

  const displayedExercise =
    exercises.find((_, index) => index === displayedExerciseIndex) ?? null;
  const currentSet = useMemo(() => {
    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];

      for (let j = 0; j < exercise.sets.length; j++) {
        const set = exercise.sets[j];

        if (set.id === currentSetId) {
          return set;
        }
      }
    }
  }, [currentSetId, exercises]);

  const doesDisplayedExerciseHavePendingSets = displayedExercise?.sets.some(
    (set) => set.status === 'idle',
  );

  const doesCurrentSetBelongToDisplayedExercise = displayedExercise?.sets.some(
    (set) => set.id === currentSetId,
  );

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

    const nextExerciseIndex = displayedExerciseIndex + 1;

    const isLastExerciseAndLastSet =
      displayedExerciseIndex === exercises.length - 1 &&
      currentSetIndex === _currentExercise.sets.length - 1;
    const isLastSetOfNotLastExercise =
      displayedExerciseIndex < exercises.length - 1 &&
      currentSetIndex === _currentExercise.sets.length - 1;
    const areAllSetsProcessed = getAreAllSetsProcessed(exercises);

    if (isLastExerciseAndLastSet || areAllSetsProcessed) {
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
    const exercise = findExerciseWithPendingSets(exercises);

    if (exercise) {
      const index = findExerciseIndex(exercises, exercise);

      goToSpecificExercise({
        currentExerciseIndex: index,
        shouldTriggerRest: true,
      });
    } else {
      setCurrentSetId(null);
      setPlayerState('finished');
    }
  };

  const goToNextExercise = ({
    nextExerciseIndex,
    currentStatus,
  }: {
    nextExerciseIndex: number;
    currentStatus: DraftSetStatus;
  }) => {
    tabContainerRef?.current?.jumpToTab(String(nextExerciseIndex + 1));
    setDisplayedExerciseIndex(nextExerciseIndex);
    const nextSetId = exercises[nextExerciseIndex].sets.find(
      (set) => set.status === 'idle',
    )?.id;

    if (!nextSetId) return;

    setCurrentSetId(nextSetId);

    if (restTimeBetweenExercisesInSeconds && currentStatus === 'completed') {
      updateSetStatus(nextExerciseIndex, nextSetId, 'rest');
      restTimer.start();
      restTimer.advanceTime(-restTimeBetweenExercisesInSeconds);
      setPlayerState('exercise-rest');

      restTimeoutId.current = setTimeout(() => {
        updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        setPlayerState('playing');
      }, restTimeBetweenExercisesInSeconds * MILISECOND);
    } else {
      updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
      exerciseTimer.start();
    }
  };

  const goToSpecificExercise = ({
    currentExerciseIndex,
    shouldTriggerRest = false,
  }: {
    currentExerciseIndex: number;
    shouldTriggerRest?: boolean;
  }) => {
    tabContainerRef?.current?.jumpToTab(String(currentExerciseIndex + 1));
    const nextSetId = exercises[currentExerciseIndex].sets.find(
      (set) => set.status === 'idle',
    )?.id;

    if (
      currentSetId &&
      ['inprogress', 'rest'].includes(currentSet?.status || '')
    ) {
      const prevExercise = findExerciseBySetId(exercises, currentSetId);

      if (prevExercise) {
        const prevExerciseIndex = findExerciseIndex(exercises, prevExercise);

        if (prevExerciseIndex > -1) {
          updateSetStatus(prevExerciseIndex, currentSetId!, 'idle');
        }
      }
    }

    if (!nextSetId) return;
    setCurrentSetId(nextSetId);

    if (shouldTriggerRest && restTimeBetweenExercisesInSeconds) {
      updateSetStatus(currentExerciseIndex, nextSetId, 'rest');
      restTimer.start();
      restTimer.advanceTime(-restTimeBetweenExercisesInSeconds);
      setPlayerState('exercise-rest');

      restTimeoutId.current = setTimeout(() => {
        updateSetStatus(currentExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        setPlayerState('playing');
      }, restTimeBetweenExercisesInSeconds * MILISECOND);
    } else {
      updateSetStatus(currentExerciseIndex, nextSetId!, 'inprogress');
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
      exercises[displayedExerciseIndex].sets[currentSetIndex + 1].id;
    setCurrentSetId(nextSetId);

    if (displayedExercise?.restTimeInSeconds && currentStatus === 'completed') {
      updateSetStatus(displayedExerciseIndex, nextSetId, 'rest');

      restTimer.start();
      restTimer.advanceTime(-displayedExercise.restTimeInSeconds);
      setPlayerState('set-rest');

      restTimeoutId.current = setTimeout(() => {
        updateSetStatus(displayedExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        setPlayerState('playing');
      }, displayedExercise.restTimeInSeconds * MILISECOND);
    } else {
      updateSetStatus(displayedExerciseIndex, nextSetId, 'inprogress');
      exerciseTimer.start();
    }
  };

  const skipRest = () => {
    if (playerState === 'set-rest' && displayedExercise?.restTimeInSeconds) {
      processSkip(displayedExercise.restTimeInSeconds);
    } else if (
      playerState === 'exercise-rest' &&
      restTimeBetweenExercisesInSeconds
    ) {
      processSkip(restTimeBetweenExercisesInSeconds);
    }

    exerciseTimer.start();
    setPlayerState('playing');
  };

  const processSkip = (restTime: number) => {
    setTotalTimeInSeconds((time) => time + (restTime - restTimer.time));
    restTimer.reset();

    if (currentSetId) {
      updateSetStatus(displayedExerciseIndex, currentSetId, 'inprogress');
    }

    if (restTimeoutId.current) {
      clearTimeout(restTimeoutId.current);
      restTimeoutId.current = null;
    }
  };

  const handlePlayExercise = () => {
    restTimer.reset();
    if (restTimeoutId.current) {
      clearTimeout(restTimeoutId.current);
      restTimeoutId.current = null;
    }

    goToSpecificExercise({
      currentExerciseIndex: displayedExerciseIndex,
    });
  };

  const updateSetStatus = (
    exerciseIndex: number,
    setId: string,
    status: DraftSetStatus,
  ) => {
    setExercises((ex: DraftWorkoutExercise[]) =>
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
      ),
    );
  };

  const handleUpdateSetProperty = (
    exerciseIndex: number,
    setId: string,
    property: keyof DraftSet,
    value: string,
  ) => {
    setExercises((ex: DraftWorkoutExercise[]) =>
      ex.map((exercise, exerciseIdx) =>
        exerciseIdx === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [property]: value,
                    }
                  : set,
              ),
            }
          : exercise,
      ),
    );
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
      TabItemComponent={(props) => (
        <MaterialTabItem
          {...props}
          label={
            getAreAllSetsCompletedInExercise(exercises[props.index])
              ? () => <Icon name="check" size={14} color={colors.text} />
              : String(props.index + 1)
          }
          externalIsActive={getAreAllSetsCompletedInExercise(
            exercises[props.index],
          )}
        />
      )}
    />
  );

  const isPlayerFinished = playerState === 'finished';

  const isSetInProgress = currentSet?.status === 'inprogress';
  const isSetIdle = currentSet?.status === 'idle';
  const isSetCompleted = currentSet?.status === 'completed';

  const isExercise = isSetInProgress || isSetIdle || isSetCompleted;
  const isSetRest = currentSet?.status === 'rest';

  return (
    <View style={styles.container}>
      {isPlayerFinished && <Text style={styles.mainTitle}>Finished</Text>}
      {!isPlayerFinished && isExercise && (
        <Timer displayTime={formatTime(exerciseTimer.time)} type="exercise" />
      )}
      {!isPlayerFinished && isSetRest && (
        <Timer displayTime={formatTime(restTimer.time)} type="rest" />
      )}
      <Tabs.Container
        pagerProps={
          {
            onPageSelected: (e) =>
              setDisplayedExerciseIndex(e.nativeEvent.position),
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
                      exerciseIndex === displayedExerciseIndex &&
                      set.id === currentSetId
                    }
                    status={set.status}
                    reps={set.reps}
                    weight={set.weight || ''}
                    onUpdateReps={(value: string) => {
                      handleUpdateSetProperty(
                        exerciseIndex,
                        set.id,
                        'reps',
                        value,
                      );
                    }}
                    onUpdateWeight={(value: string) => {
                      handleUpdateSetProperty(
                        exerciseIndex,
                        set.id,
                        'weight',
                        value,
                      );
                    }}
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
        {/* SET TOOLBAR */}
        {isSetInProgress && doesCurrentSetBelongToDisplayedExercise && (
          <CurrentSetToolbar
            currentSet={currentSet}
            onSkip={() =>
              handleProcessSet({
                exerciseIndex: displayedExerciseIndex,
                setId: currentSetId,
                status: 'skipped',
              })
            }
            onComplete={() =>
              handleProcessSet({
                exerciseIndex: displayedExerciseIndex,
                setId: currentSetId,
                status: 'completed',
              })
            }
            onUpdateReps={(value: string) => {
              handleUpdateSetProperty(
                displayedExerciseIndex,
                currentSet.id,
                'reps',
                value,
              );
            }}
            onUpdateWeight={(value: string) => {
              handleUpdateSetProperty(
                displayedExerciseIndex,
                currentSet.id,
                'weight',
                value,
              );
            }}
          />
        )}

        {/* SKIP REST BUTTON */}

        {isSetRest && doesCurrentSetBelongToDisplayedExercise && (
          <CustomButton
            style={{ backgroundColor: colors.black, height: '100%' }}
            onPress={() => skipRest()}
            icon={<Icon name="forward" color={colors.lime} size={16} />}>
            <Text style={{ fontSize: 16 }}>Skip Rest</Text>
          </CustomButton>
        )}

        {/* PLAY EXERCISE BUTTON */}

        {!doesCurrentSetBelongToDisplayedExercise &&
          doesDisplayedExerciseHavePendingSets && (
            <CustomButton
              style={{ backgroundColor: colors.green, height: '100%' }}
              onPress={handlePlayExercise}>
              <Text style={{ fontSize: 16 }}>Play this exercise</Text>
            </CustomButton>
          )}

        {/* FINISH BUTTON */}

        {playerState === 'finished' && (
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

const findExerciseBySetId = (
  exercises: DraftWorkoutExercise[],
  setId: string,
) => {
  return exercises.find((exercise) =>
    exercise.sets.some((set) => set.id === setId),
  );
};

const findExerciseWithPendingSets = (exercises: DraftWorkoutExercise[]) => {
  return exercises.find((exercise) =>
    exercise.sets.some((set) => set.status === 'idle'),
  );
};

const findExerciseIndex = (
  exercises: DraftWorkoutExercise[],
  exercise: DraftWorkoutExercise,
) => {
  return exercises.findIndex((e) => e === exercise);
};

const getAreAllSetsCompletedInExercise = (exercise: DraftWorkoutExercise) => {
  return exercise.sets.every(
    (set) => set.status === 'completed' || set.status === 'skipped',
  );
};

const getAreAllSetsProcessed = (exercises: DraftWorkoutExercise[]) =>
  exercises.every((e) =>
    e.sets.every(
      (set) => set.status === 'completed' || set.status === 'skipped',
    ),
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.page,
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
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
  actionBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,

    backgroundColor: '#181a1c',
    width: '100%',
    height: 70,
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
  button: {
    paddingVertical: 14,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});
