/*var legendariesFilter = false;
var genFilter = false;
var typeFilter = false;
var nameFilter = false;
var idFilter = false;
*/
var pokeDisplayed = false;
var pokeOpen = false;
var engadirDisplayed = false;
var configDisplayed = false;

var generalFilter = false;

var legendaryBool = false;
var type1Value = "";
var type2Value = "";
var genValue = 0;
var idValue = 0;
var nameValue = "";
var backupDone = false;

var youNeedSlice = false;
var queryString;
var pokePrueba;

var pokeSrc = "assets/pokemon_images/";
//Variables para probar que funciona la lista
var poke1 = new Pokemon(1, 'Bulbasaur', 'grass', 'poison', 1, false, 1);
var poke2 = new Pokemon(2, 'Ivysaur', 'grass', 'poison', 1, false, 1);
var poke3 = new Pokemon(3, 'Venusaur', 'grass', 'poison', 1, false, 2);
var poke4 = new Pokemon(4, 'Charmander', 'fire', "", 1, false, 1);
var poke5 = new Pokemon(5, 'Charmeleon', 'fire', "", 1, false, 1);
var poke6 = new Pokemon(6, 'Charizard', 'fire', 'flying', 1, false, 3);
var poke7 = new Pokemon(7, 'Squirtle', 'water', "", 1, false, 1);
var poke8 = new Pokemon(8, 'Wartortle', 'water', "", 1, false, 1);
var poke9 = new Pokemon(9, 'Blastoise', 'water', "", 1, false, 2);
var poke10 = new Pokemon(10, 'Caterpie', 'bug', "", 1, false, 1);
var poke11 = new Pokemon(11, 'Metapod', 'bug', "", 1, false, 1);
var poke12 = new Pokemon(12, 'Butterfree', 'bug', 'flying', 1, false, 1);
var poke13 = new Pokemon(13, 'Weedle', 'bug', 'poison', 1, false, 1);
var poke14 = new Pokemon(14, 'Kakuna', 'bug', 'poison', 1, false, 1);
var poke15 = new Pokemon(15, 'Beedrill', 'bug', 'poison', 1, false, 2);
var poke16 = new Pokemon(16, 'Pidgey', 'normal', 'flying', 1, false, 1);
var poke17 = new Pokemon(17, 'Pidgeotto', 'normal', 'flying', 1, false, 1);
var poke18 = new Pokemon(18, 'Pidgeot', 'normal', 'flying', 1, false, 2);
var poke19 = new Pokemon(19, 'Rattata', 'normal', "", 1, false, 1);
var poke20 = new Pokemon(20, 'Raticate', 'normal', "", 1, false, 1);
var poke21 = new Pokemon(21, 'Spearow', 'normal', 'flying', 1, false, 1);
var poke22 = new Pokemon(22, 'Fearow', 'normal', 'flying', 1, false, 1);
var poke23 = new Pokemon(23, 'Ekans', 'poison', "", 1, false, 1);
var poke24 = new Pokemon(24, 'Arbok', 'poison', "", 1, false, 1);
var poke25 = new Pokemon(25, 'Pikachu', 'electric', "", 1, false, 5);
var poke26 = new Pokemon(150, 'Mewtwo', 'psychic', "", 1, true, 3);
var poke27 = new Pokemon(254, 'Sceptyle', 'grass', "", 3, false, 2);
var poke28 = new Pokemon(386, 'Deoxys', 'psychic', "", 3, true, 4);
var poke29 = new Pokemon(793, 'Nihilego', 'psychic', "", 7, true, 1);
//Array para probar la lista
pokeArray = [poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8, poke9, poke10, poke11, poke12, 
    poke13, poke14, poke15, poke16, poke17, poke18, poke19, poke20, poke21, poke22, poke23, poke24, poke25, poke26, poke27, poke28, poke29];

