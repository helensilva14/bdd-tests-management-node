let crypto = require('crypto');

function UsuariosDAO(connection) {
	this._conn = connection;
}

UsuariosDAO.prototype.getUsuarios = function (id, callback) {
	let sql = 'select * from usuarios';
	this._conn.query(sql, callback);
}

UsuariosDAO.prototype.getUsuario = function (id, callback) {
	let sql = 'select * from usuarios where idusuario=' + id;
	this._conn.query(sql, callback);
}

UsuariosDAO.prototype.storeUsuario = function (usuario, callback) {
	let senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");
	usuario.password = senhaCriptografada;
	this._conn.query('insert into usuarios set ?', usuario, callback);
}

UsuariosDAO.prototype.usuarioAutenticar = function (usuario, callback) {
	let senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");
	usuario.password = senhaCriptografada;
	let sql = "select * from usuarios where username='"+ usuario.username +"' and password='"+ usuario.password+"'";
	this._conn.query(sql, callback);
}

module.exports = function() {
	return UsuariosDAO;
}