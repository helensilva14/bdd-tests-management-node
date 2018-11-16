module.exports = function (app) {
	app.get('/login', function(req, res){
		app.app.controllers.adminUser.loginUser(app, req, res);
	});
	
	app.post('/login', function(req, res){
		app.app.controllers.adminUser.authorizeUser(app, req, res);
	});
	
	app.get('/user/register', function (req, res) {
		app.app.controllers.adminUser.registerUser(app, req, res);
	});
	
	app.post('/user/register', function (req, res) {
		app.app.controllers.adminUser.addUser(app, req, res);
	});
}