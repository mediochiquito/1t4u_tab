function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})
	
	$(this.main).bind("SOLAPA_CLICK", doSolapaClick)

	var solapa_eventos = new Solapa('EVENTOS', 'eventos', '#674d97', doSolapaClick)
	solapa_eventos.main.id = 'solapa_eventos'
	$(this.main).append(solapa_eventos.main)

	var solapa_ofertas = new Solapa('DESCUENTOS', 'ofertas', '#ed1c24', doSolapaClick)
	solapa_ofertas.main.id = 'solapa_ofertas'
	$(this.main).append(solapa_ofertas.main)

	var lista_eventos = new ListaEventos()
	$(lista_eventos.main).transition({x:3000}, 0)
	$(this.main).append(lista_eventos.main)

	var lista_ofertas = new ListaOfertas()
	$(lista_ofertas.main).transition({x:3000}, 0)
	$(this.main).append(lista_ofertas.main)

	var un_evento = new UnEvento()
	$(un_evento.main).transition({x:3000}, 0)
	$(this.main).append(un_evento.main);

	var una_oferta = new UnaOferta()
	$(una_oferta.main).transition({x:3000}, 0)
	$(this.main).append(una_oferta.main);

	var subirevento = new FormSubirEvento()
	$(subirevento.main).transition({x:3000}, 0)
	$(this.main).append(subirevento.main);


	var en_solapa=''
	var en_transaccion=false;

	$(document).bind('CARGAR_LISTAS', function(e){
		
		app.secciones.seccioneventosofertas.cargar_listas('')
	});

	function doSolapaClick($value){
		
		mostrar_solapa({solapa:$value})
		
	}

	this.get_lista_eventos =  function (){
		return lista_eventos;
	}

	this.get_lista_ofertas =  function (){
		return lista_ofertas;
	}

	this.cargar_listas = function($busqueda){

		
	/*	if(en_solapa=='una_oferta') mostrar_solapa({solapa:'eventos'});
		if(en_solapa=='un_evento')  mostrar_solapa({solapa:'ofertas'});
		*/
		
			
				lista_eventos.listar($busqueda, function ($cantidad_eventos){
		
					lista_ofertas.listar($busqueda, function ($cantidad_ofertas){
							
							if($busqueda != ''){
			
								if($cantidad_ofertas>$cantidad_eventos) mostrar_solapa({solapa: 'ofertas'});
								else mostrar_solapa({solapa: 'eventos'});
							}else{
									if(!app.cargando_evento_desde_push){

										if(en_solapa=='eventos' || en_solapa=='ofertas') mostrar_solapa({solapa: en_solapa});
										else if(en_solapa=='una_oferta') mostrar_solapa({solapa: 'ofertas'});
										else if(en_solapa=='un_evento') mostrar_solapa({solapa: 'eventos'});
										else if(en_solapa=='subirevento') mostrar_solapa({solapa: 'eventos'});
										
									}

									//hack
									setTimeout(function(){
										app.cargando_evento_desde_push =  false
									}, 3000)
									
									
							}
						 
					});
				});
		
	}

	this.ir_a_una_solapa = function($obj){

		mostrar_solapa($obj);

	}

	function mostrar_solapa($obj){

		if(typeof($obj.solapa) == 'undefined') en_solapa = 'eventos';
		else en_solapa = $obj.solapa;
		
		$(lista_ofertas.main).transition({x:3000}, 0);
		$(lista_eventos.main).transition({x:3000}, 0);
		$(un_evento.main).transition({x:3000}, 0);
		$(una_oferta.main).transition({x:3000}, 0);
		$(subirevento.main).transition({x:3000}, 0);

		$(lista_ofertas.main).css('pointer-events', 'none')
		$(lista_eventos.main).css('pointer-events', 'none')

		$('#ListaOferta_combo_deptos').attr('disabled', true)
		$('#ListaEventos_combo_deptos').attr('disabled', true)
		
		$('#FormSubirEvento_txt_titulo').attr('disabled', true)
		$('#FormSubirEvento_txt_desc').attr('disabled', true)
		$('#FormSubirEvento_txt_lugar').attr('disabled', true)
		$('#FormSubirEvento_combo_categorias').attr('disabled', true)
		$('#FormSubirEvento_combo_deptos').attr('disabled', true)

		if($obj.solapa == 'subirevento'){
			
			subirevento._set()
			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			$(subirevento.main).transition({x:0}, 0)
			
				$('#FormSubirEvento_txt_titulo').attr('disabled', false)
				$('#FormSubirEvento_txt_desc').attr('disabled', false)
				$('#FormSubirEvento_txt_lugar').attr('disabled', false)
				$('#FormSubirEvento_combo_categorias').attr('disabled', false)
				$('#FormSubirEvento_combo_deptos').attr('disabled', false)
		}

		if($obj.solapa == 'eventos'){
		
			$('#ListaEventos_combo_deptos').attr('disabled', false)
			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			$(lista_eventos.main).transition({x:0}, 0)

			setTimeout(function(){
				$(lista_eventos.main).css('pointer-events', 'auto')
			}, 500)
			
		}

		if($obj.solapa == 'ofertas'){
			$('#ListaOferta_combo_deptos').attr('disabled', false)
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			$(lista_ofertas.main).transition({x:0}, 0);

			setTimeout(function(){
				$(lista_ofertas.main).css('pointer-events', 'auto')
			}, 500)
			
		}

		if($obj.solapa == 'una_oferta'){
	
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			una_oferta._set($obj);
			$(una_oferta.main).transition({x:0}, 0);

		}

		if($obj.solapa == 'un_evento'){

			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			un_evento._set($obj);
			$(un_evento.main).transition({x:0}, 0);
			
		}


	}

	this._remove = function(){

			$('#ListaOferta_combo_deptos').attr('disabled', true)
			$('#ListaEventos_combo_deptos').attr('disabled', true)
			
			$('#FormSubirEvento_txt_titulo').attr('disabled', true)
			$('#FormSubirEvento_txt_desc').attr('disabled', true)
			$('#FormSubirEvento_txt_lugar').attr('disabled', true)
			$('#FormSubirEvento_combo_categorias').attr('disabled', true)
			$('#FormSubirEvento_combo_deptos').attr('disabled', true)

	}
	this._set = function ($obj){

		if(typeof($obj)!='undefined'){

			mostrar_solapa($obj);

		}else{

			if(en_solapa=='') mostrar_solapa({solapa:'eventos'});

		}
	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();