function App(){
	//

	var version = '1.0';
	this.main = document.createElement('div');
	this.main.id = 'app'
	this.ancho = 1024;
	this.alto = 600
	this.secciones = null;
	this.lightbox = null;
	this.header = null;
	this.server = 'http://metamorf.com/';

	var tablas_creadas = 0;
	var array_tablas_a_crear;
	
	this.db = openDatabase('itau_tab_dise', '1.0', 'santanders_app_punta', 2000000);

	var self = this;
	var tablas_creadas = 0;

	this.initialize = function(){

		document.addEventListener('deviceready', deviceready, false);
		$(document).bind('touchmove', doPrevent);

	}

	
	function doPrevent(event) {
		if(app.secciones.get_obj_seccion_actual().main.id == 'SeccionMapa' || app.secciones.get_obj_seccion_actual().main.id == 'SeccionMapaForm')
		event.preventDefault();
	}

	this.openlink = function($url){
	
		 window.open($url, '_system');

	}
	
	this.alerta = function($str){
		try{
    		navigator.notification.alert($str, function(){}, 'ALERTA')
		}catch(e){
    		alert($str)
    	}
	}
	
	this.is_phonegap =  function (){

		try {
		    if(device.platform == ''){}
		    return true;  
		} catch (e) {  
		    return false;   
		}

	}

	this.es_touch = function(){

		if($.browser.chrome) return false;  
		else return true;  

	}

	this.hay_internet = function() {

     		try{
            	var networkState = navigator.connection.type;
	 
	            var states = {};
	            states[Connection.UNKNOWN]  = 'Unknown connection';
	            states[Connection.ETHERNET] = 'Ethernet connection';
	            states[Connection.WIFI]     = 'WiFi connection';
	            states[Connection.CELL_2G]  = 'Cell 2G connection';
	            states[Connection.CELL_3G]  = 'Cell 3G connection';
	            states[Connection.CELL_4G]  = 'Cell 4G connection';
	            states[Connection.CELL]     = 'Cell generic connection';
	            states[Connection.NONE]     = 'No network connection';

	            if(networkState == Connection.NONE ){
	 				return false;
	            }else{
	            	return true;
	            }

			}catch(e){


				return true
	        }
     
    }

	
	function deviceready(){

		if(app.is_phonegap()){

		    if ( device.platform == 'android' || device.platform == 'Android' ) {
		    	//app.plataforma = 'android';
		    }
			else {
			   app.plataforma = 'ios';
			   StatusBar.hide();
			}

   		}
   		
   
        self.ancho = window.innerWidth;
		self.alto = window.innerHeight;
		//if(self.alto<480) self.alto = 480;

		//$(self.main).css({width:self.ancho, height:self.alto})

		self.secciones = new Secciones()
		$(self.main).append(self.secciones.main)
		
	
		/*var fpo_320 = document.createElement('div')
		fpo_320.id= 'fpo_320'
		$(self.main).append(fpo_320)*/
		
       	//$(self.main).append('<div id="loading"><div id="txt_loading"></div><div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div>');
		
		$('body').append(self.main)
        
        app.db.transaction(function (tx) {
        	crear_db(tx)
		}, app.db_errorGeneral);
      

	}

	function crear_db($tx) {
		
		tablas_creadas = 0;
				
		array_tablas_a_crear = new Array(crearTabla_Registros);

		for(var func in array_tablas_a_crear){
			array_tablas_a_crear[func]($tx);
					}
			
	}


	function comprobacion_total_tablas_creadas(e){

    	tablas_creadas++;
    	if(tablas_creadas == array_tablas_a_crear.length) start();

    }

	function start(){
		 
			if(app.secciones.get_obj_seccion_actual()==null)
				app.secciones.go(app.secciones.seccionhome);
	
			try{
									
				navigator.splashscreen.hide();
									
			}catch(e){}
			

	}


    function crearTabla_Registros($tx){
		
		$tx.executeSql('CREATE TABLE IF NOT EXISTS "registro" ("registro_id" INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL , "registro_nombre" VARCHAR, "registro_apellido" VARCHAR, "registro_ci" VARCHAR, "registro_dir" VARCHAR, "registro_tel" VARCHAR, "registro_email" VARCHAR, "registro_fecha_hora" DATETIME) ', [], comprobacion_total_tablas_creadas);

    } 
 
    function la_tala_fue_creada($tx, $table_name, $callback){
    	$tx.executeSql("SELECT name FROM sqlite_master WHERE name='"+$table_name+"'" , [],	
		function (tx, resultado) {
					if(resultado.rows.length==0) $callback(false);
					else $callback(true);
		},  app.db_errorGeneral);
    }
    

    this.db_errorGeneral = function(tx, err) {
		
		try{
      		app.alerta("Error processing SQL: " + err.message);
		}catch(e){
			app.alerta("Error processing SQL: " + tx.message);

		}

    }

   
	this.cargando = function ($bool, $txt){
		
		/*if($bool){
			$('#txt_loading').html($txt);
			$('#loading').show();
		}else{
			$('#loading').hide();
		}*/

	}

}