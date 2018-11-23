module.exports = function (app) {
	app.get('/tests', function (req, res) {
		if (req.session.authorized) {
		    // TODO: set the correct method
			app.app.controllers.projects.projectsList(app, req, res);
		} else {
			res.redirect('/login');
		}
	});
}
