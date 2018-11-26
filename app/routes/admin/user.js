module.exports = function (app) {
	
	
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
	
	app.get('/login', function(req, res){
		app.app.controllers.adminUser.loginUser(app, req, res);
	});
	
	app.post('/login', function(req, res){
		app.app.controllers.adminUser.authorizeUser(app, req, res);
	});
	
	app.get('/logout', auth, function (req, res) {
		app.app.controllers.adminUser.logoutUser(app, req, res);
	});
	
	app.get('/user/register', function (req, res) {
		app.app.controllers.adminUser.registerUser(app, req, res);
	});
	
	app.post('/user/register', function (req, res) {
		app.app.controllers.adminUser.addUser(app, req, res);
	});
	
	app.get('/user/edit', auth, function (req, res) {
		app.app.controllers.adminUser.getUser(app, req, res);
	});
	
	app.put('/user/edit', auth, function (req, res) {
		app.app.controllers.adminUser.updateUser(app, req, res);
	});
	
	app.delete('/user/delete', auth, function (req, res) {
		app.app.controllers.adminUser.deleteUser(app, req, res);
	});
}