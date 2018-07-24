const AWS = require('aws-sdk'); // eslint-disable-line

const dynamoDoc = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (event, context) => {
    console.log(`EVENT = ${JSON.stringify(event, null, 4)}`);
    if (!event.queryStringParameters || !event.queryStringParameters === undefined) {
        return {
            statusCode: 400,
        };
    }
    const { queryStringParameters } = event;
    const { palindrome } = queryStringParameters;
    const reversePalindrome = palindrome.split('').reverse().join('');
    const isPalindrome = reversePalindrome === palindrome;
    const params = {
        TableName: process.env.PALINDROME_TABLE_NAME,
        Item: {
            requestId: event.requestContext.requestId,
            palindrome,
            isPalindrome,
        },
    };
    const dynamoResult = await dynamoDoc.put(params).promise();
    console.log(dynamoResult);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            isPalindrome,
        }),
    };
    console.log(response);
    return response;
};
