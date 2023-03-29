import * as Sequelize from "sequelize";

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        field: "id",
        primaryKey: true,
        allowNull: false
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

  down: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable('users');
  }
};
