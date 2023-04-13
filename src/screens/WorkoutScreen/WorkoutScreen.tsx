import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { colors } from '../../styles/colors';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { WorkoutExerciseSet } from './components/WorkoutExerciseSet/WorkoutExerciseSet';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { MaterialTabBar } from '../../components/MaterialTabBar/TabBar';
import { TimerAnimation } from './components/TimerAnimation/TimerAnimation';
import Portal from '../../components/Portal/Portal';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { WorkoutSummary } from './components/WorkoutSummary/WorkoutSummary';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { DraftWorkoutExercise } from '../../types/draftWorkout';
import { PagerViewProps } from 'react-native-pager-view';
import { formatTime } from '../../utils/formatTime';
import { MaterialTabItem } from '../../components/MaterialTabBar/TabItem';
import { CurrentSetToolbar } from './components/CurrentSetToolbar/CurrentSetToolbar';
import { useWorkoutPlayer } from './hooks/useWorkoutPlayer';
import { Button, Toast } from 'native-base';
import { useWorkout } from '../../hooks/useWorkout/useWorkout';
import groupBy from 'lodash.groupby';
import sumBy from 'lodash.sumby';
import { deleteDraftWorkoutData } from '../../utils/persistWorkout';
import { openLeaveWorkoutModal } from '../../components/modals/LeaveWorkoutModal/LeaveWorkoutModal';
import { clearStartTime } from './utils';
import { WorkoutRouteProp } from '../../types/navigation';

const ONE_HOUR = 3600;

