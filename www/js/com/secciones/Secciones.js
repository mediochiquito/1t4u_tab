function Secciones(){ 
	
	var self = this

  	this.main = document.createElement('div')
  	this.main.id = 'secciones'


  	this.seccionhome = new SeccionHome();
	$(this.main).append(this.seccionhome.main)
	this.seccionhome.ocultar(0);

  	this.seccionregistro = new SeccionRegistro();
	$(this.main).append(this.seccionregistro.main)
	this.seccionregistro.ocultar(0);

  	this.seccionseleccion = new SeccionSeleccion();
	$(this.main).append(this.seccionseleccion.main)
	this.seccionseleccion.ocultar(0);

  	this.seccionfin = new SeccionFin();
	$(this.main).append(this.seccionfin.main)
	this.seccionfin.ocultar(0);


	var historia = new Array()

	//document.addEventListener("backbutton", backKeyDown, false);

	var obj_seccion_actual = null;	
	var cambiando_historia = false;
	this.get_obj_seccion_actual = function (){
		return obj_seccion_actual;
	}

	function backKeyDown(){

			if(!cambiando_historia){
						
				if(historia.length<=1) 	{
					
					navigator.app.exitApp();
					e.preventDefault();

				}else{

					cambiando_historia = true;
					if(historia.length>1) historia.pop();
					var penultimo_elemento = historia[historia.length-1];
					app.secciones.go(penultimo_elemento[0], 300, penultimo_elemento[1], false);
					setTimeout(function (){
						cambiando_historia = false;
					}, 500)
				}

			}
		
		
	}
	this.go = function($base_seccion, $time, $data, $guardar_historia){

		var guardar_historia = true;
		if(typeof($guardar_historia) != 'undefined') guardar_historia =  $guardar_historia;
		

		if($base_seccion==obj_seccion_actual) return;
		var d = new Date()

		$(this.main).css({ display: 'block'});
		
		try{
			if($base_seccion != obj_seccion_actual)
				obj_seccion_actual.ocultar($time);
		}catch(e){}
		
		if(guardar_historia) historia.push([$base_seccion, $data]);

		$base_seccion.mostrar($time, $data);

		obj_seccion_actual = $base_seccion
		
	}

	this._close_all = function(){
		
		$(document).trigger('CERRANDO_TODAS_LAS_SECCIONES');
		obj_seccion_actual.ocultar();
		obj_seccion_actual = null;

	}

}

