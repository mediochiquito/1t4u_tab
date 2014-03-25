function SeccionTermsBanner()
{
	
	this.main.id = 'SeccionTermsBanner';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

	var holder = document.createElement('div')
	holder.id = 'SeccionTermsBanner_holder'
	$(this.main).append(holder);
	$(holder).css({	width: app.ancho-40, height: app.alto-130})
	
	var cargada = false;
	$(holder).html('<div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>');
	
	var btn_volver = new Boton2Frames("img/btn_volver_gris.svg", 25, 50, doVolver)
	btn_volver.main.id = 'SeccionTermsBanner_btn_volver'
	$(this.main).append(btn_volver.main)


	function doVolver(){
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'ofertas'})
	}
	this._set  = function (obj){
		
		if(!cargada){
		
			$.ajax({
				type: "GET",
				url: app.server + "html.oferta_banner_terms.php?id="+obj.id,
				dataType: 'text'
			}).success(function(html) {

				$(holder).html(html);
				
			}).error(function(){


			});


			cargada = true;

		}
	
	}
	

}

SeccionTermsBanner.prototype = new Base_Seccion();