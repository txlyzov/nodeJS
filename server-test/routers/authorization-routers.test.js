const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HSC = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const server = require('../../index');
const usersModel = require('../../models').users;
const testUtil = require('../util.test');

require('dotenv').config();

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

describe(testUtil.printCaptionX2('Users routers tests:'), () => {
  before(async () => {
    await testUtil.cleanTable(usersModel);
  });
  afterEach(async () => {
    await testUtil.cleanTable(usersModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('POST /users/sign-up'), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('It should sign-up a new user', (done) => {
      chai
        .request(server)
        .post('/users/sign-up/')
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
          .post('/users/sign-up/')
          .send(forCreateUser)
          .end((err, res) => {
            res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
            done();
          }),
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('POST /users/login'), () => {
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
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should login the user', (done) => {
        chai
          .request(server)
          .post('/users/login/')
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
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should not login the user because of nonexistent user login', (done) => {
        chai
          .request(server)
          .post('/users/login/')
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
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should not login the user of wrong user password', (done) => {
        chai
          .request(server)
          .post('/users/login/')
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
  describe(testUtil.printCaption('POST /users/password-changing'), () => {
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
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should change the users password', (done) => {
        chai
          .request(server)
          .post('/users/password-changing/')
          .send({
            token: jwt.sign({ id: 1, login: forCreateUser.login }, JWT_SECRET),
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
      let token = jwt.sign({ id: 1, login: forCreateUser.login }, JWT_SECRET);
      token = token[1] + token[0] + token.substr(2);

      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should not change the users password because of invalid token', (done) => {
        chai
          .request(server)
          .post('/users/password-changing/')
          .send({
            token,
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
      before(async () => {
        await usersModel.create({
          ...forCreateUser,
          password: await bcrypt.hash(
            forCreateUser.originalPassword,
            BCRYPT_SALT,
          ),
        });
      });

      it('It should not change the users password because of invalid token signature', (done) => {
        chai
          .request(server)
          .post('/users/password-changing/')
          .send({
            token:
              jwt.sign({ id: 1, login: forCreateUser.login }, JWT_SECRET) + '1',
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
