function SeccionHome()
{

	this.main.id = 'SeccionHome';
	this.ocultar(0);
	
	var placa0 = new Image()
	placa0.src = 'img/placa0.png';
	placa0.id = 'SeccionHome_placa0';
	$(this.main).append(placa0);

	var btn = new Boton2Frames('img/btn_participa.png', 239, 220, doVerRegistro)
	btn.main.id = 'SeccionHome_btn'
	$(this.main).append(btn.main)

	var btn_blank = new Boton2Frames('img/reportes/blank.png', 100, 200, function (){

		app.reportes.mostrar()
	})
	btn_blank.main.id = 'btn_reporte'
	$(this.main).append(btn_blank.main)




	function doVerRegistro(){

		//app.secciones.go(app.secciones.seccionregistro);
		app.secciones.go(app.secciones.seccionseleccion);
	}



}
SeccionHome.prototype = new Base_Seccion();