import * as Sequelize from "sequelize";

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.UUID,
        field: "id",
        primaryKey: true,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        field: "nickname",
        unique: true,
        allowNull: false
      },
      avatarUrl: {
        type: Sequelize.STRING,
        field: "avatarFileName",
        allowNull: true
      },
      accountId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: "Accounts",
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable('profiles');
  }
};
