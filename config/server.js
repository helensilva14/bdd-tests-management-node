let express = require('express'); 
let consign = require('consign');
let body_parser = require('body-parser');
let expressValidator = require('express-validator');
let expressSession = require('express-session');
let cookieParser = require('cookie-parser');

let app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', './app/views');

app.use(express.static('./app/public')); 

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json())
app.use(expressValidator());

app.use(cookieParser('s3Cur3s3Cret'));
app.use(expressSession({
    secret: 's3Cur3s3Cret', 
    resave: false, 
    saveUninitialized: false,
}));
 
 /**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported, such as forms
 */ 
let methodOverride = require('method-override');

// using custom logic to override method
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/**
 * This module shows flash messages generally used to show success or error messages. 
 * Flash messages are stored in session
 */
let flash = require('express-flash');

app.use(flash());

consign().include('app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

// middleware used to handle a 404 (not found) error - unavailable routes
app.use(function (req, res, next) {
  res.render('errors/notfound');
});

module.exports = app;