const chai = require('chai');
const { expect } = require('chai');
const HSC = require('http-status-codes');
const server = require('../../index');
const imagesModel = require('../../src/models').images;
const usersModel = require('../../src/models').users;
const routes = require('../../src/utils/routes-values').USER_IMAGES_ROUTS;
const { errorTexts } = require('../../src/utils/consts');

const testUtil = require('../util.test');

let createdUser1; // eslint-disable-line
let createdUser2; // eslint-disable-line

describe(testUtil.printCaptionX2('User images routers tests:'), () => {
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
    this.createdUser1 = await usersModel.create(forCreateUser1);
    this.createdUser2 = await usersModel.create(forCreateUser2);
  });
  afterEach(async () => {
    await testUtil.cleanTable(imagesModel);
  });
  after(async () => {
    await testUtil.cleanTable(usersModel);
    await testUtil.cleanTable(imagesModel);
  });

  describe(testUtil.printCaption(`POST ${routes.BASE_URL}`), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
    };

    it('It should create a new image', (done) => {
      chai
        .request(server)
        .post(routes.BASE_URL)
        .set({
          AuthToken: testUtil.generateToken(
            this.createdUser1.dataValues.id,
            this.createdUser1.dataValues.login,
          ),
        })
        .send(forCreateImage)
        .end((err, res) => {
          const reformatedBodyContent = {
            url: res.body.url,
            name: res.body.name,
            description: res.body.description,
            isPrivate: res.body.isPrivate,
            userId: res.body.userId,
          };

          res.should.have.status(HSC.OK);
          expect(reformatedBodyContent).to.have.deep.eq({
            ...forCreateImage,
            userId: this.createdUser1.dataValues.id,
          });
          done();
        });
    });

    it('It should not create any new image because of invalid token', (done) => {
      chai
        .request(server)
        .post(routes.BASE_URL)
        .set({
          AuthToken: testUtil.generateInvalidToken(
            this.createdUser1.dataValues.id,
            this.createdUser1.dataValues.login,
          ),
        })
        .send(forCreateImage)
        .end((err, res) => {
          res.should.have.status(HSC.FORBIDDEN);
          expect(res.text).to.be.eq(errorTexts.AUTH_ERROR);
          done();
        });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(
    testUtil.printCaption(`GET ${routes.BASE_URL} ?page=X&limit=Y`),
    () => {
      describe('test with presetted data', () => {
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

        before(async () => {
          await imagesModel.create(forCreateImage1);
          await imagesModel.create(forCreateImage4);
          await imagesModel.create(forCreateImage1);
          await imagesModel.create(forCreateImage4);
          await imagesModel.create(forCreateImage2);
          await imagesModel.create(forCreateImage3);
          await imagesModel.create(forCreateImage1);
        });

        it('It should get user images by user id', (done) => {
          const page = 2;
          const limit = 2;
          chai
            .request(server)
            .get(`${routes.BASE_URL}?page=${page}&limit=${limit}`)
            .set({
              AuthToken: testUtil.generateToken(
                this.createdUser2.dataValues.id,
                this.createdUser2.dataValues.login,
              ),
            })
            .end((err, res) => {
              const reformatedBodyContent2 = {
                url: res.body.data.rows[0].url,
                name: res.body.data.rows[0].name,
                description: res.body.data.rows[0].description,
                isPrivate: res.body.data.rows[0].isPrivate,
                userId: res.body.data.rows[0].userId,
              };
              const reformatedBodyContent3 = {
                url: res.body.data.rows[1].url,
                name: res.body.data.rows[1].name,
                description: res.body.data.rows[1].description,
                isPrivate: res.body.data.rows[1].isPrivate,
                userId: res.body.data.rows[1].userId,
              };

              res.should.have.status(HSC.OK);
              res.body.data.rows.length.should.be.eq(2);
              res.body.meta.count.should.be.eq(4);
              expect(reformatedBodyContent2).to.have.deep.eq(forCreateImage2);
              expect(reformatedBodyContent3).to.have.deep.eq(forCreateImage3);
              done();
            });
        });
      });

      it('It should not get any images', (done) => {
        const page = 2;
        const limit = 2;
        chai
          .request(server)
          .get(`${routes.BASE_URL}?page=${page}&limit=${limit}`)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser2.dataValues.id,
              this.createdUser2.dataValues.login,
            ),
          })
          .end((err, res) => {
            res.should.have.status(HSC.NOT_FOUND);
            done();
          });
      });
    },
  );

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`GET ${routes.BASE_URL}`), () => {
    let createdImage2; // eslint-disable-line
    describe('test with presetted data', () => {
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

      before(async () => {
        await imagesModel.create(forCreateImage1);
        this.createdImage2 = await imagesModel.create(forCreateImage2);
        await imagesModel.create(forCreateImage3);
      });

      it('It should get image by user id and image id', (done) => {
        const imageId = this.createdImage2.dataValues.id;
        chai
          .request(server)
          .get(routes.BASE_URL + '/' + imageId)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser2.dataValues.id,
              this.createdUser2.dataValues.login,
            ),
          })
          .end((err, res) => {
            const reformatedBodyContent = {
              url: res.body.url,
              name: res.body.name,
              description: res.body.description,
              isPrivate: res.body.isPrivate,
              userId: res.body.userId,
            };

            res.should.have.status(HSC.OK);
            expect(reformatedBodyContent).to.have.deep.eq(forCreateImage2);
            done();
          });
      });
    });

    describe('test with presetted data', () => {
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

      before(async () => {
        await imagesModel.create(forCreateImage1);
        this.createdImage2 = await imagesModel.create(forCreateImage2);
        await imagesModel.create(forCreateImage3);
      });

      it('It should not get image by user id and image id because of wrong user id for image', (done) => {
        const imageId = this.createdImage2.dataValues.id;
        chai
          .request(server)
          .get(routes.BASE_URL + imageId)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .end((err, res) => {
            res.should.have.status(HSC.NOT_FOUND);
            done();
          });
      });
    });

    describe('test with presetted data', () => {
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

      before(async () => {
        await imagesModel.create(forCreateImage1);
        await imagesModel.create(forCreateImage2);
        await imagesModel.create(forCreateImage3);
      });

      it('It should not get image by user id and image id because of nonexistent image id', (done) => {
        const nonexistentId = -1;
        chai
          .request(server)
          .get(routes.BASE_URL + nonexistentId)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .end((err, res) => {
            res.should.have.status(HSC.NOT_FOUND);
            done();
          });
      });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`PUT ${routes.WITH_ID}`), () => {
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
      userId: 1,
    };

    it('It should edit the image by id and user id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const imageId = create.dataValues.id;
        chai
          .request(server)
          .put(routes.BASE_URL)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .send({ ...forEditImage, id: imageId })
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not edit any image with nonexistent image id', (done) => {
      const nonexistentId = -1;

      imagesModel.create(forCreateImage).then(
        chai
          .request(server)
          .put(routes.BASE_URL)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .send({ ...forEditImage, id: nonexistentId })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          }),
      );
    });

    it('It should not edit any image with nonexistent user id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const imageId = create.dataValues.id;
        chai
          .request(server)
          .put(routes.BASE_URL)
          .set({
            AuthToken: testUtil.generateToken(-1, -1),
          })
          .send({ ...forEditImage, id: imageId })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          });
      });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption(`DELETE ${routes.WITH_ID}`), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('It should delete the image by id and user id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const imageId = create.dataValues.id;
        chai
          .request(server)
          .delete(routes.BASE_URL + '/' + imageId)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not delete any image with nonexistent image id', (done) => {
      const nonexistentId = -1;

      imagesModel.create(forCreateImage).then(
        chai
          .request(server)
          .delete(routes.BASE_URL + '/' + nonexistentId)
          .set({
            AuthToken: testUtil.generateToken(
              this.createdUser1.dataValues.id,
              this.createdUser1.dataValues.login,
            ),
          })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          }),
      );
    });

    it('It should not delete any image with nonexistent user id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const imageId = create.dataValues.id;
        chai
          .request(server)
          .delete(routes.BASE_URL + '/' + imageId)
          .set({
            AuthToken: testUtil.generateToken(-1, -1),
          })
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          });
      });
    });
  });
});
