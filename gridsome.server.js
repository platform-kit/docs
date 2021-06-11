// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// Import the API Schema
var fs = require('fs-extra');
var apiSchemaPath = process.env.API_SCHEMA_PATH;

if(apiSchemaPath == null) { apiSchemaPath = "../app/api-schema.json"; }

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

module.exports = function (api) {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/    

  // Add ApiSchema Collection
  api.loadSource(actions => {
    const apiSchemas = actions.addCollection({
      typeName: 'ApiSchema'
    })
    if (apiSchema != null) {
      var schemas = Object.entries(apiSchema.schemas);
      for (const [key, value] of schemas) {
        var node = { key: key, value: value, data: JSON.stringify(value) }
        apiSchemas.addNode(node)
        // Use the Pages API here: https://gridsome.org/docs/pages-api/
        api.createManagedPages(({ createPage }) => {
          createPage({
            path: '/docs/api/' + node.key,
            component: './src/templates/ApiSchema.vue'
          })
        })
      }
    }
  })

}
