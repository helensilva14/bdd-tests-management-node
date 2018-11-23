module.exports.projectsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let projectsModel = new app.app.models.projectsDAO(connection);
	
	projectsModel.getProjects(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		res.render('projects/projects', { projects: result });
	}); 
}