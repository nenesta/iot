$(document).ready(function(){
	var offset;
	var xPos;
	var yPos;
	var offsetBox;
	var xPosBox;
	var yPosBox;
	var elemento;
	$(".cuadrado").draggable({
		start: function(event, ui){
			  offset = $(this).offset();
			  offsetBox = $('#box').position();
			  xPosBox = offsetBox.left;
			  yPosBox = offsetBox.top;
			  
		},	
		stop: function(event, ui){
			  elemento = $(this).clone();
			  offset = $(this).position();
			  xPos = offset.left;
			  yPos = offset.top;
			  if(xPos>xPosBox && yPos>yPosBox){
				(elemento).css('position', 'absolute');
				(elemento).css('background-color', '#ffff00');

				$('#box').append(elemento);
				console.log((elemento).attr('css'));
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