module.exports.registerUser = function(app, req, res) {
	res.render('user/register', { errors: {}, user: {} });
}

module.exports.addUser = function(app, req, res) {
	let user = req.body;

	req.assert("name", "Nome é obrigatório").notEmpty();
	req.assert("lastname", "Sobrenome é obrigatório").notEmpty();
    req.assert("email", "E-mail é obrigatório").notEmpty();
    req.assert("password", "Senha é obrigatória").notEmpty();
    req.assert("password", "Senha deve ter no mínimo 8 e no máximo 20 caracteres").isLength({ min: 8, max: 20 });

    var errors = req.validationErrors();
    if (errors) {
        res.render('user/register', { errors: errors, user: user });
        return;
    }

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);
    
    // delete fields from object
    delete user.confirmPassword;
    delete user.submit;

    usersModel.storeUser(user, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/register', { errors: error, user: user });
            return;
        }
        
        req.flash('success', 'Cadastro feito com sucesso! Faça o login');
        res.redirect("/login");
    });
}

module.exports.loginUser = function(app, req, res) {
   res.render('user/login', { errors: {}, user: {} });
}

module.exports.logoutUser = function(app, req, res) {
    // destroy current session
    req.session.destroy();
    res.redirect("/login");
}

module.exports.authorizeUser = function(app, req, res) {
    let user = req.body;

    req.assert("email", "Nome é obrigatório").notEmpty();
    req.assert("email", "Digite um e-mail válido").isEmail();
    req.assert("password", "Senha é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        res.render('user/login', { errors: errors, user: user });
        return;
    }

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);

    usersModel.loginUser(user, function(error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível realizar o login. Tente novamente.');
            res.redirect('/login');
            return;
        }

        if (result.length > 0) {
            req.session.authorized = true;
            req.session.user = { id: result[0].iduser, name: result[0].name };
            res.redirect("/");
            return;
        } else {
            req.session.authorized = false;
            console.log("Usuário e/ou senha inválidos: ", result);
            req.flash('error', 'Usuário e/ou senha inválidos.');
            res.redirect('/login');
            return;
        }
    });
}

// method used to get data of the logged user
module.exports.getUser = function(app, req, res) {

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);
    
    usersModel.getUser(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/edit', { errors: error, user: {} });
            return;
        }

        res.render('user/edit', { errors: {}, user: result });
    });
}

module.exports.updateUser = function(app, req, res) {
	let user = req.body;

    req.assert("name", "Nome é obrigatório").notEmpty();
    req.assert("lastname", "Sobrenome é obrigatório").notEmpty();
    req.assert("email", "E-mail é obrigatório").notEmpty();
    req.assert("password", "Senha é obrigatória").notEmpty();
    req.assert("password", "Senha deve ter no mínimo 8 e no máximo 20 caracteres").isLength({ min: 8, max: 20 });

    var errors = req.validationErrors();
    if (errors) {
        res.render('user/edit', { errors: errors, user: user });
        return;
    }

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);
    
    delete user.confirmPassword;
    delete user.submit;
    
    console.log(user);

    usersModel.updateUser(req.session.user.id, user, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/edit', { errors: error, user: {} });
            return;
        }
        
        // update its session values
        req.session.user = { id: req.session.user.id, name: user.name };

        res.redirect("/");
    });
}

module.exports.deleteUser = function(app, req, res) {

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);

    usersModel.deleteUser(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/edit', { errors: [ { msg: 'Houve um erro ao remover o usuário, tente novamente.' } ], user: user });
            return;
        }
        
        res.redirect("/login");
    });
}