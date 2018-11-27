module.exports.testsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let testsModel = new app.app.models.testsDAO(connection);
	
	 // get project as a query parameter
    	let idproject = req.query.idproject;

	if (idstory) {
        // filtered by selected story id
        TestsModel.getTestsByStory(idstory, function (error, result) { 
            if(error) { 
                console.log("Error: ", error);
                res.render('tests/tests', { errors: [ { msg: 'Não foi possível obter dados com o parâmetro fornecido. Tente novamente' } ], stories: {} });
                return;
            }
	
	    res.render('stories/stories', { errors: {}, stories: result });
       	  });	
	} else
	// shows all tests of logged user
	testsModel.getTestsByUser(req.session.user.id, function (error, result) { 
	     if(error) { 
                console.log("Error: ", error);
                res.render('tests/tests', { errors: [ { msg: 'Houve um erro inesperado no retorno dos dados. Tente novamente' } ], tests: {} });
                return;
            }

            res.render('stories/stories', { errors: {}, stories: result });
        });   
    } 
}

// method used to fetch tests from a single story on dropdown options
module.exports.getTestsJSON = function(app, req, res) {
	let idstory = req.params.id;
	
    let connection = app.config.dbConnection();
	let testsModel = new app.app.models.testsDAO(connection);
    
    testsModel.getTestsByStory(idstory, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object as JSON to be used on application
        res.send(result);
    });
}
