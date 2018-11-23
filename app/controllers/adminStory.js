module.exports.addStory = function(app, req, res) {
	let story = req.body;

    // TODO: add validation

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    delete story.submit;

    console.log(story);

    storiesModel.storeStory(story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.render('stories/stories', { errors: error, stories: null });
            return;
        }
        
        res.redirect("/stories");
    });
}

module.exports.getStory = function(app, req, res) {
	let id = req.params.id;

    let connection = app.config.dbConnection();
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    storiesModel.getStory(id, function (error, result) {
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
    let storiesModel = new app.app.models.storiesDAO(connection);
    
    delete story.submit;

    storiesModel.updateStory(story.idstory, story, function (error, result) {
        if (error) {
            console.log("Error: ", error);
            //res.send(error);
            res.render('stories/stories', { errors: error, stories: null });
            return;
        }
        
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
            res.render('stories/stories', { errors: error, stories: null });
            return;
        }
        
        res.redirect("/stories");
    });
}