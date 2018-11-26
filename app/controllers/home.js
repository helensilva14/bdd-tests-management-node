module.exports.index = function (app, req, res) {
    // make the logged user information available to home template
    res.locals.user = req.session.user;
    res.render('home/index');
}