import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { IAccount } from "../interfaces/account";
import { IProfile } from "../interfaces/profile";
import * as Sequelize from 'sequelize/types';


const accountId = uuid(); 
const accounts: IAccount[] = [
  {
    id: accountId,
    email: 'admin@hex.com',
    password: bcrypt.hashSync('test', 10),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const profileId = uuid();
const profiles: IProfile[] = [
  {
    id: profileId,
    accountId: accountId,
    nickname: 'admin',
    avatarFileName: 'avatar.png',
    languageId: 1
  }
];

const assignedArmies = [
  {
    id: 1,
    armyId: "432d6de7-24cb-418c-8a6e-77841a36d59c",
    priority: 1,
    profileId: profileId,
  }
]


export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    await queryInterface.bulkInsert('Accounts', accounts);
    await queryInterface.bulkInsert('Profiles', profiles);
    await queryInterface.bulkInsert('AssignedArmies', assignedArmies);
  },

  down: async (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('Accounts', {}, {});
  }
};
