module.exports.registerUser = function(app, req, res) {
	res.render('user/register', { errors: {}, user: {} });
}

module.exports.addUser = function(app, req, res) {
	let user = req.body;

	req.assert("name", "Nome é obrigatório").notEmpty();
	req.assert("lastname", "Sobrenome é obrigatório").notEmpty();
    req.assert("email", "E-mail é obrigatório").notEmpty();
    req.assert("password", "Senha é obrigatória").notEmpty();
    req.assert("password", "Senha deve ter no mínimo 6 e no máximo 20 caracteres").isLength({ min: 6, max: 20 });

    var errors = req.validationErrors();
    if (errors) {
        res.render('user/register', { errors: errors, user: user });
        return;
    }

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);
    
    delete user.confirmPassword;
    delete user.submit;
    
    console.log(user);

    usersModel.storeUser(user, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/register', { errors: error, user: user });
            return;
        }
        
        if (result.length > 0) {
            res.redirect("/login");
            return;
        }
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

    req.assert("email", "Nome é obrigatório").notEmpty();;
    req.assert("password", "Senha é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('user/login', { errors: errors, user: user });
        console.log('Erro na validação dos dados');
        return;
    }

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);

    usersModel.loginUser(user, function(error, result) {
        if (error) {
            console.log("Usuário não autenticado. Erro: ", error);
            res.redirect("/login");
            return;
        }

        if (result.length > 0) {
            req.session.authorized = true;
            req.session.user = { id: result[0].iduser, name: result[0].name };
            
            res.redirect("/");
            
            //res.render("home/index", { loggedUserName: req.session.loggedUserName });
            return;
        } else {
            console.log("Usuário e/ou senha inválidos");
            //res.send("Usuário e/ou senha inválidos");
            req.session.authorized = false;
            res.redirect("/login");
            return;
        }
    });
}

module.exports.getUser = function(app, req, res) {

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);
    
    usersModel.getUser(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/edit', { errors: error, user: {} });
            return;
        }
        
        console.log(result);

        if (result.length > 0) {
            res.render('user/edit', { errors: {}, user: result });
        }
    });
}

module.exports.updateUser = function(app, req, res) {
	let user = req.body;

// 	req.assert("name", "Nome é obrigatório").notEmpty();
// 	req.assert("lastname", "Sobrenome é obrigatório").notEmpty();
//     req.assert("email", "E-mail é obrigatório").notEmpty();
//     req.assert("password", "Senha é obrigatória").notEmpty();
//     req.assert("password", "Senha deve ter no mínimo 6 e no máximo 20 caracteres").isLength({ min: 6, max: 20 });

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

    usersModel.updateUser(user.id, user, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('user/edit', { errors: error, user: user });
            return;
        }
        
        if (result.length > 0) {
            res.redirect("/");
            return;
        }
    });
}

module.exports.deleteUser = function(app, req, res) {

    let connection = app.config.dbConnection();
    let usersModel = new app.app.models.usersDAO(connection);

    usersModel.deleteUser(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('projects/projects', { errors: error, projects: null });
            return;
        }
        
        res.redirect("/projects");
    });
}