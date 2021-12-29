const { exec } = require("child_process");
const config = require('../config/config.json');

module.exports.createDb = function() {
    if(config.development.password){
        exec(`createdbjs ${config.development.database} --user=${config.development.username} --password=${config.development.password}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });   
    } else
    console.log("Fill your DB password in config file.");
}


module.exports.dropDb = function(){
    if(config.development.password){
        exec(`dropdbjs ${config.development.database} --user=${config.development.username} --password=${config.development.password}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });   
    } else
    console.log("Fill your DB password in config file.");
}