//Se asigna la imagen del pokemon
for (var i =0; i < pokeArray.length; i++) {
    pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
    pokeArray[i].arrayPos = i;
}

// Creamos un boton para diferenciar los pokemon con diferentes formas (Megas ej)
$(".buttonChangeForm").click(function(){
    if (currentPokemon.nForms > 1){
        formCount++;
        if (formCount <= currentPokemon.nForms){
            currentPokemon.image = "assets/pokemon_images/" + currentPokemon.id + "-" + formCount + ".png";
        } else {
            formCount = 1;
            currentPokemon.image = "assets/pokemon_images/" + currentPokemon.id + ".png";
        }
        pokeImg.src = currentPokemon.image;
    }
})

// Function para eliminar el pokemon que se muestra en pantalla
$('.buttonDelete').click(function(){

    var deletePos = currentPokemon.arrayPos;

    //Solo permite eliminar Pokemon en el visor
    if(pokeDisplayed){
        removeQuery(currentPokemon.name)
        pokeArray.splice(deletePos,1);
    }
    
    //Reasigna las posiciones en el array de los Pokemon
    updatePokemonIndex();


    //Si el pokemon borrado es el ultimo, coge el primero, si no, coge el siguiente
    if (deletePos === pokeArray.length){
        currentPokemon = pokeArray[0];
    } else {
        currentPokemon = pokeArray[deletePos];
    }
    
    //Si la lista esta vacia, ponemos a null first y current Poke
    //En caso de borrar uno de los 7 ultimos Pokemon o de borrar el primero, actualiza correctamente la lista
    if (pokeArray.length === 0){
        firstPokemon = null;
        currentPokemon = null;
    } else if(deletePos >= pokeArray.length - 6 && pokeArray.length >= 7){
        firstPokemon = pokeArray[pokeArray.length - 7];
    } else if (firstPokemon.arrayPos === deletePos){
        firstPokemon = currentPokemon;
    }

    //Refleja visualmente los cambios
    if (currentPokemon !== null){
        showInfo();
    } else {
        pokeImg.src = null;
        $("#textoPk").html("");
    }   
    updateList();

});

// Función para ver el siguiente pokemon en el visor
$(".buttonLeftViewer").click(function () {
    formCount = 1;
    if (currentPokemon.arrayPos == 0) {
        currentPokemon = pokeArray[pokeArray.length - 1];
    } else {
        currentPokemon = pokeArray[currentPokemon.arrayPos - 1];
    }
    showInfo();
});

//Función para ver el anterior pokemon en el visor
$(".buttonRightViewer").click(function () {
    formCount = 1;
    if (currentPokemon.arrayPos == pokeArray.length - 1) {
        currentPokemon = pokeArray[0];
    } else {
        currentPokemon = pokeArray[currentPokemon.arrayPos + 1];
    }
    showInfo();
});

