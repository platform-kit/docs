var axios = require('axios');
require('dotenv').config();
const { Octokit } = require("@octokit/rest");
var base64 = require('js-base64').Base64;
var githubToken = process.env.GITHUB_TOKEN;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  try {
    // Get filename from url parameter

    var headers = event.headers;
    console.log('Authorization: \n\n\n\n');
    console.log(headers.authorization);
    var token = headers.authorization || event.queryStringParameters.token || null;
    console.log(token);

    if (token != null && token.includes('Bearer ')) {
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

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: 500, data: data, error: true, message: err.toString() }, null, 3) }
  }

  function dd(input) {
    var status = 200;
    if (typeof input == 'object') {
      input = JSON.stringify(input);
    }
    return {
      headers: { "content-type": "application/json" },
      statusCode: status,
      error: error,
      body: input
    };
  };

  // Params
  var params = event.queryStringParameters || null;
  const fileName = params.file;
  var repo = params.repo.split("/")[4];
  var user = params.repo.split("/")[3];

  // Find the file on Github
  const octokit = new Octokit({
    auth: githubToken,
  });
  var sha = null;
  var atob = require('atob');

  try {
    var output = await octokit.rest.repos
      .getContent({
        owner: user,
        repo: repo,
        path: fileName,
      })
      .then(({ data }) => {
        sha = data.sha;
        data = atob(data.content);
        // handle data
        //console.log(data);
        return data;
      });

  }
  catch (err) {
    output = err;
  }

  // return dd(output);

  // Check password
  var password = true;

  var error = null;
  var status = 200;

  // Update the file, if new data is provided & password is correct

  if (event.body != null && password == true) {
    var btoa = require('btoa');
    var b64 = null;
    var bin = null;
    bin = event.body;
    b64 = btoa(bin);
    console.log(b64);

    var file = await octokit.rest.repos
      .createOrUpdateFileContents({
        owner: user,
        repo: repo,
        path: fileName,
        branch: 'main',
        sha: sha,
        message: "Content Updated",
        content: b64
      })
      .then(({ data }) => {
        // handle data
        //console.log(data);
        return data;
      });

    var message = "Success.";

    var body = null;
    if (event.body != null && event.body != '') {
      console.log(' ---- ');
      console.log(typeof event.body);
      console.log(' ---- ');
      body = event.body;
    }

    var data = {
      "message": message,
      params: params,
      body: body,
      file: file,
    };

  }

  status = 200;
  return {
    headers: { "content-type": "application/json" },
    statusCode: status,
    error: error,
    body: JSON.stringify({repo: params.repo, file:fileName, body: output})
  };
}