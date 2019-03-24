//https://killertilapia.blogspot.com/2011/03/using-jquery-to-read-external-xml-file.html

$(document).ready(function(){
    
    function loadfail(){
        alert("Error: No se pudo leer el archivo de configuracion");
    }

    function parser(doc){
        $(".filtroFondo").append($("<option></option>").val("None").html("Sin filtros"));
        $(doc).find("filtroFondo").each(function(){
           var valor=($(this).find('valor').text());
            var ide= ($(this).find('texto').text());
            $(".filtroFondo").append($("<option></option>").val(valor).html(ide));
        });

    }
    $.ajax({
        url:"js/config.xml",
        dataType:"xml",
        success:parser,
        error:loadfail
    });

    $(".filtroFondo").change(function(){
        $(".fondo").css("filter",this.value);
    });
});



