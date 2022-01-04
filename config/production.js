database = {
    username: 'postgres',
    password: 123,
    database: 'db_gallery_website',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  };
  
  connection = {
    host: '127.0.0.1',
    port: '3000'
  };
  
  module.exports.production = { database, connection };