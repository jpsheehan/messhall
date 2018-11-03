import {INTEGER, STRING} from 'sequelize/lib/data-types';

/**
 * Creates the ORM model for the Rewards.
 * @param {sequelize.Sequelize} sequelize The database instance.
 * @return {*}
 */
function createRewardModel(sequelize) {

  const modelConfig = {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoincrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    cost: {
      type: INTEGER,
      allowNull: false,
    },
  };

  const options = {
    timestamps: true,
  };

  const Reward = sequelize.define('reward', modelConfig, options);

  return Reward;

}

export default createRewardModel;
