'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      image_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true   
      },
      is_private: {
        type: Sequelize.BOOLEAN ,
        allowNull: false   
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'user_id'
        }   
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });




  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  }
};