import bcrypt from 'bcryptjs';

import createUserModel from './user';
import createTokenModel from './token';
import createRewardModel from './reward';

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

  // build model associations
  User.hasMany(Token, {as: 'tokens'});
  Token.belongsTo(User);
  sequelize.sync().then(() => {

    User.findOrCreate({
      where: {email: 'jesse@example.com'},
      defaults: {
        firstName: 'Jesse',
        lastName: 'Example',
        role: 'admin',
        password: '1234512345',
      },
    });
    User.findOrCreate({
      where: {email: 'patrick@example.com'},
      defaults: {
        firstName: 'Patrick',
        lastName: 'Example',
        role: 'manager',
        password: '1234512345',
      },
    });
    User.findOrCreate({
      where: {email: 'jay@example.com'},
      defaults: {
        firstName: 'Jay',
        lastName: 'Example',
        role: 'user',
        password: '1234512345',
      },
    });

    Reward.findOrCreate({
      where: {name: 'Cadbury Dairy Milk'},
      defaults: {
        cost: 10,
      },
    });
    Reward.findOrCreate({
      where: {name: 'Cadbury Crunchy'},
      defaults: {
        cost: 10,
      },
    });
    Reward.findOrCreate({
      where: {name: 'Coca Cola 330mL'},
      defaults: {
        cost: 10,
      },
    });

  });

  return function orm(request, response, next) {

    request.orm = {User, Token, Reward};
    next();

  };

};
