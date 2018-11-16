function ProjectsDAO(connection) {
	this._conn = connection;
}

ProjectsDAO.prototype.getProjects = function (userid, callback) {
	let sql = 'select * from project where iduser=' + userid;
	this._conn.query(sql, callback);
}

ProjectsDAO.prototype.getProject = function (id, callback) {
	let sql = 'select * from project where idproject=' + id;
	this._conn.query(sql, callback);
}

ProjectsDAO.prototype.storeProject = function (project, callback) {
	this._conn.query('insert into project set ?', project, callback);
}

ProjectsDAO.prototype.updateProject = function (id, project, callback) {
    let sql = 'update project set ? where idproject=' + id;
	this._conn.query(sql, project, callback);
}

ProjectsDAO.prototype.deleteProject = function (id, callback) {
	let sql = 'delete from project where idproject=' + id;
	this._conn.query(sql, callback);
}

module.exports = function(){ 
	return ProjectsDAO;
}