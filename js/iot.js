$(document).ready(function(){
	var offset;
	var xPos;
	var yPos;
	var xPosOld;
	var yPosOld;
	var offsetBox;
	var xPosBox;
	var yPosBox;
        var widthBox;
        var heightBox;
	var elemento;
        var contCuad=0;
        var contCirc=0;
        var metro;
/*
        $('#pbDimension').addEventListener('click', function (e) {
            var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
                y = e.pageY - this.offsetTop,  // or e.offsetY
                clickedValue = x * this.max / this.offsetWidth;

            console.log(x, y, clickedValue);
        });    
*/        
        $('#pbDimension').click(function (e) {
//            var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
            var x = e.pageX - $(this).offset().left, // or e.offsetX (less support, though)
                y = e.pageY - this.offsetTop,  // or e.offsetY
                clickedValue = parseInt((x / this.offsetWidth)*100);

//            console.log('e.pageX '+e.pageX);
//            console.log('this.offsetLeft '+this.offsetLeft);
//            console.log('this.offset '+$(this).offset());
//            console.log('this.offset.left '+$(this).offset().left);
//            console.log('e.pageY '+e.pageY);
//            console.log('this.offsetTop '+this.offsetTop);
//            console.log('this.offsetWidth '+this.offsetWidth);
            
            console.log(x, y, clickedValue);
            $(':first-child',this).css('width', clickedValue+'%');
        });    

        $("#iconBar")
//            .css('overflow', 'hidden')
            .dialog({
                     width: "120px",
                     position: { 
                                 my: "right top",  at: "right top+10",  of: "#box"
                               }
                    });
                    
        $("#props").dialog({
                             width: "340px",
                             position: { 
                                         my: "left top",  at: "left top+10",  of: "#box"
                                       }
                           });
        
        $("div.cuadrado").hover(function(){
        		////console.log("Estoy en el cuadrado "+ $(this).prop("id"));
        		////console.log("Estoy en la posicion "+ $(this).position().top + ' - '+$(this).position().left);
        	});
                
	$(".cuadrado").draggable({
		start: function(event, ui){
			  offset = $(this).offset();
			  xPosOld = offset.left;
			  yPosOld = offset.top;
			  offsetBox = $('#box').offset();
			  xPosBox = offsetBox.left;
			  yPosBox = offsetBox.top;
                          widthBox = $('#box').css('width');
                          heightBox = $('#box').css('height');
		},	
		stop: function(event, ui){
			  offset = $(this).offset();
			  xPos = offset.left;
			  yPos = offset.top;
                          console.log('xPos '+xPos);
                          console.log('yPos '+yPos);
			  if(xPos>=xPosBox && yPos>=yPosBox && xPos<=parseInt(parseInt(xPosBox)+parseInt(widthBox)) && yPos<=parseInt(parseInt(yPosBox)+parseInt(heightBox))){
        			elemento = $(this).clone().draggable({ containment: "parent",
                                          stop: function(event, ui){
                                                comparaCuadrados();
                                                var lado = parseInt($(this).css('width')) / parseInt($('#pbDimension :first-child').css('width'));
                                                var ancho = parseInt($(this).css('height')) / parseInt($('#pbDimension :first-child').css('width'));
                                                $('#txtDim').val(parseFloat(lado).toFixed(2)+' x '+parseFloat(ancho).toFixed(2)+ ' [m]');
                                                $('#txtName').val($(this).prop('id'));
                                             } }).resizable({
                                             stop:
                                                function(event, ui){
                                                    comparaCuadrados();
                                                    var lado = parseInt($(this).css('width')) / parseInt($('#pbDimension :first-child').css('width'));
                                                    var ancho = parseInt($(this).css('height')) / parseInt($('#pbDimension :first-child').css('width'));
                                                    $('#txtDim').val(parseFloat(lado).toFixed(2)+' x '+parseFloat(ancho).toFixed(2)+ ' [m]');
                                                    $('#txtName').val($(this).prop('id'));
                                                }
                                             }).dblclick(function(e){ 
                                                                            e.stopPropagation();
                                                                            $(this).remove();
                                                                           });
				elemento.css('position', 'absolute');
				elemento.css('width', '100px');
				elemento.css('height', '100px');
				elemento.css('-webkit-box-shadow', '10px 10px 6px -6px #777');
				elemento.css('-moz-box-shadow', '10px 10px 6px -6px #777');
				elemento.css('box-shadow', '10px 10px 6px -6px #777');
//				elemento.css('background-color', 'rgb('+parseInt(255*Math.random())+', '+parseInt(255*Math.random())+', '+parseInt(255*Math.random())+')');
				elemento.css('background-color', '#d0d0d0');
				elemento.css('border-style', 'solid');
				elemento.css('border-width', '1px');
                                elemento.prop('id', 'cuad-'+contCuad++);
                                elemento.prop('class', 'cuadrado');
                                $(this).offset({ top: yPosOld, left: xPosOld });
				$('#box').append(elemento);
                                elemento.offset({ top: yPos, left: xPos })
/* 
miDibujo.shadowColor="black";
miDibujo.shadowOffsetX=10;
miDibujo.shadowOffsetY=20;
				elemento.css('shadowColor', 'black');
				elemento.css('shadowOffsetX', '10');
				elemento.css('shadowOffsetY', '10');

                -webkit-box-shadow: 0 10px 6px -6px #777;
                -moz-box-shadow: 0 10px 6px -6px #777;
                box-shadow: 0 10px 6px -6px #777;
*/                                
			  }else{
                                $(this).offset({ top: yPosOld, left: xPosOld });
                          }
		}	
	});
	
	$(".circulo").draggable({
		start: function(event, ui){
			  offset = $(this).offset();
			  xPosOld = offset.left;
			  yPosOld = offset.top;
			  offsetBox = $('#box').offset();
			  xPosBox = offsetBox.left;
			  yPosBox = offsetBox.top;
                          widthBox = $('#box').css('width');
                          heightBox = $('#box').css('height');
			  
		},	
		stop: function(event, ui){
			  offset = $(this).offset();
			  xPos = offset.left;
			  yPos = offset.top;
			  if(xPos>=xPosBox && yPos>=yPosBox && xPos<=parseInt(parseInt(xPosBox)+parseInt(widthBox)) && yPos<=parseInt(parseInt(yPosBox)+parseInt(heightBox))){
        			elemento = $(this).clone().draggable({ containment: "parent",
                                          stop: function(event, ui){
                                              comparaCuadrados();
                                             } }).dblclick(function(e){ 
                                                                            e.stopPropagation();
                                                                            $(this).remove();
                                                                           });
				elemento.css('position', 'absolute');
//                                elemento.css('color', 'rgb('+parseInt(255*Math.random())+', '+parseInt(255*Math.random())+', '+parseInt(255*Math.random())+')');
                                elemento.css('color', 'blue');
                                elemento.prop('id', 'circ-'+contCirc++);
                                elemento.prop('class', 'fa fa-bluetooth circulo');
                                elemento.css('font-size', '36px');
                                $(this).offset({ top: yPosOld, left: xPosOld });
				$('#box').append(elemento);
                                elemento.offset({ top: yPos, left: xPos })
			  }else{
                                $(this).offset({ top: yPosOld, left: xPosOld });
                          }
		}	
	});
        
    $('#chkBeacon').change(function(){
       var valorCheck = $(this).prop('checked');
       console.log('check '+ $(this).prop('checked'));
           $('#box .circulo').each(function(index, value){
//                    console.log(index);
//                    console.log(value);
                    var clase = $(value).prop('class');
                    console.log(clase);
                    if(valorCheck){
                        console.log('Se activan beacons');
                        clase = clase.replace('circulo', 'circulo radar');
                    }else{
                        console.log('Se desactivan beacons');
                        clase = clase.replace('circulo radar', 'circulo');
                    }; 
                    console.log(clase);
                    $(value).prop('class', clase);
           });
       
    });    
});

