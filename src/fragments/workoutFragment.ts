import { gql } from '@apollo/client';

export const workoutFragment = gql`
  fragment Workout on Workout {
    id
    status
    dateFinished
    totalTimeInSeconds
    WorkoutPlanRoutine {
      id
      name
      sortOrder
      workoutPlanID
      WorkoutRoutineExercises {
        items {
          id
          name
          muscleGroup
          equipment
          color
          description
          restTimeInSeconds
          sortOrder
          workoutPlanRoutineID
          setsConfig
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
    WorkoutExercises {
      items {
        id
        setsConfig
        sortOrder
        workoutID
        WorkoutRoutineExercise {
          id
          name
          muscleGroup
          equipment
          color
          description
          restTimeInSeconds
          sortOrder
          workoutPlanRoutineID
          setsConfig
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        workoutExerciseWorkoutRoutineExerciseId
        owner
      }
      nextToken
      startedAt
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    workoutWorkoutPlanRoutineId
    owner
  }
`;
