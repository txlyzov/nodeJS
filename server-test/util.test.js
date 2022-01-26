const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

module.exports = {
  printCaption(content) {
    const caption =
      '\n-----------------------------------------------------------------------------------------------' +
      '\n' +
      content +
      '\n-----------------------------------------------------------------------------------------------\n\n';

    return caption;
  },
  printCaptionX2(content) {
    const caption =
      '\n-----------------------------------------------------------------------------------------------' +
      '\n-----------------------------------------------------------------------------------------------' +
      '\n' +
      content +
      '\n-----------------------------------------------------------------------------------------------' +
      '\n-----------------------------------------------------------------------------------------------\n\n';

    return caption;
  },
  async cleanTable(model) {
    await model.truncate({ cascade: true, restartIdentity: true });
  },
  generateToken(id, login) {
    return jwt.sign(
      {
        id,
        login,
      },
      process.env.JWT_SECRET,
    );
  },
  generateInvalidToken(id, login) {
    const token = jwt.sign(
      {
        id,
        login,
      },
      process.env.JWT_SECRET,
    );

    return token[1] + token[0] + token.substr(2);
  },
  generateInvalidTokenSignature(id, login) {
    return (
      jwt.sign(
        {
          id,
          login,
        },
        process.env.JWT_SECRET,
      ) + '1'
    );
  },
  async encryptPassword(originalPassword) {
    return bcrypt.hash(originalPassword, parseInt(process.env.BCRYPT_SALT));
  },
  async comparePasswords(originalPassword, codedPassword) {
    return bcrypt.compare(originalPassword, codedPassword);
  },
};
