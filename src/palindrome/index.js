module.exports.handler = async (event, context) => {
    console.log(`EVENT = ${JSON.stringify(event, null, 4)}`);
    const message = 'Hello Serverless World!';
    console.log(message);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message,
        }),
    };
};
