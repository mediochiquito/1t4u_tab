function SeccionRegistro()
{

	this.main.id = 'SeccionRegistro';
	this.ocultar(0);

	var bg_registro = new Image()
	bg_registro.src = 'img/bg_registro.png';
	bg_registro.id = 'SeccionRegistro_bg_registro';
	$(this.main).append(bg_registro);

	var btn = new Boton2Frames('img/btn_continuar.png', 239, 160, doEnviar);
	btn.main.id = 'SeccionRegistro_btn';
	$(this.main).append(btn.main);

	this.txt_nombre = new InputText(388, 'text', 255);
	this.txt_nombre.main.id = 'SeccionRegistro_txt_nombre';
	$(this.main).append(this.txt_nombre.main);

	this.txt_apellido = new InputText(388, 'text', 255);
	this.txt_apellido.main.id = 'SeccionRegistro_txt_apellido';
	$(this.main).append(this.txt_apellido.main);

	this.txt_ci = new InputText(388, 'text', 255);
	this.txt_ci.main.id = 'SeccionRegistro_txt_ci';
	$(this.main).append(this.txt_ci.main);

	this.txt_dir = new InputText(388, 'text', 255);
	this.txt_dir.main.id = 'SeccionRegistro_txt_dir';
	$(this.main).append(this.txt_dir.main);

	this.txt_tel = new InputText(388, 'text', 255);
	this.txt_tel.main.id = 'SeccionRegistro_txt_tel';
	$(this.main).append(this.txt_tel.main);

	this.txt_email = new InputText(388, 'text', 255);
	this.txt_email.main.id = 'SeccionRegistro_txt_email';
	$(this.main).append(this.txt_email.main);

	function doEnviar(){

		var r = true;

		if(app.secciones.seccionregistro.txt_nombre.getValor()=='') {r = false;}
		if(app.secciones.seccionregistro.txt_apellido.getValor()=='') { r = false;}
		if(app.secciones.seccionregistro.txt_ci.getValor()=='') { r = false;}
		if(app.secciones.seccionregistro.txt_dir.getValor()=='') { r = false;}
		if(app.secciones.seccionregistro.txt_tel.getValor()=='') {  r = false;}
		if(app.secciones.seccionregistro.txt_email.getValor()=='') {  r = false;}


		if(!r){
			app.alerta('Todos los campos son obligatorios.');
		}else{

			app.secciones.go(app.secciones.seccionseleccion);
	       
				
		}
		
	}



}
SeccionRegistro.prototype = new Base_Seccion();