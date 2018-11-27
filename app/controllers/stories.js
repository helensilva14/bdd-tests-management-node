module.exports.storiesList = function(app, req, res){
    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
  
    // get project as a query parameter
    let idproject = req.query.idproject;

    if (idproject) {
        // filtered by selected project id
        storiesModel.getStoriesByProject(idproject, function (error, result) { 
            if(error) { 
                console.log("Error: ", error);
                res.render('stories/stories', { errors: [ { msg: 'Não foi possível obter dados com o parâmetro fornecido. Tente novamente' } ], stories: {} });
                return;
            }

            res.render('stories/stories', { errors: {}, stories: result });
        });
    } else {
        // shows all stories of logged user
        storiesModel.getStoriesByUser(req.session.user.id, function (error, result) { 
            if(error) { 
                console.log("Error: ", error);
                res.render('stories/stories', { errors: [ { msg: 'Houve um erro inesperado no retorno dos dados. Tente novamente' } ], stories: {} });
                return;
            }

            res.render('stories/stories', { errors: {}, stories: result });
        });   
    } 
}

// method used to fetch stories from a single project on dropdown options
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
        
        // send object as JSON to be used on application
        res.send(result);
    });
}