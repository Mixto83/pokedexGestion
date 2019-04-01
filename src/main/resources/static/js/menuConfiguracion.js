//https://killertilapia.blogspot.com/2011/03/using-jquery-to-read-external-xml-file.html

$(document).ready(function(){ //cuando esta listo el documento
    
    function loadfail(){ //si hay un fallo
        alert("Error: No se pudo leer el archivo de configuracion");
    }

    function parser(doc){ //traduce el documento xml a html y luego crea la lista de opciones
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

    $.ajax({ //coge el xml de configuracion
        url:"js/config.xml",
        dataType:"xml",
        success:parser,
        error:loadfail
    });

    $(".filtroFondo").change(function(){ //funcion que cambia los colores del fondo
        $(".fondo").css("filter",this.value);
    });

    $(".famFuente").change(function(){//cambia el tipo de fuente
        $(".fondo").css("font-family",this.value);
    });
});

function boton_configuracion() { //Muestra la pantalla de configuracion
    hideList();
    hideFilters();
    showConfiguration();
}

function showConfiguration() { //Para mostrar la configuracion extra con el XML
    $(".configuracion").fadeIn("slow");
    $(".buttonBack").fadeIn("slow");
    configDisplayed = true;
}

function hideConfiguration() { //Para ocultar la configuracion extra con el XML
    $(".configuracion").fadeOut("fast");
    $(".buttonBack").fadeOut("fast");
}