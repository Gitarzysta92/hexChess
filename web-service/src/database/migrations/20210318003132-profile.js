'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        type: Sequelize.STRING,
        field: "id",
        autoIncrement: false,
        primaryKey: true,
        allowNull: true
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
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profiles');
  }
};
