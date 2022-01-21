const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HSC = require('http-status-codes');
const server = require('../../index');
const routes = require('../../utils/routes-values').IMAGES_ROUTS;
const imagesModel = require('../../models').images;
const usersModel = require('../../models').users;

const testUtil = require('../util.test');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

describe(testUtil.printCaptionX2('Images routers tests:'), () => {
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
  afterEach(async () => {
    await testUtil.cleanTable(imagesModel);
  });
  after(async () => {
    await testUtil.cleanTable(usersModel);
    await testUtil.cleanTable(imagesModel);
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('POST ' + routes.BASE_URL), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('It should create a new image', (done) => {
      chai
        .request(server)
        .post(routes.BASE_URL)
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
          expect(reformatedBodyContent).to.have.deep.eq(forCreateImage);
          done();
        });
    });

    it('It should not create any new image', (done) => {
      const forNotCreateImage = { ...forCreateImage, userId: -1 };
      chai
        .request(server)
        .post(routes.BASE_URL)
        .send(forNotCreateImage)
        .end((err, res) => {
          res.should.have.status(HSC.INTERNAL_SERVER_ERROR);
          done();
        });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('GET ' + routes.BASE_URL), () => {
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

      it('It should get all images', (done) => {
        chai
          .request(server)
          .get(routes.BASE_URL)
          .end((err, res) => {
            const reformatedBodyContent2 = {
              url: res.body[0].url,
              name: res.body[0].name,
              description: res.body[0].description,
              isPrivate: res.body[0].isPrivate,
              userId: res.body[0].userId,
            };
            const reformatedBodyContent3 = {
              url: res.body[1].url,
              name: res.body[1].name,
              description: res.body[1].description,
              isPrivate: res.body[1].isPrivate,
              userId: res.body[1].userId,
            };

            res.should.have.status(HSC.OK);
            res.body.length.should.be.eq(2);
            expect(reformatedBodyContent2).to.have.deep.eq(forCreateImage2);
            expect(reformatedBodyContent3).to.have.deep.eq(forCreateImage3);
            done();
          });
      });
    });

    it('It should not get any images', (done) => {
      chai
        .request(server)
        .get(routes.BASE_URL)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(HSC.NOT_FOUND);
          done();
        });
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('GET ' + routes.WITH_ID), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('It should get the image by id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .get(routes.BASE_URL + elementId)
          .end((err, res) => {
            const reformatedBodyContent = {
              url: res.body.url,
              name: res.body.name,
              description: res.body.description,
              isPrivate: res.body.isPrivate,
              userId: res.body.userId,
            };

            res.should.have.status(HSC.OK);
            expect(reformatedBodyContent).to.have.deep.eq(forCreateImage);
            done();
          });
      });
    });

    it('It should not get any image by nonexistent id', (done) => {
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
  describe(testUtil.printCaption('PUT ' + routes.WITH_ID), () => {
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

    it('It should edit the image by id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .put(routes.BASE_URL + elementId)
          .send(forEditImage)
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not edit any image with nonexistent id', (done) => {
      const nonexistentId = -1;

      imagesModel.create(forCreateImage).then(
        chai
          .request(server)
          .put(routes.BASE_URL + nonexistentId)
          .send(forEditImage)
          .end((err, res) => {
            res.should.have.status(HSC.BAD_REQUEST);
            done();
          }),
      );
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe(testUtil.printCaption('DELETE ' + routes.WITH_ID), () => {
    const forCreateImage = {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      name: 'image',
      description: 'description',
      isPrivate: false,
      userId: 1,
    };

    it('It should delete the image by id', (done) => {
      imagesModel.create(forCreateImage).then((create) => {
        const elementId = create.dataValues.id;
        chai
          .request(server)
          .delete(routes.BASE_URL + elementId)
          .end((err, res) => {
            res.should.have.status(HSC.OK);
            done();
          });
      });
    });

    it('It should not delete any image by nonexistent id', (done) => {
      const nonexistentId = -1;

      chai
        .request(server)
        .delete(routes.BASE_URL + nonexistentId)
        .end((err, res) => {
          res.should.have.status(HSC.BAD_REQUEST);
          done();
        });
    });
  });
});
