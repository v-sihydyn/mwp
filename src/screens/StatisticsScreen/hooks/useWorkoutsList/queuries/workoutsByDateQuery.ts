import { gql } from '@apollo/client';

export const workoutsByDateQuery = gql`
  query WorkoutsByDate(
    $status: WorkoutStatus!
    $dateFinished: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsByDate(
      status: $status
      dateFinished: $dateFinished
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
