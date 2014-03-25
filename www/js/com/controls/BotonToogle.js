function BotonToogle($img, $value, $img_w, $img_h, $callback){

	var self = this
	this.main = document.createElement('div');
	this.main.className = '_BotonToogle'

	$(this.main).css("cursor", "pointer");
	$(this.main).append('<img src="'+$img+'" width="'+($img_w)+'" height="'+($img_h)+'"  />')
	$(this.main).find('img').css('position', 'absolute');

	$(this.main).css("width", $img_w);
	$(this.main).css("height", $img_h/2); 
	$(this.main).css("cursor", "pointer");
	$(this.main).css("overflow", "hidden");

	var habil = true;
	var Selected = false;
	var value = $value
	
	if(app.es_touch()){

		$(this.main).bind("touchstart", do_click);
		/*$(this.main).bind("touchend", do_mouseout);
		$(this.main).bind("touchstart", do_mouseover);*/

	}else{

		$(this.main).bind("click", do_click);
		// $(this.main).bind("mouseout", do_mouseout);
		// $(this.main).bind("mouseover", do_mouseover);
		
	}


	this.setSelected = function ($Selected){
		
		Selected = $Selected;
		if(Selected){
			$(self.main).find('img').css("top", -($img_h/2));
		}else{
			$(self.main).find('img').css("top",0);
		}
	
	}

	this.getSelected = function (){

		return Selected;
		
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

			self.setSelected(!Selected)
		$callback(value);

		}
		
		
		
	}
	
	function do_mouseover(){
		//if(habil)
			//$(self.main).css("background-position", '0px '+($img_h/2)+'px');
	}
	
	function do_mouseout(){
		
		//if(habil)
			//$(self.main).css("background-position", '0px 0px');
		
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}