function init() { // Inicia el menú de la pokedex
    if (pokeOpen == false) {
        pokeOpen = true;
        currentPokemon = pokeArray[0];//Controla el Pokemon que se ve en el visor de imagenes
        firstPokemon = pokeArray[0];//Controla cual es el primer Pokemon que se ve en la lista de 7
        var pokedexOpen = true
        $('.mitad1').animate({
            "left": "-950px"
        }, "slow");
        $('.mitad2').animate({
            "left": "+950px"
        }, "slow");
        $('.fondo').fadeIn("slow");
        $('#imgListado.p1').fadeTo(10, 0.5);
        $('#imgListado.p7').fadeTo(10, 0.5);
        $('.buttonClose').fadeIn("slow");
        $('.barraDivisoria').fadeIn("slow");
        hideConfiguration();
        resetFilters();
        showFilters();
        showList();
        updateList();
        showBoxesFromList();
    // $('.p1, .p2, .p3, .p4, .p5, .p6, .p7').bind("click", '#imgLis   tado',eventosListaPokemon); // Genera y permite controlar las imagenes en un solo método
    }
}
///////////////////////////////////////////////////////////////////////////gestionListaPokemon
//Función para obtener el pokemon según su posición en la lista
function getEnum(clasePok) {
    var numP = -1;
    switch (clasePok) {

        case "p1":
            numP = 0;
            break;
        case "p2":
            numP = 1;
            break;
        case "p3":
            numP = 2;
            break;
        case "p4":
            numP = 3;
            break;
        case "p5":
            numP = 4;
            break;
        case "p6":
            numP = 5;
            break;
        case "p7":
            numP = 6;
            break;

    }
    return numP;
}

$(".buttonDown").click(function () { //Baja la lista
    if (firstPokemon.arrayPos + 7 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos+1];
    }
    updateList();
})

$(".buttonUp").click(function () { //Sube la lista
    if (firstPokemon.arrayPos !== 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 1];
    }

    updateList();
})

$(".buttonRight").click(function () { //Retrocede en la lista en grupo
    if (firstPokemon.arrayPos + 13 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 7];
    } else if (firstPokemon.arrayPos + 12 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 6];
    } else if (firstPokemon.arrayPos + 11 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 5];
    } else if (firstPokemon.arrayPos + 10 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 4];
    } else if (firstPokemon.arrayPos + 9 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 3];
    } else if (firstPokemon.arrayPos + 8 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 2];
    } else if (firstPokemon.arrayPos + 7 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos + 1];
    }

    updateList();
})

$(".buttonLeft").click(function () { //Avanza en la lista en grupo
    if (firstPokemon.arrayPos - 7 >= 0) {
    firstPokemon = pokeArray[firstPokemon.arrayPos - 7];
    } else if (firstPokemon.arrayPos - 6 >= 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 6];
    } else if (firstPokemon.arrayPos - 5 >= 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 5];
    } else if (firstPokemon.arrayPos - 4 >= 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 4];
    } else if (firstPokemon.arrayPos - 3 >= 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 3];
    } else if (firstPokemon.arrayPos - 2 >= 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 2];
    } else if (firstPokemon.arrayPos - 1 >= 0){
        firstPokemon = pokeArray[firstPokemon.arrayPos - 1];
    }
    
    updateList();
})

$(".buttonFirst").click(function () {
    if (pokeArray.length > 0){
        firstPokemon = pokeArray[0];
    }
    updateList();
})

$(".buttonLast").click(function () {
    if (pokeArray.length > 6){
        firstPokemon = pokeArray[pokeArray.length - 7];
    } else if (pokeArray.length > 5){
        firstPokemon = pokeArray[pokeArray.length - 6];
    } else if (pokeArray.length > 4){
        firstPokemon = pokeArray[pokeArray.length - 5];
    } else if (pokeArray.length > 3){
        firstPokemon = pokeArray[pokeArray.length - 4];
    } else if (pokeArray.length > 2){
        firstPokemon = pokeArray[pokeArray.length - 3];
    } else if (pokeArray.length > 1){
        firstPokemon = pokeArray[pokeArray.length - 2];
    } else if (pokeArray.length > 0){
        firstPokemon = pokeArray[pokeArray.length - 1];
    }
    updateList();
})



$("body").on("click", ".pokedexFondo .fondo #imgListado", function (event) { //Este permite que todo lo que se genere con #imgListado tenga este metodo directamente, 
    eventosListaPokemon(event);                                              //sin tener que bindearlo dinamicamente
});

function eventosListaPokemon(event) { //Función que permite mostrar el pokemon
    if (firstPokemon.arrayPos + getEnum(event.target.className) < pokeArray.length) {
        hideList();
        hideFilters();
        currentPokemon = pokeArray[firstPokemon.arrayPos + getEnum(event.target.className)];
        showPokemonDetail();
        showInfo();
        pokeDisplayed = true;
    }
}

