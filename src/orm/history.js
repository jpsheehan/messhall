import {ENUM, DATE, INTEGER, NOW} from 'sequelize/lib/data-types';

/**
 * Create the ORM History Model. This records the history of attendences and
 * redemptions for a user.
 * @param {sequelize.Sequelize} sequelize The database instance.
 * @return {*}
 */
function createHistoryModel(sequelize) {

  const modelConfig = {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    type: {
      type: ENUM,
      allowNull: false,
      defaultValue: 'attendance',
      values: ['attendance', 'redemption'],
    },
    points: {
      type: INTEGER,
      allowNull: false,
    },
  };

  const options = {
    timestamps: true,
  };

  const History = sequelize.define('history', modelConfig, options);

  return History;

}

export default createHistoryModel;
