const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const PLANTABLE = process.env.PLANTABLE;
const ROUTINETABLE = process.env.ROUTINETABLE;

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
  const removeRoutinesProm = removeRoutinesOfPlan(event.arguments.planId);
  const removePlanProm = removePlan(event.arguments.planId);
  const [_, deletedPlan] = await Promise.all([
    removeRoutinesProm,
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

async function removeRoutinesOfPlan(planId) {
  const routines = await listRoutinesForPlan(planId);
  await deleteRoutines(routines);
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

async function deleteRoutines(routines) {
  // format data for docClient
  const seedData = routines.map((item) => {
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
              [ROUTINETABLE]: seedData.slice(i, 25 * batchMultiplier),
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
            [ROUTINETABLE]: seedData.slice(seedData.length - remainder),
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
