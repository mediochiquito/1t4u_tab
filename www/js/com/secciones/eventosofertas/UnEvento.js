
function UnEvento()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnEvento';
	
	var holder = document.createElement('div')
	holder.id = 'UnEvento_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnEvento_img'
	$(holder).find('>div').append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnEvento_header_titulo'
	$(holder).find('>div').append(header_titulo)

	var disancia =  document.createElement('div')
	disancia.className = 'UnEvento_disancia'
	$(header_titulo).append(disancia)


	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnEvento_titulo_txt'
	$(header_titulo).append(titulo_txt)
	$(titulo_txt).css('width', app.ancho-180)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnEvento_holder_data'
	$(holder).find('>div').append(holder_data)


	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnEvento_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnEvento_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_participar = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;ASISTIR", doParticipar, 'BotonAzul')
	btn_participar.main.id = 'UnEvento_btn_participar'
	$(holder_footer).append(btn_participar.main)




	var holder_participaciones =  document.createElement('div')
	holder_participaciones.id = 'UnEvento_holder_participaciones'

	var btn_volver = new Boton2Frames("img/btn_volver.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnEvento_btn_volver'
	$(header_titulo).append(btn_volver.main)

	var btn_ver_en_mapa = new Boton2Frames("img/eventos/marker_lineas.svg", 25, 50, doVerEnMapa)
	btn_ver_en_mapa.main.id = 'UnEvento_btn_ver_en_mapa'
	$(header_titulo).append(btn_ver_en_mapa.main)



	var hoy = new Image();
	hoy.id =  'UnaOferta_hoy';
	hoy.src = 'img/hoy.svg';
	$(holder).find('>div').append(hoy);

 	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div><div id="UnEvento_holder_usuarios_fb"></div>')
 	$(holder).find('>div').append(holder_participaciones)

	/*var is;
	var scroll_set =  false;*/
	var obj;

	function doVolver(){
		app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa: 'eventos'})
		//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});

	}
	function doVerEnMapa(){

		app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:'eventos', center:[obj.row.eventos_lat, obj.row.eventos_lon]});


	}
	function distance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}                                   

	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" ><div>'+ $data+
							  '</div></div><br style="clear:both" /></div>');
		

	}

	function doParticipar(){
		
		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para marcar la participación.')
			return;
		}
			
		app._Facebook.conectar(function(){

			participo_de_este_evento(function($bool){



				if($bool) {

					app.alerta('Ya estás participando de este evento.')
					return;

				}else{

					app.cargando(true, 'Enviando participacion...')
					$.ajax({

		                type: "POST",
		                url: app.server + "set_participar.php",
		                dataType: 'text',
		                cache: false, 

		                data:{id_evento: obj.row.eventos_id, uid: app.usuario.uid},

		                success: function($data) {
		                	if($data == '1'){
		                	
		    
		                	}else{
		                		app.alerta($data)
		                		
		            
		                	}
		                		app.db.transaction(function (tx) {

									tx.executeSql('INSERT INTO participaciones (participaciones_id_evento, participaciones_uid) VALUES (?,?)', 
												  [String(obj.row.eventos_id), String(app.usuario.uid)]
												  );

									app.cargando(false)
		                			btn_participar.habil(false);
									 
								},  app.db_errorGeneral);

		                	
		                },
		                error: function(){ 
		                    app.cargando(false)
		                }
			        });


				}

			})

	  		
		}) 
		       

	}


	function participo_de_este_evento($callback){
		


		app.db.transaction(function (tx) {
			
			tx.executeSql("SELECT * FROM participaciones WHERE participaciones_id_evento="+obj.row.eventos_id+" AND participaciones_uid="+app.usuario.uid+"" , [], function (tx, resultado) {
		    	
		    	if(resultado.rows.length > 0){

		    		$callback(true);

		    	}else{

		    		$callback(false);

		    	}

		    });

		},  app.db_errorGeneral);

	}


	function doCompartir(){
		
		
		app._Facebook.conectar(function(){

	  		var params = {
	            method: 'feed',
	            name: obj.row.eventos_nombre,
	            link: 'http://www.ideasparahoy.com.uy',
                picture: 'http://santander.crudo.com.uy/icon.png',
	            caption: obj.row.eventos_lugar,
	           description: 'Publicado a través de la APP de Eventos y Descuentos de Banco Santander. Descargala gratis en www.ideasparahoy.com.uy y enterate de las actividades del verano.'
                  
	        };


	       FB.ui(params, function(obj) { console.log(obj);});

		}) 
     
                
	}

	function este_evento_es_hoy(){

		var array_fecha_hora = obj.row.eventos_fecha_hora.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')

		var d = new Date();
		var hoy = new Date(d.getFullYear(),d.getMonth(), d.getDate())
		var dia_evento = new Date(Number(array_fecha[0]), Number(array_fecha[1])-1, Number(array_fecha[2]));
		
		if(hoy.getTime() == dia_evento.getTime()) return true;
		else return false;

	}
	

	function getDateUruguay($fecha_hora){

		var array_fecha_hora = $fecha_hora.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')
		var array_hora =array_fecha_hora[1].split(':')

		return array_fecha[2]+'/'+array_fecha[1]+'/'+array_fecha[0] + ' ' +  array_hora[0] + ':' +  array_hora[1]  +  'hs.'

	}

	this._set = function ($obj){

		obj = $obj;


	/*	try{
			img.onLoad = function(){
				is.refresh();
			}
		}catch(e){}*/

		if(app.hay_internet() && $obj.row.eventos_header_img!='')
			img.src =  $obj.row.eventos_header_img;
		else
			img.src = 'img/fotos_header_eventos/' + $obj.row.eventos_categoria_id + '.jpg';
		



		$(img).css('width', app.ancho-40);
		
		if(este_evento_es_hoy()) $(hoy).show();
		else  $(hoy).hide();
		
		$(titulo_txt).html($obj.row.eventos_nombre);
		$(holder_data).empty()


		if(app.posicion_global!=''){


			$(disancia).html(distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, $obj.row.eventos_lat, $obj.row.eventos_lon, 'K').toFixed(2)+' KM.')
		
		}



		
		addRegistro('Categoría', app.categorias_eventos[$obj.row.eventos_categoria_id-1])
		addRegistro('Fecha', getDateUruguay($obj.row.eventos_fecha_hora))
		addRegistro('Lugar', $obj.row.eventos_lugar)
		addRegistro('Descripción', $obj.row.eventos_desc)
		
		participo_de_este_evento(function($bool){

			if($bool) btn_participar.habil(false);
			else btn_participar.habil(true);

		})


		$('#UnEvento_holder_usuarios_fb').empty()
        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Obteniendo participaciones...</div>')

     /*   try{
        	is.scrollTo(0, 0, 0);
        }catch(e){}
*/
        cargar_participantes($obj);

	/*	setTimeout(function(){  
			
			if(!scroll_set){
				scroll_set = true;
				is =  new iScroll('UnEvento_holder', {hScrollbar: false, vScrollbar: false});
			}else{
				is.refresh();
			}
			
		}, 0);

		setTimeout(function(){
			is.refresh();
		}, 300)
*/
	}

	function cargar_participantes($obj){

		 $.ajax({

                type: "POST",
                url: app.server + "json.participaciones.php",
                dataType: 'json',
                cache: false, 
                data:{id_evento: $obj.row.eventos_id},

                success: function($json) {
                		$('#UnEvento_holder_usuarios_fb').html('');
                        for(var i in $json){

                                $('#UnEvento_holder_usuarios_fb').append('<img src="http://graph.facebook.com/'+$json[i].participaciones_uid+'/picture">')

                        }
                        if($json.length == 0) $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Aun no hay participantes en este evento.</div>')

                        $('#UnEvento_holder_usuarios_fb').append('<br style="clear:both" />');
                       	//is.refresh()
                },
                error: function(){ 
                        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Ocurrio un error al obtener los participantes</div>');
                       // is.refresh()
                }
        });        
	}



}

