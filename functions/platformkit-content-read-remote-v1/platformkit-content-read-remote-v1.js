var axios = require('axios');
require('dotenv').config();
const { Octokit } = require("@octokit/rest");
var base64 = require('js-base64').Base64;
var githubToken = process.env.GITHUB_TOKEN;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {


  // Get filename from url parameter

  var headers = event.headers;


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
  var filePathElements = params.file.split("/");
  var fileId = filePathElements.slice(-1).pop();
  var repo = params.repo.split("/")[4];
  var user = params.repo.split("/")[3];

  // Find the file on Github
  const octokit = new Octokit({
    auth: githubToken,
  });
  var sha = null;
  var atob = require('atob');

  var result = null;

  try {
    var output = await octokit.rest.repos
      .getContent({
        owner: user,
        repo: repo,
        path: fileName,
      })
      .then(({ data }) => {
        sha = data.sha;
        result = data;
        data = atob(data.content);
        // handle data
        //console.log(data);
        return data;
      });
    

  }
  catch (err) {
    output = err;
  }

  var error = null;
  var status = 200;

  status = 200;
  return {
    headers: { "content-type": "application/json" },
    statusCode: status,
    error: error,
    body: JSON.stringify({ fileName: fileId, file: fileName, repo: params.repo, sha: result.sha, url: result.url, body: output, })
  };
}