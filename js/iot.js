$(document).ready(function(){
/*	  
	$(".cuadrado").keypress(function(e, h){
		console.log("estoy presionando sobre el cuadrado");
	});	
	$(".circulo").keypress(function(e, h){
		console.log("estoy presionando sobre el circulo");
	});	
	$(".cuadrado").hover(function(){
		console.log("*******estoy presionando sobre el cuadrado");
	});	
	$(".circulo").hover(function(){
		console.log("*******estoy presionando sobre el circulo");
	});	
	
*/	
	var offset;
	var xPos;
	var yPos;
	var offsetBox;
	var xPosBox;
	var yPosBox;
	var elemento;
	$(".cuadrado").draggable({
		start: function(event, ui){
			  //console.log("CUAD: Se ha producido el evento start");
			  //console.log(event);
			  //console.log(ui);
//			  elemento = $(this).clone();
			  //console.log(elemento);
			  offset = $(this).offset();
			  xPos = offset.left;
			  yPos = offset.top;
			  //console.log(xPos + ", "+yPos);
			  offsetBox = $('#box').position();
			  xPosBox = offsetBox.left;
			  yPosBox = offsetBox.top;
			  //console.log(xPosBox + ", "+yPosBox);
			  
		},	
		stop: function(event, ui){
			  elemento = $(this).clone();
			  //console.log("CUAD: Se ha producido el evento stop");
			  offset = $(this).position();
			  xPos = offset.left;
			  yPos = offset.top;
			  console.log(xPos + ", "+yPos);
			  console.log(xPosBox + ", "+yPosBox);
			  if(xPos>xPosBox && yPos>yPosBox){
				(elemento).css('position', 'absolute');
				//(elemento).draggable('destroy');
				(elemento).css('position-left', xPos);
				(elemento).css('position-top', yPos);
				//(elemento).css('float', 'inherit');
				$('#box').append(elemento);
				console.log((elemento).attr('css'));
				//console.log($('#box').html());
			  }
		}	
	});
	
	$(".circulo").draggable({
		start: function(event, ui){
			  console.log("CIRC: Se ha producido el evento start");
		},	
		stop: function(event, ui){
			  console.log("CIRC: Se ha producido el evento stop");
		}	
	});
});