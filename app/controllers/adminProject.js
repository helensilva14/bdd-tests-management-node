module.exports.addProject = function(app, req, res) {
	let project = req.body;

    req.assert('name', 'É obrigatório informar um nome').notEmpty();
	req.assert("description", "A descrição é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        req.flash('error', errors.map(e => e.msg).join('. '));
        res.redirect("/projects");
        return;
    }

    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    delete project.submit;
    project.iduser = req.session.user.id;

    projectsModel.storeProject(project, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível cadastrar um novo projeto. Tente novamente.');
            res.redirect("/projects");
            return;
        }
        
        req.flash('success', "Projeto cadastrado com sucesso!");
        res.redirect("/projects");
    });
}

module.exports.getProject = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    projectsModel.getProject(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}

module.exports.updateProject = function(app, req, res) {
	let project = req.body;
	
    req.assert('name', 'É obrigatório informar um nome').notEmpty();
	req.assert("description", "A descrição é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        req.flash('error', errors.map(e => e.msg).join('. '));
        res.redirect("/projects");
        return;
    }
    
    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    delete project.submit;
    project.iduser = req.session.user.id;
    
    projectsModel.updateProject(project.idproject, project, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível atualizar o projeto. Tente novamente.');
            res.redirect("/projects");
            return;
        }
        
        req.flash('success', "Projeto atualizado com sucesso!");
        res.redirect("/projects");
    });
}

module.exports.deleteProject = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);

    projectsModel.deleteProject(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível apagar o projeto. Tente novamente.');
            res.redirect("/projects");
            return;
        }
        
        req.flash('success', "Projeto apagado com sucesso!");
        res.redirect("/projects");
    });
}