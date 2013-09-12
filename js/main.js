

		$(function() {
		

		
			/*
			$('#paradaresult').click(function() {
			
				alert('alerta');
							
			});*/
		
		    $('#lineas').change(function() {
            	var id = $("#lineas").find(':selected').val();
            	
            	$('#paradas').hide();

            	$("#calles").load('consultar-calle.php?id='+id); 
            	$("#entrecalles").load('blank.php');            	
          	
		    });
		    
		    $('#calles').change(function() {
            	var lineaId = $("#lineas").find(':selected').val();
            	var calle = $("#calles").find(':selected').val();
            	
            	$('#paradas').hide();

            	$("#entrecalles").load('consultar-entrecalle.php?id='+lineaId+'&calle='+calle);            	
		    });
		    
		    $('#entrecalles').change(function() {
            	var lineaId = $("#lineas").find(':selected').val();
            	var calle = $("#calles").find(':selected').val();
            	var entrecalles = $("#entrecalles").find(':selected').val();
            	
            	
            	$("#paradas").load('consultar-parada.php?id='+lineaId+'&calle='+calle+'&entrecalle='+entrecalles); 
            	$('#paradas').show('fast');
           	
		    });
		    
			$('#calcular').submit(function() {
			
				//alert('submit');
				
            	$('#calcular').hide();
				$('#calculando').show();

				// Enviamos el formulario usando AJAX
				$.ajax({
					type: 'GET',
					url: $(this).attr('action'),
					data: $(this).serialize(),
					// Mostramos un mensaje con la respuesta de PHP
					success: function(data) {
					
						$('#resultCalcular').show();
						$('#resultCalcular').html(data).fadeIn('slow');
						$('#calcular #submit').hide();
						$('#calcular #esperar').show();
						
						$('#calcular #esperar').show(0).delay(15000).hide(0);
						$('#calcular #submit').hide(0).delay(15000).show(0);
						//$('#calcular #submit').delay(150000).show();
						
						$('#calculando').hide();
					}
				})        
			return false;
			});
			
			
			
			
			$('#reportar').submit(function() {
			
				//alert('submit');
				
            	$('#reportar').hide();
				$('#calculando').show();

				// Enviamos el formulario usando AJAX
				$.ajax({
					type: 'GET',
					url: $(this).attr('action'),
					data: $(this).serialize(),
					// Mostramos un mensaje con la respuesta de PHP
					success: function(data) {
					
						
						$('#resultCalcular').html(data).fadeIn('slow');
						$('#calculando').hide();
					}
				})        
			return false;
			});
		    	    
		});
