function SeccionHome()
{

	this.main.id = 'SeccionHome';
	this.ocultar(0);
	
	var placa0 = new Image()
	placa0.src = 'img/placa0.png';
	placa0.id = 'SeccionHome_placa0';
	$(this.main).append(placa0);


	var btn = new Boton2Frames('img/btn_participa.png', 239, 160, doVerRegistro)
	btn.main.id = 'SeccionHome_btn'
	$(this.main).append(btn.main)

	function doVerRegistro(){

		app.secciones.go(app.secciones.seccionregistro);

	}



}
SeccionHome.prototype = new Base_Seccion();