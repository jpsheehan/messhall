import 'babel-polyfill';

import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import bodyParser from 'body-parser';

import expressGraphQL from 'express-graphql';
import {makeExecutableSchema} from 'graphql-tools';

import orm from './orm';
import auth from './auth';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';

dotenv.config();

const port = process.env.PORT || process.env.DEFAULT_PORT || 3000;

const mssqlOptions = {
  dialect: 'mssql',
  host: process.env.DB_HOST,
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  dialectOptions: {
    encrypt: true,
  },
};

const sqliteOptions = {
  dialect: 'sqlite',
  storage: './data.db',
};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_TYPE === 'sqlite'
      ? sqliteOptions
      : process.env.DB_TYPE === 'azure'
        ? mssqlOptions
        : null,
);

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
        graphiql: true,
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

// adds default data to the database
app.use('/refresh', (req, res, next) => {

  // Sync and create some default data
  // the force option drops all the tables beforehand
  sequelize.sync({force: true}).then(() => {

    // create the admin account and log them in
    req.orm.User.create({
      email: 'jesse@example.com',
      firstName: 'Jesse',
      lastName: 'Example',
      role: 'admin',
      password: '1234512345',
    }).then((jesse) => {

      req.orm.Token.create({
        uuid: process.env.ADMIN_UUID || null,
        userId: jesse.get('id'),
      });

      // add coca cola and add some inventory
      req.orm.Reward.create({
        name: 'Coca Cola Can',
        cost: 10,
      }).then((coke) => {

        req.orm.Inventory.create({
          quantity: 24,
          rewardId: coke.get('id'),
        });
        req.orm.Inventory.create({
          quantity: 24,
          rewardId: coke.get('id'),
        });

        req.orm.History.create({
          type: 'redemption',
          points: coke.get('cost'),
          rewardId: coke.get('id'),
          userId: jesse.get('id'),
        });

      });

    });

    req.orm.User.create({
      email: 'patrick@example.com',
      firstName: 'Patrick',
      lastName: 'Example',
      role: 'manager',
      password: '1234512345',
    });
    req.orm.User.create({
      email: 'jay@example.com',
      firstName: 'Jay',
      lastName: 'Example',
      role: 'user',
      password: '1234512345',
    });

    req.orm.Reward.create({
      name: 'Cadbury Dairy Milk',
      cost: 10,
    });
    req.orm.Reward.create({
      name: 'Cadbury Crunchy',
      cost: 10,
    });

  });

  res.send('Refreshed the database');

});

process.on('SIGINT', () => {

  console.log('Shutting down gracefully...');
  sequelize.close();
  process.exit();

});

app.listen(port, () => {

  const host = `http://127.0.0.1:${port}/`;
  console.log('Messhall API Server');
  console.log('===================');
  console.log('');
  console.log('The endpoints are:');
  console.log(`- ${host}graphql`);
  console.log(`- ${host}refresh`);
  console.log('');
  process.stdout.write('Please wait for the database to become ready... ');

});
