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

  describe(testUtil.printCaption('- create(req)'), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('should create one image object', async () => {
      const result = await imagesService.create({ body: forCreateImage });
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

      await expect(
        imagesService.create({ body: forNotCreateImage }),
      ).to.be.rejectedWith(
        'insert or update on table "images" violates foreign key constraint "images_userId_fkey"',
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getPublic(req)'), () => {
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
    const forCreateImage4 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image4',
      description: 'description4',
      isPrivate: false,
      userId: 2,
    };

    it('should return array with public image objects for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage1);
      const create2 = await imagesModel.create(forCreateImage2);
      const create3 = await imagesModel.create(forCreateImage3);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getPublic({
        query: {
          page: 2,
          limit: 2,
        },
      });
      const createValues2 = create2.dataValues;
      const createValues3 = create3.dataValues;
      const resultValues2 = result.rows[0].dataValues;
      const resultValues3 = result.rows[1].dataValues;

      expect(result.count).to.eq(4);
      expect(result.rows.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return 0 length array and total number of records 0', async () => {
      const forCreateImage1 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image1',
        description: 'description1',
        isPrivate: true,
        userId: 1,
      };
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getPublic({
        query: {
          page: 2,
          limit: 2,
        },
      });

      expect(result.count).to.eq(0);
      expect(result.rows.length).to.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getPublic(req)'), () => {
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
    const forCreateImage4 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'imag34',
      description: 'description4',
      isPrivate: false,
      userId: 2,
    };

    it('should return array with relevant public image objects for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const create3 = await imagesModel.create(forCreateImage3);
      const create2 = await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getPublic({
        query: {
          page: 2,
          limit: 2,
          searchGoal: 'image',
        },
      });
      const createValues3 = create3.dataValues;
      const createValues2 = create2.dataValues;
      const resultValues3 = result.rows[0].dataValues;
      const resultValues2 = result.rows[1].dataValues;

      expect(result.count).to.eq(4);
      expect(result.rows.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return 0 length array and total number of records 0', async () => {
      const forCreateImage1 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image1',
        description: 'description1',
        isPrivate: true,
        userId: 1,
      };
      const forCreateImage2 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'imag32',
        description: 'description2',
        isPrivate: false,
        userId: 2,
      };
      await imagesModel.create(forCreateImage1);
      await imagesModel.create(forCreateImage2);
      const result = await imagesService.getPublic({
        query: {
          page: 2,
          limit: 2,
          searchGoal: 'image',
        },
      });

      expect(result.count).to.eq(0);
      expect(result.rows.length).to.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getAllByUserId(req)'), () => {
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
    const forCreateImage4 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image4',
      description: 'description4',
      isPrivate: false,
      userId: 2,
    };

    it('should return array with private user image objects for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage1);
      const create2 = await imagesModel.create(forCreateImage2);
      const create3 = await imagesModel.create(forCreateImage3);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
        },
      });
      const createValues2 = create2.dataValues;
      const createValues3 = create3.dataValues;
      const resultValues2 = result.rows[0].dataValues;
      const resultValues3 = result.rows[1].dataValues;

      expect(result.count).to.eq(4);
      expect(result.rows.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return 0 length array and total number of records 0', async () => {
      const forCreateImage1 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image1',
        description: 'description1',
        isPrivate: true,
        userId: 1,
      };
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
        },
      });

      expect(result.count).to.eq(0);
      expect(result.rows.length).to.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getByUserId(req)'), () => {
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
    const forCreateImage4 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'imag34',
      description: 'description4',
      isPrivate: true,
      userId: 2,
    };

    it('should return array with relevant user image objects for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const create3 = await imagesModel.create(forCreateImage3);
      const create2 = await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
          searchGoal: 'image',
        },
      });
      const createValues3 = create3.dataValues;
      const createValues2 = create2.dataValues;
      const resultValues3 = result.rows[0].dataValues;
      const resultValues2 = result.rows[1].dataValues;

      expect(result.count).to.eq(4);
      expect(result.rows.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return array with relevant user image objects with public setting for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      await imagesModel.create(forCreateImage3);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
          searchGoal: 'imag3',
          privacyFilter: 'private',
        },
      });

      expect(result.count).to.eq(2);
      expect(result.rows.length).to.eq(0);
    });

    it('should return array of user image objects with public setting for sigle page and total number of records', async () => {
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage4);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const create3 = await imagesModel.create(forCreateImage3);
      const create2 = await imagesModel.create(forCreateImage2);
      await imagesModel.create(forCreateImage1);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
          privacyFilter: 'public',
        },
      });
      const createValues3 = create3.dataValues;
      const createValues2 = create2.dataValues;
      const resultValues3 = result.rows[0].dataValues;
      const resultValues2 = result.rows[1].dataValues;

      expect(result.count).to.eq(4);
      expect(result.rows.length).to.eq(2);
      expect(resultValues2).to.deep.eq(createValues2);
      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return 0 length array and total number of records 0', async () => {
      const forCreateImage1 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image1',
        description: 'description1',
        isPrivate: true,
        userId: 1,
      };
      const forCreateImage2 = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'imag32',
        description: 'description2',
        isPrivate: false,
        userId: 2,
      };
      await imagesModel.create(forCreateImage1);
      await imagesModel.create(forCreateImage2);
      const result = await imagesService.getByUserId({
        body: { userId: 2 },
        query: {
          page: 2,
          limit: 2,
          searchGoal: 'image',
        },
      });

      expect(result.count).to.eq(0);
      expect(result.rows.length).to.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getOneByIdAndUserId(req)'), () => {
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

    it('should return private user image object', async () => {
      await imagesModel.create(forCreateImage1);
      await imagesModel.create(forCreateImage2);
      const create3 = await imagesModel.create(forCreateImage3);
      const result = await imagesService.getOneByIdAndUserId({
        body: { userId: 2 },
        params: {
          id: create3.dataValues.id,
        },
      });
      const createValues3 = create3.dataValues;
      const resultValues3 = result.dataValues;

      expect(resultValues3).to.deep.eq(createValues3);
    });

    it('should return null because user 3 is not the owner of image 2', async () => {
      await imagesModel.create(forCreateImage1);
      await imagesModel.create(forCreateImage2);
      const create3 = await imagesModel.create(forCreateImage3);
      const result = await imagesService.getOneByIdAndUserId({
        body: { userId: 3 },
        params: {
          id: create3.dataValues.id,
        },
      });

      expect(result).to.be.null;
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- updateByIdAndUserId(req)'), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image1',
      description: 'description1',
      isPrivate: true,
      userId: 1,
    };
    const forEditImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image2',
      description: 'description2',
      isPrivate: false,
      userId: 1,
    };

    it('should return 1 (success)', async () => {
      const create = await imagesModel.create(forCreateImage);
      const result = await imagesService.updateByIdAndUserId({
        body: {
          ...forEditImage,
          id: create.dataValues.id,
        },
      });

      expect(result).to.deep.eq(1);
    });

    it('should return 0 because of nonexistent image id', async () => {
      const nonexistentId = -1;
      const result = await imagesService.updateByIdAndUserId({
        body: {
          ...forEditImage,
          id: nonexistentId,
        },
      });

      expect(result).to.eq(0);
    });

    it('should return 0 because of wrong combination of user id and image id (wrong owner)', async () => {
      const create = await imagesModel.create(forCreateImage);
      const result = await imagesService.updateByIdAndUserId({
        body: {
          ...forEditImage,
          userId: 2,
          id: create.dataValues.id,
        },
      });

      expect(result).to.deep.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- deleteByIdAndUserId(req)'), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image1',
      description: 'description1',
      isPrivate: true,
      userId: 1,
    };

    it('should return 1 (success)', async () => {
      const create = await imagesModel.create(forCreateImage);
      const result = await imagesService.deleteByIdAndUserId({
        params: {
          id: create.dataValues.id,
        },
        body: {
          userId: 1,
        },
      });

      expect(result).to.deep.eq(1);
    });

    it('should return 0 because of nonexistent image id', async () => {
      const nonexistentId = -1;
      const result = await imagesService.updateByIdAndUserId({
        params: {
          id: nonexistentId,
        },
        body: {
          userId: 1,
        },
      });

      expect(result).to.eq(0);
    });

    it('should return 0 because of wrong combination of user id and image id (wrong owner)', async () => {
      const create = await imagesModel.create(forCreateImage);
      const result = await imagesService.updateByIdAndUserId({
        params: {
          id: create.dataValues.id,
        },
        body: {
          userId: 2,
        },
      });

      expect(result).to.deep.eq(0);
    });
  });
});
