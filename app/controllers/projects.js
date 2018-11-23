module.exports.projectsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let projectsModel = new app.app.models.projectsDAO(connection);
	
	projectsModel.getProjects(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		res.render('projects/projects', { projects: result });
	}); 
}

module.exports.getProjectsJSON = function(app, req, res) {
    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    projectsModel.getProjects(req.session.user.id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}