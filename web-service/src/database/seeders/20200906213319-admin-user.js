'use strict';
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'admin@hex.com',
      password: await bcrypt.hash('test', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    await queryInterface.bulkInsert('Profiles', [{
      id: uuid(),
      userId: 1,
      nickname: 'admin'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
