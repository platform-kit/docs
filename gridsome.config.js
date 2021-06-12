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


var plugins = [];

if (uiSchema != null && uiSchema.docs != null && uiSchema.docs.collections != null) {
  console.log('TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST ');
  var collections = Object.values(uiSchema.docs.collections);
  collections.forEach(function callbackFn(element, index, array) {
    console.log('\n');
    console.log(element);
    console.log('\n');
    if (element.publish != false) {

      // Markdown Docs
      var newDocs = {
        use: '@gridsome/source-filesystem',
        options: {
          //path: element.path + element.name.toLowerCase() + '/*.md',      
          path: '*.md',
          subdirectory: element.label,
          baseDir: element.path,
          pathPrefix: element.prefix,
          typeName: 'Doc'
        }
      };

      console.log('PATHS');
      console.log('../platformkit-api/docs/*.md');
      console.log(element.path + '/*.md');
      console.log(element);
      plugins.push(newDocs)
    }
  });

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