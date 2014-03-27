function ItemDisenador($id)
{
	
	var self = this;
	this.main = document.createElement('div')
	this.main.className = 'ItemDisenador';
	

	setTimeout(function(){

		$(self.main).css('z-index', 1000-$id)

	}, 0)


	var holder_confirmar = document.createElement('div')
	holder_confirmar.className = 'ItemDisenador_holder_confirmar';
	$(this.main).append(holder_confirmar);

	var btn_confirmar = new Boton2Frames('img/btn_confirmar.png', 167, 150, doConfirmar)
	$(holder_confirmar).append(btn_confirmar.main)
	
	var img_disenador = new Image()
	img_disenador.src = 'img/dienadores/'+$id+'.png';
	img_disenador.className = 'SeccionSeleccion_img_disenador';
	$(this.main).append(img_disenador);
	$(img_disenador).bind('click', doClickSeleccion)


	var cinta = new Image()
	cinta.src = 'img/mivoto.png';
	cinta.className = 'SeccionSeleccion_cinta';
	$(this.main).append(cinta);



	$(document).bind("click_item_dise", doSeleccionarUnItem)

	function doSeleccionarUnItem(e){

		if($id == e.id){

			$(holder_confirmar).show()
			$(cinta).show()
			$(holder_confirmar).transition({y:60},500);

		}else{

			$(cinta).hide()
			$(holder_confirmar).transition({y:0},500, function (){

				//$(holder_confirmar).hide()

			});
			
		}
		

	}

	function doClickSeleccion(){

		app.disenador_elegido = $id;
		var event = jQuery.Event( "click_item_dise" );
		event.id = $id;
		$(document).trigger( event );


	}
	
	function doConfirmar(){


		app.secciones.go(app.secciones.seccionfin);
	}





	
}
