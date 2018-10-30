import omit from 'lodash.omit';
import bcrypt from 'bcryptjs';
import {INTEGER, STRING, ENUM} from 'sequelize/lib/data-types';

const THIRTY_DAYS_AGO = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);

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
        min: 8,
        max: 128,
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

  User.authenticate = async function(name, password) {

    if (!name || !password) {

      return null;

    }

    // get user by name
    const user = await this.findOne({where: {name}});
    const isValidPassword = await comparePassword(password, user);

    if (user && isValidPassword) {

      return user;

    } else {

      return null;

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
