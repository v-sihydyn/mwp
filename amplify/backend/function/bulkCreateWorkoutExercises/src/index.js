const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const WORKOUTEXERCISETABLE = process.env.WORKOUTEXERCISETABLE;
const WORKOUTROUTINEEXERCISETABLE = process.env.WORKOUTROUTINEEXERCISETABLE;

const resolvers = {
  Mutation: {
    bulkCreateWorkoutExercises: (event) => {
      return bulkCreateWorkoutExercises(event);
    },
  },
};

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);

  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error('Resolver not found.');
};

async function bulkCreateWorkoutExercises(event) {
  const exercises = event.arguments.exercises;
  const routineExercisesToUpdate = event.arguments.routineExercisesToUpdate;
  console.log('exercises', exercises);
  console.log('routineExercisesToUpdate', routineExercisesToUpdate);
  const dateStr = new Date().toISOString();

  const seedData = exercises.map((exercise) => ({
    PutRequest: {
      Item: {
        ...exercise,
        id: AWS.util.uuid.v4(),
        __typename: 'WorkoutExercise',
        _lastChangedAt: Date.now(),
        createdAt: dateStr,
        updatedAt: dateStr,
        _version: 1,
      },
    },
  }));

  await docClient
    .batchWrite(
      {
        RequestItems: {
          [WORKOUTEXERCISETABLE]: seedData,
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
          console.log('something went wrong...');
        }
      },
    )
    .promise();

  const updatedRoutineExercises = [];

  if (routineExercisesToUpdate && routineExercisesToUpdate.length > 0) {
    for (const exercise of routineExercisesToUpdate) {
      await updateRoutineExercise(
        exercise.id,
        'setsConfig',
        exercise.setsConfig,
      );
      updatedRoutineExercises.push(exercise);
    }
  }

  return {
    exercises: seedData.map((v) => v.PutRequest.Item),
    updatedRoutineExercises,
  };
}

const updateRoutineExercise = async (routineExerciseId, field, value) => {
  console.log('routine exercise: ', { routineExerciseId, field, value });

  const params = {
    TableName: WORKOUTROUTINEEXERCISETABLE,
    Key: { id: routineExerciseId },
    UpdateExpression: 'SET #field = :value ADD #version :version_inc',
    ExpressionAttributeValues: { ':value': value, ':version_inc': 1 },
    ExpressionAttributeNames: { '#field': field, '#version': '_version' },
  };

  try {
    await docClient.update(params).promise();
  } catch (e) {
    console.log(e);
  }
};
