module.exports.storiesList = function(app, req, res){
    let connection = app.config.dbConnection();
	let storiesModel = new app.app.models.storiesDAO(connection);
	
	storiesModel.getStoriesByUser(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		res.render('stories/stories', { stories: result });
	}); 
}