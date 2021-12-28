'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          login: 'user1',
          email: 'sdggfhggfsd@dhg.sa',
          password: '12354324s',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          login: 'user2',
          email: '4nh342@dhg.sa',
          password: '65jhsdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          login: 'user3',
          email: 'myuidsf@34.dfs',
          password: 'jhgdfg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
