'use strict';
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      email: 'admin@hex.com',
      password: await bcrypt.hash('test', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    const profileId = uuid()

    await queryInterface.bulkInsert('profiles', [{
      id: profileId,
      userId: 1,
      nickname: 'admin',
      avatarUrl: 'avatar.png'
    }]);

    await queryInterface.bulkInsert('assignedArmies',[{
      id: 1,
      armyId: 1,
      priority: 1,
      profileId: profileId,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
