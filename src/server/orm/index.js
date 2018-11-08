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

  sequelize.sync().then(() => {

    console.log('Database Ready');

  });

  return function orm(request, _, next) {

    request.orm = {User, Token, Reward, Inventory, History};
    next();

  };

};
