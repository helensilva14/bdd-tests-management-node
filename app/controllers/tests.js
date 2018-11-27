module.exports.testsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let testsModel = new app.app.models.testsDAO(connection);
	
	// get story as a query parameter
    let idstory = req.query.idstory;

	if (idstory) {
        // filtered by selected story id
        testsModel.getTestsByStory(idstory, function (error, result) { 
            if(error) { 
                console.log("Error: ", error);
                res.render('tests/tests', { errors: [ { msg: 'Não foi possível obter dados com o parâmetro fornecido. Tente novamente' } ], tests: {} });
                return;
            }
	
	        res.render('tests/tests', { errors: {}, tests: result });
       	  });	
	} else {
        // shows all tests of logged user
        testsModel.getTestsByUser(req.session.user.id, function (error, result) { 
	     if(error) { 
                console.log("Error: ", error);
                res.render('tests/tests', { errors: [ { msg: 'Houve um erro inesperado no retorno dos dados. Tente novamente' } ], tests: {} });
                return;
            }

            res.render('tests/tests', { errors: {}, tests: result });
        });   
    } 
}
