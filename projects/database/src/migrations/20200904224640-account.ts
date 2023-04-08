import * as Sequelize from "sequelize";
import { AccountRole } from "../constants/account-role.enum";

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable('Accounts', {
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
        type: Sequelize.ENUM(AccountRole.Admin, AccountRole.User),
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
    return queryInterface.dropTable('Accounts');
  }
};
