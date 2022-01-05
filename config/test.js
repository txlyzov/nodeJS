const database = {
  username: 'postgres',
  password: 123,
  database: 'db_gallery_website_tests',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
};

const connection = {
  host: '127.0.0.1',
  port: '3000',
};

module.exports.test = { database, connection };
