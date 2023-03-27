import { useMemo, useRef, useState } from 'react';
import {
  DraftSet,
  DraftSetStatus,
  DraftWorkoutExercise,
} from '../../../types/draftWorkout';
import { useTimer } from 'use-timer';
import { CollapsibleRef } from 'react-native-collapsible-tab-view';

type WorkoutPlayerConfig = {
  draftWorkoutExercises: DraftWorkoutExercise[];
  restTimeBetweenExercisesInSeconds: number;
};

const MILISECOND = 1000;

type PlayerState = 'playing' | 'set-rest' | 'exercise-rest' | 'finished';

export const useWorkoutPlayer = ({
  draftWorkoutExercises,
  restTimeBetweenExercisesInSeconds,
}: WorkoutPlayerConfig) => {
  const tabContainerRef = useRef<CollapsibleRef>();
  const [playerState, setPlayerState] = useState<PlayerState>('playing');
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
