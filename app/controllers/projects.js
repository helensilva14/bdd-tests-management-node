module.exports.projectsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let projectsModel = new app.app.models.projectsDAO(connection);
	projectsModel.getProjects(1, function (error, result) { // TODO: use req.session.userid
			if(error) { console.log("Erro")}
			res.render('projects/projects', {projects: result});
	}); 
}