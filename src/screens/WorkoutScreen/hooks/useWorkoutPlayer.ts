import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DraftSet,
  DraftSetStatus,
  DraftWorkout,
  DraftWorkoutExercise,
} from '../../../types/draftWorkout';
import { useTimer } from 'use-timer';
import { CollapsibleRef } from 'react-native-collapsible-tab-view';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { persistDraftWorkoutData } from '../../../utils/persistWorkout';
import { usePrevious } from '../../../hooks/usePrevious';

type WorkoutPlayerConfig = {
  draftWorkout: DraftWorkout;
  draftWorkoutExercises: DraftWorkoutExercise[];
  restTimeBetweenExercisesInSeconds: number;
  workoutRoutineId: string;
  persistedDisplayedExerciseIndex?: number;
  persistedCurrentSetId?: string | null;
  persistedTotalTimeInSeconds?: number;
};

type PlayerState = 'playing' | 'set-rest' | 'exercise-rest' | 'finished';

export const useWorkoutPlayer = ({
  draftWorkout,
  draftWorkoutExercises,
  restTimeBetweenExercisesInSeconds,
  workoutRoutineId,
  persistedDisplayedExerciseIndex,
  persistedCurrentSetId,
  persistedTotalTimeInSeconds,
}: WorkoutPlayerConfig) => {
  const tabContainerRef = useRef<CollapsibleRef>();
  const [exercises, setExercises] = useState(draftWorkoutExercises);
  const prevExercises = usePrevious(exercises);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(
    persistedTotalTimeInSeconds ?? 0,
  );
  const areAllSetsProcessed = useMemo(
    () => getAreAllSetsProcessed(exercises),
    [exercises],
  );
  const [playerState, setPlayerState] = useState<PlayerState>(
    areAllSetsProcessed ? 'finished' : 'playing',
  );
  const exerciseTimer = useTimer({
    autostart: !areAllSetsProcessed,
  });
  const restTimeOverCb = useRef<() => void | null>(null);
  const restTimer = useTimer({
    timerType: 'DECREMENTAL',
    endTime: 0,
    onTimeOver: () => {
      if (restTimeOverCb.current) {
        restTimeOverCb.current();
      }
    },
  });
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const [displayedExerciseIndex, setDisplayedExerciseIndex] = useState<number>(
    () => {
      if (areAllSetsProcessed && exercises.length > 0)
        return exercises.length - 1;

      return persistedDisplayedExerciseIndex ?? 0;
    },
  );
  const [currentSetId, setCurrentSetId] = useState<string | null>(
    typeof persistedCurrentSetId !== 'undefined'
      ? persistedCurrentSetId
      : exercises[0].sets[0].id,
  );
  const prevCurrentSetId = usePrevious(currentSetId);

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

  useEffect(() => {
    if (
      currentSetId !== prevCurrentSetId ||
      JSON.stringify(exercises) !== JSON.stringify(prevExercises)
    ) {
      persistDraftWorkoutData(workoutRoutineId, {
        workout: draftWorkout,
        restTimeInSeconds: restTimeBetweenExercisesInSeconds,
        exercises,
        totalTimeInSeconds,
        currentSetId,
      });
    }
  }, [
    currentSetId,
    draftWorkout,
    exercises,
    prevExercises,
    prevCurrentSetId,
    restTimeBetweenExercisesInSeconds,
    totalTimeInSeconds,
    workoutRoutineId,
  ]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [
    appState.current,
    playerState,
    restTimer.time,
    displayedExercise?.restTimeInSeconds,
  ]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      nextAppState.match(/inactive|background/) &&
      appState.current === 'active'
    ) {
      await recordStartTime();
    }

    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const elapsedSeconds = await getElapsedTime();

      if (elapsedSeconds && elapsedSeconds > 0) {
        if (playerState === 'playing') {
          exerciseTimer.advanceTime(elapsedSeconds);
        } else if (
          playerState === 'exercise-rest' ||
          playerState === 'set-rest'
        ) {
          const restTime =
            playerState === 'exercise-rest'
              ? restTimeBetweenExercisesInSeconds
              : displayedExercise!.restTimeInSeconds;

          if (elapsedSeconds < restTime) {
            restTimer.advanceTime(elapsedSeconds);
          } else {
            restTimer.reset();
            if (restTimeOverCb.current) {
              restTimeOverCb.current();
            }
          }
        }
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = async () => {
    try {
      const now = Date.now();
      await AsyncStorage.setItem('workoutPlayerCurrentTime', String(now));
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.log(err);
    }
  };

  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('workoutPlayerCurrentTime');

      return dayjs().diff(dayjs(Number(startTime)), 'second');
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.log(err);
    }
  };

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

      restTimeOverCb.current = () => {
        updateSetStatus(nextExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        restTimer.reset();
        setPlayerState('playing');
        setTotalTimeInSeconds(
          (time) => time + (restTimeBetweenExercisesInSeconds - restTimer.time),
        );
      };
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

      restTimeOverCb.current = () => {
        updateSetStatus(currentExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        restTimer.reset();
        setPlayerState('playing');
        setTotalTimeInSeconds(
          (time) => time + (restTimeBetweenExercisesInSeconds - restTimer.time),
        );
      };
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

      restTimeOverCb.current = () => {
        updateSetStatus(displayedExerciseIndex, nextSetId, 'inprogress');
        exerciseTimer.start();
        restTimer.reset();
        setPlayerState('playing');
        setTotalTimeInSeconds(
          (time) =>
            time + (displayedExercise.restTimeInSeconds - restTimer.time),
        );
      };
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
  };

  const handlePlayExercise = () => {
    restTimer.reset();

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

  return {
    exercises,
    totalTimeInSeconds,
    exerciseTimer,
    restTimer,
    displayedExerciseIndex,
    displayedExercise,
    currentSetId,
    currentSet,
    playerState,
    tabContainerRef,
    handleProcessSet,
    setExercises,
    skipRest,
    handlePlayExercise,
    handleUpdateSetProperty,
    setDisplayedExerciseIndex,
  };
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

const getAreAllSetsProcessed = (exercises: DraftWorkoutExercise[]) =>
  exercises.every((e) =>
    e.sets.every(
      (set) => set.status === 'completed' || set.status === 'skipped',
    ),
  );
