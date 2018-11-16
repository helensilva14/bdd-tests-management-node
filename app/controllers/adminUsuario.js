module.exports.usuarioInserir = function(app, req, res) {
	res.render('admin/insere_usuario', { erros: {}, usuario: {} });
}

module.exports.usuarioSalvar = function(app, req, res) {
	let usuario = req.body;

	req.assert("nome", "Nome é obrigatório").notEmpty();
    req.assert("username", "Usuário é obrigatório").notEmpty();
    req.assert("password", "Usuário deve ter no mínimo 6 caracteres").isLength({ min: 6 });
    req.assert("password", "Senha é obrigatória").notEmpty();
    req.assert("password", "Senha deve ter no mínimo 6 e no máximo 20 caracteres").isLength({ min: 6, max: 20 });

    var erros = req.validationErrors();
    if (erros) {
        res.render('admin/insere_usuario', { erros: erros, usuario: usuario });
        return;
    }

    let connection = app.config.dbConnection();
    let usuariosModel = new app.app.models.usuariosDAO(connection);

    usuariosModel.storeUsuario(usuario, function (error, result) {
        if (error) {
            console.log("Erro");
            console.log(error);
        }
        res.redirect('/estudantes');
    });
}

module.exports.usuarioAutenticar = function(app, req, res) {
    let usuario = req.body;

    req.assert("username", "Nome é obrigatório").notEmpty();;
    req.assert("password", "Senha é obrigatória").notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros, usuario: usuario });
        console.log('Erro na validação dos dados');
        return;
    }

    let connection = app.config.dbConnection();
    let usuariosModel = new app.app.models.usuariosDAO(connection);

    usuariosModel.usuarioAutenticar(usuario, function(error, result) {
        if (error) {
            console.log("Erro: ", error);
            console.log(error);
            console.log("Usuário não autenticado");
            res.redirect("/");
            return;
        }

        if (result.length > 0) {
            req.session.autorizado = true;
            res.redirect("/estudantes");
            return;
        } else {
            console.log("Usuário e/ou senha inválidos");
            res.send("Usuário e/ou senha inválidos");
            req.session.autorizado = false;
            // res.render('home/index', {erros: {}});
        }
    });
}