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

    const profileId = uuid()

    await queryInterface.bulkInsert('Profiles', [{
      id: profileId,
      userId: 1,
      nickname: 'admin',
      avatarUrl: 'avatar.png'
    }]);

    await queryInterface.bulkInsert('AssignedArmies',[{
      id: 1,
      armyId: 1,
      priority: 1,
      profileId: profileId,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
