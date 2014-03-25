function SeccionMapa()
{
	
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})


	$(this.main).append('<div id="SeccionMapa_txt_filtrar">Filtrar:</div>')
	$(this.main).append('<div id="SeccionMapa_txt_eventos">Eventos</div>')
	$(this.main).append('<div id="SeccionMapa_txt_ofertas">Descuentos:</div>')

	var chk_eventos = new BotonToogle("img/mapa/checkbox.svg", 'eventos' , 30, 60, doCheckEventos)
	chk_eventos.main.id = 'Mapa_chk_eventos'
	$(this.main).append(chk_eventos.main);

    $(holder_blanco_secciones).html('<div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>');
	
	var chk_oferta = new BotonToogle("img/mapa/checkbox.svg", 'eventos' , 30, 60, doCheckOfertas)
	chk_oferta.main.id = 'Mapa_chk_oferta'
	$(this.main).append(chk_oferta.main)

	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapa_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(holdermap_canvas).append(map_canvas)

	var bounds;

	$(holdermap_canvas).css({	width: app.ancho-20, height: app.alto-120})
	
	if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	
		var esquina_si = new Image()
		esquina_si.src = 'img/mapa/esquina_izq.png';
		esquina_si.id = 'SeccionMapa_esquina_si';
		$(this.main).append(esquina_si);

		var esquina_der = new Image()
		esquina_der.src = 'img/mapa/esquina_der.png';
		esquina_der.id = 'SeccionMapa_esquina_der';
		$(this.main).append(esquina_der);
		$(esquina_der).css('left',app.ancho-24);
	}

	var my_marker;
	var array_markers_eventos;
	var array_markers_ofertas;
	var map;
	var cantidad_de_listas_cargadas = 0
	var centrando_en_bounds = true
	var ultima_pos = '';
	var  config_gps = {
		minAccuracy : 150,
		highAccuracy : true,
		maximumAge : 3000,
		readTimeout : 5000
		};
	var gps_locator;
	var gps_intervalo;

	var imposible =   document.createElement('div')
	imposible.id = 'SeccionMapa_imposible';
	$(imposible).append('IMPOSIBLE OBTENER SU POSICION GLOBAL');
	$(imposible).hide()
	$(this.main).append(imposible)

	var ya_me_localizo_una_vez = false;
	var ultimo_obj = '';
	var solo_ver = '';

	var marker;
	var lat = "";
	var lon = "";
	var ya_creado = false;

	var btn_aceptar = new Boton('ACEPTAR', doAceptar);
	btn_aceptar.main.id = 'SeccionMapaForm_btn_aceptar'
	$(this.main).append(btn_aceptar.main);

	var txt_drag = document.createElement('div');
	txt_drag.id = 'SeccionMapa_txt_drag';
	$(txt_drag).css({	width: app.ancho-60})
	$(txt_drag).css({'display': 'none'});
	$(txt_drag).html('Tocá y arrastrá el marcador hasta la ubicación del evento');
	
	$(this.main).append(txt_drag)

	function doAceptar(){

		lat = marker.getPosition().lat();
		lon = marker.getPosition().lng()

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'subirevento'});
	}
	
	this.getLatLonString = function (){
		if(lat=='') return '';
		return lat + ',' + lon
	}
	

	function doCheckEventos(){
		centrando_en_bounds = true
		mostrar_elementos(chk_eventos.getSelected(), chk_oferta.getSelected())

	}

	this.getUltimaPos = function(){
		return ultima_pos;
	}

	function doCheckOfertas(){
		centrando_en_bounds = true
		mostrar_elementos(chk_eventos.getSelected(), chk_oferta.getSelected())

	}
	
	this.googleMapsLoaded = function (){
		app.cargo_mapa = true;
		app.secciones.seccionmapa._set(ultimo_obj);
	}

	this._remove = function(){
		
		$(map_canvas).hide()
			$(btn_aceptar.main).hide()
			$(chk_eventos.main).hide()
			$(chk_oferta.main).hide()
			setTimeout(function(){
				$('#SeccionMapa_txt_filtrar').hide()
				$('#SeccionMapa_txt_eventos').hide()
				$('#SeccionMapa_txt_ofertas').hide()

			}, 100)
			
	
		for (i in array_markers_eventos) {
		  array_markers_eventos[i].setMap(null);
		}
		for (u in array_markers_ofertas) {
		  array_markers_ofertas[u].setMap(null);
		}
		if(app.plataforma=='android'){
			$(map_canvas).remove()
			map = null;
		}
	}

	function _construct() { 
		
		if(app.plataforma=='android'){

			 map_canvas = document.createElement('div')
			map_canvas.id = 'SeccionMapa_map_canvas'
			$(holdermap_canvas).append(map_canvas)
		}
		 

		  var mapOptions = {
		    zoom: 13,
		    draggable:true,
		    mapTypeControl: false,
		    zoomControl: true,
		    panControl:false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },

		     streetViewControl: false,
		     styles:[
					    {
					        featureType: "poi",
					        elementType: "labels",
					        stylers: [
					              { visibility: "off" }
					        ]
					    }
					]
		  };


		if(!ya_creado ||  app.plataforma=='android'){

			 map = new google.maps.Map(map_canvas,  mapOptions);

			 var pos = new google.maps.LatLng(-34.965311,-54.94985);
			 map.setCenter(pos);

			 my_marker = new google.maps.Marker(
			           				{
									  icon: {url:'img/mapa/mypoint.png', scaledSize: new google.maps.Size(20, 20)}
									  
									});
			my_marker.setMap(map);


			marker = new google.maps.Marker({ 
						           					 
						           					title:'YO',
						           					
						           				  animation: google.maps.Animation.DROP,
												
												 draggable:true,
												  icon: {url:'img/markers/evento.png',  scaledSize: new google.maps.Size(19, 30)}
												});
			marker.setMap(map);
			ya_creado = true
		}
		 

		
	}



	this._set = function (obj){

		$(map_canvas).show()
		
		ultimo_obj = obj;

			if(!app.hay_internet()) {

				app.alerta("Debes conectarte a internet para ver el mapa.");
				return;
			}

			if(app.hay_internet() && !app.cargo_mapa){
					
				$.getScript("http://maps.google.com/maps/api/js?callback=app.secciones.seccionmapa.googleMapsLoaded&sensor=false", function(){});
				return;

			}

				_construct();

				$(self.main).find('.spinner').hide()

				google.maps.event.trigger(map, 'resize');

				try{

					  
					map.setCenter(new google.maps.LatLng(obj.center[0], obj.center[1]));
					map.setZoom(16)
					centrando_en_bounds = false

				}catch(e){
					

	 				centrando_en_bounds = true;
	 				
				}


				
				solo_ver = '';
				try{
					solo_ver = obj.solo_ver;
				}catch(e){}

				marker.setVisible(false)
				my_marker.setVisible(true)
				$(txt_drag).hide()
				
				try{
						
						if(obj.accion =='form'){
							
							$(txt_drag).show()
							marker.setVisible(true)
							my_marker.setVisible(false)

							$('#SeccionMapa_txt_filtrar').hide()
								$('#SeccionMapa_txt_eventos').hide()
								$('#SeccionMapa_txt_ofertas').hide()
								$(btn_aceptar.main).show()
							
							var pos
							var ultima_pos;
							try{
								ultima_pos = new google.maps.LatLng(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude)
							}catch(e){
								ultima_pos = ''
							}	

							if(obj.pos != ''){
								
								var array_pos = obj.pos.split(',')
								pos = new google.maps.LatLng(array_pos[0],array_pos[1]);

							}else if(ultima_pos!='' && typeof(ultima_pos)!='undefined'){
								pos = ultima_pos;

							}else{
								pos = new google.maps.LatLng(-34.965311,-54.94985);
							}


							marker.setPosition(pos)
							map.setCenter(pos);
				 			

						}else{

			
							$(chk_eventos.main).show()
							$(chk_oferta.main).show()
							$('#SeccionMapa_txt_filtrar').show()
							$('#SeccionMapa_txt_eventos').show()
							$('#SeccionMapa_txt_ofertas').show()

							cargar_lista_de_markers()

						}

					
				} catch(e){
							$(chk_eventos.main).show()
							$(chk_oferta.main).show()
							$('#SeccionMapa_txt_filtrar').show()
							$('#SeccionMapa_txt_eventos').show()
							$('#SeccionMapa_txt_ofertas').show()
							
							cargar_lista_de_markers()
				
				}


			setTimeout(function(){

				 google.maps.event.trigger(map, 'resize')
				 
			}, 200)		
			
			setTimeout(function(){

				 google.maps.event.trigger(map, 'resize')
				 
			}, 2000)		


	


	}


	function set_solo_ver_init(){

			switch(solo_ver){
					case 'eventos':
						mostrar_elementos(true, false)
					
						chk_eventos.setSelected(true)
						chk_oferta.setSelected(false)


					break;
					case 'ofertas':
						mostrar_elementos(false, true)
				
						chk_eventos.setSelected(false)
						chk_oferta.setSelected(true)

					break;
				    default:
						mostrar_elementos(true, true)
					
						chk_eventos.setSelected(true)
						chk_oferta.setSelected(true)
					break;
			}

			setTimeout(function(){
				try{
					 google.maps.event.trigger(map, 'resize')
				}catch(e){}
			}, 0)	

	}






	function mostrar_elementos($visiblildad_eventos, $visiblildad_ofertas){


		bounds = new google.maps.LatLngBounds();
	

						for(var i in array_markers_eventos){

							if($visiblildad_eventos)
							{
								
								if($.inArray(array_markers_eventos[i].row.eventos_id, app.secciones.seccioneventosofertas.get_lista_eventos().array_ids_encontrados) == -1){
								
									array_markers_eventos[i].setVisible(false);

								}else{
									
									array_markers_eventos[i].setVisible(true);
									bounds.extend(array_markers_eventos[i].getPosition());
								}

							}else{

								array_markers_eventos[i].setVisible($visiblildad_eventos);

								
							}
							

						}
						

						for(var i in array_markers_ofertas){
							
							if($visiblildad_ofertas)
							{
								
								if($.inArray(array_markers_ofertas[i].row.ofertas_id, app.secciones.seccioneventosofertas.get_lista_ofertas().array_ids_encontrados) == -1){

									array_markers_ofertas[i].setVisible(false);
								}else{
									array_markers_ofertas[i].setVisible(true);
									bounds.extend(array_markers_ofertas[i].getPosition());

								}

							}else{
								array_markers_ofertas[i].setVisible($visiblildad_ofertas)

							}
						}
						


		if(app.secciones.seccioneventosofertas.get_lista_eventos().array_ids_encontrados.length == 0) chk_eventos.habil(false)
		else  chk_eventos.habil(true)

		if(app.secciones.seccioneventosofertas.get_lista_ofertas().array_ids_encontrados.length == 0) chk_oferta.habil(false)
		else chk_oferta.habil(true)

		if(centrando_en_bounds){
			
			
			if(bounds.isEmpty() ){

				
						if(app.posicion_global!='')
						map.setCenter(new google.maps.LatLng(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude));
						else
						map.setCenter(new google.maps.LatLng(-34.965311,-54.9498));
				
						map.setZoom(16)
				
			}else{

				map.fitBounds(bounds)
				if(map.getZoom()>16 ) map.setZoom(16)
			}
		}
		
		if(!centrando_en_bounds){

			

		}

		
		if(app.posicion_global!='')
					my_marker.setPosition(new google.maps.LatLng(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude));

			
	 

	}

	function sum_cantidad_de_listas_cargadas(){

		cantidad_de_listas_cargadas++
		if(cantidad_de_listas_cargadas==2) set_solo_ver_init()

	}

	function cargar_lista_de_markers(){
		
		cantidad_de_listas_cargadas = 0
		listar_eventos();
		listar_ofertas();


	}

	function listar_ofertas(){

		array_markers_ofertas = new Array();
		app.db.transaction(function (tx) {
			
			tx.executeSql("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE locales_estado=1 AND locales_departamentos_id=?" , [app.depto_que_me_encuentro], function (tx, resulato_locales) {
		    	
		    	var cant_locales = resulato_locales.rows.length;
		    
		        for(var i=0; i<cant_locales; i++){
					
		           array_markers_ofertas[i] = new google.maps.Marker(
		           				{

								  position: new google.maps.LatLng(resulato_locales.rows.item(i).locales_lat, resulato_locales.rows.item(i).locales_lon),
								  title:resulato_locales.rows.item(i).locales_nombre,
								  
								  icon: {url:'img/markers/oferta.png', scaledSize: new google.maps.Size(19, 30)},
								  row: resulato_locales.rows.item(i)
								});

					if(solo_ver == 'eventos') array_markers_ofertas[i].setVisible(false);

					array_markers_ofertas[i].setMap(map);

					google.maps.event.addListener(array_markers_ofertas[i], 'click', function() {
					   	mostrar_una_oferta(this.row)
					});
		        }


		        sum_cantidad_de_listas_cargadas()


		    });


		});

	}

	
	function listar_eventos(){

		var _date = new Date();
		var mes =  (_date.getMonth()+1)
		if(mes<10) mes = '0' + mes;
		var dia =  (_date.getDate())
		if(dia<10) dia = '0' + dia;

		var fecha_hasta_hoy = _date.getFullYear() + '-' + mes + '-' + dia + ' 00:00:00';

		array_markers_eventos = new Array();
		app.db.transaction(function (tx) {
			
			//TODO agregar el estado
			tx.executeSql("SELECT * FROM eventos WHERE eventos_estado=1  AND  eventos_fecha_hora>='" +fecha_hasta_hoy+"' AND eventos_departamentos_id=?" , [app.depto_que_me_encuentro], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;
		        for(var i=0; i<cant_eventos; i++){
	
		           array_markers_eventos[i] = new google.maps.Marker(
		           				{
								  position: new google.maps.LatLng(resultado.rows.item(i).eventos_lat,resultado.rows.item(i).eventos_lon),
								  title:resultado.rows.item(i).eventos_nombre,
								  icon: {url:'img/markers/evento.png', scaledSize: new google.maps.Size(19, 30)},
								  row: resultado.rows.item(i)
								});

		            if(solo_ver == 'ofertas') array_markers_eventos[i].setVisible(false);
					array_markers_eventos[i].setMap(map);

					google.maps.event.addListener(array_markers_eventos[i], 'click', function() {
					   	mostrar_un_evento(this.row)
					});
		        }

		        sum_cantidad_de_listas_cargadas()
		    });

		});

	}

	function mostrar_una_oferta($row){
	
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'una_oferta', row: $row})

	}

	function mostrar_un_evento($row){
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'un_evento', row: $row})
	}

	

}

SeccionMapa.prototype = new Base_Seccion();