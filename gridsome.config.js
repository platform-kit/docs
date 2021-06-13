// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`


// Requires
var fs = require('fs-extra');
const shell = require('shelljs')
const token = process.env.GITHUB_TOKEN;

// Vars
var docsPath = process.env.DOCS_PATH || '../docs';

// UI Schema
var uiSchemaPath = process.env.UI_SCHEMA_PATH;
if (uiSchemaPath == null) { uiSchemaPath = "../app/ui-schema.json"; }
if (uiSchemaPath != null) {
  try {
    var uiSchema = fs.readFileSync(uiSchemaPath, { encoding: 'utf8', flag: 'r' })
    uiSchema = JSON.parse(uiSchema)
  }
  catch (err) {
    var uiSchema = null
  }
  if (uiSchema != null) {
    try {
      fs.copySync(uiSchemaPath, './static/temp/ui-schema.json')
      console.log('UI Schema copied to static directory.')
    } catch (err) {
      console.error(err)
    }
  }
}

// API Schema
var apiSchemaPath = process.env.API_SCHEMA_PATH;
if (apiSchemaPath == null) { apiSchemaPath = "../app/api-schema.json"; }
if (apiSchemaPath != null) {
  var apiSchema = fs.readFileSync(apiSchemaPath, { encoding: 'utf8', flag: 'r' })
  apiSchema = JSON.parse(apiSchema)
  if (apiSchema != null) {
    try {
      fs.copySync(apiSchemaPath, './static/temp/api-schema.json')
      console.log('API Schema copied to static directory.')
    } catch (err) {
      console.error(err)
    }
  }
}

// Site Name
var siteName = null;
if (apiSchema.name != null) { siteName = apiSchema.name }
if (uiSchema != null && uiSchema.siteName != null) { siteName = uiSchema.siteName }
if (siteName == null) { siteName = "PlatformKit" }

// Fav Icon
var favicon = null;
if (uiSchema != null && uiSchema.icons != null && uiSchema.icons.favicon != null) { favicon = uiSchema.icons.favicon }
else {
  favicon = './src/favicon.png'
}

// Plugins
var plugins = [];

if (uiSchema != null && uiSchema.docs != null && uiSchema.docs.collections != null) {
  var collections = Object.values(uiSchema.docs.collections);
  shell.exec('rm -r temp; mkdir temp');
  collections.forEach(function callbackFn(element, index, array) {
    console.log('\n');
    console.log(element);
    console.log('\n');
    if (element.publish != false && element.repo != null) {

      // Clone Doc repos
      var path = "temp";
      var repo = element.repo;
      shell.exec('cd temp; git clone ' + element.repo + ' docs/' + element.name + ' && cd docs/' + element.name + ' && git filter-branch --subdirectory-filter ' + element.path);
      // Example of Git Clone with subdirectory filter 
      // git clone https://github.com/platform-kit/platformkit-api.git api && cd api && git filter-branch --subdirectory-filter docs

      var docs = 'temp/' + element.name + '/' + element.path;
      console.log('Docs Path: ' + docs);
    }
  });
  // Create Content from Docs
  var newDocs = {
    use: '@gridsome/source-filesystem',
    options: {
      path: '**/*.md',
      baseDir: 'temp/docs',
      typeName: 'Doc'
    }
  };
  plugins.push(newDocs);

}

else {

  // Markdown Docs
  var defaultDocs = {
    use: '@gridsome/source-filesystem',
    options: {
      //path: docsPath + '/*.md',
      path: docsPath + '/*.md',
      typeName: 'Doc'
    }
  };
  plugins.push(defaultDocs);
}



var gridsomeConfig = {
  siteName: siteName,
  icon: {
    favicon: favicon,
    touchicon: favicon
  },
  plugins: plugins,
  // Assign Templates & Routes
  templates: {
    Doc: '/docs/:path',
    ApiSchema: '/docs/api/:key'
  }
}

module.exports = gridsomeConfig;