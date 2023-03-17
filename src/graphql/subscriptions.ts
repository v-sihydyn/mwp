/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWorkoutExercise = /* GraphQL */ `
  subscription OnCreateWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
    $owner: String
  ) {
    onCreateWorkoutExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onUpdateWorkoutExercise = /* GraphQL */ `
  subscription OnUpdateWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
    $owner: String
  ) {
    onUpdateWorkoutExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onDeleteWorkoutExercise = /* GraphQL */ `
  subscription OnDeleteWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
    $owner: String
  ) {
    onDeleteWorkoutExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onCreateWorkout(filter: $filter, owner: $owner) {
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
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onUpdateWorkout(filter: $filter, owner: $owner) {
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
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onDeleteWorkout(filter: $filter, owner: $owner) {
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
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onCreateExercise(filter: $filter, owner: $owner) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onUpdateExercise(filter: $filter, owner: $owner) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onDeleteExercise(filter: $filter, owner: $owner) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnCreateWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
    $owner: String
  ) {
    onCreateWorkoutRoutineExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onUpdateWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnUpdateWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
    $owner: String
  ) {
    onUpdateWorkoutRoutineExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onDeleteWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnDeleteWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
    $owner: String
  ) {
    onDeleteWorkoutRoutineExercise(filter: $filter, owner: $owner) {
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
  }
`;
export const onCreateWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnCreateWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
    $owner: String
  ) {
    onCreateWorkoutPlanRoutine(filter: $filter, owner: $owner) {
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
  }
`;
export const onUpdateWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnUpdateWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
    $owner: String
  ) {
    onUpdateWorkoutPlanRoutine(filter: $filter, owner: $owner) {
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
  }
`;
export const onDeleteWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnDeleteWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
    $owner: String
  ) {
    onDeleteWorkoutPlanRoutine(filter: $filter, owner: $owner) {
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
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      image
      username
      WorkoutPlans {
        items {
          id
          name
          userID
          WorkoutPlanRoutines {
            items {
              id
              name
              sortOrder
              workoutPlanID
              WorkoutRoutineExercises {
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
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      name
      email
      image
      username
      WorkoutPlans {
        items {
          id
          name
          userID
          WorkoutPlanRoutines {
            items {
              id
              name
              sortOrder
              workoutPlanID
              WorkoutRoutineExercises {
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
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      name
      email
      image
      username
      WorkoutPlans {
        items {
          id
          name
          userID
          WorkoutPlanRoutines {
            items {
              id
              name
              sortOrder
              workoutPlanID
              WorkoutRoutineExercises {
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
  }
`;
export const onCreateWorkoutPlan = /* GraphQL */ `
  subscription OnCreateWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
    $owner: String
  ) {
    onCreateWorkoutPlan(filter: $filter, owner: $owner) {
      id
      name
      userID
      WorkoutPlanRoutines {
        items {
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
  }
`;
export const onUpdateWorkoutPlan = /* GraphQL */ `
  subscription OnUpdateWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
    $owner: String
  ) {
    onUpdateWorkoutPlan(filter: $filter, owner: $owner) {
      id
      name
      userID
      WorkoutPlanRoutines {
        items {
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
  }
`;
export const onDeleteWorkoutPlan = /* GraphQL */ `
  subscription OnDeleteWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
    $owner: String
  ) {
    onDeleteWorkoutPlan(filter: $filter, owner: $owner) {
      id
      name
      userID
      WorkoutPlanRoutines {
        items {
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
  }
`;
