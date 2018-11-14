import {omit} from 'lodash';
import bcrypt from 'bcryptjs';
import {INTEGER, STRING, ENUM} from 'sequelize/lib/data-types';

const THIRTY_DAYS_AGO = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);

/**
 * An error for failed authentication.
 */
class AuthenticationError extends Error {

  /**
   * Creates a new instance of AuthenticationError.
   * @param {String} message The message to display.
   */
  constructor(message = 'Authentication failed!') {

    super(message);
    this.message = message;
    this.name = 'AuthenticationError';

  }

}

/**
 * Compares the password to the actual password of the user.
 * @param {String} password The password to verify
 * @param {*} user The ORM user model.
 * @return {Promise} A promise to return true or false.
 */
function comparePassword(password, user) {

  if (!user) {

    return Promise.resolve(false);

  }

  return new Promise((resolve) => {

    bcrypt.compare(password, user.get('password'), (error, same) => {

      if (error || !same) {

        resolve(false);
        return;

      }

      resolve(true);

    });

  });

}

/**
 * Creates the model for the user table.
 * @param {sequelize.Sequelize} sequelize The sequelize database instance.
 * @param {Function} hashMethod How you want to hash the password.
 * @return {*} The user ORM model.
 */
function createUserModel(sequelize, hashMethod) {

  const modelConfig = {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 128],
          msg: 'Password must be between 8 and 128 characters long',
        },
      },
    },
    role: {
      type: ENUM,
      allowNull: false,
      defaultValue: 'user',
      values: ['user', 'manager', 'admin'],
    },
  };

  const options = {
    timestamps: true,
    hooks: {
      // hash the password before model creation
      async beforeCreate(model) {

        try {

          const password = await hashMethod(model.getDataValue('password'));
          model.setDataValue('password', password);

        } catch (error) {

          return error;

        }

      },

      // hash password if changed on update
      async beforeUpdate(model) {

        try {

          if (!model.changed('password')) {

            return;

          }

          const password = await hashMethod(model.getDataValue('password'));
          model.setDataValue('password', password);

        } catch (err) {

          return err;

        }

      },
    },
  };

  const User = sequelize.define('user', modelConfig, options);

  User.authenticate = async function(email, password) {

    if (!email || !password) {

      throw new AuthenticationError('Invalid email or password.');

    }

    // get user by email
    const user = await this.findOne({where: {email}});
    const isValidPassword = await comparePassword(password, user);

    if (user && isValidPassword) {

      return user;

    } else {

      throw new AuthenticationError('Invalid email or password.');

    }

  };

  User.prototype.toJSON = function() {

    return omit(this.dataValues, ['password']);

  };

  User.prototype.activeTokens = function() {

    return this.getTokens({
      where: {updatedAt: {$gt: THIRTY_DAYS_AGO}},
    });

  };

  User.prototype.inactiveTokens = function() {

    return this.getTokens({
      where: {updatedAt: {$lt: THIRTY_DAYS_AGO}},
    });

  };

  return User;

}

export default createUserModel;
