const { exec } = require('child_process');
const config = require('../../config/sequelize-config.js');

const pattern = process.env.NODE_ENV || ['development'];

module.exports.createDb = function () {
  if (config[pattern].password) {
    exec(
      `createdbjs ${config[pattern].database} --user=${config[pattern].username} --password=${config[pattern].password}`,
      (error, stdout) => {
        if (error) {
          console.log(`error: ${error.message}`);

          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  } else console.log('Fill your DB password in config folder.');
};

module.exports.dropDb = function () {
  if (config[pattern].password) {
    exec(
      `dropdbjs ${config[pattern].database} --user=${config[pattern].username} --password=${config[pattern].password}`,
      (error, stdout) => {
        if (error) {
          console.log(`error: ${error.message}`);

          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );
  } else console.log('Fill your DB password in config folder.');
};
