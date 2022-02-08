const { expect } = require('chai');
const { imagesService } = require('../../../src/services');
const imagesModel = require('../../../src/models').images;
const usersModel = require('../../../src/models').users;
const testUtil = require('../../util.test');

describe(testUtil.printCaptionX2('Images services tests:'), () => {
  //-----------------------------------------------------------------------------------------------
  before(async () => {
    await testUtil.cleanTable(usersModel);
    await testUtil.cleanTable(imagesModel);
    const forCreateUser1 = {
      login: 'login1',
      email: 'email1',
      password: 'password1',
    };
    const forCreateUser2 = {
      login: 'login2',
      email: 'email2',
      password: 'password2',
    };
    usersModel.create(forCreateUser1);
    usersModel.create(forCreateUser2);
  });
  afterEach(async () => {
    await testUtil.cleanTable(imagesModel);
  });
  after(async () => {
    await testUtil.cleanTable(usersModel);
    await testUtil.cleanTable(imagesModel);
  });

  describe(testUtil.printCaption('- create(input)'), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('should create one image object', async () => {
      const result = await imagesService.create(forCreateImage);
      const formattedResult = {
        url: result.url,
        name: result.name,
        description: result.description,
        isPrivate: result.isPrivate,
        userId: result.userId,
      };

      expect(formattedResult).to.deep.eq(forCreateImage);
    });

    it('should not create one image object', async () => {
      const forNotCreateImage = { ...forCreateImage, userId: -1 };

      await expect(imagesService.create(forNotCreateImage)).to.be.rejectedWith(
        'insert or update on table "images" violates foreign key constraint "images_userId_fkey"',
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getPublic()'), () => {
    const forCreateImage1 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image1',
      description: 'description1',
      isPrivate: true,
      userId: 1,
    };
    const forCreateImage2 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image2',
      description: 'description2',
      isPrivate: false,
      userId: 2,
    };
    const forCreateImage3 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image3',
      description: 'description3',
      isPrivate: false,
      userId: 2,
    };

    it('should return array with public image objects', async () => {
      await imagesModel.create(forCreateImage1);
      const create2 = await imagesModel.create(forCreateImage2);
      const create3 = await imagesModel.create(forCreateImage3);
      const result = await imagesService.getPublic();
      const createValues2 = create2.dataValues;
      const createValues3 = create3.dataValues;
      const resultValues2 = result[0].dataValues;
      const resultValues3 = result[1].dataValues;

      expect(result.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return 0 length array', async () => {
      const result = await imagesService.getPublic();

      expect(result.length).to.eq(0);
    });
  });
});
