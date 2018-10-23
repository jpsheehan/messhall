const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const port = process.env.PORT || 3000;

const app = new express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(port, function() {
  console.log(`Express: http://localhost:${port}/`);
  console.log(`GraphQL: http://localhost:${port}/graphql`);
});