//Función para mostrar la información del Pokémon en la ventana
function showInfo(){
    pokeImg.src = currentPokemon.image;
    if (currentPokemon.type2 !== ""){
        $("#textoPk").html("Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2); 
    } else {
        $("#textoPk").html("Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1); 
    }
    if (currentPokemon.nForms > 1)
        $('.buttonChangeForm').fadeIn("slow");
    else
        $('.buttonChangeForm').fadeOut("slow");
}

//Funciones para abrir la pokedex
$(".mitad1").click(function () {
    init();
});

$(".mitad2").click(function () {
    init();
});

function showBoxesFromList(){
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

// Inicia el menú de la pokedex
function init() {
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
    // $('.p1, .p2, .p3, .p4, .p5, .p6, .p7').bind("click", '#imgLis   tado',eventosListaPokemon); // Genera y permite controlar las imagenes en un solo método
    }
}
//Reinicia filtros de busqueda
function resetFilters(){
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
}

//Función para obtener el pokemon según su posición en la lista
function getEnum(clasePok){
    var numP=-1;
    switch(clasePok){
        
        case "p1":
            numP=0;
        break;
        case "p2":
            numP=1;
        break;
        case "p3":
            numP=2;
        break;
        case "p4":
            numP=3;
        break;
        case "p5":
            numP=4;
        break;
        case "p6":
            numP=5;
        break;
        case "p7":
            numP=6;
        break;

    }
    return numP;
}

//Este permite que todo lo que se genere con #imgListado tenga este metodo directamente, sin tener que bindearlo dinamicamente
$("body").on("click",".pokedexFondo .fondo #imgListado",function(event){
    eventosListaPokemon(event);
}); 

//Función que permite mostrar el pokemon
function eventosListaPokemon(event) {
    if(firstPokemon.arrayPos+getEnum(event.target.className)<pokeArray.length){
        hideList();
        hideFilters();
        currentPokemon = pokeArray[firstPokemon.arrayPos + getEnum(event.target.className)];
        showPokemonDetail();
        showInfo();
        pokeDisplayed = true;
    }

}
$(".buttonConfig").click(function(){
    hideFormEngadir();
    boton_configuracion();
});

//Muestra la pantalla de configuracion
function boton_configuracion(){
    hideList();
    hideFilters();
    showConfiguration();
}

//Para mostrar la configuracion extra con el XML
function showConfiguration(){
    $(".configuracion").fadeIn("slow");
    $(".buttonBack").fadeIn("slow");
    configDisplayed = true;
}
//Para ocultar la configuracion extra con el XML
function hideConfiguration(){
    $(".configuracion").fadeOut("fast");
    $(".buttonBack").fadeOut("fast");
}
//Oculta la lista
function hideList() {
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

}

//Muestra el detalle
function showPokemonDetail(){
    $('.ventanaPokemon').fadeIn("slow");
    $('.imagenPokemon').fadeIn("slow");
    //$('.buttonDelete').fadeIn("slow");

    $('.buttonRightViewer').fadeIn("slow");
    $('.buttonLeftViewer').fadeIn("slow");
    formCount = 1;
    $('.buttonBack').fadeIn("slow");    
}

//Oculta el detalle
function hidePokemonDetail(){
    $('.ventanaPokemon').fadeOut("fast");
    $('.imagenPokemon').fadeOut("fast");
    //$('.buttonDelete').fadeOut("fast");

    $('.buttonRightViewer').fadeOut("slow");
    $('.buttonLeftViewer').fadeOut("slow");

    $('.buttonBack').fadeOut("slow");
    $('.buttonChangeForm').fadeOut("slow");
}

//Muestra la lista
function showList(){
    //Si el tamanio del array es menor que 7, empieza a no pintar recuadros
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

}

//Nuevo Pokemon
function addPokemon(){
    var newId = pokeArray.length + 1;//Provisional
    var newType1 = $('.tipo1Add').val();
    var newType2 = $('.tipo2Add').val();
    var newName = $('.nombreAdd').val();
    var newGen = parseInt($('.genAdd').val());
    //var newHab = $('habilidad0).val();
    var newLegendary = $('.legendarioAdd').prop('checked');
    var newNForms = parseInt($('.numberFormsAdd').val());
    //var newDesc = $('descripcionAdd').val();
    var newPoke = new Pokemon(newId, newName, newType1, newType2, newGen, newLegendary, newNForms);
    newPoke.image = "assets/pokemon_images/" + newPoke.id + ".png";
    newPoke.arrayPos = pokeArray.length;
    pokeArray.push(newPoke);
    //Si es el unico Pokemon del array, pasa a ser el primero
    if (pokeArray.length === 1){
        firstPokemon = pokeArray[0];
    }
    console.log("Pokemon Engadido");
    createPrueba();
    insertQuery(pokePrueba);
    updateList();
}

$('.buttonConfirmar').click(function(){
    addPokemon();
})

//Engadir es anhadir en gallego
function engadirPokemon(){
    hideList();
    hideFilters();
    showFormEngadir();
    resetAddForm();
    engadirDisplayed = true;
}

//Resetea los valores del formulario
function resetAddForm(){
    $('.tipo1Add').val('Fuego');
    $('.tipo2Add').val("");
    $('.nombreAdd').val('Nuevo Nombre');
    $('.genAdd').val(0);
    //$('habilidad').val('llamas');
    $('.legendarioAdd').prop('checked', false);
    $('.numberFormsAdd').val(1);
    //$('descripcionAdd').val('');
}

// Metodo para mostrar el formulario
function showFormEngadir(){
    $(".engadirPokemon").fadeIn("slow");
    $(".buttonBack").fadeIn("slow");
    $(".buttonConfirmar").fadeIn("slow");
}

//Oculta el formulario
function hideFormEngadir(){
    $(".engadirPokemon").fadeOut("fast");
    $(".buttonBack").fadeOut("slow");
    $(".buttonConfirmar").fadeOut("slow");
}

function showFilters(){
    $('.filtros').fadeIn("slow");
    $('.buttonEngadir').fadeIn("slow");
    $('.buttonReseteo').fadeIn("slow");
    $('.buttonConfig').fadeIn("slow");
}

function hideFilters(){
    $('.filtros').fadeOut("slow");
    $('.buttonEngadir').fadeOut("slow");
    $('.buttonReseteo').fadeOut("slow");
    $('.buttonConfig').fadeOut("slow");

}
//Baja la lista
$(".buttonDown").click(function () {
    if (firstPokemon.arrayPos + 7 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos+1];
    }
    updateList();
})

//Sube la lista
$(".buttonUp").click(function () {
    if (firstPokemon.arrayPos !== 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 1];
    }

    updateList();
})

