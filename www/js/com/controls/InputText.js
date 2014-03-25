function InputText($width, $type, $len){


	var self = this
	this.main = document.createElement('input');
	this.main.className = 'InputText InputTextEnableds'

	if(typeof($len)!='undefined') 	$(this.main).attr('maxlength',$len);

	if(typeof($type)=='undefined') $type = 'text';
	this.main.type = $type
	$(this.main).css({'width':$width})

	$(this.main).bind('keydown', doKeyDown);
	//$(this.main).bind('touchend', doTouchStart);
	
	var _habil =true
	
	this.foco=function(){
		$(this.main).focus();
	}

	function doTouchStart(e){

		$(self.main).focus()
		e.stopPropagation()

	}
	
	function doKeyDown(e){

    	if(e.keyCode == 13){

    		$(self.main).blur()
    	}
    }

    this.marcar_error = function($bool){
    	if($bool){
    	    	 self.main.className = 'InputTextError';
    	    	}else{ 
    	    		if(_habil)
    	    	         self.main.className = 'InputText';
							else  self.main.className = 'InputText InputTextDisnable';
    	    	     }
    }
	
	this.getValor = function(){

		return $(this.main).val()

	}
	this.setValor = function($txt){

		return $(this.main).val($txt)

	}

	this.habil = function($b){
		_habil = $b;
		if($b){
		  self.main.className = 'InputText InputTextEnable';
		  $(self.main).removeAttr("disabled");
		}
		else {
			$(self.main).attr('disabled', true);
			self.main.className = 'InputText InputTextDisnable';
		}


	}

}