let app = require('./config/server.js');

app.listen(process.env.PORT || 1337, process.env.IP, function() {
	console.log('Servidor rodando com express');
});