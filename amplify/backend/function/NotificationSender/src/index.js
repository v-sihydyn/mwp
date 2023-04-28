/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`Notification Sender EVENT: ${JSON.stringify(event)}`);
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
