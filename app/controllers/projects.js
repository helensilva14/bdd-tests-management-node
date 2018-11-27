module.exports.projectsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let projectsModel = new app.app.models.projectsDAO(connection);
	
	projectsModel.getProjects(req.session.user.id, function (error, result) { 
        if(error) { 
            console.log("Error: ", error);
            res.render('projects/projects', { errors: [ { msg: 'Não foi possível obter dados com o parâmetro fornecido. Tente novamente' } ], projects: {} });
            return;
        }

        res.render('projects/projects', { errors: {}, projects: result });
	}); 
}

// method used to fetch all projects of logged user on dropdown options
module.exports.getProjectsJSON = function(app, req, res) {
    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    projectsModel.getProjects(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object as JSON to be used on application
        res.send(result);
    });
}