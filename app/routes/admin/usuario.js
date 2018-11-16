module.exports = function (app) {
	app.get('/usuario/inserir', function (req, res) {
		app.app.controllers.adminUsuario.usuarioInserir(app, req, res);
	});

	app.post('/usuario/salvar', function (req, res) {
		app.app.controllers.adminUsuario.usuarioSalvar(app, req, res);
	});

	app.post('/usuario/autenticar', function(req, res) {
		app.app.controllers.adminUsuario.usuarioAutenticar(app, req, res);
	});
}