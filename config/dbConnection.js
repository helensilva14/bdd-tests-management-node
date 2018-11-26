let mysql = require('mysql');

let connLocalMySQL = function () {
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: 'dbpassword',
        database: 'bdd_tm'
    });
}

let connAzureMySQL = function () {
    return connection = mysql.createConnection({
        host: 'bddtm-mysqldbserver.mysql.database.azure.com',
        user: 'dbuser@bddtm-mysqldbserver',
        password: 'Dbpassword!',
        database: 'bdd_tm',
        port: 3306,
        ssl: true
    });
}

module.exports = function(){
	return connAzureMySQL;
}