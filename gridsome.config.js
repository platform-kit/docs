// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

var docsPath = process.env.DOCS_PATH || '../docs';

var plugins = []

module.exports = {
  siteName: 'PlatformKit',
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