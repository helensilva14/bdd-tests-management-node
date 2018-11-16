module.exports = function (app) {
	app.get('/estudantes', function (req, res) {
		if (req.session.autorizado) {
			app.app.controllers.estudantes.estudantesListar(app, req, res);
		} else {
			//res.send("Usuário deve estar logado");
			res.redirect('/');
		}
	});
}
