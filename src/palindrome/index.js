
module.exports.handler = async (event, context) => {
    console.log(`EVENT = ${JSON.stringify(event, null, 4)}`);
    const { queryStringParameters } = event;
    const { palindrome } = queryStringParameters;
    const reversePalindrome = palindrome.split('').reverse().join('');
    const isPalindrome = reversePalindrome === palindrome;
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            isPalindrome,
        }),
    };
    console.log(response);
    return response;
};
