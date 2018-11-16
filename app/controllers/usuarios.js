module.exports.usuariosListar = function(app, req, res){
    let connection = app.config.dbConnection();
		let usuariosModel = new app.app.models.usuariosDAO(connection);
		usuariosModel.getUsuarios(function (error, result) {
				if(error) { console.log("Erro")}
				res.render('usuarios/usuarios', {usuarios: result});
		}); 
}