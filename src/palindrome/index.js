const AWS = require('aws-sdk'); // eslint-disable-line


module.exports.handler = async (event, context) => {
    const message = 'Hello Serverless World!';
    console.log(message);
    const statusCode = 200;
    return {
        statusCode,
        headers: null,
        body: JSON.stringify({
            message,
        }),
    };
};
