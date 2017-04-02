$(document).ready(function(){
	var offset;
	var xPos;
	var yPos;
	var xPosOld;
	var yPosOld;
	var offsetBox;
	var xPosBox;
	var yPosBox;
	var elemento;
        var contCuad=0;
        
//        $("#box").hover(function(){
//        		console.log("Estoy en la posicion "+ $(this).position().top + ' - '+$(this).position().left);
//        	});
//	$("#box").mouseenter(function(){
//    		console.log("El ratón está sobre el div negro");
//  	});
// 
//	$("#box").mouseleave(function(){
//    		console.log("El ratón ya no está sobre el div negro");
// 	});
        
	$(".cuadrado").draggable({
		start: function(event, ui){
			  offset = $(this).position();
			  xPosOld = offset.left;
			  yPosOld = offset.top;
			  offsetBox = $('#box').position();
			  xPosBox = offsetBox.left;
			  yPosBox = offsetBox.top;
			  
		},	
		stop: function(event, ui){
			  offset = $(this).position();
			  xPos = offset.left;
			  yPos = offset.top;
			  if(xPos>xPosBox && yPos>yPosBox){
        			elemento = $(this).clone().draggable({ containment: "parent" }).resizable();//.selectable();
				elemento.css('position', 'absolute');
				//elemento.css('background-color', '#ffff00');
				elemento.css('background-color', 'rgb('+255*Math.random()+', '+255*Math.random()+', '+255*Math.random()+')');
                                elemento.prop('id', 'cuad-'+contCuad++);
                                $(this).offset({ top: yPosOld, left: xPosOld });
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

function ordenaCuadrado(){
  var areas = [];  
  console.log($('#box .cuadrado').length);  
  $('#box .cuadrado').each(function(i, v){
      var posicion = $(v).offset();
      var width = $(v).css('width');
      var height = $(v).css('height');
      var tamanio = areaCuadrado(posicion, width, height);
      console.log (tamanio);
      areas.push(tamanio);
  });  
  console.log(areas);
};

//Math.abs(

function areaCuadrado(position, width, height){
   var right = Math.abs(position.left) + parseInt(width, 10);
   var bottom = Math.abs(position.top) + parseInt(height, 10);
   var largo = Math.abs(position.left - right);
   var ancho = Math.abs(position.top - bottom);
   return largo * ancho;
}