function ordenaCuadrado(){
  var areas = [];  
  $('#box .cuadrado').each(function(i, v){
      var posicion = $(v).offset();
      var width = $(v).css('width');
      var height = $(v).css('height');
      var tamanio = areaCuadrado(posicion, width, height);
      areas.push(tamanio);
  });  
};

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
    var area2 = areaCuadrado(c2);
    if(area1>area2){
        if(cuadradoInscrito(c1, c2)){
            var c2position = c2.offset();
            var c2top = c2position.top;
            var c2left = c2position.left;
            c1.append(c2);
            c2.offset({ top: c2top, left: c2left });
            c2.draggable({ containment: "parent" }).resizable();
        }
    }else{
        if(cuadradoInscrito(c2, c1)){
            var c1position = c1.offset();
            var c1top = c1position.top;
            var c1left = c1position.left;
            c2.append(c1);
            c1.offset({ top: c1top, left: c1left });
            c1.draggable({ containment: "parent" }).resizable();
        }
    }
}

function sortResults(json, prop, asc) {
    json = json.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}
/** Se agrega comentario ***/
function comparaCuadrados(){
    var regs = [];
    $('#box .cuadrado, #box .circulo').each(function(){
//    $('#box .cuadrado').each(function(){
        var registro = {};
        registro["id"]=$(this).prop('id');
        registro["area"]=areaCuadrado($(this));
        regs.push(registro);
    });
    sortResults(regs, 'area', false);
    //console.log('*********** BURBUJA *************');
    if(regs.length>1){
        $.each(regs, function(i, item) {
           if(i<regs.length-1){
               $.each(regs, function(j, jtem) {
                   if(j>i){
                        var c1 = $('#'+item.id);
                        var c2 = $('#'+jtem.id);
                        if(cuadradoInscrito(c1, c2)){
                            var c2position = c2.offset();
                            var c2top = c2position.top;
                            var c2left = c2position.left;
                            c1.append(c2);
                            c2.offset({ top: c2top, left: c2left });
                            if(c2.prop('class')=='cuadrado'){
                                c2.draggable({containment: "parent",
                                              stop: function(event, ui){
                                                    comparaCuadrados();
                                                    var lado = parseInt($(this).css('width')) / parseInt($('#pbDimension :first-child').css('width'));
                                                    var ancho = parseInt($(this).css('height')) / parseInt($('#pbDimension :first-child').css('width'));
                                                    $('#txtDim').val(parseFloat(lado).toFixed(2)+' x '+parseFloat(ancho).toFixed(2)+ ' [m]');
                                                    $('#txtName').val($(this).prop('id'));
                                                 }                                
                                             }).resizable({
                                                stop:
                                                   function(event, ui){
                                                       comparaCuadrados();
                                                       var lado = parseInt($(this).css('width')) / parseInt($('#pbDimension :first-child').css('width'));
                                                       var ancho = parseInt($(this).css('height')) / parseInt($('#pbDimension :first-child').css('width'));
                                                       $('#txtDim').val(parseFloat(lado).toFixed(2)+' x '+parseFloat(ancho).toFixed(2)+ ' [m]');
                                                       $('#txtName').val($(this).prop('id'));
                                                   }
                                             }).dblclick(function(e){ 
                                                                                e.stopPropagation();
                                                                                $(this).remove();
                                                                               });
                            }else{
                                c2.draggable({containment: "parent",
                                              stop: function(event, ui){
                                                    comparaCuadrados();
                                                 }                                
                                             }).dblclick(function(e){ 
                                                                                e.stopPropagation();
                                                                                $(this).remove();
                                                                               });
                            };
                        }
                   }
               });
           } 
        });
    }
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
    if (cuad1Position.left<cuad2Position.left && cuad1Position.top<cuad2Position.top && right1>right2 && bottom1>bottom2){
        return true;
    }else{
        return false;
    }
}