function StoriesDAO(connection) {
	this._conn = connection;
}

StoriesDAO.prototype.getStoriesByProject = function (projectid, callback) {
	let sql = 'select * from story where idproject=' + projectid;
	this._conn.query(sql, callback);
}

StoriesDAO.prototype.getStoriesByUser = function (userid, callback) {
	let sql = "select s.* , p.name AS 'project' FROM story s JOIN project p ON s.idproject = p.idproject WHERE p.iduser =" + userid ;
	this._conn.query(sql, callback);
}

StoriesDAO.prototype.getStory = function (id, callback) {
	let sql = 'select * from story where idstory=' + id;
	this._conn.query(sql, callback);
}

StoriesDAO.prototype.storeStory = function (story, callback) {
	this._conn.query('insert into story set ?', story, callback);
}

StoriesDAO.prototype.updateStory = function (id, project, callback) {
    let sql = 'update story set ? where idstory=' + id;
	this._conn.query(sql, project, callback);
}

StoriesDAO.prototype.deleteStory = function (id, callback) {
	let sql = 'delete from story where idstory=' + id;
	this._conn.query(sql, callback);
}

module.exports = function(){ 
	return StoriesDAO;
}