require('dotenv').config();
const { Octokit } = require("@octokit/rest");
var token = process.env.GITHUB_TOKEN;

var uiSchema = require("../../static/temp/ui-schema.json");
console.log(typeof uiSchema);


// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  var input = event.queryStringParameters || null;
  var user = input.user;
  var repo = input.repo;
  var directory = input.directory;
  var error = null;

  // Build Request
  const octokit = new Octokit({
    auth: token,
  });


  if (repo.includes("://")) {
    var chunks = repo.split("/");
    var lastChunk = chunks[4];
    repo = lastChunk;
  }

  var relevantRepo = null;

  function extractRepo(element, index, array) {
    if (element.repo == input.repo && element.path == input.directory) {
      console.log("\n\n\n");
      console.log("ELEMENT: ");
      relevantRepo = element;
      console.log(element);

    }
  }
  var array = Object.values(uiSchema.docs.collections);
  array.forEach((element, index) =>
    extractRepo(element, index, uiSchema.docs.collections)
  );

  try {

    if (relevantRepo == null) {
      throw error(err);
    }

  } catch (err) {
    return {
      headers: { "content-type": "application/json" },
      statusCode: 500,
      error: err,
      body: JSON.stringify({ "error": "Action not allowed.", "message": "Something went wrong." })
    };
  }

  // Request Data
  try {
    var output = await octokit.rest.repos
      .getContent({
        owner: user,
        repo: repo,
        path: directory
      })
      .then(({ data }) => {
        return data;
      });
  }
  catch (err) {
    error = err;
  }

  var cleanedResults = [];

  function cleanResults(element, index, array){
    console.log(element);
    element = {fileName: element.name, file: element.path, repo: input.repo, sha: element.sha, url: element.url};
    cleanedResults[index] = element;
  }

  output.forEach((element, index) =>
    cleanResults(element, index, output)
  );
  

  // Build Response
  var status = 200;
  output = JSON.stringify(cleanedResults);
  status = 200;
  return {
    headers: { "content-type": "application/json" },
    statusCode: status,
    error: error,
    body: output
  };
}