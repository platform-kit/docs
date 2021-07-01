var fs = require('fs');

function getGraphQLSchemas() {
    var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
    apiSchema = JSON.parse(apiSchema);
    var schemas = Object.entries(apiSchema.schemas)
    var types = [];
    for (const [key, value] of Object.entries(schemas)) {
        var type = value[0];
        var endpoints = Object.entries(value[1]);
        for (const [endpointKey, endpointValue] of endpoints) {
            if (endpointValue != null && endpointValue['input_validation_rules'] != null) {
                var rules = Object.entries(endpointValue['input_validation_rules']);
                const { Resource } = require('../models/resource');
                var resource = new Resource(type);
                var startLine = ` type ` + resource.singularizeType() + ` {`
                var fieldLines = {};
                for (const [fieldName, rulesValue] of rules) {
                    var fieldType = null;
                    if (rulesValue.includes('string')) {
                        fieldType = 'String';
                    }
                    if (rulesValue.includes('integer')) {
                        fieldType = 'Int';
                    }
                    if (rulesValue.includes('numeric')) {
                        fieldType = 'Float';
                    }
                    if (rulesValue.includes('boolean')) {
                        fieldType = 'Boolean';
                    }

                    var fieldLine = `   ` + fieldName + `: ` + fieldType;
                    fieldLines[fieldName] = fieldLine;
                }
                var endLine = `}`;
                types[type] = { startLine: startLine, fieldLines: fieldLines, endLine: endLine };
            }
        }
    }

    // Generate the Types portion of the schema string
    var string = '';
    for (const [type, lines] of Object.entries(types)) {
        string = string + '\n' + lines.startLine;
        for (const [lineName, lineValue] of Object.entries(lines.fieldLines)) {
            string = string + '\n' + lineValue;
        }
        string = string + '\n' + lines.endLine + '\n';
    }

    // Generate the Query portion of the schema string
    string = string + '\n';
    var queryString = `
    type Query { 
    `;
    schemas = Object.entries(apiSchema.schemas);
    for (const [key, value] of schemas) {
        // Add Browse Query
        const { Resource } = require('../models/resource');
        var resource = new Resource(key);
        queryString = queryString + '   ' + resource.pluralizeType() + ' (take: Int, skip: Int): [' + resource.singularizeType() + ']\n';
    }

    for (const [key, value] of schemas) {
        // Add Read Query
        const { Resource } = require('../models/resource');
        var resource = new Resource(key);
        queryString = queryString + '   ' + resource.singularizeType() + '(id: Int): ' + resource.singularizeType() + '\n';
    }

    queryString = queryString + `
    }`;
    string = string + queryString;

    // Generate the Mutations portion of the schema string
    string = string + '\n';
    var queryString = `
    type Mutation { 
    `;
    schemas = Object.entries(apiSchema.schemas);

    for (const [key, value] of schemas) {
        // Add Read Query
        const { Resource } = require('../models/resource');
        var resource = new Resource(key);
        if (value.hasOwnProperty('add')) {
            queryString = queryString + '   add_' + resource.singularizeType() + '(data: String): ' + resource.singularizeType() + '\n';
        }
        if (value.hasOwnProperty('edit')) {
            queryString = queryString + '   edit_' + resource.singularizeType() + '(id: Int, data: String): ' + resource.singularizeType() + '\n';
        }
        if (value.hasOwnProperty('delete')) {
            queryString = queryString + '   delete_' + resource.singularizeType() + '(id: Int): ' + resource.singularizeType() + '\n';
        }

    }
    // queryString = queryString + '   dummy(id: Int): ' + 'Integer' + '\n';

    queryString = queryString + `
    }`;
    string = string + queryString;

    return string;

    // GraphQL Schema String example:
    /*
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # This "Book" type defines the queryable fields for every book in our data source.
    
    type Book {
        title: String
        name: String
        author: String
    }
    
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    
    type Query {
        books: [Book]
    }
    */
}

function getGraphQLResolvers() {
    var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
    apiSchema = JSON.parse(apiSchema);
    var schemas = Object.entries(apiSchema.schemas)
    var types = [];
    var resolvers = {
        Query: {},
        Mutation: {}
    };
    for (const [key, value] of Object.entries(schemas)) {
        const { Resource } = require('../models/resource');
        var resource = new Resource(value[0]);
        resolvers.Query[value[0]] = (parent, args, context, info) => resource.browse(args);
        resolvers.Query[resource.singularizeType()] = (parent, args, context, info) => resource.read(args.id);
        if (value.hasOwnProperty('add')) {
            resolvers.Mutation['add_' + resource.singularizeType()] = (parent, args, context, info) => resource.add(args);
        }
        if (value.hasOwnProperty('edit')) {
            resolvers.Mutation['edit_' + resource.singularizeType()] = (parent, args, context, info) => resource.edit(args.id, args.data);
        }
        if (value.hasOwnProperty('delete')) {
            resolvers.Mutation['delete_' + resource.singularizeType()] = (parent, args, context, info) => resource.delete(args.id);
        }

    }
    // resolvers.Mutation['dummy'] = (parent, args, context, info) => null

    return resolvers;

    /*
    // Result should produce an object that looks like this:
    var resolvers = 
    {
        Query: {
            'analytic_events': () =>  data.browse()         
        },
    };
    */
}

module.exports = {
    getGraphQLSchemas,
    getGraphQLResolvers
}