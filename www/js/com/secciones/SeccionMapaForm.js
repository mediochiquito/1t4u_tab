function SeccionMapaForm()
{
	
	this.main.id = 'SeccionMapaForm';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

	var btn_aceptar = new Boton('ACEPTAR', doAceptar);
	btn_aceptar.main.id = 'SeccionMapaForm_btn_aceptar'
	$(this.main).append(btn_aceptar.main);


	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapaForm_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapaForm_map_canvas'
	$(holdermap_canvas).append(map_canvas)


	$(holdermap_canvas).css({	width: app.ancho-20, height: app.alto-120})
	
	if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	
		var esquina_si = new Image()
		esquina_si.src = 'img/mapa/esquina_izq.svg';
		esquina_si.id = 'SeccionMapaForm_esquina_si';
		$(this.main).append(esquina_si);

		var esquina_der = new Image()
		esquina_der.src = 'img/mapa/esquina_der.svg';
		esquina_der.id = 'SeccionMapaForm_esquina_der';
		$(this.main).append(esquina_der);
		$(esquina_der).css('left',app.ancho-25);
	}

	
	var marker;
	var lat = "";
	var lon = "";


	function doAceptar(){

		lat = marker.getPosition().lat();
		lon = marker.getPosition().lng()

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'subirevento'});
	}
	this.getLatLonString = function (){
		if(lat=='') return '';
		return lat + ',' + lon
	}
	this.resetLatLonString = function (){
		lat = "";
		lon = "";
	}
	function _construct() {
		

		  var mapOptions = {
		    zoom: 15,
		    mapTypeControl: false,
		    zoomControl: true,
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
		
		  map = new google.maps.Map(map_canvas,  mapOptions);

		

		

	
		
		
	}
	this.googleMapsLoaded = function (){


		app.cargo_mapa = true;

		app.secciones.seccionmapaform._set({pos:''})

	}
	this._remove = function(){

		$(map_canvas).empty()

	}
	this._set = function (obj){
		

		if(!app.cargo_mapa && app.hay_internet()){
				$.getScript("http://maps.google.com/maps/api/js?callback=app.secciones.seccionmapaform.googleMapsLoaded&sensor=false", function(){ });
				return;
		}else{
			if(!app.hay_internet()) {
				app.alerta("Debes conectarte a internet para ver el mapa.");
				return;
			}
			_construct();
		}
		
		if(app.cargo_mapa){

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

			//marker.setPosition(pos)

map.setCenter(pos);
 			marker = new google.maps.Marker(
		           				{ 
		           					 
		           					title:'YO',
		           					map:map,
		           				  animation: google.maps.Animation.DROP,
								  position:pos,
								 draggable:true,
								  icon: {url:'img/markers/evento.png',  scaledSize: new google.maps.Size(19, 30), size: new google.maps.Size(19, 30)}
								});



			
			
			

		}else{

			setTimeout(function(){
				self._set(obj)
			}, 4000)
		}
	}
}


SeccionMapaForm.prototype = new Base_Seccion();