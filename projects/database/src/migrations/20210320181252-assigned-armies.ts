import * as Sequelize from "sequelize";

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable('AssignedArmies', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      armyId: {
        type: Sequelize.UUID,
        field: "armyId",
        allowNull: false
      },
      priority: {
        type: Sequelize.INTEGER,
        field: "priority",
        allowNull: false
      },
      profileId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: "Profiles",
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable('AssignedArmies');
  }
};
