const fse = require("fs-extra");

fse.remove('temp').then(function() {});
fse.remove('markdown').then(function() {});