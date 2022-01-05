const HSC = require('http-status-codes');
const chai = require('chai');
const chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
const server = require('../index');
const { response } = require('../index');

chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
  /**
   * Test the GET route
   **/
  describe('GET /users', (done) => {
    it('It should GET all Users', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(HSC.OK);
          res.body.should.be.a('array');
          res.body.length.should.be.eq(3);
          done();
        });
    });
    it('It should NOT GET all Users', (done) => {
      chai
        .request(server)
        .get('/users1')
        .end((err, res) => {
          res.should.have.status(HSC.NOT_FOUND);
          done();
        });
    });
  });

  /**
   * Test the GET by id route
   **/
  describe('GET /users/:id', (done) => {
    it('It should GET a User by id', (done) => {
      const userId = 2;
      chai
        .request(server)
        .get('/users/' + userId)
        .end((err, res) => {
          res.should.have.status(HSC.OK);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eq(2);
          res.body.should.have.property('login');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          done();
        });
    });

    it('It should NOT FIND a User by id', (done) => {
      const userId = 2222;
      chai
        .request(server)
        .get('/users/:id')
        .end((err, res) => {
          res.should.have.status(HSC.NOT_FOUND);
          response.text.should.be.eq('No content found.');
          done();
        });
    });
  });
});
