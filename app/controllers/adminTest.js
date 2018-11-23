module.exports = function (app) {
    
    app.post('/tests', function(req, res){
		app.app.controllers.adminTest.addTest(app, req, res);
	});
    
	app.get('/tests/(:id)', function(req, res){
		app.app.controllers.adminTest.getTest(app, req, res);
	});
	
    app.put('/tests/(:id)', function(req, res){
		app.app.controllers.adminTest.updateTest(app, req, res);
	});
	
	app.delete('/tests/(:id)', function (req, res) {
		app.app.controllers.adminTest.deleteTest(app, req, res);
	});
	
}