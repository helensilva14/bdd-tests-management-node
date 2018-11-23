module.exports = function (app) {
    
    app.post('/project', function(req, res){
		app.app.controllers.adminProject.addProject(app, req, res);
	});
    
	app.get('/project/(:id)', function(req, res){
		app.app.controllers.adminProject.getProject(app, req, res);
	});
	
    app.put('/project/(:id)', function(req, res){
		app.app.controllers.adminProject.updateProject(app, req, res);
	});
	
	app.delete('/project/(:id)', function (req, res) {
		app.app.controllers.adminProject.deleteProject(app, req, res);
	});
	
}