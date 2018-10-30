import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import {INTEGER, UUID} from 'sequelize/lib/data-types';

const THIRTY_DAYS_AGO = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);

/**
 * Creates the model for the token table.
 * @param {sequelize.Sequelize} sequelize The sequelize database instance.
 * @return {*} The token model.
 */
function createTokenModel(sequelize) {

  const modelConfig = {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
  };

  const options = {
    timestamps: true,
  };

  const Token = sequelize.define('token', modelConfig, options);

  Token.tokenize = async function(user) {

    const v4String = uuid.v4();
    const tokenModel = await this.create({
      userId: user.get('id'),
      uuid: v4String,
    });

    const token = jwt.sign({
      uuid: tokenModel.get('uuid'),
      id: user.get('id'),
      role: user.get('role'),
    }, process.env.JWT_SECRET);

    return token;

  };

  Token.prototype.isExpired = function() {

    return this.get('updatedAt') < THIRTY_DAYS_AGO;

  };

  return Token;

}

export default createTokenModel;
