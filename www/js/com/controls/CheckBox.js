function CheckBox($img, $img_w, $img_h){

	var self = this
	this.main = document.createElement('div');
	this.main.className = 'Boton2Frames'

	$(this.main).css("cursor", "pointer");
	$(this.main).css("background-image", "url("+$img+")");
	$(this.main).css("background-size", ($img_w)+"px "+($img_h)+"px");

	$(this.main).css("width", $img_w);
	$(this.main).css("height", $img_h/2); 
	$(this.main).css("cursor", "pointer");

	var habil = true;
	var value = '0'

	if(app.es_touch()){

		$(this.main).bind("touchstart", do_click);
/*		$(this.main).bind("touchstart", do_click);
		$(this.main).bind("touchstart", do_mouseover);
*/
	}else{

		$(this.main).bind("click", do_click);
	/*	$(this.main).bind("mouseout", do_mouseout);
		$(this.main).bind("mouseover", do_mouseover);*/
		
	}

	this.setValue = function ($value){
		
		value = $value;

		if(value == '1') 	$(self.main).css("background-position", '0px '+($img_h/2)+'px');
		else		$(self.main).css("background-position", '0px 0px');
	}
	this.getValue = function (){

		return value
		
	}


	this.habil = function($b){
		
		habil =  $b
		if($b) {
			$(this.main).css("cursor", "pointer");
			$(this.main).css({ opacity: 1 });
		}
		else{
		   $(this.main).css("cursor", "default");
		   $(this.main).css({ opacity: .3 });
		}

	}

	function do_click(){

		if(habil) {

			if(self.getValue()==1) self.setValue('0');
			else self.setValue('1');

		}
		
	}
	
	function do_mouseover(){
		//if(habil)
	
			$(self.main).css("background-position", '0px '+($img_h/2)+'px');
	}
	
	function do_mouseout(){
		
		//if(habil)
			$(self.main).css("background-position", '0px 0px');
		
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}