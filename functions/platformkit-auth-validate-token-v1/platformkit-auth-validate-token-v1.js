var sesAccessKey = process.env.MAIL_USER;
var sesSecretKey = process.env.MAIL_KEY;
var mailHost = process.env.MAIL_HOST;
var mailPort = process.env.MAIL_PORT;
var mailSender = process.env.MAIL_SENDER;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    var hasSubscription = false;
    let thisCustomer = null;

    try {
        // Get filename from url parameter

        var headers = event.headers;
        console.log('Authorization: \n\n\n\n');
        console.log(headers.authorization);
        var token = headers.authorization || event.queryStringParameters.token || null;
        console.log(token);

        if (token.includes('Bearer ')) {
            token = token.split('Bearer ')[1];
            console.log('\n\n\n Bearer: \n\n\n' + token);
        }


        const jwt = require('jsonwebtoken');
        const loginSecretKey = process.env.JWT_SECRET;
        var data = jwt.verify(token, loginSecretKey);
        var tokenData = { sub: data.sub };
        if (process.env.ADMIN_EMAIL != null && data.sub == process.env.ADMIN_EMAIL) {
            tokenData.roles = ['admin'];
        }
        token = token = jwt.sign(tokenData, loginSecretKey, { expiresIn: '365 days' });
        data = jwt.verify(token, loginSecretKey);
        var message = 'Token validated.';

        return {
            statusCode: 200,

            body: JSON.stringify({ status: 200, data, error: false, message: message, token: token }, null, 3)
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ status: 500, data: data, error: true, message: err.toString() }, null, 3) }
    }
}