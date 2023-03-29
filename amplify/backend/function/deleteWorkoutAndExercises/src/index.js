const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const WORKOUTTABLE = process.env.WORKOUTTABLE;
const WORKOUTEXERCISETABLE = process.env.WORKOUTEXERCISETABLE;

const resolvers = {
  Mutation: {
    deleteWorkoutAndExercises: (event) => {
      return deleteWorkoutAndExercises(event);
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

async function deleteWorkoutAndExercises(event) {
  const removeWorkoutExercisesProm = removeWorkoutExercises(
    event.arguments.workoutId,
  );
  const removeWorkoutProm = removeWorkout(event.arguments.workoutId);
  const [_, deletedWorkout] = await Promise.all([
    removeWorkoutExercisesProm,
    removeWorkoutProm,
  ]);
  return { id: deletedWorkout.id };
}

async function removeWorkout(workoutId) {
  const deletedWorkout = await deleteWorkout(workoutId);
  console.log('Deleted workout is: ', deletedWorkout);
  console.log('Deleted workout with id: ', deletedWorkout.id);
  return deletedWorkout;
}

async function removeWorkoutExercises(workoutId) {
  const workoutExercises = await listWorkoutExercises(workoutId);
  await deleteWorkoutExercises(workoutExercises);
}

async function listWorkoutExercises(workoutId) {
  const params = {
    TableName: WORKOUTEXERCISETABLE,
    IndexName: 'byWorkout',
    KeyConditionExpression: 'workoutID = :workoutId',
    ExpressionAttributeValues: { ':workoutId': workoutId },
  };
  try {
    const data = await docClient.query(params).promise();
    return data.Items;
  } catch (err) {
    return err;
  }
}

async function deleteWorkoutExercises(workoutExercises) {
  // format data for docClient
  const seedData = workoutExercises.map((item) => {
    return { DeleteRequest: { Key: { id: item.id } } };
  });

  /* We can only batch-write 25 items at a time,
    so we'll store both the quotient, as well as what's left.
    */

  let quotient = Math.floor(seedData.length / 25);
  const remainder = seedData.length % 25;
  /* Delete in increments of 25 */

  let batchMultiplier = 1;
  while (quotient > 0) {
    for (let i = 0; i < seedData.length - 1; i += 25) {
      await docClient
        .batchWrite(
          {
            RequestItems: {
              [WORKOUTEXERCISETABLE]: seedData.slice(i, 25 * batchMultiplier),
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
      ++batchMultiplier;
      --quotient;
    }
  }

  /* Upload the remaining items (less than 25) */
  if (remainder > 0) {
    await docClient
      .batchWrite(
        {
          RequestItems: {
            [WORKOUTEXERCISETABLE]: seedData.slice(seedData.length - remainder),
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
  }
}

async function deleteWorkout(id) {
  const params = {
    TableName: WORKOUTTABLE,
    Key: { id },
    ReturnValues: 'ALL_OLD',
  };
  try {
    const data = await docClient.delete(params).promise();
    const response = data.Attributes;
    return response;
  } catch (err) {
    return err;
  }
}
