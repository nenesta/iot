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
//				console.log((elemento).attr('css'));
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

function areaCuadrado(cuad){
   var position = cuad.offset();
   var width = cuad.css('width');
   var height = cuad.css('height');
   var right = Math.abs(position.left) + parseInt(width, 10);
   var bottom = Math.abs(position.top) + parseInt(height, 10);
   var largo = Math.abs(position.left - right);
   var ancho = Math.abs(position.top - bottom);
   return largo * ancho;
}

function comparaCuadrado(){
    var c1 = $('#cuad-0');
    var c2 = $('#cuad-1');
    var area1 = areaCuadrado(c1);
    console.log('area1');
    console.log(area1);
    var area2 = areaCuadrado(c2);
    console.log('area2');
    console.log(area2);
    console.log('cuadradoInscrito(c1, c2)');
//    console.log(c1.html());
//    console.log(c2.html());
    console.log(cuadradoInscrito(c1, c2));
    if(area1>area2){
        if(cuadradoInscrito(c1, c2)){
            console.log('c2 esta dentro de c1');
            var c2position = c2.offset();
            var c2top = c2position.top;
            var c2left = c2position.left;
            c1.append(c2);
            c2.offset({ top: c2top, left: c2left });
            c2.draggable({ containment: "parent" }).resizable();
        }
    }else{
        if(cuadradoInscrito(c2, c1)){
            console.log('c1 esta dentro de c2');
            var c1position = c1.offset();
            var c1top = c1position.top;
            var c1left = c1position.left;
            c2.append(c1);
            c1.offset({ top: c1top, left: c1left });
            c1.draggable({ containment: "parent" }).resizable();
        }
    }
//    $('#box').append(elemento);
}

function cuadradoInscrito(cuad1, cuad2){
    var cuad1Position = cuad1.offset();
    var width1 = cuad1.css('width');
    var height1 = cuad1.css('height');
    var right1 = Math.abs(cuad1Position.left) + parseInt(width1, 10);
    var bottom1 = Math.abs(cuad1Position.top) + parseInt(height1, 10);
    var cuad2Position = cuad2.offset();
    var width2 = cuad2.css('width');
    var height2 = cuad2.css('height');
    var right2 = Math.abs(cuad2Position.left) + parseInt(width2, 10);
    var bottom2 = Math.abs(cuad2Position.top) + parseInt(height2, 10);
//    console.log(cuad1Position.left);
//    console.log(cuad2Position.left);
//    console.log(cuad1Position.left<cuad2Position.left);
//    console.log(cuad1Position.top);
//    console.log(cuad2Position.top);
//    console.log(cuad1Position.top<cuad2Position.top);
//    console.log(right1);
//    console.log(right2);
//    console.log(right1>right2);
//    console.log(bottom1);
//    console.log(bottom2);
//    console.log(bottom1>bottom2);
    if (cuad1Position.left<cuad2Position.left && cuad1Position.top<cuad2Position.top && right1>right2 && bottom1>bottom2){
        return true;
    }else{
        return false;
    }
}