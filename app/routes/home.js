module.exports = function(app){
	app.get('/', function(req, res) {
		if (req.session.authorized) {
			app.app.controllers.home.index(app, req, res);
		} else {
			res.redirect('/login');	
		}
	});
}