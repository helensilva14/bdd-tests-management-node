module.exports.addStory = function(app, req, res) {
    let story = req.body;

    req.assert('idproject', 'É obrigatório informar um projeto').isAlphanumeric();
	req.assert("description", "A descrição da estória é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        req.flash('error', errors.map(e => e.msg).join('. '));
        res.redirect("/stories");
        return;
    }

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    // delete submit button from object
    delete story.submit;

    storiesModel.storeStory(story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível cadastrar uma nova estória. Tente novamente.');
            res.redirect("/stories");
            return;
        }
        
        req.flash('success', "Estória cadastrada com sucesso!");
        res.redirect("/stories");
    });
}

// method used to return information of a single story
module.exports.getStory = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    storiesModel.getStory(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.status(500).send("Error: ", error);
            return;
        }
        
        // send object as JSON to be used on application
        res.send(result);
    });
}

module.exports.updateStory = function(app, req, res) {
	let story = req.body;
	
	req.assert("description", "A descrição da estória é obrigatória").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation errors: ", errors); 
        req.flash('error', errors.map(e => e.msg).join('. '));
        res.redirect("/stories");
        return;
    }

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    // delete submit button from object
    delete story.submit;

    storiesModel.updateStory(story.idstory, story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível atualizar a estória. Tente novamente.');
            res.redirect("/stories");
            return;
        }
        
        req.flash('success', "Estória atualizada com sucesso!");
        res.redirect("/stories");
    });
}

module.exports.deleteStory = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);

    storiesModel.deleteStory(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            req.flash('error', 'Não foi possível apagar a estória. Tente novamente.');
            res.redirect("/stories");
            return;
        }
        
        req.flash('success', "Estória apagada com sucesso!");
        res.redirect("/stories");
    });
}