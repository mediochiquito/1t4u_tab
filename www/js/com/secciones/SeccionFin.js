function SeccionFin()
{

	this.main.id = 'SeccionFin';
	this.ocultar(0);
	
	var layout = new Image()
	layout.src = 'img/fin.png';
	layout.id = 'SeccionSeleccion_layout';
	$(this.main).append(layout);

	this._set = function ($data){

 			app.db.transaction(function (tx) {
	        	
				tx.executeSql('INSERT OR IGNORE INTO "registro" ("registro_nombre","registro_apellido","registro_ci","registro_dir","registro_tel", "registro_email", "registro_id_disenador", "registro_fecha_hora") VALUES (?,?,?,?,?,?,?,DATETIME("NOW"))', 
														  [
														 
														  app.secciones.seccionregistro.txt_nombre.getValor(), 
														  app.secciones.seccionregistro.txt_apellido.getValor(), 
														  app.secciones.seccionregistro.txt_ci.getValor(), 
														  app.secciones.seccionregistro.txt_dir.getValor(), 
														  app.secciones.seccionregistro.txt_tel.getValor(),
														  app.secciones.seccionregistro.txt_email.getValor(),
														  app.disenador_elegido

														  ], function(){


															var event = jQuery.Event( "click_item_dise" );
															event.id = 0
															$(document).trigger( event );
															
															setTimeout(function (){

																app.secciones.go(app.secciones.seccionseleccion);

															}, 3000);
															

														  }, function(){

														  	app.alerta('Ocurrio un error al insertar el registro!')

														  });
	
			}, app.db_errorGeneral);

	}



}
SeccionFin.prototype = new Base_Seccion();