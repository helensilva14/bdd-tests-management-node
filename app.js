let app = require('./config/server.js');

const port = process.env.PORT || 3000;
const host = process.env.IP || '0.0.0.0';

app.listen(port, host, function() {
	console.log('Servidor rodando com express na porta ', port);
});