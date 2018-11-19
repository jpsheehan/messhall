import {INTEGER, DATE, NOW} from 'sequelize/lib/data-types';

/**
 * Creates the Inventory ORM Model.
 * @param {sequelize.Sequelize} sequelize The database instance.
 * @return {*}
 */
function createInventoryModel(sequelize) {

  const modelConfig = {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    date: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
  };

  const options = {
    timestamps: true,
  };

  const Inventory = sequelize.define('inventory', modelConfig, options);

  return Inventory;

}

export default createInventoryModel;
