//https://killertilapia.blogspot.com/2011/03/using-jquery-to-read-external-xml-file.html
$(document).ready(function(){
    function loadfail(){
        alert("Error: No se pudo leer el archivo de configuracion");
    }

    function parser(doc){
        $(doc).find("tamFuente").each(function(){
            var tam=$(this).find("tamano").text();
            console.log(tam);
        });
    }
    $.ajax({
        url:"config.xml",
        dataType:"xml",
        success:parser,
        error:loadfail
    });
});