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

    User.create({
      firstName: 'Jesse',
      lastName: 'Example',
      email: 'jesse@example.com',
      role: 'admin',
      password: '1234512345',
    });
    User.create({
      firstName: 'Patrick',
      lastName: 'Example',
      email: 'patrick@example.com',
      role: 'manager',
      password: '1234512345',
    });
    User.create({
      firstName: 'Jay',
      lastName: 'Example',
      email: 'jay@example.com',
      role: 'user',
      password: '1234512345',
    });

    Reward.create({
      name: 'Cadbury Dairy Milk',
      cost: 10,
    });
    Reward.create({
      name: 'Cadbury Crunchie',
      cost: 10,
    });
    Reward.create({
      name: 'Coca Cola 330mL',
      cost: 15,
    });

  });

  return function orm(request, response, next) {

    request.orm = {User, Token, Reward};
    next();

  };

};
