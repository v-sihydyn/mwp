export const schema = {
    "models": {
        "WorkoutExercise": {
            "name": "WorkoutExercise",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "muscleGroup": {
                    "name": "muscleGroup",
                    "isArray": false,
                    "type": {
                        "enum": "MuscleGroup"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "color": {
                    "name": "color",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "restTimeInSeconds": {
                    "name": "restTimeInSeconds",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "setsConfig": {
                    "name": "setsConfig",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                },
                "sortOrder": {
                    "name": "sortOrder",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "workoutID": {
                    "name": "workoutID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "WorkoutExercises",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byWorkoutBySortOrder",
                        "fields": [
                            "workoutID",
                            "sortOrder"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Workout": {
            "name": "Workout",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "WorkoutStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "dateFinished": {
                    "name": "dateFinished",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "totalTimeInSeconds": {
                    "name": "totalTimeInSeconds",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "WorkoutExercises": {
                    "name": "WorkoutExercises",
                    "isArray": true,
                    "type": {
                        "model": "WorkoutExercise"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "workoutID"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Workouts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "workoutsByDate",
                        "queryField": "workoutsByDate",
                        "fields": [
                            "status",
                            "dateFinished"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "workoutsByUser",
                        "queryField": "workoutsByUser",
                        "fields": [
                            "userID",
                            "dateFinished"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Exercise": {
            "name": "Exercise",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "muscleGroup": {
                    "name": "muscleGroup",
                    "isArray": false,
                    "type": {
                        "enum": "MuscleGroup"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "equipment": {
                    "name": "equipment",
                    "isArray": false,
                    "type": {
                        "enum": "ExerciseEquipment"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Exercises",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "WorkoutRoutineExercise": {
            "name": "WorkoutRoutineExercise",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "muscleGroup": {
                    "name": "muscleGroup",
                    "isArray": false,
                    "type": {
                        "enum": "MuscleGroup"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "equipment": {
                    "name": "equipment",
                    "isArray": false,
                    "type": {
                        "enum": "ExerciseEquipment"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "color": {
                    "name": "color",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "restTimeInSeconds": {
                    "name": "restTimeInSeconds",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "sortOrder": {
                    "name": "sortOrder",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "workoutPlanRoutineID": {
                    "name": "workoutPlanRoutineID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "setsConfig": {
                    "name": "setsConfig",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "WorkoutRoutineExercises",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byWorkoutPlanRoutine",
                        "fields": [
                            "workoutPlanRoutineID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "WorkoutPlanRoutine": {
            "name": "WorkoutPlanRoutine",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sortOrder": {
                    "name": "sortOrder",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "workoutPlanID": {
                    "name": "workoutPlanID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "WorkoutRoutineExercises": {
                    "name": "WorkoutRoutineExercises",
                    "isArray": true,
                    "type": {
                        "model": "WorkoutRoutineExercise"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "workoutPlanRoutineID"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "WorkoutPlanRoutines",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byWorkoutPlan",
                        "fields": [
                            "workoutPlanID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "WorkoutPlans": {
                    "name": "WorkoutPlans",
                    "isArray": true,
                    "type": {
                        "model": "WorkoutPlan"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "userID"
                        ]
                    }
                },
                "Workouts": {
                    "name": "Workouts",
                    "isArray": true,
                    "type": {
                        "model": "Workout"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "userID"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "usersByUsername",
                        "queryField": "usersByUsername",
                        "fields": [
                            "username"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "WorkoutPlan": {
            "name": "WorkoutPlan",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "WorkoutPlanRoutines": {
                    "name": "WorkoutPlanRoutines",
                    "isArray": true,
                    "type": {
                        "model": "WorkoutPlanRoutine"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "workoutPlanID"
                        ]
                    }
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "WorkoutPlans",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUser",
                        "fields": [
                            "userID",
                            "createdAt"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "WorkoutStatus": {
            "name": "WorkoutStatus",
            "values": [
                "INPROGRESS",
                "FINISHED"
            ]
        },
        "ExerciseEquipment": {
            "name": "ExerciseEquipment",
            "values": [
                "BARBELL",
                "BODYWEIGHT",
                "DUMBBELL",
                "EZBARBELL",
                "KETTLEBELL",
                "LEVERAGEMACHINE",
                "SLEDMACHINE",
                "SMITHMACHINE",
                "WEIGHTED"
            ]
        },
        "MuscleGroup": {
            "name": "MuscleGroup",
            "values": [
                "BACK",
                "BICEPS",
                "CARDIO",
                "CHEST",
                "CORE",
                "FOREARMS",
                "FULLBODY",
                "LEGS",
                "NECK",
                "SHOULDERS",
                "TRICEPS",
                "WEIGHTLIFTING"
            ]
        },
        "ModelAttributeTypes": {
            "name": "ModelAttributeTypes",
            "values": [
                "binary",
                "binarySet",
                "bool",
                "list",
                "map",
                "number",
                "numberSet",
                "string",
                "stringSet",
                "_null"
            ]
        }
    },
    "nonModels": {
        "DeletePlanAndRoutinesResponse": {
            "name": "DeletePlanAndRoutinesResponse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "DeleteWorkoutAndExercisesResponse": {
            "name": "DeleteWorkoutAndExercisesResponse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "BulkCreateWorkoutExercisesResponse": {
            "name": "BulkCreateWorkoutExercisesResponse",
            "fields": {
                "exercises": {
                    "name": "exercises",
                    "isArray": true,
                    "type": {
                        "model": "WorkoutExercise"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "updatedRoutineExercises": {
                    "name": "updatedRoutineExercises",
                    "isArray": true,
                    "type": {
                        "nonModel": "RoutineExerciseToUpdateResponse"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                }
            }
        },
        "RoutineExerciseToUpdateResponse": {
            "name": "RoutineExerciseToUpdateResponse",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "setsConfig": {
                    "name": "setsConfig",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "CreateRoutineReminderResponse": {
            "name": "CreateRoutineReminderResponse",
            "fields": {
                "ruleName": {
                    "name": "ruleName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "DeleteRoutineReminderResponse": {
            "name": "DeleteRoutineReminderResponse",
            "fields": {
                "deleted": {
                    "name": "deleted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.3.6",
    "version": "a0df71551884d13471789bcdaa8e48dc"
};