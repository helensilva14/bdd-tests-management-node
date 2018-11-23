module.exports = function (app) {
    
    app.post('/stories', function(req, res){
		app.app.controllers.adminStory.addStory(app, req, res);
	});
    
	app.get('/stories/(:id)', function(req, res){
		app.app.controllers.adminStory.getStory(app, req, res);
	});
	
    app.put('/stories/(:id)', function(req, res){
		app.app.controllers.adminStory.updateStory(app, req, res);
	});
	
	app.delete('/stories/(:id)', function (req, res) {
		app.app.controllers.adminStory.deleteStory(app, req, res);
	});
	
}