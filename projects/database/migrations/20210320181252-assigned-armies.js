'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('AssignedArmies', {
      armyId: {
        type: Sequelize.STRING,
        field: "armyId",
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        field: "priority",
        allowNull: false
      },
      profileId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: "Profiles",
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AssignedArmies');
  }
};