export const WorkoutScreen = () => {
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isWorkoutSummarySheetOpen, setIsWorkoutSummarySheetOpen] =
    useState(false);
  const route = useRoute<WorkoutRouteProp>();
  const {
    draftWorkout,
    draftWorkoutExercises,
    restTimeInSeconds: restTimeBetweenExercisesInSeconds,
    workoutRoutineId,
    displayedExerciseIndex: persistedDisplayedExerciseIndex,
    currentSetId: persistedCurrentSetId,
    totalTimeInSeconds: persistedTotalTimeInSeconds,
  } = route.params;

  const {
    exercises,
    totalTimeInSeconds,
    displayedExercise,
    currentSetId,
    currentSet,
    playerState,
    exerciseTimer,
    restTimer,
    tabContainerRef,
    displayedExerciseIndex,
    handleUpdateSetProperty,
    setDisplayedExerciseIndex,
    handleProcessSet,
    skipRest,
    handlePlayExercise,
  } = useWorkoutPlayer({
    draftWorkout,
    draftWorkoutExercises,
    restTimeBetweenExercisesInSeconds,
    workoutRoutineId,
    persistedDisplayedExerciseIndex,
    persistedCurrentSetId,
    persistedTotalTimeInSeconds,
  });
  const [isSavingWorkout, setIsSavingWorkout] = useState(false);
  const { saveWorkout } = useWorkout();

  const leaveListenerRef = useRef<((e: any) => void) | null>(null);

  const beforeLeaveHandler = useCallback((e: any) => {
    e.preventDefault();

    openLeaveWorkoutModal()
      .then(() => navigation.dispatch(e.data.action))
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    leaveListenerRef.current = beforeLeaveHandler;
    const subscription = navigation.addListener('beforeRemove', (e) => {
      if (leaveListenerRef.current) leaveListenerRef.current(e);
    });

    return () => {
      navigation.removeListener('beforeRemove', subscription);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doesDisplayedExerciseHavePendingSets = displayedExercise?.sets.some(
    (set) => set.status === 'idle',
  );

  const doesCurrentSetBelongToDisplayedExercise = displayedExercise?.sets.some(
    (set) => set.id === currentSetId,
  );

  const workoutToSave = useMemo(() => {
    return {
      ...draftWorkout,
      totalTimeInSeconds,
      dateFinished: new Date().toISOString(),
    };
  }, [draftWorkout, totalTimeInSeconds]);

  const exercisesToSave = useMemo(() => {
    return exercises.map((dwe) => {
      const completedSets = dwe.sets.filter(
        (set) => set.status === 'completed',
      );
      const sets = Object.entries(
        groupBy(completedSets, (item) => item.reps + ':' + item.weight),
      )
        .map(([_, value]) => {
          return value;
        })
        .map((arr) => {
          return {
            ...arr[0],
            sets: sumBy(arr, 'sets'),
          };
        });

      return {
        ...dwe,
        setsConfig: JSON.stringify(sets),
        sets,
        sortOrder: dwe.sortOrder,
      };
    });
  }, [exercises]);

  const routineExercisesToUpdate = useMemo(
    () =>
      exercisesToSave
        .map((e, i) => {
          const setsConfig = JSON.stringify(
            e.sets.map((x) => ({
              reps: x.reps,
              sets: String(x.sets),
              weight: x.weight,
            })),
          );
          const dwe = draftWorkoutExercises[i];

          if (setsConfig !== dwe.setsConfig) {
            return {
              id: dwe.workoutRoutineExerciseId,
              setsConfig,
            };
          }
        })
        .filter(Boolean) as { id: string; setsConfig: string }[],
    [draftWorkoutExercises, exercisesToSave],
  );

  const previewWorkoutResults = () => {
    setIsWorkoutSummarySheetOpen(true);
  };

  const handleSaveWorkout = async (shouldUpdateExercises: boolean) => {
    if (isSavingWorkout) return;

    try {
      setIsSavingWorkout(true);

      await saveWorkout({
        workout: workoutToSave,
        exercises: exercisesToSave,
        routineExercisesToUpdate: shouldUpdateExercises
          ? routineExercisesToUpdate
          : [],
      });

      await deleteDraftWorkoutData(workoutRoutineId);

      leaveListenerRef.current = null;

      navigation.navigate('Root', {
        screen: 'WorkoutPlan',
      });
    } catch (e) {
      console.log(e);
      setIsSavingWorkout(false);
      Toast.show({
        title: 'Failed to save workout',
        description: (e as Error).message,
        duration: 3000,
        backgroundColor: colors.red,
      });
    } finally {
      await clearStartTime();
    }
  };

  const renderHeader = () => null;

  const renderTabBar = (props: any) => {
    if (exercises.length < 2) return null;

    return (
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
        TabItemComponent={(tabItemProps) => (
          <MaterialTabItem
            {...tabItemProps}
            label={
              getAreAllSetsCompletedInExercise(exercises[tabItemProps.index])
                ? () => <Icon name="check" size={14} color={colors.text} />
                : String(tabItemProps.index + 1)
            }
            externalIsActive={getAreAllSetsCompletedInExercise(
              exercises[tabItemProps.index],
            )}
          />
        )}
      />
    );
  };

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
        <View style={styles.timer}>
          <View style={[styles.dot, styles.center]}>
            <TimerAnimation type="exercise" />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.dot,
                styles.shadow,
                { backgroundColor: colors.black, shadowColor: colors.black },
              ]}
            />
            <Text
              style={[
                styles.timerText,
                exerciseTimer.time >= ONE_HOUR && { fontSize: 12 },
              ]}>
              {formatTime(exerciseTimer.time)}
            </Text>
          </View>
        </View>
      )}
      {!isPlayerFinished && isSetRest && (
        <View style={styles.timer}>
          <View style={[styles.dot, styles.center]}>
            <TimerAnimation type="rest" />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.dot,
                styles.shadow,
                { backgroundColor: colors.black, shadowColor: colors.black },
              ]}
            />
            <Text
              style={[
                styles.timerText,
                restTimer.time >= ONE_HOUR && { fontSize: 12 },
              ]}>
              {formatTime(restTimer.time)}
            </Text>
          </View>
        </View>
      )}
      <Tabs.Container
        initialTabName={String(displayedExerciseIndex + 1)}
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
                style={[Platform.OS === 'android' && { marginTop: 60 }]}
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

        {isPlayerFinished && (
          <Button
            _text={{ fontSize: 16 }}
            backgroundColor={colors.green}
            onPress={previewWorkoutResults}>
            Finish
          </Button>
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
              listStyle={styles.workoutSummaryListStyle}
              workout={workoutToSave}
              exercises={exercisesToSave}
            />

            {routineExercisesToUpdate.length > 0 && (
              <>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    width: windowWidth,
                    backgroundColor: colors.page,
                    height: 60,
                    alignSelf: 'center',
                    opacity: 0.4,
                  }}
                />
                <View>
                  <Button
                    isDisabled={isSavingWorkout}
                    _disabled={{ opacity: 1 }}
                    _text={{ fontSize: 16, fontWeight: 'bold' }}
                    backgroundColor={colors.black}
                    leftIcon={
                      <Icon name="times-circle" color={colors.red} size={16} />
                    }
                    borderRadius={8}
                    style={[
                      styles.button,
                      {
                        left: 20,
                        width: (windowWidth - 40 - 20) / 2,
                        height: 45,
                      },
                    ]}
                    onPress={() => handleSaveWorkout(false)}>
                    Discard changes
                  </Button>
                  <Button
                    isDisabled={isSavingWorkout}
                    _disabled={{ opacity: 1 }}
                    _text={{ fontSize: 16, fontWeight: 'bold' }}
                    backgroundColor={colors.green}
                    leftIcon={
                      <Icon name="check" color={colors.text} size={14} />
                    }
                    borderRadius={8}
                    style={[
                      styles.button,
                      {
                        right: 20,
                        width: (windowWidth - 40 - 20) / 2,
                        height: 45,
                      },
                    ]}
                    onPress={() => handleSaveWorkout(true)}>
                    Save changes
                  </Button>
                </View>
              </>
            )}

            {routineExercisesToUpdate.length === 0 && (
              <>
                <Button
                  isDisabled={isSavingWorkout}
                  _disabled={{ opacity: 1 }}
                  _text={{ fontSize: 16 }}
                  backgroundColor={colors.green}
                  borderRadius={8}
                  style={[
                    styles.button,
                    {
                      width: windowWidth - 40,
                    },
                  ]}
                  onPress={() => handleSaveWorkout(false)}>
                  OK
                </Button>
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
              </>
            )}
          </View>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const getAreAllSetsCompletedInExercise = (exercise: DraftWorkoutExercise) => {
  return exercise.sets.every(
    (set) => set.status === 'completed' || set.status === 'skipped',
  );
};

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
  timer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  dot: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: colors.black,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: colors.lime,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  timerText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  workoutSummaryListStyle: { paddingBottom: 80 },
});
