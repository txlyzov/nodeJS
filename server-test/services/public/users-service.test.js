const { expect } = require('chai');
const usersService = require('../../../src/services').usersService;
const usersModel = require('../../../src/models').users;
const testUtil = require('../../util.test');

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

      expect(formattedResult).to.deep.eq(forCreateUser);
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

      expect(result.length).to.eq(2);
      expect(resultValues1).to.deep.eq(createValues1);
      expect(resultValues2).to.deep.eq(createValues2);
    });

    it('should return 0 length array', async () => {
      const result = await usersService.get();
      expect(result.length).to.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getOneById(id)'), () => {
    it('should return one user object', async () => {
      const forCreateUser = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreateUser);
      const elementId = create.dataValues.id;
      const result = await usersService.getOneById(elementId);
      const createValues = create.dataValues;
      const resultValues = result.dataValues;

      expect(resultValues).to.deep.eq(createValues);
    });

    it('should not return one user object', async () => {
      const nonexistentId = -1;
      const result = await usersService.getOneById(nonexistentId);

      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- getOneByLogin(login)'), () => {
    it('should return one user object', async () => {
      const forCreateUser = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreateUser);
      const elementLogin = create.dataValues.login;
      const result = await usersService.getOneByLogin(elementLogin);
      const createValues = create.dataValues;
      const resultValues = result.dataValues;

      expect(resultValues).to.deep.eq(createValues);
    });

    it('should not return one user object', async () => {
      const nonexistentLogin = 'nigol';
      const result = await usersService.getOneByLogin(nonexistentLogin);

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

      expect(result).to.deep.eq(1);
    });

    it('should not update one user object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await usersService.update(nonexistentId, forEditUser);

      expect(result).to.deep.eq(0);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- updatePassword(id, password)'), () => {
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

    it('should update one user object`s password with id', async () => {
      const create = await usersModel.create(forCreateUser);
      const elementId = create.dataValues.id;
      const result = await usersService.updatePassword(
        elementId,
        forEditUser.password,
      );

      expect(result).to.deep.eq(1);
    });

    it('should not update one user object`s password with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await usersService.updatePassword(
        nonexistentId,
        forEditUser.password,
      );

      expect(result).to.deep.eq(0);
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

      expect(result).to.deep.eq(1);
    });

    it('should not delete one user object with nonexistent id', async () => {
      const nonexistentId = -1;
      const result = await usersService.delete(nonexistentId);

      expect(result).to.deep.eq(0);
    });
  });
});
