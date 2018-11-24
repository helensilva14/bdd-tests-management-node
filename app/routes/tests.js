module.exports = function (app) {
	app.get('/tests', function (req, res) {
		if (req.session.authorized) {
			app.app.controllers.tests.testsList(app, req, res);
		} else {
			res.redirect('/login');
		}
	});
}
