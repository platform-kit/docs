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
  var search = input.search;
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
      //console.log("\n\n\n");
      // console.log("ELEMENT: ");
      relevantRepo = element;
      // console.log(element);

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
  var output = [];
  try {
    var shortRepo = input.repo.split("/")[3] + '/' + input.repo.split("/")[4];
    var q = 'q=' + search + '+path:/' + directory + '+in:file+language:markdown+repo:' + shortRepo;
    console.log('Search Query: ' + q);

    try {
      var output = await octokit.rest.search
        .code({
          q
        })
        .then(({ data }) => {
          console.log(data);
          data.items.forEach((element, index) =>

            (function () {
              element.repository = element.repository.html_url;
              delete element.git_url;
              delete element.html_url;
            })()

          );
          return data;
        });
    } catch (err) { }

  }
  catch (err) {
    error = err;
  }

  // Build Response
  var status = 200;
  output = JSON.stringify(output);
  status = 200;
  return {
    headers: { "content-type": "application/json" },
    statusCode: status,
    error: error,
    body: output
  };
}