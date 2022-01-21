const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HSC = require('http-status-codes');
const server = require('../../index');
const imagesModel = require('../../models').images;
const usersModel = require('../../models').users;
const routes = require('./../../utils/routes-values').USER_IMAGES_ROUTS;

const testUtil = require('../util.test');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

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

      //   it('It should get all images by user id', (done) => {
      //     chai
      //       .request(server)
      //       .set('some_custom_attribute', 'some_value')
      //       .get(routes.BASE_URL)
      //       .end((err, res) => {
      //         const reformatedBodyContent2 = {
      //           url: res.body[0].url,
      //           name: res.body[0].name,
      //           description: res.body[0].description,
      //           isPrivate: res.body[0].isPrivate,
      //           userId: res.body[0].userId,
      //         };
      //         const reformatedBodyContent3 = {
      //           url: res.body[1].url,
      //           name: res.body[1].name,
      //           description: res.body[1].description,
      //           isPrivate: res.body[1].isPrivate,
      //           userId: res.body[1].userId,
      //         };

      //         res.should.have.status(HSC.OK);
      //         res.body.length.should.be.eq(2);
      //         expect(reformatedBodyContent2).to.have.deep.eq(forCreateImage2);
      //         expect(reformatedBodyContent3).to.have.deep.eq(forCreateImage3);
      //         done();
      //       });
      //   });
    });

    // it('It should not get any images', (done) => {
    //   chai
    //     .request(server)
    //     .get(routes.BASE_URL)
    //     .end((err, res) => {
    //       console.log(res.body);
    //       res.should.have.status(HSC.NOT_FOUND);
    //       done();
    //     });
    // });
  });
});