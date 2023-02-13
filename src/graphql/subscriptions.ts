/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWorkoutExercise = /* GraphQL */ `
  subscription OnCreateWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
  ) {
    onCreateWorkoutExercise(filter: $filter) {
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
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutExerciseWorkoutRoutineExerciseId
    }
  }
`;
export const onUpdateWorkoutExercise = /* GraphQL */ `
  subscription OnUpdateWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
  ) {
    onUpdateWorkoutExercise(filter: $filter) {
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
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutExerciseWorkoutRoutineExerciseId
    }
  }
`;
export const onDeleteWorkoutExercise = /* GraphQL */ `
  subscription OnDeleteWorkoutExercise(
    $filter: ModelSubscriptionWorkoutExerciseFilterInput
  ) {
    onDeleteWorkoutExercise(filter: $filter) {
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
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutExerciseWorkoutRoutineExerciseId
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
      id
      status
      dateFinished
      totalTimeInSeconds
      WorkoutPlanRoutine {
        id
        name
        sortOrder
        workoutPlanID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      WorkoutExercises {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutWorkoutPlanRoutineId
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
      id
      status
      dateFinished
      totalTimeInSeconds
      WorkoutPlanRoutine {
        id
        name
        sortOrder
        workoutPlanID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      WorkoutExercises {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutWorkoutPlanRoutineId
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
      id
      status
      dateFinished
      totalTimeInSeconds
      WorkoutPlanRoutine {
        id
        name
        sortOrder
        workoutPlanID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      WorkoutExercises {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      workoutWorkoutPlanRoutineId
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
      id
      name
      muscleGroup
      equipment
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnCreateWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
  ) {
    onCreateWorkoutRoutineExercise(filter: $filter) {
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
    }
  }
`;
export const onUpdateWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnUpdateWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
  ) {
    onUpdateWorkoutRoutineExercise(filter: $filter) {
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
    }
  }
`;
export const onDeleteWorkoutRoutineExercise = /* GraphQL */ `
  subscription OnDeleteWorkoutRoutineExercise(
    $filter: ModelSubscriptionWorkoutRoutineExerciseFilterInput
  ) {
    onDeleteWorkoutRoutineExercise(filter: $filter) {
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
    }
  }
`;
export const onCreateWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnCreateWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
  ) {
    onCreateWorkoutPlanRoutine(filter: $filter) {
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
    }
  }
`;
export const onUpdateWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnUpdateWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
  ) {
    onUpdateWorkoutPlanRoutine(filter: $filter) {
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
    }
  }
`;
export const onDeleteWorkoutPlanRoutine = /* GraphQL */ `
  subscription OnDeleteWorkoutPlanRoutine(
    $filter: ModelSubscriptionWorkoutPlanRoutineFilterInput
  ) {
    onDeleteWorkoutPlanRoutine(filter: $filter) {
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
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      image
      WorkoutPlans {
        nextToken
        startedAt
      }
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      image
      WorkoutPlans {
        nextToken
        startedAt
      }
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      image
      WorkoutPlans {
        nextToken
        startedAt
      }
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateWorkoutPlan = /* GraphQL */ `
  subscription OnCreateWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
  ) {
    onCreateWorkoutPlan(filter: $filter) {
      id
      name
      userID
      WorkoutPlanRoutines {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateWorkoutPlan = /* GraphQL */ `
  subscription OnUpdateWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
  ) {
    onUpdateWorkoutPlan(filter: $filter) {
      id
      name
      userID
      WorkoutPlanRoutines {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteWorkoutPlan = /* GraphQL */ `
  subscription OnDeleteWorkoutPlan(
    $filter: ModelSubscriptionWorkoutPlanFilterInput
  ) {
    onDeleteWorkoutPlan(filter: $filter) {
      id
      name
      userID
      WorkoutPlanRoutines {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
