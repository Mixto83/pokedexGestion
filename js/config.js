//https://killertilapia.blogspot.com/2011/03/using-jquery-to-read-external-xml-file.html

$(document).ready(function(){
    
    function loadfail(){
        alert("Error: No se pudo leer el archivo de configuracion");
    }

    function parser(doc){
        $(".filtroFondo").append($("<option></option>").val("None").html("Sin filtros"));
        $(doc).find("filtros").find("filtroFondo").each(function(){
           var valor=($(this).find('valor').text());
            var ide= ($(this).find('texto').text());
            $(".filtroFondo").append($("<option></option>").val(valor).html(ide));
        });

        $(".famFuente").append($("<option></option>").val("initial").html("Default"));
        $(doc).find("fuentes").find("fuente").each(function(){
            var valor=$(this).find("valor").text();
            var text=$(this).find("texto").text();
            $(".famFuente").append($("<option></option>").val(valor).html(text));
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

    $(".famFuente").change(function(){
        $(".fondo").css("font-family",this.value);
    });

});



