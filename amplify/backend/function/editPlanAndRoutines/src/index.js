const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const PLANTABLE = process.env.PLANTABLE;
const ROUTINETABLE = process.env.ROUTINETABLE;
const EXERCISETABLE = process.env.EXERCISETABLE;

const resolvers = {
  Mutation: {
    deletePlanAndRoutines: (event) => {
      return deletePlanAndRoutines(event);
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

async function deletePlanAndRoutines(event) {
  const removeRoutinesAndExercisesProm = removeRoutinesAndExercises(
    event.arguments.planId,
  );
  const removePlanProm = removePlan(event.arguments.planId);
  const [_, deletedPlan] = await Promise.all([
    removeRoutinesAndExercisesProm,
    removePlanProm,
  ]);
  return { id: deletedPlan.id };
}

async function removePlan(planId) {
  const deletedPlan = await deletePlan(planId);
  console.log('Deleted plan is: ', deletedPlan);
  console.log('Deleted plan with id: ', deletedPlan.id);
  return deletedPlan;
}

async function removeRoutinesAndExercises(planId) {
  const routines = await listRoutinesForPlan(planId);
  console.log('routines', routines);
  const routineIds = routines.map((x) => x.id);
  console.log('routineIds', routineIds);

  await deleteRecords(routines, ROUTINETABLE);
  console.log('routines deleted successfully');

  const exercises = await listExercises(routineIds);
  console.log('exercises', exercises);
  await deleteRecords(exercises, EXERCISETABLE);
  console.log('exercises deleted successfully');
}

async function listRoutinesForPlan(planId) {
  const params = {
    TableName: ROUTINETABLE,
    IndexName: 'byWorkoutPlan',
    KeyConditionExpression: 'workoutPlanID = :planId',
    ExpressionAttributeValues: { ':planId': planId },
  };
  try {
    const data = await docClient.query(params).promise();
    return data.Items;
  } catch (err) {
    return err;
  }
}

async function listExercises(routineIds) {
  try {
    let exercises = [];

    for (const routineId of routineIds) {
      const params = {
        TableName: EXERCISETABLE,
        IndexName: 'byWorkoutPlanRoutine',
        KeyConditionExpression: 'workoutPlanRoutineID = :routineId',
        ExpressionAttributeValues: { ':routineId': routineId },
      };

      const data = await docClient.query(params).promise();
      exercises = exercises.concat(data.Items);
    }

    return exercises;
  } catch (err) {
    return err;
  }
}

async function deleteRecords(records, tableName) {
  // format data for docClient
  const seedData = records.map((item) => {
    return { DeleteRequest: { Key: { id: item.id } } };
  });

  console.log(tableName, JSON.stringify(seedData));

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
              [tableName]: seedData.slice(i, 25 * batchMultiplier),
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
            [tableName]: seedData.slice(seedData.length - remainder),
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

async function deletePlan(id) {
  const params = {
    TableName: PLANTABLE,
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
