module.exports = function (app) {
    
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };

    app.post('/projects', auth, function(req, res){
		app.app.controllers.adminProject.addProject(app, req, res);
	});
    
	app.get('/projects/(:id)', auth, function(req, res){
		app.app.controllers.adminProject.getProject(app, req, res);
	});
	
    app.put('/projects/(:id)', auth, function(req, res){
		app.app.controllers.adminProject.updateProject(app, req, res);
	});
	
	app.delete('/projects/(:id)', auth, function (req, res) {
		app.app.controllers.adminProject.deleteProject(app, req, res);
	});
	
}