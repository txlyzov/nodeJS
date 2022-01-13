const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const usersService = require('../../../controllers/services/users-service');
const usersModel = require('../../../models').users;
const testUtil = require('../../util.test');

chai.use(chaiAsPromised);

describe(testUtil.printCaptionX2('Users services tests:'), () => {
  before(async () => {
    await testUtil.cleanTable(usersModel);
  });
  afterEach(async () => {
    await testUtil.cleanTable(usersModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- create(input)'), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('should create one user object', async () => {
      const result = await usersService.create(forCreateUser);
      const formattedResult = {
        login: result.login,
        email: result.email,
        password: result.password,
      };

      expect(formattedResult).to.deep.equals(forCreateUser);
    });

    it('should not create one user object', async () => {
      await usersModel.create(forCreateUser);

      await expect(usersService.create(forCreateUser)).to.be.rejectedWith(
        'Validation error',
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- get()'), () => {
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

    it('should return array with user objects', async () => {
      const create1 = await usersModel.create(forCreateUser1);
      const create2 = await usersModel.create(forCreateUser2);
      const result = await usersService.get();
      const createValues1 = create1.dataValues;
      const createValues2 = create2.dataValues;
      const resultValues1 = result[0].dataValues;
      const resultValues2 = result[1].dataValues;

      expect(result.length).to.equals(2);
      expect(resultValues1).to.deep.equals(createValues1);
      expect(resultValues2).to.deep.equals(createValues2);
    });

    it('should return 0 length array', async () => {
      const result = await usersService.get();
      expect(result.length).to.equals(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getOne(id)'), () => {
    it('should return one user object', async () => {
      const forCreateUser = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreateUser);
      const elementId = create.dataValues.id;
      const result = await usersService.getOne(elementId);
      const createValues = create.dataValues;
      const resultValues = result.dataValues;

      expect(resultValues).to.deep.equals(createValues);
    });

    it('should not return one user object', async () => {
      const nonexistentId = -1;
      const result = await usersService.getOne(nonexistentId);

      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- update(id, input)'), () => {
    const forCreateUser = {
      login: 'login1',
      email: 'email1',
      password: 'password1',
    };
    const forEditUser = {
      login: 'login2',
      email: 'email2',
      password: 'password2',
    };

    it('should update one user object with id', async () => {
      const create = await usersModel.create(forCreateUser);
      const elementId = create.dataValues.id;
      const result = await usersService.update(elementId, forEditUser);

      expect(result).to.deep.equal(1);
    });

    it('should not update one user object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await usersService.update(nonexistentId, forEditUser);

      expect(result).to.deep.equal(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- delete(id)'), () => {
    it('should delete one user object with id', async () => {
      const forCreateUser = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreateUser);
      const elementId = create.dataValues.id;
      const result = await usersService.delete(elementId);

      expect(result).to.deep.equal(1);
    });

    it('should not delete one user object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await usersService.delete(nonexistentId);

      expect(result).to.deep.equal(0);
    });
  });
});
