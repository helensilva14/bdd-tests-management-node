let app = require('./config/server.js');
// let rotaHome = require('./app/routes/home.js');
// let rotaNotas = require('./app/routes/notas.js');
// let rotaInsereNotas = require('./app/routes/insere_notas.js');

// rotaHome(app);
// rotaNotas(app);
// rotaInsereNotas(app);

let port = 3000;

app.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
	console.log('Servidor rodando com express na porta', port);
});