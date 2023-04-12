/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deletePlanAndRoutines = /* GraphQL */ `
  mutation DeletePlanAndRoutines($planId: ID!) {
    deletePlanAndRoutines(planId: $planId) {
      id
    }
  }
`;
export const deleteWorkoutAndExercises = /* GraphQL */ `
  mutation DeleteWorkoutAndExercises($workoutId: ID!) {
    deleteWorkoutAndExercises(workoutId: $workoutId) {
      id
    }
  }
`;
export const bulkCreateWorkoutExercises = /* GraphQL */ `
  mutation BulkCreateWorkoutExercises(
    $exercises: [CreateWorkoutExerciseInput!]!
    $routineExercisesToUpdate: [RoutineExerciseToUpdateInput]
  ) {
    bulkCreateWorkoutExercises(
      exercises: $exercises
      routineExercisesToUpdate: $routineExercisesToUpdate
    ) {
      exercises {
        id
        name
        description
        muscleGroup
        color
        restTimeInSeconds
        setsConfig
        sortOrder
        workoutID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      updatedRoutineExercises {
        id
        setsConfig
      }
    }
  }
`;
export const createWorkoutExercise = /* GraphQL */ `
  mutation CreateWorkoutExercise(
    $input: CreateWorkoutExerciseInput!
    $condition: ModelWorkoutExerciseConditionInput
  ) {
    createWorkoutExercise(input: $input, condition: $condition) {
      id
      name
      description
      muscleGroup
      color
      restTimeInSeconds
      setsConfig
      sortOrder
      workoutID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateWorkoutExercise = /* GraphQL */ `
  mutation UpdateWorkoutExercise(
    $input: UpdateWorkoutExerciseInput!
    $condition: ModelWorkoutExerciseConditionInput
  ) {
    updateWorkoutExercise(input: $input, condition: $condition) {
      id
      name
      description
      muscleGroup
      color
      restTimeInSeconds
      setsConfig
      sortOrder
      workoutID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteWorkoutExercise = /* GraphQL */ `
  mutation DeleteWorkoutExercise(
    $input: DeleteWorkoutExerciseInput!
    $condition: ModelWorkoutExerciseConditionInput
  ) {
    deleteWorkoutExercise(input: $input, condition: $condition) {
      id
      name
      description
      muscleGroup
      color
      restTimeInSeconds
      setsConfig
      sortOrder
      workoutID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      name
      status
      dateFinished
      totalTimeInSeconds
      userID
      WorkoutExercises {
        items {
          id
          name
          description
          muscleGroup
          color
          restTimeInSeconds
          setsConfig
          sortOrder
          workoutID
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
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      name
      status
      dateFinished
      totalTimeInSeconds
      userID
      WorkoutExercises {
        items {
          id
          name
          description
          muscleGroup
          color
          restTimeInSeconds
          setsConfig
          sortOrder
          workoutID
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
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      name
      status
      dateFinished
      totalTimeInSeconds
      userID
      WorkoutExercises {
        items {
          id
          name
          description
          muscleGroup
          color
          restTimeInSeconds
          setsConfig
          sortOrder
          workoutID
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
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
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
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
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
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
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
export const createWorkoutRoutineExercise = /* GraphQL */ `
  mutation CreateWorkoutRoutineExercise(
    $input: CreateWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    createWorkoutRoutineExercise(input: $input, condition: $condition) {
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
export const updateWorkoutRoutineExercise = /* GraphQL */ `
  mutation UpdateWorkoutRoutineExercise(
    $input: UpdateWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    updateWorkoutRoutineExercise(input: $input, condition: $condition) {
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
export const deleteWorkoutRoutineExercise = /* GraphQL */ `
  mutation DeleteWorkoutRoutineExercise(
    $input: DeleteWorkoutRoutineExerciseInput!
    $condition: ModelWorkoutRoutineExerciseConditionInput
  ) {
    deleteWorkoutRoutineExercise(input: $input, condition: $condition) {
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
export const createWorkoutPlanRoutine = /* GraphQL */ `
  mutation CreateWorkoutPlanRoutine(
    $input: CreateWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    createWorkoutPlanRoutine(input: $input, condition: $condition) {
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
export const updateWorkoutPlanRoutine = /* GraphQL */ `
  mutation UpdateWorkoutPlanRoutine(
    $input: UpdateWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    updateWorkoutPlanRoutine(input: $input, condition: $condition) {
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
export const deleteWorkoutPlanRoutine = /* GraphQL */ `
  mutation DeleteWorkoutPlanRoutine(
    $input: DeleteWorkoutPlanRoutineInput!
    $condition: ModelWorkoutPlanRoutineConditionInput
  ) {
    deleteWorkoutPlanRoutine(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      Workouts {
        items {
          id
          name
          status
          dateFinished
          totalTimeInSeconds
          userID
          WorkoutExercises {
            items {
              id
              name
              description
              muscleGroup
              color
              restTimeInSeconds
              setsConfig
              sortOrder
              workoutID
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      Workouts {
        items {
          id
          name
          status
          dateFinished
          totalTimeInSeconds
          userID
          WorkoutExercises {
            items {
              id
              name
              description
              muscleGroup
              color
              restTimeInSeconds
              setsConfig
              sortOrder
              workoutID
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      Workouts {
        items {
          id
          name
          status
          dateFinished
          totalTimeInSeconds
          userID
          WorkoutExercises {
            items {
              id
              name
              description
              muscleGroup
              color
              restTimeInSeconds
              setsConfig
              sortOrder
              workoutID
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
export const createWorkoutPlan = /* GraphQL */ `
  mutation CreateWorkoutPlan(
    $input: CreateWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    createWorkoutPlan(input: $input, condition: $condition) {
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
export const updateWorkoutPlan = /* GraphQL */ `
  mutation UpdateWorkoutPlan(
    $input: UpdateWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    updateWorkoutPlan(input: $input, condition: $condition) {
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
export const deleteWorkoutPlan = /* GraphQL */ `
  mutation DeleteWorkoutPlan(
    $input: DeleteWorkoutPlanInput!
    $condition: ModelWorkoutPlanConditionInput
  ) {
    deleteWorkoutPlan(input: $input, condition: $condition) {
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
