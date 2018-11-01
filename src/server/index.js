import _ from 'babel-polyfill';

import Express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';
import {makeExecutableSchema} from 'graphql-tools';

import orm from './orm';
import auth from './auth';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';

dotenv.config();

const port = process.env.PORT || process.env.DEFAULT_PORT || 3000;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
      dialect: 'mssql',
      host: process.env.DB_HOST,
      pool: {
        min: 0,
        max: 5,
        idle: 10000,
      },
      logging: console.log.bind(console),
      dialectOptions: {
        encrypt: true,
      },
    });

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = new Express();
app.use(orm(sequelize));
app.use(auth);

app.use('/graphql',
    cors(),
    bodyParser.json(),
    expressGraphQL((request) => {

      return {
        schema: executableSchema,
        pretty: true,
        context: {
          models: request.orm,
          user: request.auth.user,
          auth: {
            isAuthenticated: request.auth.isAuthenticated,
            scope: request.auth.scope,
          },
        },
      };

    }));

app.listen(port);
