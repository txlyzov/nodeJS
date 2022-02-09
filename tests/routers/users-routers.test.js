const chai = require('chai');
const { expect } = require('chai');
const HSC = require('http-status-codes');
const server = require('../../index');
const routes = require('../../src/utils/routes-values').USERS_ROUTS;
const usersModel = require('../../src/models').users;

const testUtil = require('../util.test');

describe(testUtil.printCaptionX2('Users routers tests:'), () => {
  before(async () => {
    await testUtil.cleanTable(usersModel);
  });
  afterEach(async () => {
    await testUtil.cleanTable(usersModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`POST ${routes.BASE_URL}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('It should create a new user', (done) => {
      chai
        .request(server)
        .post(routes.BASE_URL)
        .send(forCreateUser)
        .end((err, res) => {
          const reformatedBodyContent = {
            login: res.body.login,
            email: res.body.email,
            password: res.body.password,
          };

          res.should.have.status(HSC.OK);
          expect(reformatedBodyContent).to.have.deep.eq(forCreateUser);
          done();
        });
    });

    it('It should not create any new user', (done) => {
      usersModel.create(forCreateUser).then(
        chai
          .request(server)
          .post(routes.BASE_URL)
          .send(forCreateUser)
          .end((err, res) => {
            res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
            done();
          }),
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`GET ${routes.BASE_URL}`), () => {
    describe('test with presetted data', () => {
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

      before(async () => {
        await usersModel.create(forCreateUser1);
        await usersModel.create(forCreateUser2);
      });

      it('It should get all users', (done) => {
        chai
          .request(server)
          .get(routes.BASE_URL)
          .end((err, res) => {
            const reformatedBodyContent1 = {
              login: res.body[0].login,
              email: res.body[0].email,
              password: res.body[0].password,
            };
            const reformatedBodyContent2 = {
              login: res.body[1].login,
              email: res.body[1].email,
              password: res.body[1].password,
            };

            res.should.have.status(HSC.OK);
            expect(reformatedBodyContent1).to.have.deep.eq(forCreateUser1);
            expect(reformatedBodyContent2).to.have.deep.eq(forCreateUser2);
            done();
          });
      });
    });

    it('It should not get any users', (done) => {
      chai
        .request(server)
        .get(routes.BASE_URL)
        .end((err, res) => {
          res.should.have.status(HSC.NOT_FOUND);
          done();
        });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`GET ${routes.WITH_ID}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('It should get the user by id', (done) => {
      usersModel.create(forCreateUser).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .get(routes.BASE_URL + '/' + elementId)
          .end((err, res) => {
            const reformatedBodyContent = {
              login: res.body.login,
              email: res.body.email,
              password: res.body.password,
            };

            res.should.have.status(HSC.OK);
            expect(reformatedBodyContent).to.have.deep.eq(forCreateUser);
            done();
          });
      });
    });

    it('It should not get any user by nonexistent id', (done) => {
      const nonexistentId = -1;

      chai
        .request(server)
        .get(routes.BASE_URL + nonexistentId)
        .end((err, res) => {
          res.should.have.status(HSC.NOT_FOUND);
          done();
        });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`PUT ${routes.WITH_ID}`), () => {
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

    it('It should edit the user by id', (done) => {
      usersModel.create(forCreateUser).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .put(routes.BASE_URL + '/' + elementId)
          .send(forEditUser)
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not edit any user with nonexistent id', (done) => {
      const nonexistentId = -1;

      usersModel.create(forCreateUser).then(
        chai
          .request(server)
          .put(routes.BASE_URL + '/' + nonexistentId)
          .send(forEditUser)
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          }),
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`DELETE ${routes.WITH_ID}`), () => {
    const forCreateUser = {
      login: 'login',
      email: 'email',
      password: 'password',
    };

    it('It should delete the user by id', (done) => {
      usersModel.create(forCreateUser).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .delete(routes.BASE_URL + '/' + elementId)
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not delete any user by nonexistent id', (done) => {
      const nonexistentId = -1;

      chai
        .request(server)
        .delete(routes.BASE_URL + '/' + nonexistentId)
        .end((err, res) => {
          res.should.have.status(HSC.BAD_REQUEST);
          done();
        });
    });
  });
});
