// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

var fs = require('fs-extra');
var docsPath = process.env.DOCS_PATH || '../docs';

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

var plugins = []

var gridsomeConfig = {
  siteName: siteName,
  icon: {
    favicon: favicon,
    touchicon: favicon
  },
  plugins: [
    // Markdown Docs
    {
      use: '@gridsome/source-filesystem',
      options: {
        //path: docsPath + '/*.md',
        path: docsPath + '/*.md',
        typeName: 'Doc'
      }
    },
    // Markdown Docs
    {
      use: '@gridsome/source-filesystem',
      options: {
        //path: docsPath + '/*.md',
        path: docsPath + '/**/*.md',
        typeName: 'Doc'
      }
    },
  ],
  // Assign Templates & Routes
  templates: {
    Doc: '/docs/:title',
    ApiSchema: '/docs/api/:key'
  }
}

module.exports = gridsomeConfig;