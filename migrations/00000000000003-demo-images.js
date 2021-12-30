'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'images',
      [
        {
          image_id: 1,
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          name: 'image1',
          description: '12354324s',
          is_private: false,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          image_id: 2,
          url: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg',
          name: 'image2',
          description: 'dfssfsdfsfdsfsd',
          is_private: false,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          image_id: 3,
          url: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          name: 'image3',
          description: null,
          is_private: false,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
