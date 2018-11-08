import bcrypt from 'bcryptjs';

import createUserModel from './user';
import createTokenModel from './token';
import createRewardModel from './reward';
import createInventoryModel from './inventory';
import createHistoryModel from './history';

/**
 * Hashes the password.
 * @param {String} password The password to hash.
 * @return {Promise} A promise to hash the password.
 */
function hash(password) {

  return new Promise((resolve, reject) => {

    bcrypt.genSalt(10, (err, salt) => {

      if (err) {

        reject(err);
        return;

      }

      // create the hash
      bcrypt.hash(password, salt, (err, hash) => {

        if (err) {

          reject(err);
          return;

        }

        resolve(hash);

      });

    });

  });

}

export default (sequelize) => {

  const User = createUserModel(sequelize, hash);
  const Token = createTokenModel(sequelize, hash);
  const Reward = createRewardModel(sequelize);
  const Inventory = createInventoryModel(sequelize);
  const History = createHistoryModel(sequelize);

  // build model associations
  User.hasMany(Token, {as: 'tokens'});
  User.hasMany(History, {as: 'history'});
  Token.belongsTo(User);

  Reward.hasMany(Inventory, {as: 'inventory'});
  Inventory.belongsTo(Reward);

  History.hasOne(Reward, {as: 'reward'});
  Reward.belongsTo(History);

  // Sync and create some default data
  // the force option drops all the tables beforehand
  sequelize.sync({force: true}).then(() => {

    User.create({
      email: 'jesse@example.com',
      firstName: 'Jesse',
      lastName: 'Example',
      role: 'admin',
      password: '1234512345',
    });
    User.create({
      email: 'patrick@example.com',
      firstName: 'Patrick',
      lastName: 'Example',
      role: 'manager',
      password: '1234512345',
    });
    User.create({
      email: 'jay@example.com',
      firstName: 'Jay',
      lastName: 'Example',
      role: 'user',
      password: '1234512345',
    });

    Reward.create({
      name: 'Cadbury Dairy Milk',
      cost: 10,
    });
    Reward.create({
      name: 'Cadbury Crunchy',
      cost: 10,
    });
    Reward.create({
      name: 'Coca Cola Can',
      cost: 10,
    });

  });

  return function orm(request, _, next) {

    request.orm = {User, Token, Reward, Inventory, History};
    next();

  };

};
