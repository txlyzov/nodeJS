const { exec } = require("child_process");
const config = require('../config/config.json');

module.exports.createDb = function() {
    if(config.database.password){
        exec(`createdbjs ${config.database.name} --user=${config.database.user} --password=${config.database.password}`, (error, stdout) => {
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
    if(config.database.password){
        exec(`dropdbjs ${config.database.name} --user=${config.database.user} --password=${config.database.password}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });   
    } else
    console.log("Fill your DB password in config file.");
}