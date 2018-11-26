module.exports = function(app){
	
	// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
	
	app.get('/', auth, function(req, res) {
			app.app.controllers.home.index(app, req, res);
	});
}