function hideList() { //Oculta la lista
    $('#imgListado.p2').fadeOut("fast");
    $('#imgListado.p3').fadeOut("fast");
    $('#imgListado.p4').fadeOut("fast");
    $('#imgListado.p5').fadeOut("fast");
    $('#imgListado.p6').fadeOut("fast");
    $('#imgListado.p7').fadeOut("fast");
    $('#imgListado.p1').fadeOut("fast");

    $('.txtListado').fadeOut("fast");
    $('.txtListado2').fadeOut("fast");
    $('.txtListado3').fadeOut("fast");
    $('.txtListado4').fadeOut("fast");
    $('.txtListado5').fadeOut("fast");
    $('.txtListado6').fadeOut("fast");
    $('.txtListado7').fadeOut("fast");

    $('.buttonDown').fadeOut("slow");
    $('.buttonUp').fadeOut("slow");
    $('.buttonRight').fadeOut("slow");
    $('.buttonLeft').fadeOut("slow");
    $('.buttonFirst').fadeOut("slow");
    $('.buttonLast').fadeOut("slow");
}

function showList() { //Muestra la lista
    if (pokeArray.length > 0) {
        $('#imgListado.p1').fadeIn("slow");
    }
    if (pokeArray.length > 1) {
        $('#imgListado.p2').fadeIn("slow");
    }
    if (pokeArray.length > 2) {
        $('#imgListado.p3').fadeIn("slow");
    }
    if (pokeArray.length > 3) {
        $('#imgListado.p4').fadeIn("slow");
    }
    if (pokeArray.length > 4) {
        $('#imgListado.p5').fadeIn("slow");
    }
    if (pokeArray.length > 5) {
        $('#imgListado.p6').fadeIn("slow");
    }
    if (pokeArray.length > 6) {
        $('#imgListado.p7').fadeIn("slow");
    }

    $('.txtListado').fadeIn("slow");
    $('.txtListado2').fadeIn("slow");
    $('.txtListado3').fadeIn("slow");
    $('.txtListado4').fadeIn("slow");
    $('.txtListado5').fadeIn("slow");
    $('.txtListado6').fadeIn("slow");
    $('.txtListado7').fadeIn("slow");

    $('.buttonDown').fadeIn("slow");
    $('.buttonUp').fadeIn("slow");
    $('.buttonRight').fadeIn("slow");
    $('.buttonLeft').fadeIn("slow");
    $('.buttonFirst').fadeIn("slow");
    $('.buttonLast').fadeIn("slow");

    showBoxesFromList();
}

function updateList(){ //Actualiza los nombres de las cajas
    if (pokeArray.length >= 1){
        $("#listaPk1").html(pokeArray[firstPokemon.arrayPos].id + " " + pokeArray[firstPokemon.arrayPos].name);
    } else {
        $("#listaPk1").html("");
    }

    if (pokeArray.length >= 2){
        $("#listaPk2").html(pokeArray[firstPokemon.arrayPos+1].id + " " + pokeArray[firstPokemon.arrayPos+1].name);
    } else {
        $("#listaPk2").html("");
    }

    if (pokeArray.length >= 3){
        $("#listaPk3").html(pokeArray[firstPokemon.arrayPos+2].id + " " + pokeArray[firstPokemon.arrayPos+2].name);
    } else {
        $("#listaPk3").html("");
    }

    if (pokeArray.length >= 4){
        $("#listaPk4").html(pokeArray[firstPokemon.arrayPos+3].id + " " + pokeArray[firstPokemon.arrayPos+3].name);
    } else {
        $("#listaPk4").html("");
    }

    if (pokeArray.length >= 5){
        $("#listaPk5").html(pokeArray[firstPokemon.arrayPos+4].id + " " + pokeArray[firstPokemon.arrayPos+4].name);
    } else {
        $("#listaPk5").html("");
    }

    if (pokeArray.length >= 6){
        $("#listaPk6").html(pokeArray[firstPokemon.arrayPos+5].id + " " + pokeArray[firstPokemon.arrayPos+5].name);
    } else {
        $("#listaPk6").html("");
    }

    if (pokeArray.length >= 7){
        $("#listaPk7").html(pokeArray[firstPokemon.arrayPos+6].id + " " + pokeArray[firstPokemon.arrayPos+6].name);
    } else {
        $("#listaPk7").html("");
    } 
}

