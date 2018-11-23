module.exports.addStory = function(app, req, res) {
	let story = req.body;

    // TODO: add validation

    let connection = app.config.dbConnection();
    let storysModel = new app.app.models.storysDAO(connection);
    
    delete story.submit;
    story.iduser = req.session.user.id;
    
    console.log(story);

    storysModel.storeStory(story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('stories/stories', { errors: error, storys: null });
            return;
        }
        
        res.redirect("/stories");
    });
}

module.exports.getStory = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let storysModel = new app.app.models.storysDAO(connection);
    
    storysModel.getStory(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.send("Error: ", error);
            return;
        }
        
        // send object to be used on application
        res.send(result);
    });
}

module.exports.updateStory = function(app, req, res) {
	let story = req.body;
	
    // TODO: add validation

    let connection = app.config.dbConnection();
    let storysModel = new app.app.models.storysDAO(connection);
    
    delete story.submit;
    story.iduser = req.session.user.id;
    
    storysModel.updateStory(story.idstory, story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.send(error);
            res.render('storys/storys', { errors: error, storys: null });
            return;
        }
        
        res.redirect("/storys");
    });
}

module.exports.deleteStory = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let storysModel = new app.app.models.storysDAO(connection);

    storysModel.deleteStory(id, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            res.render('storys/storys', { errors: error, storys: null });
            return;
        }
        
        res.redirect("/storys");
    });
}