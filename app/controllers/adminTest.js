module.exports.addTest = function(app, req, res) {
	let test = req.body;

    req.assert('idproject', 'É obrigatório informar um projeto').isAlphanumeric();
    req.assert('idstory', 'É obrigatório informar uma estória').isAlphanumeric();
    req.assert("text_given", "É obrigatório informar o texto 'Dado'").notEmpty();
    req.assert("text_when", "É obrigatório informar o texto 'Quando'").notEmpty();
    req.assert("text_then", "É obrigatório informar o texto 'Então'").notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        // req.flash('error', errors);
        // res.redirect("/tests");

        res.render('tests/tests', { errors: errors, tests: {} });
        return;
    }

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    // create the complete test description
    test.description = "Dado " + test.text_given + ", quando " + test.text_when + ", então " + test.text_then;
    
    delete test.submit;
    delete test.idproject;
    delete test.text_given;
    delete test.text_when;
    delete test.text_then;

    testsModel.storeTest(test, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível cadastrar um novo caso de teste. Tente novamente.');
            res.redirect("/tests");
            return;
        }
        
        req.flash('success', "Caso de teste cadastrado com sucesso!");
        res.redirect("/tests");
    });
}

// method used to return information of a single test
module.exports.getTest = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    testsModel.getTest(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.status(500).send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}

module.exports.updateTest = function(app, req, res) {
	let test = req.body;
	
	req.assert("description", "A descrição do caso de teste é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        req.flash('error', errors.map(e => e.msg).join('. '));
        res.redirect("/tests");
        return;
    }

    let connection = app.config.dbConnection();
    let testsModel = new app.app.models.testsDAO(connection);
    
    // delete submit button from object
    delete test.submit;

    testsModel.updateTest(test.idtest, test, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível atualizar o caso de teste. Tente novamente.');
            res.redirect("/tests");
            return;
        }
        
        req.flash('success', "Caso de teste atualizado com sucesso!");
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
            req.flash('error', 'Não foi possível apagar o caso de teste. Tente novamente.');
            res.redirect("/tests");
            return;
        }
        
        req.flash('success', "Caso de teste apagado com sucesso!");
        res.redirect("/tests");
    });
}