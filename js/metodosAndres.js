   $(document).ready(function(){


   $('#box').mouseover(function (e) {
        var id = e.target.id;
        console.log(id);
        var label1 = document.getElementById("lbl1")
        console.log(label1);
        //label1.innerHTML= id;
    })

});
