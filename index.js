const Express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const {Connection} = require('tedious');
require('dotenv').config();

const port = process.env.PORT || process.env.DEFAULT_PORT;

const dbConfig = {
  userName: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
  },
};

const dbConnection = new Connection(dbConfig);

const app = new Express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  context: {
    db: dbConnection,
  },
}));

dbConnection.on('connect', (err) => {
  if (err) {
    console.log('Could not connect to database.');
    console.log(err);
    dbConnection.close();
  } else {
    console.log('Connected to database.');
    addDummyData(dbConnection);
    app.listen(port, function() {
      console.log(`Express: http://localhost:${port}/`);
      console.log(`GraphQL: http://localhost:${port}/graphql`);
    });
  }
});

const addDummyData = (db) => {
  // const request = new Request(`CREATE TABLE inventory (id int PRIMARY KEY, )`);
};
