const Express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const {Connection} = require('tedious');
const Database = require('./Database');
require('dotenv').config();

const port = process.env.PORT || process.env.DEFAULT_PORT;

const dbConfig = {
  userName: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
  },
};

const dbConnection = new Connection(dbConfig);

const app = new Express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  context: {
    db: new Database(dbConnection),
  },
}));

dbConnection.on('connect', (err) => {
  if (err) {
    console.log('Could not connect to database.');
    console.log(err);
    dbConnection.close();
  } else {
    console.log('Connected to database.');
    app.listen(port, function() {
      console.log(`Express: http://localhost:${port}/`);
      console.log(`GraphQL: http://localhost:${port}/graphql`);
    });
  }
});

console.log('Connecting to database...');
