let crypto = require('crypto');

function UsersDAO(connection) {
	this._conn = connection;
}

UsersDAO.prototype.getUsers = function (callback) {
	let sql = 'select * from user';
	this._conn.query(sql, callback);
}

UsersDAO.prototype.getUser = function (id, callback) {
	let sql = 'select * from user where iduser=' + id;
	this._conn.query(sql, callback);
}

UsersDAO.prototype.storeUser = function (user, callback) {
	let encryptedPassword = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptedPassword;
	this._conn.query('insert into user set ?', user, callback);
}

UsersDAO.prototype.updateUser = function (id, user, callback) {
	let encryptedPassword = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptedPassword;
	let sql = 'update user set ? where iduser=' + id;
	this._conn.query(sql, user, callback);
}

UsersDAO.prototype.deleteUser = function (id, callback) {
	let sql = 'delete from user where iduser=' + id;
	this._conn.query(sql, callback);
}

UsersDAO.prototype.loginUser = function (user, callback) {
	let encryptedPassword = crypto.createHash("md5").update(user.password).digest("hex");
	user.password = encryptedPassword;
	let sql = "select * from user where email='"+ user.email +"' and password='"+ user.password+"'";
	this._conn.query(sql, callback);
}

module.exports = function() {
	return UsersDAO;
}