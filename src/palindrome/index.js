const AWS = require('aws-sdk'); // eslint-disable-line


module.exports.handler = (event, context) => {
    console.log(event);
    const { requestId } = event.requestContext;
    const statusCode = 200;
    return {
        statusCode,
        headers: null,
        body: {
            status: statusCode,
            data: {
            },
        },
    };
};
