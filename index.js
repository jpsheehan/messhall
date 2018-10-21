const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const { Connection, Request } = require("tedious");
const jwt = require("express-jwt");

// configure the environment variables
require("dotenv").config();

// configure the port number to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// configure the database
const db_config = {
  userName: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  options: {
    database: process.env.DB_NAME,
    encrypt: true
  }
};

// configure the database
const conn = new Connection(db_config);
conn.on('connect', err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
    conn.close();
  }
});

// configure authentication
const auth = jwt({
  secret: process.env.JWT_SECRET
});

// schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// root resolver
const root = {
  message: () => 'Hello, World!'
};

const app = new express();

// setup the graphql api with authentication
app.use('/api/graphql', auth, express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use((req, res) => {
  res.send("Under Construction");
});

app.listen(port, function() {
  console.log(`Express GraphQL server now running on http://localhost:${port}/api/graphql`);
});