function showBoxesFromList(){ //Cajas con el nombre pokemon
    if (pokeArray.length < 1){
        $('#imgListado.p1').fadeOut("slow");
    }
    if (pokeArray.length < 2){
        $('#imgListado.p2').fadeOut("slow");
    }
    if (pokeArray.length < 3){
        $('#imgListado.p3').fadeOut("slow");
    }
    if (pokeArray.length < 4){
        $('#imgListado.p4').fadeOut("slow");
    }
    if (pokeArray.length < 5){
        $('#imgListado.p5').fadeOut("slow");
    }
    if (pokeArray.length < 6){
        $('#imgListado.p6').fadeOut("slow");
    }
    if (pokeArray.length < 7){
        $('#imgListado.p7').fadeOut("slow");
    }

    if (pokeArray.length > 0){
        $('#imgListado.p1').fadeIn("slow");
    }
    if (pokeArray.length > 1){
        $('#imgListado.p2').fadeIn("slow");
    }
    if (pokeArray.length > 2){
        $('#imgListado.p3').fadeIn("slow");
    }
    if (pokeArray.length > 3){
        $('#imgListado.p4').fadeIn("slow");
    }
    if (pokeArray.length > 4){
        $('#imgListado.p5').fadeIn("slow");
    }
    if (pokeArray.length > 5){
        $('#imgListado.p6').fadeIn("slow");
    }
    if (pokeArray.length > 6){
        $('#imgListado.p7').fadeIn("slow");
    }
}
///////////////////////////////////////////////////////////////////////////botonesLadoDerecho


//Guarda en pokeArray el array que queramos filtrar. Guarda pokeArray en un backup para restaurarlo luego
function swapArrays(origin) {
    backupArray = pokeArray;
    pokeArray = origin;
    firstPokemon = pokeArray[0];
    updatePokemonIndex();
}

//Actualiza las posiciones en el array de los Pokemon
function updatePokemonIndex() {
    for (var i = 0; i < pokeArray.length; i++) {
        pokeArray[i].arrayPos = i;
    }
}

//Llama a la funcion de cambiado de tipo cuando cambia el valor de cualquiera de los dropdown
$('.tipo1Search').change(function () {
    getTypesSearch();
})

$('.tipo2Search').change(function () {
    getTypesSearch();
})

function getTypesSearch() {
    type1Value = $('.tipo1Search').val();
    type2Value = $('.tipo2Search').val();
    if (type2Value === type1Value) {
        $('.tipo2Search').val("");
        type2Value = $('.tipo2Search').val();
    }
    peticionAServidor();
}

//Llama a la funcion de reordenar la Pokedex al pulsar en uno de los botones excluyentes.
$('.ordenDesc').change(function () {
    ordenAscValue = false;
    peticionAServidor();
    
})

$('.ordenAsc').change(function () {
    ordenAscValue = true;
    peticionAServidor();
})

//Llama a la funcion de filtrar generacion cuando se cambia el valor del dropdown.
$('.genDisplay').change(function () {
    genValue = parseInt($('.genDisplay').val());
    peticionAServidor();
})

//Cuando se marca o desmarca la caja de legendarios, llama a la funcion de filtrar legendarios
$('.checkBoxLegendaries').change(function () {
    legendaryBool = $('.checkBoxLegendaries').prop('checked');
    peticionAServidor();
})

//Cuando cambia la barra de busqueda de nombres (es decir, cuando se escribe y se pulsa enter) llama a la funcion de buscar por nombre
$('.nombreSearch').change(function () {
    nameValue = $('.nombreSearch').val();
    peticionAServidor();
})

//Cuando cambia la barra de busqueda de ID llama a la funcion de buscar por IDs
$('.idSearch').change(function () {
    idValue = parseInt($('.idSearch').val());
    peticionAServidor();
})

///////////////////////////////////////////////////////////////////////////anadirPokemon
$(".buttonEngadir").click(function () { //boton anadir pokemon
    //Prueba con formulario 
    hideConfiguration();
    engadirPokemon();
    if (pokeDisplayed){
        hidePokemonDetail();
    }
});
///////////////////////////////////////////////////////////////////////////resetearFiltros
$(".buttonReseteo").click(function(){ //boton resetear filtros
    resetFilters();
})

function resetFilters(){ //Reinicia filtros de busqueda
    $('.checkBoxLegendaries').prop('checked', false);
    $('.tipo1Search').val("");
    $('.tipo2Search').val("");
    $('.genDisplay').val(0);
    $('.nombreSearch').val('');
    $('.idSearch').val(0);
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    legendaryBool = false;
    type1Value = "";
    type2Value = "";
    genValue = 0;
    idValue = 0;
    nameValue = "";
    backupDone = false;
    ordenAscValue = true;
    peticionAServidor();
    updateList();
    showList();
}

function showFilters(){ //Muestra el boton resetear filtros
    $('.filtros').fadeIn("slow");
    $('.buttonEngadir').fadeIn("slow");
    $('.buttonReseteo').fadeIn("slow");
    $('.buttonConfig').fadeIn("slow");
}

function hideFilters(){ //Oculta el boton resetear filtros
    $('.filtros').fadeOut("slow");
    $('.buttonEngadir').fadeOut("slow");
    $('.buttonReseteo').fadeOut("slow");
    $('.buttonConfig').fadeOut("slow");
}
///////////////////////////////////////////////////////////////////////////botonConfiguracion
$(".buttonConfig").click(function () { //boton de configuracion
    hideFormEngadir();
    boton_configuracion();
});