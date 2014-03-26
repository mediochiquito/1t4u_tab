function Reporte(){


	var self = this;
	this.main = document.createElement('div');
	this.main.id = 'Reporte';


	var holder_tabla = document.createElement('div');
	$(holder_tabla).css('position', 'absolute');
	$(this.main).append(holder_tabla);

	var btn = new Boton2Frames('img/reportes/close.png', 50, 100, doClickCerrar)
	btn.main.id = 'close_btn_reporte'
	$(this.main).append(btn.main)


    function CopyHTMLToClipboard() {    

		var input = $(this);
	    setTimeout(function() { 
	        input.select();
	    },10);

    }    

	function doClickCerrar(){
		
		  $(self.main).hide()

	}

	this.mostrar = function(){
		  $(self.main).show()
		app.db.transaction(function (tx) 
	    {
            var html = '';

	        tx.executeSql("SELECT * FROM usuarios ORDER BY usuarios_id DESC", [],  function(tx, resultado){

	            var cant = resultado.rows.length;

	            html += '<div id="holder_tabla_rep"><table cellspacing=0>';
				html += '<tr class="rep_negrita" style="background-color: #333; color:#fff;"><td>Nombre</td><td>Apellido</td><td>E-mail</td><td>Fecha de Registro</td></tr>';
	               
	            for(var i=0; i<cant; i++)
	            {
  					/*for(var u=0; u<100; u++)
	             	{*/
						html += '<tr><td>'+resultado.rows.item(i).usuarios_nombre+'</td><td>'+resultado.rows.item(i).usuarios_apellido+'</td><td>'+resultado.rows.item(i).usuarios_email+'</td><td>'+resultado.rows.item(i).usuarios_fecha_hora+'</td></tr>';
	               // }
	            }

	            html += '</div></table>'; 
 
	            $(holder_tabla).html(html)
	            $(self.main).show();

	            setTimeout(enviar_report, 1000)
	           	

	        },  app.db_errorGeneral);
	            
	      }, app.db_errorGeneral);
		
	}


	function enviar_report(){

		var conf = confirm('Quieres enviar el reporte de jugadas?')
		
		if(conf){
			 
			$.ajax({
			    
			    url: server + 'recive.php',
			    type:'post',
			    data: {html: $('#holder_tabla_rep').html(), uuid:device.uuid},

			    error:function(){
			    	alert('Ocurrio un error al enviar el reporte  (error 1)');
			    },
			    success:function(data){
			    	if(data>0)
			    		alert('El reporte se ha enviado con exito.');
			    	else
			    		alert('Ocurrio un error al enviar el reporte (error 2)');
			    }
			});

		}
	}

	           
	this.ocultar = function(){

		$(self.main).hide()
	}

}