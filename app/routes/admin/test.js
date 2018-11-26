module.exports = function (app) {
	
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
    
    app.post('/tests', auth, function(req, res){
		app.app.controllers.adminTest.addTest(app, req, res);
	});
    
	app.get('/tests/(:id)', auth, function(req, res){
		app.app.controllers.adminTest.getTest(app, req, res);
	});
	
    app.put('/tests/(:id)', auth, function(req, res){
		app.app.controllers.adminTest.updateTest(app, req, res);
	});
	
	app.delete('/tests/(:id)', auth, function (req, res) {
		app.app.controllers.adminTest.deleteTest(app, req, res);
	});
	
}