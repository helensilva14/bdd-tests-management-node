module.exports = function (app) {
	
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
	
	app.get('/stories', auth, function (req, res) {
			app.app.controllers.stories.storiesList(app, req, res);
	});
	
	app.get('/api/projects/(:id)/stories', auth, function (req, res) {
			app.app.controllers.stories.getStoriesJSON(app, req, res);
	});
}
