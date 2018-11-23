let app = require('./config/server.js');
let port = 3000;

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('Servidor rodando com express na porta', port);
});