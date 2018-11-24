module.exports.storiesList = function(app, req, res){
    let connection = app.config.dbConnection();
	let storiesModel = new app.app.models.storiesDAO(connection);
	
	storiesModel.getStoriesByUser(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		res.render('stories/stories', { stories: result });
	}); 
}

module.exports.getStoriesJSON = function(app, req, res) {
	let idproject = req.params.id;
	
    let connection = app.config.dbConnection();
	let storiesModel = new app.app.models.storiesDAO(connection);
    
    storiesModel.getStoriesByProject(idproject, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}