//Retrocede en la lista en grupo
$(".buttonRight").click(function () {
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

//Avanza en la lista en grupo
$(".buttonLeft").click(function () {
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

//Actualiza la lista
function updateList(){
    //console.log(pokeArray.length)
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
//Cierra la ventana de detalle
$(".buttonBack").click(function () {
    showList();
    showFilters();
    if (pokeDisplayed) {
        hidePokemonDetail();
        pokeDisplayed = false;
    }
    if (engadirDisplayed){
        hideFormEngadir();
        engadirDisplayed = false;
    }
    if (configDisplayed){
        hideConfiguration();
        configDisplayed = false;
    }
})

//Cierra la pokedex
$(".buttonClose").click(function () {
    pokeOpen = false;
    $('.mitad1').animate({
        "left": "0px"
    }, "slow");
    $('.mitad2').animate({
        "left": "0px"
    }, "slow");
    $('.fondo').fadeOut("slow");
    if (pokeDisplayed) {
        $('.ventanaPokemon').fadeOut("fast");
        $('.imagenPokemon').fadeOut("fast");
        pokeDisplayed = false;
    }
    $('#imgListado.p2').fadeOut("slow");
    $('#imgListado.p3').fadeOut("slow");
    $('#imgListado.p4').fadeOut("slow");
    $('#imgListado.p5').fadeOut("slow");
    $('#imgListado.p6').fadeOut("slow");
    $('#imgListado.p7').fadeOut("slow");
    $('#imgListado.p1').fadeOut("slow");

    $('.txtListado').fadeOut("slow");
    $('.txtListado2').fadeOut("slow");
    $('.txtListado3').fadeOut("slow");
    $('.txtListado4').fadeOut("slow");
    $('.txtListado5').fadeOut("slow");
    $('.txtListado6').fadeOut("slow");
    $('.txtListado7').fadeOut("slow");
    hidePokemonDetail();
    hideFormEngadir();
    hideConfiguration();

});

//Reordena la Pokedex
function reversePokedex(){
    pokeArray = pokeArray.reverse();
    updatePokemonIndex();
    firstPokemon = pokeArray[0];
    updateList();
}

//Guarda en pokeArray el array que queramos filtrar. Guarda pokeArray en un backup para restaurarlo luego
function swapArrays(origin){
    backupArray = pokeArray;
    pokeArray = origin;
    firstPokemon = pokeArray[0];
    updatePokemonIndex();
}


//Restaura el array de Pokemon original
function restoreArray(){
    generalFilter = false;
    pokeArray = backupArray;
    updatePokemonIndex();
    firstPokemon = pokeArray[0];
}

//Actualiza las posiciones en el array de los Pokemon
function updatePokemonIndex(){
    for (var i = 0; i < pokeArray.length; i++){
        pokeArray[i].arrayPos = i;
    }
}

//Llama a la funcion de cambiado de tipo cuando cambia el valor de cualquiera de los dropdown
$('.tipo1Search').change(function(){
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    getTypesSearch();
})

$('.tipo2Search').change(function(){
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    getTypesSearch();
})

function getTypesSearch(){
    type1Value = $('.tipo1Search').val();
    type2Value = $('.tipo2Search').val();
    if (type2Value === type1Value){
        $('.tipo2Search').val("");
        type2Value = $('.tipo2Search').val();
    }
    search();
}


//Llama a la funcion de reordenar la Pokedex al pulsar en uno de los botones excluyentes.
$('.ordenDesc').change(function(){
    reversePokedex();
    createQuery();
})

$('.ordenAsc').change(function(){
    reversePokedex();
    createQuery();
})

//Llama a la funcion de filtrar generacion cuando se cambia el valor del dropdown.
$('.genDisplay').change(function(){
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    genValue = parseInt($('.genDisplay').val());
    search();
})

//Cuando se marca o desmarca la caja de legendarios, llama a la funcion de filtrar legendarios
$('.checkBoxLegendaries').change(function(){
    legendaryBool = $('.checkBoxLegendaries').prop('checked');
    search();
})

//Cuando cambia la barra de busqueda de nombres (es decir, cuando se escribe y se pulsa enter) llama a la funcion de buscar por nombre
$('.nombreSearch').change(function(){
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    nameValue = $('.nombreSearch').val();
    search();
})

//Cuando cambia la barra de busqueda de ID llama a la funcion de buscar por IDs
$('.idSearch').change(function(){
    $('.ordenAsc').prop('checked', true);
    $('.ordenDesc').prop('checked', false);
    idValue = parseInt($('.idSearch').val());
    search();
})

//Se muestra u oculta el boton de borrado cuando se pasa el raton por encima de la imagen del Pokemon
$('.imagenPokemon').mouseover(function(){
    $('.buttonDelete').fadeIn("slow");
})

$('.imagenPokemon').mouseout(function(){
    if ($('.buttonDelete').is(':hover') === false){
        $('.buttonDelete').fadeOut("slow");
    }     
})

$('.buttonDelete').mouseout(function(){
    if ($('.imagenPokemon').is(':hover') === false){
        $('.buttonDelete').fadeOut("slow");
    }     
})

$(".buttonEngadir").click(function () {
    //Prueba con formulario 
    hideConfiguration();
    engadirPokemon();
    if (pokeDisplayed){
        hidePokemonDetail();
    }
});

//Posible presencia de bugs: en caso de presentarse alguno, se resolvera cuando esten hechas las consultas de Mongo
$(".buttonReseteo").click(function(){
    resetFilters();
    restoreArray();
    updateList();
    showList();
})

function search(){
    if (!generalFilter){
        busquedaIntensa(legendaryBool, type1Value, type2Value, genValue, nameValue, idValue);
        swapArrays(copyArray);
    } else {
        restoreArray();
        busquedaIntensa(legendaryBool, type1Value, type2Value, genValue, nameValue, idValue);
        swapArrays(copyArray);
        //generalFilter = false;
    }
    updateList();
    showBoxesFromList();
    createQuery();
}

function createQuery(){
    var dbName = "pokemon";
    queryString = "db." + dbName + ".find({";
    //Generacion
    if (genValue !== 0){
        queryString += "generation:" + genValue + ",";
        youNeedSlice = true;
    }
    //Tipo(s)
    if (type1Value !== "" && type2Value !==""){
        queryString += "$or:[{type1:\""+type1Value+"\", type2:\"" + type2Value + "\"}, {type1:\""+type2Value + "\", type2:\"" + type1Value + "\"}],"
        youNeedSlice = true;
    } else if (type1Value !== ""){
        queryString +="$or:[{type1:\""+type1Value+"\"}, {type2:\""+type1Value +"\"}],"; 
        youNeedSlice = true;
    } else if (type2Value !== ""){
        queryString +="$or:[{type1:\""+type2Value+"\"}, {type2:\""+type2Value +"\"}],"; 
        youNeedSlice = true;
    }
    //Legendarios
    if (legendaryBool){
        queryString += "is_legendary:" + 1 + ",";
        youNeedSlice = true;
    }

    //Id
    if (idValue !== 0){
        queryString += "pokedex_number:" + idValue + ",";
        youNeedSlice = true;
    }

    //Nombre
    if (nameValue !== ""){
        queryString += "name:\"" + nameValue + "\",";
        youNeedSlice = true;
    }

    //Elimina la ultima coma
    if (youNeedSlice){
        queryString = queryString.slice(0,-1);
        youNeedSlice = false;
    }

    queryString += "})";
    //If innecesario, se puede recoger el valor en una variable
    if ($('.ordenAsc').prop('checked') === true){
        queryString += ".sort({pokedex_number:1})";
    } else {
        //Hay que ver como recoger correctamente este valor, porque nunca entra al else
        queryString += ".sort({pokedex_number:-1})";
    }
    console.log(queryString);
}

function removeQuery(removeName){
    var dbName = "pokemon";
    queryString = "db." + dbName + ".remove({name:\"" + removeName + "\"})";
    console.log(queryString);
}

function insertQuery(data){
    var dbName = "pokemon";
    queryString = "db." + dbName + ".insert({abilities:\"" + data.abilities + "]\", against_bug:" + data.bug + ",against_dark:" + data.dark +
    ",against_electric:" + data.electric + ",against_fairy:" + data.fairy + ",against_fight:" + data.fight + ",against_fire:" + data.fire +
    ",against_flying:" + data.flying + ",against_ghost:" + data.ghost + ",against_grass:" + data.grass + ",against_ground:" + data.ground +
    ",against_ice:" + data.ice + ",against_normal:" + data.normal + ",against_poison:" + data.poison + ",against_psychic:" + data.psychic +
    ",against_rock:" + data.rock + ",against_steel:" + data.steel + ",against_water:" + data.water + ",base_egg_steps:" + data.eggSteps +
    ",base_happiness:" + data.happiness + ",base_total:" + data.baseTotal + ",capture_rate:" + data.captureRate + ",classfication:" + data.classification +
    ",defense:" + data.defense + ",experience_growth:" + data.expGrowth + ",height_m:" + data.height + ",hp:" + data.hp +
    ",japanese_name:" + data.japName + ",name:" + data.name + ",percentage_male:" + data.percMale + ",pokedex_number:" + data.id +
    ",sp_attack:" + data.spAttack + ",sp_defense:" + data.spDefense + ",speed:" + data.speed + ",type1:" + data.type1 +
    ",type2:" + data.type2 + ",weight_kg:" + data.weight + ",generation:" + data.gen + ",is_legendary:" + data.legendaryNum  + "})"
    console.log(queryString);
}

function busquedaIntensa(boolLegend_, type1_, type2_, gen_, name_, id_number){
    generalFilter = true;
    copyArray = [];
    if (boolLegend_){
        if (type1_ !== ""){
            if (type2_ !== ""){
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Type1 != 'None y Type2 es None, asi que (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Type 1 == None, asi que para Type 2 !='None': (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)
            
            if (type2_ !== ""){
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Para Type2 == None: BORRAR TIPOS
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].legendary){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        //Borrar Legendarios
        if (type1_ !== ""){
            if (type2_ !== ""){
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].name.includes(name_) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_ 
                                && pokeArray[i].type2 === type1_))){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Type1 != 'None y Type2 es None, asi que (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Type 1 == None, asi que para Type 2 !='None': (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)
            
            if (type2_ !== ""){
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].name.includes(name_) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                if (gen_ !== 0){
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].gen === gen_){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== ""){
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++){
                                if (pokeArray[i].name.includes(name_)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else{
                        //Borrar Nombre
                        if (id_number !== 0){
                            for (var i = 0; i < pokeArray.length; i++){
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number)){
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else{
                            for (var i = 0; i < pokeArray.length; i++){
                                    copyArray.push(pokeArray[i]);
                            }
                        }
                    }
                }
            }
        }
    }
}


/* FUNCIONES ANTIGUAS
//Crea un nuevo Array en el que guarda los Pokemon legendarios
function filterLegendaries(){
    //legendariesFilter = true;
    legendaryArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].legendary){
            legendaryArray.push(pokeArray[i]);
        }
    }
    //Debugging
    for (var i = 0; i < legendaryArray.length; i++){
        legendaryArray[i].arrayPos = i;
    }
}

//Crea un nuevo Array en el que guarda los Pokemon de la generacion buscada
function filterGen(genNumber){
    genFilter = true;
    genArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].gen === genNumber){
            genArray.push(pokeArray[i]);
        }
    }
}

//Crea un nuevo Array en el que guarda los Pokemon del tipo buscado
function filterType(type1_, type2_){
    typeFilter = true;
    typeArray = [];
    //Si se busca una combinacion de tipos, coge cualquier pokemon que presente dicha combinacion de tipos sin importar el orden
    //Ej: Buscar Fuego-Volador coge Pokemon de Fuego-Volador o de Volador-Fuego, pero no cualquier otro Volador ni de Fuego.
    if (type1_ !== 'None' && type2_ !== 'None'){
        for (var i = 0; i < pokeArray.length; i++){
            if ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) ||
                (pokeArray[i].type1 === type2_ && pokeArray[i].type2 === type1_)){
                    typeArray.push(pokeArray[i]);
                }
        }
    //Si solo se rellena type1, comprueba que Pokemon son de ese tipo, independientemente si es el principal o secundario
    //Ej: Si buscamos Fuego, coge a Charmeleon (solo Fuego), Moltres (Fuego, Volador) y Volcanion (Agua, Fuego)
    } else if (type2_ === 'None'){
        for (var i = 0; i < pokeArray.length; i++){
            if (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_){
                typeArray.push(pokeArray[i]);
            }
        }
    //Lo mismo que el anterior, pero en lugar de comprobar type1_ comprueba type2_ 
    //Se podria obligar a que type1 se rellene y evitar esta rama
    } else if (type1_ === 'None'){
        for (var i = 0; i < pokeArray.length; i++){
            if (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_){
                typeArray.push(pokeArray[i]);
            }
        }
    }
}
//Crea un nuevo Array en el que solo introduce los Pokemon que tengan un idnombre con el string introducido
function searchByName(pokeName){
    //Falta evitar que distinga entre mayuscula y minuscula
    nameFilter = true;
    nameArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].name.includes(pokeName)){
            nameArray.push(pokeArray[i]);
        }
    }
}

//Crea un nuevo Array en el que solo introduce los Pokemon que tengan un id con el numero introducido
function searchById(pokeId){
    idFilter = true;
    idArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        var idString = pokeArray[i].id.toString();
        if (idString.includes(pokeId)){
            idArray.push(pokeArray[i]);
        }
    }
}*/