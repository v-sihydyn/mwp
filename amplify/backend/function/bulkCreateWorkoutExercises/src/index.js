const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const WORKOUTEXERCISETABLE = process.env.WORKOUTEXERCISETABLE;

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
  console.log('exercises', exercises);
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

  return { exercises: seedData.map((v) => v.PutRequest.Item) };
}
