'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: true
      },
      email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false
      },
      role: {
          type: Sequelize.ENUM('admin', 'restricted'),
          field: "role",
          allowNull: false
      },
      createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
