const AWS = require('aws-sdk'); // eslint-disable-line

const dynamoDoc = new AWS.DynamoDB.DocumentClient();

function checkPalindrome(string) {
    const reversePalindrome = string.split('').reverse().join('');
    return reversePalindrome === string;
}

function insertToDynamo(table, payload) {
    const params = {
        TableName: table,
        Item: payload,
    };
    return dynamoDoc.put(params).promise();
}

async function getPalidrome(requestId, palindrome) {
    const isPalindrome = checkPalindrome(palindrome);
    const dynamoPayload = {
        requestId,
        palindrome,
        isPalindrome,
        timestamp: new Date().toISOString(),
    };
    await insertToDynamo(process.env.PALINDROME_TABLE_NAME, dynamoPayload);
    return { isPalindrome };
}


module.exports.handler = async (event, context) => {
    console.log(`EVENT = ${JSON.stringify(event, null, 4)}`);
    if (!event.queryStringParameters || !event.queryStringParameters === undefined) {
        return {
            statusCode: 400,
        };
    }
    const { queryStringParameters } = event;
    const { palindrome } = queryStringParameters;
    const { requestId } = event.requestContext;
    const result = await getPalidrome(requestId, palindrome);
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    console.log(response);
    return response;
};
