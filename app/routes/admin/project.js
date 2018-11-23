module.exports = function (app) {
    
    app.post('/projects', function(req, res){
		app.app.controllers.adminProject.addProject(app, req, res);
	});
    
	app.get('/projects/(:id)', function(req, res){
		app.app.controllers.adminProject.getProject(app, req, res);
	});
	
    app.put('/projects/(:id)', function(req, res){
		app.app.controllers.adminProject.updateProject(app, req, res);
	});
	
	app.delete('/projects/(:id)', function (req, res) {
		app.app.controllers.adminProject.deleteProject(app, req, res);
	});
	
}