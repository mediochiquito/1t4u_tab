function SeccionSeleccion()
{

	this.main.id = 'SeccionSeleccion';
	this.ocultar(0);
	
	var titulo = new Image()
	titulo.src = 'img/titulo_seleccion.png';
	titulo.id = 'SeccionSeleccion_titulo';
	$(this.main).append(titulo);



	var page1 = document.createElement('div');
	var page2 = document.createElement('div');
	var page3 = document.createElement('div');

	for(var i=1;i<=8;i++){

		$(page1).append(new ItemDisenador(i).main)
	}
	for(var i=9;i<=16;i++){

		$(page2).append(new ItemDisenador(i).main)
	}
	for(var i=17;i<=22;i++){

		$(page3).append(new ItemDisenador(i).main)
	}

	var array = new Array(page1, page2, page3)


	var touch_slide = new TouchSlide(170, 140, 720, 500, array);

	$(this.main).append(touch_slide.main);
	
}

SeccionSeleccion.prototype = new Base_Seccion();