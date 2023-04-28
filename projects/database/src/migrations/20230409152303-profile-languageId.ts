import * as Sequelize from "sequelize";

export default {
  async up (queryInterface: Sequelize.QueryInterface) {
    return queryInterface.addColumn('Profiles', 'languageId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    });
  },

  async down (queryInterface: Sequelize.QueryInterface) {
    return queryInterface.removeColumn('Profiles', 'languageId')
  }
};
