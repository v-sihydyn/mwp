/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

const eventBridge = new AWS.EventBridge();

const resolvers = {
  Mutation: {
    createRoutineReminder: (event) => {
      return createRoutineReminder(event);
    },
    deleteRoutineReminder: (event) => {
      return deleteRoutineReminder(event);
    },
  },
};

exports.handler = async (event, context) => {
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

async function createRoutineReminder(event) {
  try {
    console.log('ARGUMENTS: ', event.arguments);
    const { deviceId, routineId, title, message } = event.arguments;
    const intervalInMinutes = event.arguments.intervalInMinutes || 1;

    const ruleName = `${routineId}-${deviceId}-routine-reminder`;

    const putRuleParams = {
      Name: ruleName,
      ScheduleExpression: `rate(${intervalInMinutes} minute)`,
      State: 'ENABLED',
    };

    const putTargetsParams = {
      Rule: ruleName,
      Targets: [
        {
          Arn: 'arn:aws:lambda:eu-central-1:893455214720:function:NotificationSender-staging', // @TODO: insert variables
          Id: `${routineId}-${deviceId}-target`,
          Input: JSON.stringify({
            deviceId: deviceId,
            title: title || 'test title',
            message: message || 'test message',
          }),
        },
      ],
    };

    await eventBridge.putRule(putRuleParams).promise();
    await eventBridge.putTargets(putTargetsParams).promise();

    return {
      ruleName,
    };
  } catch (err) {
    return err;
  }
}

async function deleteRoutineReminder(event) {
  try {
    console.log('ARGUMENTS: ', event.arguments);
    const { ruleName } = event.arguments;

    const targetsResponse = await eventBridge
      .listTargetsByRule({
        Rule: ruleName,
      })
      .promise();
    await eventBridge
      .removeTargets({
        Ids: targetsResponse.Targets.map((x) => x.Id),
        Rule: ruleName,
      })
      .promise();
    await eventBridge
      .deleteRule({
        Name: ruleName,
      })
      .promise();

    return {
      deleted: true,
    };
  } catch (err) {
    return err;
  }
}
