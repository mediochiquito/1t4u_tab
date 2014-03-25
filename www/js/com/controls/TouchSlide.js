// JavaScript Document

function TouchSlide(x,y,$ancho,$alto,$arr_slides_content){
	
	var self = this;
	this.main = document.createElement('div');
	//$(this.main).css({'position':'absolute', 'left':x, 'top':y,'width':$ancho, 'height':$alto,'overflow':'hidden'});
	
	var xo = x;
	var yo = y;
	
	var x_holder = 0;
	var temp_x_holder;
	
	var xs = 0;
	
	var t0 = 0;
		
	var ancho = $ancho;
	var alto = $alto;
		
	var arr_slides_content = $arr_slides_content;
	
	var holder = document.createElement('div');
	$(holder).css({'position':'absolute','left':0,'top':0,'width':arr_slides_content.length*ancho, 'height':alto});
	$(this.main).append(holder);
	
	var largo = arr_slides_content.length;
	var i = 0;
	
	var actual = 0;
	
	var arr_slides = new Array();
	
	for(i=0; i<largo; i++){
		arr_slides[i] = document.createElement('div');
		$(arr_slides[i]).css({'position':'relative','float':'left','top':0,'width':ancho, 'height':alto});
		$(arr_slides[i]).append(arr_slides_content[i]);
		$(holder).append(arr_slides[i]);
	}
	
	var moviendo = false;
	
	setTimeout(function(){
		
		if(app.es_touch()){
			self.main.addEventListener("touchstart", onTouchStart,false);
			self.main.addEventListener("touchend", onTouchEnd,false);
			self.main.addEventListener("touchmove", onTouchMove,false);
		}else{
			
			self.main.addEventListener("mousedown", onTouchStart,false);
			self.main.addEventListener("mouseup", onTouchEnd,false);
			self.main.addEventListener("mousemove", onTouchMove,false);
		}

	}, 100)
	
	this.set = function(id)
	{
		actual = id;
		x_holder = -actual*ancho;
		$(holder).transition({x:x_holder},300, function()
		{
			var evt = jQuery.Event("TOUCH_SLIDE_SECCION_ACTUAL");
				evt.id = actual;
				$(self.main).trigger(evt);
		});

		moviendo = false;
	}
	
	this.setInstant = function(id){
		actual = id;
		x_holder = -actual*ancho;
		$(holder).transition({x:x_holder},0);
	}
		
	function onTouchStart(e){
		
		//e.preventDefault();
		t0 = new Date().getTime();
		moviendo = true;
temp_x_holder = 0;
		if(app.es_touch()){
			xs = e.touches[0].pageX - xo;
		}else{
			xs = e.pageX - xo;
		}
	}
	
	function onTouchEnd(e){
			
		var tiempo_dif = new Date().getTime() - t0;

		
		if(tiempo_dif < 150 && Math.abs(temp_x_holder) > 20 ){
			if(temp_x_holder < 0){
				actual++;
			}else if(temp_x_holder > 0){
				actual--;
			}
		}else{
			actual = -Math.round((x_holder+temp_x_holder)/ancho);
		}
		
		if(actual < 0){
			actual = 0;
		}else if(actual > arr_slides.length - 1){
			actual = arr_slides.length - 1;
		}
				
		x_holder = -actual*ancho;
			
		$(holder).transition({x:x_holder},300,function()
		{
			var evt = jQuery.Event("TOUCH_SLIDE_SECCION_ACTUAL");
			evt.id = actual;
			$(self.main).trigger(evt);
		});
		moviendo = false;
		
	}
	
	function onTouchMove(e){

		//e.preventDefault();
		if(app.es_touch()){
			temp_x_holder = (e.touches[0].pageX - xo) - xs;
		}else{
			
			temp_x_holder = (e.pageX - xo) - xs;
		}
		//console.log('moviendo: ' + (x_holder ))
		if(moviendo)
			$(holder).transition({x:x_holder + temp_x_holder},0);
	}
}