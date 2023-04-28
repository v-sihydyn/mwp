/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

const eventBridge = new AWS.EventBridge();

exports.handler = async (event) => {
  try {
    console.log('ARGUMENTS: ', event.arguments);
    const { deviceId, title, message } = event.arguments;
    const intervalInMinutes = event.arguments.intervalInMinutes || 1;

    const ruleName = `${deviceId}-hourly-reminder`;

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
          Id: `${deviceId}-${intervalInMinutes}-target`,
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
      statusCode: 200,
      body: JSON.stringify('Reminder set successfully.'),
    };
  } catch (err) {
    return err;
  }
};
