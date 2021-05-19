'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('assignedArmies', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
      },
      armyId: {
        type: Sequelize.INTEGER,
        field: "armyId",
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        field: "priority",
        allowNull: true
      },
      profileId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: "profiles",
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('assignedArmies');
  }
};
