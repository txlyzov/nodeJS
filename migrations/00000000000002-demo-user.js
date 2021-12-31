'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          //user_id: 1,
          login: 'user1',
          email: 'sdggfhggfsd@dhg.sa',
          password: '12354324s',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          //user_id: 2,
          login: 'user2',
          email: '4nh342@dhg.sa',
          password: '65jhsdf',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          //user_id: 3,
          login: 'user3',
          email: 'myuidsf@34.dfs',
          password: 'jhgdfg',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
