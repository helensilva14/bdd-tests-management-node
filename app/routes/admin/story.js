module.exports = function (app) {
    
    // Authentication and Authorization Middleware
	var auth = function(req, res, next) {
        if (req.session.authorized) {
            return next();
        } else {
            res.redirect('/login');
        }
    };
    
    app.post('/stories', auth, function(req, res){
		app.app.controllers.adminStory.addStory(app, req, res);
	});
    
	app.get('/stories/(:id)', auth, function(req, res){
		app.app.controllers.adminStory.getStory(app, req, res);
	});
	
    app.put('/stories/(:id)', auth, function(req, res){
		app.app.controllers.adminStory.updateStory(app, req, res);
	});
	
	app.delete('/stories/(:id)', auth, function (req, res) {
		app.app.controllers.adminStory.deleteStory(app, req, res);
	});
	
}