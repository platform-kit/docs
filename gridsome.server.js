// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// Import the API Schema
var fs = require('fs');
var apiSchemaPath = process.env.API_SCHEMA_PATH;

if (apiSchemaPath != null) {
  apiSchemaPath = "static/temp/api-schema.json";
  var apiSchema = fs.readFileSync(apiSchemaPath, { encoding: 'utf8', flag: 'r' })
  apiSchema = JSON.parse(apiSchema);
} else {
  apiSchemaPath = "../app/api-schema.json";
  var apiSchema = fs.readFileSync(apiSchemaPath, { encoding: 'utf8', flag: 'r' })
  apiSchema = JSON.parse(apiSchema);
}

var uiSchemaPath = process.env.UI_SCHEMA_PATH;

uiSchemaPath = "static/temp/ui-schema.json";
var uiSchema = fs.readFileSync(uiSchemaPath, { encoding: 'utf8', flag: 'r' })
uiSchema = JSON.parse(uiSchema)


module.exports = function (api) {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/    

  // Add API & UI schemas to global metadata
  api.loadSource(async store => {
    store.addMetadata('apiSchema', { data: apiSchema, string: JSON.stringify(apiSchema) })
    store.addMetadata('uiSchema', { data: uiSchema, string: JSON.stringify(uiSchema) })
  })

  var enableCMS = process.env.ENABLE_CMS;
  if (enableCMS != null && enableCMS.toLowerCase() == 'true') {
    api.createPages(({ createPage }) => {
      createPage({
        path: '/auth/login',
        component: './src/auth/Login.vue'
      })
    })
    /*
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin',
        component: './src/admin/Index.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/users',
        component: './src/admin/Users.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/users/editor',
        component: './src/admin/UserEditor.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/pages',
        component: './src/admin/Pages.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/pages/editor',
        component: './src/admin/PageEditor.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/content',
        component: './src/admin/Content.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/content/editor',
        component: './src/admin/ContentEditor.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/products',
        component: './src/admin/Products.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/products/editor',
        component: './src/admin/ProductEditor.vue'
      })
    })
    */
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin',
        component: './src/admin/Docs.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/docs',
        component: './src/admin/Docs.vue'
      })
    })
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/docs/editor',
        component: './src/admin/DocsEditor.vue'
      })
    })
    /*
    api.createPages(({ createPage }) => {
      createPage({
        path: '/admin/api',
        component: './src/admin/API.vue'
      })
    })
    */
  }

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
