function SeccionMenu()
{
	
	this.main.id = 'SeccionMenu';
	this.ocultar(0);
	
	$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div><img src="img/menu/punta.svg" id="SeccionMenu_punta" />')
	//$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div>')

	var holder = document.createElement('div')
	holder.id = 'SeccionMenu_holder'
	$(this.main).append(holder)

	var btn_mapa = new ItemMenu('Mapa', 'icon_mapa.svg', doVerMapa)
	$(holder).append(btn_mapa.main)

	var btn_eventos = new ItemMenu('Eventos', 'icon_eventos.svg', doVerEventos)
	$(holder).append(btn_eventos.main)

	var btn_descuentos = new ItemMenu('Descuentos', 'icon_ofertas.svg', doVerDescuentos)
	$(holder).append(btn_descuentos.main)
	
	var btn_cargar_evento = new ItemMenu('Cargar Evento', 'icon_cargar_evento.svg', doSubirEvento)
	$(holder).append(btn_cargar_evento.main)
	
	var btn_notitficaciones = new ItemMenu('Notificaciones Push', 'icon_push.svg', doPush)
	$(holder).append(btn_notitficaciones.main)

	var btn_terms = new ItemMenu('Términos y Condiciones', 'icon_terms.svg', doTerms)
	$(holder).append(btn_terms.main)

	var chk_push = new BotonToogle("img/mapa/checkbox.svg", '1' , 30, 60, doCheckPush)
	chk_push.main.id = 'SeccionMenu_chk_push'
	$(chk_push.main).css('pointer-events', 'none');
	$(btn_notitficaciones.main).append(chk_push.main)
	chk_push.setSelected(true)

	
	app.db.transaction(function (tx) {
			tx.executeSql("SELECT push FROM app" , [], function (tx, resultado) {
	    					if(String(resultado.rows.item(0).push) == '1'){
	    						chk_push.setSelected(true)
	    					}else{
	    						chk_push.setSelected(false)
	    					}
					})
	});

	setTimeout(function(){
		$('#SeccionMenu_header_bg').css({width: app.ancho-20})
	})

	function doCheckPush(){
			

	}
	function doSubirEvento(){
		
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'subirevento'});

	}
	function doTerms(){


		app.secciones.go(app.secciones.seccionterms)
	}
	function doPush(){

		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para ejecutar esta acción.')
			return;
		}

		if(chk_push.getSelected()){

			
			
			app.cargando(true, 'Quitando registro push...')
			$.ajax({

							type: "POST",
							url: app.server + "void.set_push_token.php",
							dataType: 'text',
							cache: false, 
							data:{desactivar: true, plataform: app._ManagePush.plataform, token:app._ManagePush.token}, 
							success:function(){
								 chk_push.setSelected(false);
								 app._ManagePush.unregistrar()
								 app.db.transaction(function (tx) {
									 tx.executeSql('UPDATE app SET push=?', ['-1']);
								 });
								 app.cargando(false)
							}	
						});	
			
		}else{
			
			app._ManagePush.registrar()
			chk_push.setSelected(true)
		}
		
	}

	function doVerDescuentos(){

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'ofertas'});

	}

	function doVerEventos(){
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});
	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa, 300, {desde:'menu'});

	}

}

SeccionMenu.prototype = new Base_Seccion();