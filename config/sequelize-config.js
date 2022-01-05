const config = require('./index');

const dd = config.development.database;
const td = config.test.database;
const pd = config.production.database;

module.exports = {
  development: {
    username: dd.username,
    password: dd.password,
    database: dd.database,
    host: dd.host,
    port: dd.port,
    dialect: dd.dialect,
  },
  test: {
    username: td.username,
    password: td.password,
    database: td.database,
    host: td.host,
    port: td.port,
    dialect: td.dialect,
  },
  production: {
    username: pd.username,
    password: pd.password,
    database: pd.database,
    host: pd.host,
    port: pd.port,
    dialect: pd.dialect,
  },
};
