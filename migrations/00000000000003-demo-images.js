'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'images',
      [
        {
          url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          name: 'image1',
          description: '12354324s',
          isPrivate: true,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg',
          name: 'image2',
          description: 'dfssfsdfsfdsfsd',
          isPrivate: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          name: 'image3',
          description: null,
          isPrivate: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
          name: 'yoda1',
          description: null,
          isPrivate: false,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('images', null, {});
  },
};
