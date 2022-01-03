// const { Sequelize } = require('sequelize');
// const config = require('../config/config.json').development;

// module.exports = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: config.dialect
// });

require('dotenv/config');
const Pool = require('pg').Pool
module.exports = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
})
