//const chai = require('chai');
const { expect } = require('chai');
const usersService = require('../../../controllers/services/users-service');
//const models = require('../../../models');
const usersModel = require('../../../models').users;
//const imagesModel = require('../../../models').users;

//chai.should();

describe('User services tests:', () => {
  //-----------------------------------------------------------------------------------------------
  before(async () => {
    console.log(321);
    await usersModel.truncate({ cascade: true });
    // await imagesModel.sync({ force: true });
    // await imagesModel.destroy({ where: {}, truncate: { cascade: true } });
    // await usersModel.sync({ force: true });
    // await usersModel.destroy({ where: {} });
  });
  afterEach(async () => {
    await usersModel.truncate({ cascade: true });
    //console.log(123);
    //await usersModel.destroy({ truncate: true });
    //usersModel.destroy({ where: {}, truncate: true });
  });

  describe('- create(input)', () => {
    const forCreate = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('should create one user object', async () => {
      const result = await usersModel.create(forCreate);
      expect(result).to.be.an('object');
    });

    // it('should not create one user object', async () => {
    //   const result1 = await usersService.create(input);
    //   const result2 = await usersService.create(input);
    //   // console.log(result);
    //   expect(err.message.should.be.eq('Validation error'));
    //   expect(result2).to.be.a('null');
    //   usersService.delete(result1.dataValues.id);
    // });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- get()', () => {
    const forCreate1 = {
      login: 'login1',
      email: 'email1',
      password: 'password1',
    };
    const forCreate2 = {
      login: 'login2',
      email: 'email2',
      password: 'password2',
    };

    it('should return array with user objects', async () => {
      const create1 = await usersModel.create(forCreate1);
      const create2 = await usersModel.create(forCreate2);
      const result = await usersService.get();

      // console.log(result);
      // console.log('----------------------------------------------------------');
      // console.log(create2);
      expect(result[0].dataValues).to.deep.equals(create1.dataValues);
      expect(result[1].dataValues).to.deep.equals(create2.dataValues);
    });
  });

  // describe('- get()', () => {
  //   it('should not return one user object', async () => {
  //     const result = await usersService.get(-1);

  //     expect(result).to.be.a('null');
  //   });
  // });

  //-----------------------------------------------------------------------------------------------
  describe('- getOne(id)', () => {
    it('should return one user object', async () => {
      const forCreate = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreate);
      const result = await usersService.getOne(create.dataValues.id);

      expect(result).to.be.an('object');
    });

    it('should not return one user object', async () => {
      const result = await usersService.getOne(-1);

      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- update(id, input)', () => {
    const forCreate = {
      login: 'login1',
      email: 'email1',
      password: 'password1',
    };
    const forEdit = {
      login: 'login2',
      email: 'email2',
      password: 'password2',
    };

    it('should update one user object with id', async () => {
      const create = await usersModel.create(forCreate);
      const result = await usersService.update(create.dataValues.id, forEdit);
      expect(result).to.deep.equal([1]);
    });

    it('should not update one user object with nonexistent id', async () => {
      const result = await usersService.update(-1, forEdit);
      expect(result).to.deep.equal([0]);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- delete(id)', () => {
    it('should delete one user object with id', async () => {
      const forCreate = {
        login: 'login',
        email: 'email',
        password: 'password',
      };
      const create = await usersModel.create(forCreate);
      const result = await usersService.delete(create.dataValues.id);
      expect(result).to.deep.equal(1);
    });

    it('should not delete one user object with nonexistent id', async () => {
      const result = await usersService.delete(-1);
      expect(result).to.deep.equal(0);
    });
  });
});
