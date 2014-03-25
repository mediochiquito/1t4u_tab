function ListaEventos()
{
	
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaEventos';
	
	var btn_ver_en_mapa = new Boton('VER EN MAPA', doVerEnMapa);
	btn_ver_en_mapa.main.id = 'ListaEventos_btn_ver_en_mapa'
	$(this.main).append(btn_ver_en_mapa.main);

	var btn_subir_evento = new Boton('SUBIR EVENTO', doSubirEvento);
	btn_subir_evento.main.id = 'ListaEventos_btn_subir_evento'
	$(this.main).append(btn_subir_evento.main);

	$(btn_ver_en_mapa.main).css({'margin-left': -132, top: app.alto-75});
	$(btn_subir_evento.main).css({'margin-left': 2, top: app.alto-75});

	var combo_deptos = document.createElement('select');
	combo_deptos.id = 'ListaEventos_combo_deptos'
	$(combo_deptos).bind('change', doChangeDepto)
	$(combo_deptos).attr('disabled', true)
	for(var i=0; i< app.array_deptos.length; i++){

			var option =  document.createElement('option');
				option.value = (i+1)
				$(option).append(app.array_deptos[i])
				$(combo_deptos).append(option);

	}

	var holder = document.createElement('div')
	holder.id = 'ListaEventos_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div id="ListaEventos_holder_combo_deptos"><div id="ListaEventos_txt_deptos">Departamento:</div></div><div id="ListaEventosWrapper">')
	$(this.main).append(holder),

	this.array_ids_encontrados;

	$(holder).css({width: app.ancho-40, height: app.alto-200});

	setTimeout(function (){

		$('#ListaEventos_holder_combo_deptos').append(combo_deptos);


	}, 0);

/*	setTimeout(function(){
		
	}, 0)*/
	/*var is ;
	var scroll_set =  false*/

	function doChangeDepto(){
		
		app.depto_que_me_encuentro = ($(combo_deptos).val())
		$(document).trigger('CARGAR_LISTAS')

	}

	function doVerEnMapa(e){

		app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:'eventos', desde:'lista'})

	}
	
	function doSubirEvento(e){

		app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa:'subirevento'})
		
	}


	this.listar =  function ($busqueda_obsoleta, $callback){
		
		var _date = new Date();
		var mes =  (_date.getMonth()+1)
		if(mes<10) mes = '0' + mes;
		var dia =  (_date.getDate())
		if(dia<10) dia = '0' + dia;

		var busqueda = $.trim($('#Header_search').val());
		
		var fecha_hasta_hoy = _date.getFullYear() + '-' + mes + '-' + dia + ' 00:00:00';

		$(combo_deptos).find('option[value="'+app.depto_que_me_encuentro+'"]').prop('selected', true)
		
		var where = ' WHERE eventos_estado=1 AND  eventos_fecha_hora>="'+fecha_hasta_hoy+'" AND eventos_estado=1 AND eventos_departamentos_id="'+app.depto_que_me_encuentro + '" ';
		if(busqueda != '' && busqueda != 'Buscar...'){
			where = ' WHERE (eventos_nombre LIKE "%' + busqueda + '%" OR eventos_tags LIKE "%' + busqueda + '%") AND eventos_estado=1 AND eventos_departamentos_id="'+app.depto_que_me_encuentro+'" AND  eventos_fecha_hora>="'+fecha_hasta_hoy+'"';
		}

		app.db.transaction(function (tx) {
			
			tx.executeSql('SELECT * FROM eventos ' + where + ' ORDER BY eventos_fecha_hora ASC' , [], function (tx, resultado) {
			    	
			    	$(holder).find('#ListaEventosWrapper').empty();
			    	var cant_eventos = resultado.rows.length;
			    	if(cant_eventos == 0){

			    		btn_ver_en_mapa.habil(false)

			    		if(busqueda != '' && busqueda != 'Buscar...')
			    			$(holder).find('#ListaEventosWrapper').html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en eventos.</div></div>');
			    		else 
			    			$(holder).find('#ListaEventosWrapper').html('<div class="sin_resultados"><div>No hay eventos publicados por el momento.<br /><br />Te invitamos a que consultes la sección Descuentos.</div></div>');




			    	}else{
			    		btn_ver_en_mapa.habil(true)
			    		
			    	}
			    	
			    	
		    		self.array_ids_encontrados = new Array();
		    		for(var i=0; i<cant_eventos; i++){
		    			
		    			self.array_ids_encontrados.push(resultado.rows.item(i).eventos_id)
						
						var _ItemListaEvento = new ItemListaEvento(resultado.rows.item(i));
						$(holder).find('#ListaEventosWrapper').append(_ItemListaEvento.main)
			            
			        }


			        $('.ItemListaEvento_nombre').css('width', app.ancho-145)


				if(typeof($callback)!='undefined') $callback(cant_eventos);

		    })
		});

	}

}

