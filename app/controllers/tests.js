module.exports.testsList = function(app, req, res){
    let connection = app.config.dbConnection();
	let testsModel = new app.app.models.testsDAO(connection);
	
	testsModel.getTestsByUser(req.session.user.id, function (error, result) { 
		if(error) { console.log("Erro")}
		res.render('tests/tests', { tests: result });
	}); 
}