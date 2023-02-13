/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_MWP_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`;

const userExists = async (id) => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const response = await docClient.get(params).promise();
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async (user) => {
  const dateStr = new Date().toISOString();

  const Item = {
    ...user,
    __typename: 'User',
    _lastChangedAt: Date.now(),
    createdAt: dateStr,
    updatedAt: dateStr,
    _version: 1,
  };

  const params = {
    TableName,
    Item,
  };

  try {
    await docClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }

  const { sub, name, email } = event.request.userAttributes;
  const newUser = {
    id: sub,
    owner: sub,
    name,
    email,
  };

  if (!(await userExists(newUser.id))) {
    const resp = await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the DB`);
    console.log('save response', resp);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
