let mysql = require('mysql');

let connMySQL = function () {
	console.log("Iniciada a conexão com o banco");
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: 'dbpassword',
        database: 'bdd_tm'
    });
}

module.exports = function(){
	return connMySQL;
}

// module.exports = function () {
//     return connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Bordi1973',
//         database: 'dsw'
//     });
// }