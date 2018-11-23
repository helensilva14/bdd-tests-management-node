module.exports = function (app) {
	app.get('/stories', function (req, res) {
		if (req.session.authorized) {
			app.app.controllers.stories.storiesList(app, req, res);
		} else {
			res.redirect('/login');
		}
	});
}
