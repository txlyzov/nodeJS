const chai = require('chai');
const { expect } = require('chai');
const HSC = require('http-status-codes');
const server = require('../../index');
const routes = require('../../src/utils/routes-values').IMAGES_ROUTS;
const imagesModel = require('../../src/models').images;
const usersModel = require('../../src/models').users;

const testUtil = require('../util.test');

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
  describe(testUtil.printCaption(`POST ${routes.BASE_URL}`), () => {
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

        it('It should get public images for page', (done) => {
          const page = 2;
          const limit = 2;
          chai
            .request(server)
            .get(`${routes.BASE_URL}?page=${page}&limit=${limit}`)
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
          .end((err, res) => {
            res.should.have.status(HSC.NOT_FOUND);
            done();
          });
      });
    },
  );
});
