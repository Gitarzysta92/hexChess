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

    const profileId = uuid();

    await queryInterface.bulkInsert('Profiles', [{
      id: profileId,
      userId: 1,
      nickname: 'admin',
      avatarUrl: 'avatar.png'
    }]);

    await queryInterface.bulkInsert('AssignedArmies',[{
      armyId: "432d6de7-24cb-418c-8a6e-77841a36d59c",
      priority: 1,
      profileId: profileId,
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
