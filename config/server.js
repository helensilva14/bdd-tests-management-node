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
app.use(body_parser.json())
app.use(expressValidator());

app.use(expressSession({
    secret: 'ViscondedeSabugosa', //Segredo que pode ser qq string
    resave: false, //Regrava do lado do servidor toda vez
    saveUninitialized: false //cria uma sessão nova toda vez
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

consign().include('app/routes')
.then('config/dbConnection.js')
.then('app/models')
.then('app/controllers')
.into(app);

// middleware used to handle a 404 (not found) error - unavailable routes
app.use(function (req, res, next) {
  res.status(404).send("Essa rota não existe!")
});

module.exports = app;