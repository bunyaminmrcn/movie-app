const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const dotenv = require('dotenv')

dotenv.config();

const { run: mongoRun } = require('./db/setup')
const schema = require('./schema/schema')
/*
var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)
*/

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
}
const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    //schema: schema,
    //rootValue: root,
    graphiql: true,
}))
app.listen(5005, () => {
    console.log('server listeing on 5005')
    mongoRun();
})