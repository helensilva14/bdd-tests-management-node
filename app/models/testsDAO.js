
// SELECT t . * , p.name AS  'project', s.description AS  'story' FROM test t JOIN story s 
//  ON t.idstory = s.idstory JOIN project p ON s.idproject = p.idproject WHERE p.iduser = '$user_id'
function TestsDAO(connection) {
	this._conn = connection;
}

TestsDAO.prototype.getTestsByProject = function (storyid, callback) {
	let sql = 'select * from test where idstory=' + storyid;
	this._conn.query(sql, callback);
}

TestsDAO.prototype.getTestsByUser = function (userid, callback) {
	let sql = "SELECT t . * , p.name AS  'project', s.description AS  'story' FROM test t JOIN story s ON t.idstory = s.idstory JOIN project p ON s.idproject = p.idproject WHERE p.iduser =" + userid;
	this._conn.query(sql, callback);
}

TestsDAO.prototype.countTests = function (storyid, callback) {
	let sql = "select count(idtest) as 'total' from test where idstory=" + storyid;
	this._conn.query(sql, callback);
}

TestsDAO.prototype.getTest = function (id, callback) {
	let sql = 'select * from test where idtest=' + id;
	this._conn.query(sql, callback);
}

TestsDAO.prototype.storeTest = function (test, callback) {
	this._conn.query('insert into test set ?', test, callback);
}

TestsDAO.prototype.updateTest = function (id, story, callback) {
    let sql = 'update test set ? where idtest=' + id;
	this._conn.query(sql, story, callback);
}

TestsDAO.prototype.deleteTest = function (id, callback) {
	let sql = 'delete from test where idtest=' + id;
	this._conn.query(sql, callback);
}

module.exports = function(){ 
	return TestsDAO;
}