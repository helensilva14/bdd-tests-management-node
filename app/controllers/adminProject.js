module.exports.addProject = function(app, req, res) {
	let project = req.body;

    // TODO: add validation

    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    delete project.submit;
    project.iduser = req.session.user.id;
    
    console.log(project);

    projectsModel.storeProject(project, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('projects/projects', { errors: error, projects: null });
            return;
        }
        
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
	
    // TODO: add validation

    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    delete project.submit;
    project.iduser = req.session.user.id;
    
    projectsModel.updateProject(project.idproject, project, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.send(error);
            res.render('projects/projects', { errors: error, projects: null });
            return;
        }
        
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
            res.render('projects/projects', { errors: error, projects: null });
            return;
        }
        
        res.redirect("/projects");
    });
}