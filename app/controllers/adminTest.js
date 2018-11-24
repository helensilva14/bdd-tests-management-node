module.exports.addTest = function(app, req, res) {
	let test = req.body;

    // TODO: add validation

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    test.description = "Dado " + test.text_given + ", quando " + test.text_when + ", então " + test.text_then;
    
    delete test.submit;
    delete test.text_given;
    delete test.text_when;
    delete test.text_then;

    console.log(test);

    testsModel.storeTest(test, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.render('tests/tests', { errors: error, tests: null });
            return;
        }
        
        res.redirect("/tests");
    });
}

module.exports.getTest = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    testsModel.getTest(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}

module.exports.updateTest = function(app, req, res) {
	let test = req.body;
	
    // TODO: add validation

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    delete test.submit;

    testsModel.updateTest(test.idtest, test, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.send(error);
            res.render('tests/tests', { errors: error, tests: null });
            return;
        }
        
        res.redirect("/tests");
    });
}

module.exports.deleteTest = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);

    testsModel.deleteTest(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('tests/tests', { errors: error, tests: null });
            return;
        }
        
        res.redirect("/tests");
    });
}