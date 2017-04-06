   $(document).ready(function(){


   $('#box').click(function (e) {
        var id = e.target.id;
        console.log(id);
        var textContenedor = document.getElementById("Idcontenedor")
        console.log(textContenedor);
        textContenedor.value= id;
    })

});
