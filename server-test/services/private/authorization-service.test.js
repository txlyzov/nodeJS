const { expect } = require('chai');
const authorizationService =
  require('../../../src/services').authorizationService;
const usersModel = require('../../../src/models').users;
const testUtil = require('../../util.test');

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
        await testUtil.comparePasswords(
          forCreateUser.originalPassword,
          result.password,
        ),
      ).to.be.eq(true);
    });

    it('should not signUp one user object', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
        ),
      });

      await expect(
        authorizationService.signUp({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
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

    it('should return array with user login and token,error should be a null', async () => {
      await usersModel.create({
        ...forCreateUser,
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
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
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
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
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
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
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';
      await authorizationService.changePassword({
        ...forCreateUser,
        password: newPassword,
        token: testUtil.generateToken(elementId, elementLogin),
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
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';

      await expect(
        authorizationService.changePassword({
          ...forCreateUser,
          password: newPassword,
          token: testUtil.generateToken(elementId, elementLogin) + '1',
        }),
      ).to.be.rejectedWith('invalid signature');
    });

    it('should not change password for one user object because of invalid token', async () => {
      const createResult = await usersModel.create({
        ...forCreateUser,
        password: await testUtil.encryptPassword(
          forCreateUser.originalPassword,
        ),
      });
      const elementId = createResult.dataValues.id;
      const elementLogin = createResult.dataValues.login;
      const newPassword = 'password';
      let token = testUtil.generateToken(elementId, elementLogin);
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
