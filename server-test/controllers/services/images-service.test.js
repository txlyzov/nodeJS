const { expect } = require('chai');
const imagesService = require('../../../controllers/services/images-service');
const imagesModel = require('../../../models').images;
const usersModel = require('../../../models').users;
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
  after(async () => {
    await testUtil.cleanTable(usersModel);
    await testUtil.cleanTable(imagesModel);
  });
  afterEach(async () => {
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
      const result = await imagesModel.create(forCreateImage);
      const formattedResult = {
        url: result.url,
        name: result.name,
        description: result.description,
        isPrivate: result.isPrivate,
        userId: result.userId,
      };
      expect(formattedResult).to.deep.equals(forCreateImage);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- get()'), () => {
    const forCreateImage1 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image1',
      description: 'description1',
      isPrivate: false,
      userId: 1,
    };
    const forCreateImage2 = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image2',
      description: 'description2',
      isPrivate: true,
      userId: 2,
    };

    it('should return array with image objects', async () => {
      const create1 = await imagesModel.create(forCreateImage1);
      const create2 = await imagesModel.create(forCreateImage2);
      const result = await imagesService.get();
      const createValues1 = create1.dataValues;
      const createValues2 = create2.dataValues;
      const resultValues1 = result[0].dataValues;
      const resultValues2 = result[1].dataValues;

      expect(result.length).to.equals(2);
      expect(resultValues1).to.deep.equals(createValues1);
      expect(resultValues2).to.deep.equals(createValues2);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getOne(id)'), () => {
    it('should return one image object', async () => {
      const forCreateImage = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image',
        description: 'description',
        isPrivate: false,
        userId: 1,
      };
      const create = await imagesModel.create(forCreateImage);
      const elementId = create.dataValues.id;
      const result = await imagesService.getOne(elementId);
      const createValues = create.dataValues;
      const resultValues = result.dataValues;

      expect(resultValues).to.deep.equals(createValues);
    });

    it('should not return one image object', async () => {
      const nonexistentId = -1;
      const result = await imagesService.getOne(nonexistentId);

      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- update(id, input)'), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };
    const forEditImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image2',
      description: 'description2',
      isPrivate: true,
      userId: 2,
    };

    it('should update one image object with id', async () => {
      const create = await imagesModel.create(forCreateImage);
      const elementId = create.dataValues.id;
      const result = await imagesService.update(elementId, forEditImage);
      expect(result).to.deep.equal(1);
    });

    it('should not update one image object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await imagesService.update(nonexistentId, forEditImage);
      expect(result).to.deep.equal(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- delete(id)'), () => {
    it('should delete one image object with id', async () => {
      const forCreateImage = {
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        name: 'image',
        description: 'description',
        isPrivate: false,
        userId: 1,
      };
      const create = await imagesModel.create(forCreateImage);
      const elementId = create.dataValues.id;
      const result = await imagesService.delete(elementId);
      expect(result).to.deep.equal(1);
    });

    it('should not delete one image object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await imagesService.delete(nonexistentId);
      expect(result).to.deep.equal(0);
    });
  });
});
