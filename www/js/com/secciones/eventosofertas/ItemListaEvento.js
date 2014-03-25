function ItemListaEvento($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemListaEvento';

	var txt = document.createElement('div');
	txt.className = 'ItemListaEvento_txt_nombre';
	$(this.main).append(txt)

	var array_fehca_hora = $row.eventos_fecha_hora.split(' ')
	var array_fehca = array_fehca_hora[0].split('-');

	$(txt).html('<div class="ItemListaEvento_fecha">' + array_fehca[2] + ' ' + app.meses[(Number(array_fehca[1])-1)] + '.</div><div class="ItemListaEvento_nombre">' + $row.eventos_nombre + '</div><br style="clear:both" />')
	
	if( este_evento_es_hoy()){
		var hoy = new Image();
		hoy.className =  'ItemListaOferta_hoy';
		hoy.src = 'img/hoy.png';
		$(this.main).append(hoy);
	}



	

	var haciendo_click = false;
	var inter_pintar;

	if(app.es_touch()){
		this.main.addEventListener('touchstart', doTocuhStart);
		this.main.addEventListener('touchend', doTocuhEnd);
	}else{

		this.main.addEventListener('click', doClick);
	}

	function doTocuhMove(){
		haciendo_click = false
		despintar()
		clearTimeout(inter_pintar)
		document.removeEventListener('touchmove', doTocuhMove);
	}
	function doTocuhStart(){
		document.addEventListener('touchmove', doTocuhMove);
		haciendo_click = true
		inter_pintar = setTimeout(pintar , 200)
	}

	function doTocuhEnd(){
		
		if(haciendo_click){
			setTimeout(function(){
				app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa:'un_evento', row: $row});
			}, 200)
			setTimeout(despintar, 800)
			haciendo_click = false
		}

	}
	
	function doClick(e){

		pintar()
		setTimeout(function(){
			app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa:'un_evento', row: $row});
		}, 200)
		setTimeout(despintar, 800)
	}

	function este_evento_es_hoy(){

		var array_fecha_hora = $row.eventos_fecha_hora.split(' ');
		var array_fecha =array_fecha_hora[0].split('-');
		var d = new Date();
		var hoy = new Date(d.getFullYear(),d.getMonth(), d.getDate())
		var dia_evento = new Date(Number(array_fecha[0]), Number(array_fecha[1])-1, Number(array_fecha[2]));
		
		if(hoy.getTime() == dia_evento.getTime()) return true;
		else return false;

	}

	function pintar(){

		$(self.main).css('background-color', '#ccc')
		
	}
	function despintar(){

		$(self.main).css('background-color', '#fff')
	
	}



}

