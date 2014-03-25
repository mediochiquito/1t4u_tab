function SeccionSeleccion()
{

	this.main.id = 'SeccionSeleccion';
	this.ocultar(0);
	
	var titulo = new Image()
	titulo.src = 'img/titulo_seleccion.png';
	titulo.id = 'SeccionSeleccion_titulo';
	$(this.main).append(titulo);




	var ItemDisenador1 = new ItemDisenador(1);
	$(this.main).append(ItemDisenador1.main);

	var ItemDisenador2 = new ItemDisenador(2);
	$(this.main).append(ItemDisenador2.main);

	
}
SeccionSeleccion.prototype = new Base_Seccion();