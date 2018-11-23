module.exports.index = function (app, req, res) {
    
    let connection = app.config.dbConnection();
    let projectsModel = new app.app.models.projectsDAO(connection);
    
    let totalProjects = 0;
    
    projectsModel.countProjects(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		// get total projects of logged user
		totalProjects = result[0].total;
	}); 
	
	console.log('tot', totalProjects);
    
    res.render('home/index', { totalProjects: totalProjects });
}