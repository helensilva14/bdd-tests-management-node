let app = require('./config/server.js');

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('Servidor rodando com express');
});