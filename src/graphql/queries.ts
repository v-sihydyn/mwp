/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWorkoutExercise = /* GraphQL */ `
  query GetWorkoutExercise($id: ID!) {
    getWorkoutExercise(id: $id) {
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
export const listWorkoutExercises = /* GraphQL */ `
  query ListWorkoutExercises(
    $filter: ModelWorkoutExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const syncWorkoutExercises = /* GraphQL */ `
  query SyncWorkoutExercises(
    $filter: ModelWorkoutExerciseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const workoutExercisesByWorkoutID = /* GraphQL */ `
  query WorkoutExercisesByWorkoutID(
    $workoutID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutExercisesByWorkoutID(
      workoutID: $workoutID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const syncWorkouts = /* GraphQL */ `
  query SyncWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkouts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
export const workoutsByDate = /* GraphQL */ `
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
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncExercises = /* GraphQL */ `
  query SyncExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getWorkoutRoutineExercise = /* GraphQL */ `
  query GetWorkoutRoutineExercise($id: ID!) {
    getWorkoutRoutineExercise(id: $id) {
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
export const listWorkoutRoutineExercises = /* GraphQL */ `
  query ListWorkoutRoutineExercises(
    $filter: ModelWorkoutRoutineExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutRoutineExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const syncWorkoutRoutineExercises = /* GraphQL */ `
  query SyncWorkoutRoutineExercises(
    $filter: ModelWorkoutRoutineExerciseFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutRoutineExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const workoutRoutineExercisesByWorkoutPlanRoutineID = /* GraphQL */ `
  query WorkoutRoutineExercisesByWorkoutPlanRoutineID(
    $workoutPlanRoutineID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutRoutineExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutRoutineExercisesByWorkoutPlanRoutineID(
      workoutPlanRoutineID: $workoutPlanRoutineID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getWorkoutPlanRoutine = /* GraphQL */ `
  query GetWorkoutPlanRoutine($id: ID!) {
    getWorkoutPlanRoutine(id: $id) {
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
export const listWorkoutPlanRoutines = /* GraphQL */ `
  query ListWorkoutPlanRoutines(
    $filter: ModelWorkoutPlanRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutPlanRoutines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const syncWorkoutPlanRoutines = /* GraphQL */ `
  query SyncWorkoutPlanRoutines(
    $filter: ModelWorkoutPlanRoutineFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutPlanRoutines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const workoutPlanRoutinesByWorkoutPlanID = /* GraphQL */ `
  query WorkoutPlanRoutinesByWorkoutPlanID(
    $workoutPlanID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutPlanRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutPlanRoutinesByWorkoutPlanID(
      workoutPlanID: $workoutPlanID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const usersByUsername = /* GraphQL */ `
  query UsersByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getWorkoutPlan = /* GraphQL */ `
  query GetWorkoutPlan($id: ID!) {
    getWorkoutPlan(id: $id) {
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
export const listWorkoutPlans = /* GraphQL */ `
  query ListWorkoutPlans(
    $filter: ModelWorkoutPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncWorkoutPlans = /* GraphQL */ `
  query SyncWorkoutPlans(
    $filter: ModelWorkoutPlanFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkoutPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const workoutPlansByUserID = /* GraphQL */ `
  query WorkoutPlansByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutPlansByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
