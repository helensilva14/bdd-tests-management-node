module.exports = function (app) {
	app.get('/login', function(req, res){
		app.app.controllers.adminUser.loginUser(app, req, res);
	});
	
	app.post('/login', function(req, res){
		app.app.controllers.adminUser.authorizeUser(app, req, res);
	});
	
	app.get('/logout', function (req, res) {
		app.app.controllers.adminUser.logoutUser(app, req, res);
	});
	
	app.get('/user/register', function (req, res) {
		app.app.controllers.adminUser.registerUser(app, req, res);
	});
	
	app.post('/user/register', function (req, res) {
		app.app.controllers.adminUser.addUser(app, req, res);
	});
	
	app.get('/user/edit', function (req, res) {
		app.app.controllers.adminUser.getUser(app, req, res);
	});
	
	app.put('/user/edit', function (req, res) {
		app.app.controllers.adminUser.updateUser(app, req, res);
	});
	
	app.delete('/user/delete', function (req, res) {
		app.app.controllers.adminUser.deleteUser(app, req, res);
	});
}