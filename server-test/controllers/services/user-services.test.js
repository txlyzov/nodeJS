// const { expect } = require('chai');
// const { getOne } = require('../../../controllers/services/users-service');
// test('stould test something',()=>{
//     expect(getOne(next)).toBe()
// })

const chai = require('chai');
const { expect } = require('chai');
const usersService = require('../../../controllers/services/users-service');

//chai.should();

describe('DSFSDF', () => {
  it('test for testing', async () => {
    chai.assert.equal(usersService.testf('123'), '123qwe');
  });
});

describe('User services tests:', () => {
  //-----------------------------------------------------------------------------------------------
  describe('- create(input)', () => {
    const input = {
      login: '4login',
      email: '4email',
      password: '4password',
    };
    
    it('should create one user object', async () => {
      const result = await usersService.create(input);
      console.log(result);
      expect(result).to.be.an('object');
    });

    it('should not create one user object', async () => {
      const result = await usersService.create(input);
      console.log(result);
      expect(err.message.should.be.eq('Validation error'));
      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- get()', () => {
    it('should return one user object', async () => {
      const result = await usersService.get();

      expect(result).to.be.an('array');
    });
  });

  // describe('- get()', () => {
  //   it('should not return one user object', async () => {
  //     const result = await usersService.get(-1);

  //     expect(result).to.be.a('null');
  //   });
  // });

  //-----------------------------------------------------------------------------------------------
  describe('- getOne(id)', () => {
    it('should return one user object', async () => {
      //assert.equal(usersService.testf('123'),'123qwe1')

      const result = await usersService.getOne(3);

      ///expect(result).to.be.a('null');
      expect(result).to.be.an('object');
      //chai.assert.equal(result, Object);
      //chai.expect(usersService.getOne(2)).to.be.a('')//.to.equal(null); //.to.be.a('{}');
    });

    it('should not return one user object', async () => {
      const result = await usersService.getOne(-1);

      expect(result).to.be.a('null');
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- update(id, input)', () => {
    const input = {
      login: 'login4',
      email: 'email4',
      password: 'password4',
    };

    it('should update one user object with id=4', async () => {
      const id = 4;
      const result = await usersService.update(id, input);
      expect(result).to.deep.equal([1]);
    });

    it('should not update one user object with id=-4', async () => {
      const id = -4;
      const result = await usersService.update(id, input);
      expect(result).to.deep.equal([0]);
    });
  });

  //-----------------------------------------------------------------------------------------------
  describe('- delete(id)', () => {
    it('should delete one user object with id=4', async () => {
      const id = 4;
      const result = await usersService.delete(id);
      expect(result).to.deep.equal(1);
    });

    it('should not delete one user object with id=-4', async () => {
      const id = -4;
      const result = await usersService.delete(id);
      expect(result).to.deep.equal(0);
    });
  });
});
