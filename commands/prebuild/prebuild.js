const path = require("path");
const fs = require("fs");
var util = require("util");
var child_process = require("child_process");
const { exit } = require("process");
var exec = require("child_process").exec;
var dotenv = require("dotenv").config();

(async () => {
  
  // UI Dev Server
  var command = "ls";
  if (process.env.REPO != null && process.env.REPO != "") {
    var repo = process.env.REPO;
    console.log("⬇️ Cloning repo from " + repo + " to /workspace");
    command = "rm -r workspace;";
    command = command + "git clone " + repo + " workspace; cd workspace; npm i;" + process.env.BUILD_COMMAND;
  }
  else {
    console.log("Building default docs.");
  }

  const ui = await exec(command, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
    }
    console.log("Child Process STDOUT: " + stdout);
    console.log("Child Process STDERR: " + stderr);
  });

  ui.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
  });

  ui.stdout.on("data", function (data) {
    ui.stdout.write(util.format(data.toString()));
    exit();
  });

  ui.on('close', function (code) {
    console.log('closing connection: ' + code);
    exit();
});

  
})();

