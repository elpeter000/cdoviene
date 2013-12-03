	$(function() {
	
		// SET: html, text y val asignan el valor a todos 
		$('a#consulta').html($.cookie("Consulta"));

		//Obtiene lineas
		$.get('http://clientes.bigbrand.com.ar/transporte/cdo.llega.v.4.beta/mobile/lineas.php', function(data) {
			  $('#lineas').html(data);
		});
	
		
		$('#lineas').change(function() {
			var id = $("#lineas").find(':selected').val();
				
			$('#paradas').hide();

			$("#calles").load('http://clientes.bigbrand.com.ar/transporte/cdo.llega.v.4.beta/mobile/consultar-calle.php?id='+id); 
				//$("#entrecalles").load('blank.php');			   	
		});
			  
		$('#calles').change(function() {
			var lineaId = $("#lineas").find(':selected').val();
			var calle = $("#calles").find(':selected').val();
			$('#paradas').hide();
			$("#entrecalles").load('http://clientes.bigbrand.com.ar/transporte/cdo.llega.v.4.beta/mobile/consultar-entrecalle.php?id='+lineaId+'&calle='+calle);				
		});
			  
		$('#entrecalles').change(function() {
			var lineaId = $("#lineas").find(':selected').val();
			var calle = $("#calles").find(':selected').val();
			var entrecalles = $("#entrecalles").find(':selected').val();
			$("#paradas").load('http://clientes.bigbrand.com.ar/transporte/cdo.llega.v.4.beta/mobile/consultar-parada.php?id='+lineaId+'&calle='+calle+'&entrecalle='+entrecalles); 
			$('#paradas').show('fast');
		});
			  
		$('#calcular').submit(function() {
			var parada = $("#parada").val();
			$.cookie("Consulta",parada);
			$('#calcular').hide();
			$('#calculando').show();
			// Enviamos el formulario usando AJAX
			$.ajax({
				type: 'GET',
				//url: $(this).attr('action'),
				url: 'http://clientes.bigbrand.com.ar/transporte/cdo.llega.v.4.beta/mobile/consultar.php',
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
		
		
		$('#consulta').click(function() {
		
			//alert($.cookie("Consulta"));
			
			$('#parada').val($.cookie("Consulta"));
			$('#calcular').submit();
		
		});
});
