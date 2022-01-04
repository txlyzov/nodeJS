const development = require('./development').development;
const test = require('./test').test;
const production = require('./production').production;

module.exports = {
  development,
  test,
  production,
};
