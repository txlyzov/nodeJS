const { exec } = require("child_process");

const config = {
  user: 'postgres',
  password: null,
  port: 5432,
  host: 'localhost',
  dbName: 'db_gallery_website'
}


module.exports.createDb = function() {
    if(config.password){
        exec(`createdbjs ${config.dbName} --user=${config.user} --password=${config.password}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });   
    } else
    console.log("Fill your DB password in config file (migrations/database.js).");
}


module.exports.dropDb = function(){
    if(config.password){
        exec(`dropdbjs ${config.dbName} --user=${config.user} --password=${config.password}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });   
    } else
    console.log("Fill your DB password in config file (migrations/database.js).");
}





// const pgtools = require('pgtools');

// // This can also be a connection string
// // (in which case the database part is ignored and replaced with postgres)

// const config = {
//   user: 'postgres',
//   password: '123',
//   port: 5432,
//   host: 'localhost'
// }
// console.log(213);

// pgtools.createdb(config, 'test-db', function (err, res) {
//     console.log(786);
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log(res);

// //   pgtools.dropdb(config, 'test-db', function (err, res) {
// //     if (err) {
// //       console.error(err);
// //       process.exit(-1);
// //     }
// //     console.log(res);
// //   });
// });
// console.log(32132);


// var Sequelize = require('sequelize'),
//     pg = require('pg');

//     var dbName = 'db_name',
//     username = 'postgres',
//     password = '123',
//     host = 'localhost'

// var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
// var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

// // connect to postgres db
// pg.connect(conStringPri, function(err, client, done) { 
//     // create the db and ignore any errors, for example if it already exists.
//     client.query('CREATE DATABASE ' + dbName, function(err) {
//         //db should exist now, initialize Sequelize
//         var sequelize = new Sequelize(conStringPost);
//         client.end(); // close the connection
//     });
// });



// require('./server/config/database.js').init(function(database) {
//     require('./server/config/passport.js')(passport, database);
//   });

// var Sequelize = require('sequelize'),
//     pg = require('pg');

// module.exports.init = function (callback) {
//     var dbName = 'db_gallery_website',
//         username = 'postgres',
//         password = '123',
//         host = 'localhost'

//     var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
//     var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

//     // connect to postgres db
//     pg.connect(conStringPri, function (err, client, done) {
//         // create the db and ignore any errors, for example if it already exists.
//         client.query('CREATE DATABASE ' + dbName, function (err) {
//             //db should exist now, initialize Sequelize
//             var sequelize = new Sequelize(conStringPost);
//             callback(sequelize);
//             client.end(); // close the connection
//         });
//     });
// };



// var dbName = 'db_gallery_website',
//     username = 'postgres',
//     password = '123',
//     host = 'localhost'

// var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
// var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

// // connect to postgres db
// pg.connect(conStringPri, function(err, client, done) { 
//     // create the db and ignore any errors, for example if it already exists.
//     client.query('CREATE DATABASE ' + dbName, function(err) {
//         //db should exist now, initialize Sequelize
//         var sequelize = new Sequelize(conStringPost);
//         callback(sequelize);
//         client.end(); // close the connection
//     });
// });













// var Sequelize = require('sequelize'),
//     pg = require('pg');


// var dbName = 'db_gallery_website',
//     username = 'postgres',
//     password = '123',
//     host = 'localhost'

// var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
// var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

// // connect to postgres db
// pg.connect(conStringPri, function (err, client, done) {
//     // create the db and ignore any errors, for example if it already exists.
//     client.query('CREATE DATABASE ' + dbName, function (err) {
//         //db should exist now, initialize Sequelize
//         var sequelize = new Sequelize(conStringPost);
//         callback(sequelize);
//         client.end(); // close the connection
//     });
// });
