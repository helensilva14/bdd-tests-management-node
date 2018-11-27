module.exports = function (app) {
	
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
    
	app.get('/projects', auth, function (req, res) {
			app.app.controllers.projects.projectsList(app, req, res);
	});
    
    // endpoint used to fetch all projects of logged user on dropdown options
	app.get('/api/projects', auth, function (req, res) {
			app.app.controllers.projects.getProjectsJSON(app, req, res);
	});
}
