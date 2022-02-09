const chai = require('chai');
const { expect } = require('chai');
const HSC = require('http-status-codes');
const server = require('../../index');
const routes = require('../../src/utils/routes-values').AUTH_ROUTS;
const usersModel = require('../../src/models').users;
const testUtil = require('../util.test');

describe(testUtil.printCaptionX2('Authorization routers tests:'), () => {
  before(async () => {
    await testUtil.cleanTable(usersModel);
  });
  afterEach(async () => {
    await testUtil.cleanTable(usersModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`POST ${routes.SIGN_UP}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('It should sign-up a new user', (done) => {
      chai
        .request(server)
        .post(routes.SIGN_UP)
        .send(forCreateUser)
        .end((err, res) => {
          res.should.have.status(HSC.OK);
          done();
        });
    });

    it('It should not sign-up a new user', (done) => {
      usersModel.create(forCreateUser).then(
        chai
          .request(server)
          .post(routes.SIGN_UP)
          .send(forCreateUser)
          .end((err, res) => {
            res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
            done();
          }),
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`POST ${routes.LOGIN}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: null,
      originalPassword: 'password',
    };

    describe('test with presetted data', () => {
      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should login the user', (done) => {
        chai
          .request(server)
          .post(routes.LOGIN)
          .send({
            ...forCreateUser,
            password: forCreateUser.originalPassword,
          })
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            expect(res.body.login).to.be.eq(forCreateUser.login);
            expect(res.body.token).to.not.be.null;
            done();
          });
      });
    });

    describe('test with presetted data', () => {
      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should not login the user because of nonexistent user login', (done) => {
        chai
          .request(server)
          .post(routes.LOGIN)
          .send({
            ...forCreateUser,
            login: forCreateUser.login + '1',
            password: forCreateUser.originalPassword,
          })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            expect(res.text).to.be.eq(
              `User with login "${forCreateUser.login + '1'}" not exists.`,
            );
            done();
          });
      });
    });

    describe('test with presetted data', () => {
      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should not login the user of wrong user password', (done) => {
        chai
          .request(server)
          .post(routes.LOGIN)
          .send({
            ...forCreateUser,
            password: forCreateUser.originalPassword + '1',
          })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            expect(res.text).to.be.eq(
              `Wrong password for user with login "${forCreateUser.login}".`,
            );
            done();
          });
      });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`POST ${routes.PASSWORD_CHANGING}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: null,
      originalPassword: 'password',
    };

    describe('test with presetted data', () => {
      let createdUser; // eslint-disable-line
      before(async () => {
        this.createdUser = await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should change the users password', (done) => {
        chai
          .request(server)
          .post(routes.PASSWORD_CHANGING)
          .send({
            token: testUtil.generateToken(
              this.createdUser.dataValues.id,
              this.createdUser.dataValues.login,
            ),
            password: forCreateUser.originalPassword + '1',
          })
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            expect(res.text).to.be.eq('Password changed.');
            done();
          });
      });
    });
    describe('test with presetted data', () => {
      let createdUser; // eslint-disable-line
      let token; // eslint-disable-line

      before(async () => {
        this.createdUser = await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should not change the users password because of invalid token', (done) => {
        chai
          .request(server)
          .post(routes.PASSWORD_CHANGING)
          .send({
            token: testUtil.generateInvalidToken(
              this.createdUser.dataValues.id,
              this.createdUser.dataValues.login,
            ),
            password: forCreateUser.originalPassword + '1',
          })
          .end((err, res) => {
            res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
            expect(res.text).to.be.eq('invalid token');
            done();
          });
      });
    });

    describe('test with presetted data', () => {
      let createdUser; // eslint-disable-line

      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await testUtil.encryptPassword(
            forCreateUser.originalPassword,
          ),
        });
      });

      it('It should not change the users password because of invalid token signature', (done) => {
        chai
          .request(server)
          .post(routes.PASSWORD_CHANGING)
          .send({
            token: testUtil.generateInvalidTokenSignature(
              this.createdUser.dataValues.id,
              this.createdUser.dataValues.login,
            ),
            password: forCreateUser.originalPassword + '1',
          })
          .end((err, res) => {
            res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
            expect(res.text).to.be.eq('invalid signature');
            done();
          });
      });
    });
  });
});
