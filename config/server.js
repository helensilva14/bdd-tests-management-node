let express = require('express'); 
let consign = require('consign');
let body_parser = require('body-parser');
let expressValidator = require('express-validator');
let expressSession = require('express-session');
let app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', './app/views');

app.use(express.static('./app/public')); //Define em qual pasta estarão os arquivos estáticos.

app.use(body_parser.urlencoded({extended:true}));
app.use(expressValidator());

app.use(expressSession({
    secret: 'ViscondedeSabugosa', //Segredo que pode ser qq string
    resave: false, //Regrava do lado do servidor toda vez
    saveUninitialized: false //cria uma sessão nova toda vez
}));

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

consign().include('app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

module.exports = app;