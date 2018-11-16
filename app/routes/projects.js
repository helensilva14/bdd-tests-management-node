module.exports = function (app) {
	app.get('/projects', function (req, res) {
		if (req.session.authorized) {
			app.app.controllers.projects.projectsList(app, req, res);
		} else {
			//res.send("Usuário deve estar logado");
			res.redirect('/');
		}
	});
}
