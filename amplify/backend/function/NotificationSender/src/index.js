/* Amplify Params - DO NOT EDIT
	API_MWP_GRAPHQLAPIENDPOINTOUTPUT
	API_MWP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const { initializeApp, cert } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_MWP_GRAPHQLAPIIDOUTPUT;
const UserTableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-env

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

initializeApp({ credential: cert(serviceAccount) });

exports.handler = async (event) => {
  try {
    console.log(`Notification Sender EVENT: ${JSON.stringify(event)}`);

    const data = {};
    await sendNotification(
      {
        title: event.title,
        body: event.message,
      },
      data,
      event.fcmToken,
    );
    console.log('Notification send successfully');
  } catch (err) {
    console.log(err);
    return { err };
  }
};

const sendNotification = async (notification, data = {}, fcmToken) => {
  const message = {
    token: fcmToken,
    notification,
    data,
  };

  await getMessaging().send(message);
};

const getUser = async (id) => {
  const params = {
    TableName: UserTableName,
    Key: { id },
  };

  try {
    const response = await docClient.get(params).promise();
    return response?.Item;
  } catch (e) {
    console.log(e);
    return null;
  }
};
