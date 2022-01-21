const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const authorizationService = require('../../../controllers/services/authorization-service');
const usersModel = require('../../../models').users;
const testUtil = require('../../util.test');

require('dotenv').config();

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;

chai.use(chaiAsPromised);

describe(testUtil.printCaptionX2('Authorization services tests:'), () => {
  before(async () => {
    await testUtil.cleanTable(usersModel);
  });
  afterEach(async () => {
    await testUtil.cleanTable(usersModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- signUp(body)'), async () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: null,
      originalPassword: 'password',
    };

    it('should signUp one user object', async () => {
      const result = await authorizationService.signUp({
        ...forCreateUser,
        password: forCreateUser.originalPassword,
      });
      const formattedInput = {
        login: forCreateUser.login,
        email: forCreateUser.email,
      };
      const formattedResult = {
        login: result.login,
        email: result.email,
      };

      expect(formattedResult).to.deep.eq(formattedInput);
      expect(
        await bcrypt.compare(forCreateUser.originalPassword, result.password),
      ).to.be.eq(true);
    });

    it('should not signUp one user object', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });

      await expect(
        authorizationService.signUp({
          ...forCreateUser,
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        }),
      ).to.be.rejectedWith('Validation error');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- login(body)'), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: null,
      originalPassword: 'password',
    };

    it('should return array with user login and', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const forCreateUserNoHash = { ...forCreateUser, password: 'password' };
      const result = await authorizationService.login(forCreateUserNoHash);

      expect(result.error).to.be.null;
      expect(result.data.token).to.not.be.null;
      expect(result.data.login).to.be.eq(forCreateUser.login);
    });

    it('should return wrong user error', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const forCreateUserNoHash = { ...forCreateUser, login: 'login1' };
      const result = await authorizationService.login(forCreateUserNoHash);

      expect(result.error).to.be.eq('wrong user');
      expect(result.data).to.be.null;
    });

    it('should return wrong password error', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const forCreateUserNoHash = { ...forCreateUser, password: 'password1' };
      const result = await authorizationService.login(forCreateUserNoHash);

      expect(result.error).to.be.eq('wrong password');
      expect(result.data).to.be.null;
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('- changePassword(body)'), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: null,
      originalPassword: 'password',
    };

    it('should change password for one user object', async () => {
      const createResult = await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';
      await authorizationService.changePassword({
        ...forCreateUser,
        password: newPassword,
        token: jwt.sign({ id: elementId, login: elementLogin }, JWT_SECRET),
      });
      const changedResult = await usersModel.findOne({
        where: {
          id: elementId,
        },
      });
      const formattedCreateResult = {
        id: createResult.id,
        login: createResult.login,
        email: createResult.email,
      };
      const formattedChangedResult = {
        id: changedResult.id,
        login: changedResult.login,
        email: changedResult.email,
      };

      expect(formattedCreateResult).to.be.deep.eq(formattedChangedResult);
      expect(changedResult.password).to.not.be.eq(createResult.password);
    });

    it('should not change password for one user object because of invalid token signature', async () => {
      const createResult = await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';

      await expect(
        authorizationService.changePassword({
          ...forCreateUser,
          password: newPassword,
          token:
            jwt.sign({ id: elementId, login: elementLogin }, JWT_SECRET) + '1',
        }),
      ).to.be.rejectedWith('invalid signature');
    });

    it('should not change password for one user object because of invalid token', async () => {
      const createResult = await usersModel.create({
        ...forCreateUser,
        password: await bcrypt.hash(
          forCreateUser.originalPassword,
          BCRYPT_SALT,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';
      let token = jwt.sign({ id: elementId, login: elementLogin }, JWT_SECRET);
      token = token[1] + token[0] + token.substr(2);

      await expect(
        authorizationService.changePassword({
          ...forCreateUser,
          password: newPassword,
          token,
        }),
      ).to.be.rejectedWith('invalid token');
    });
  });
});
