import Express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';

import schema from './schema/schema';
import Database from './Database';

dotenv.config();

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

const app = new Express();
const db = new Database(dbConfig);

app.use('/graphql', cors(), expressGraphQL({
  schema,
  graphiql: true,
  context: {
    db: db,
  },
}));

db.ready((err) => {

  if (err) {

    console.log('Could not connect to database.');
    console.log(err);
    db.close();

  } else {

    console.log('Connected to database.');
    app.listen(port, function() {

      console.log(`Express: http://localhost:${port}/`);
      console.log(`GraphQL: http://localhost:${port}/graphql`);

    });

  }

});

console.log('Connecting to database...');
