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
        field: "avatarUrl",
        allowNull: true
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: "Users",
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable('profiles');
  }
};
