var pokeDisplayed = false;
var engadirDisplayed = false;
var legendariesFilter = false;
var genFilter = false;
var typeFilter = false;
var pokeSrc = "assets/pokemon_images/";
//Variables para probar que funciona la lista
var poke1 = new Pokemon(1, 'Bulbasaur', 'Planta', 'Veneno', 1, false, 1);
var poke2 = new Pokemon(2, 'Ivysaur', 'Planta', 'Veneno', 1, false, 1);
var poke3 = new Pokemon(3, 'Venusaur', 'Planta', 'Veneno', 1, false, 2);
var poke4 = new Pokemon(4, 'Charmander', 'Fuego', 'None', 1, false, 1);
var poke5 = new Pokemon(5, 'Charmeleon', 'Fuego', 'None', 1, false, 1);
var poke6 = new Pokemon(6, 'Charizard', 'Fuego', 'Volador', 1, false, 3);
var poke7 = new Pokemon(7, 'Squirtle', 'Agua', 'None', 1, false, 1);
var poke8 = new Pokemon(8, 'Wartortle', 'Agua', 'None', 1, false, 1);
var poke9 = new Pokemon(9, 'Blastoise', 'Agua', 'None', 1, false, 2);
var poke10 = new Pokemon(10, 'Caterpie', 'Bicho', 'None', 1, false, 1);
var poke11 = new Pokemon(11, 'Metapod', 'Bicho', 'None', 1, false, 1);
var poke12 = new Pokemon(12, 'Butterfree', 'Bicho', 'Volador', 1, false, 1);
var poke13 = new Pokemon(13, 'Weedle', 'Bicho', 'Veneno', 1, false, 1);
var poke14 = new Pokemon(14, 'Kakuna', 'Bicho', 'Veneno', 1, false, 1);
var poke15 = new Pokemon(15, 'Beedrill', 'Bicho', 'Veneno', 1, false, 2);
var poke16 = new Pokemon(16, 'Pidgey', 'Normal', 'Volador', 1, false, 1);
var poke17 = new Pokemon(17, 'Pidgeotto', 'Normal', 'Volador', 1, false, 1);
var poke18 = new Pokemon(18, 'Pidgeot', 'Normal', 'Volador', 1, false, 2);
var poke19 = new Pokemon(19, 'Rattata', 'Normal', 'None', 1, false, 1);
var poke20 = new Pokemon(20, 'Raticate', 'Normal', 'None', 1, false, 1);
var poke21 = new Pokemon(21, 'Spearow', 'Normal', 'Volador', 1, false, 1);
var poke22 = new Pokemon(22, 'Fearow', 'Normal', 'Volador', 1, false, 1);
var poke23 = new Pokemon(23, 'Ekans', 'Veneno', 'None', 1, false, 1);
var poke24 = new Pokemon(24, 'Arbok', 'Veneno', 'None', 1, false, 1);
var poke25 = new Pokemon(25, 'Pikachu', 'Electrico', 'None', 1, false, 5);
var poke26 = new Pokemon(150, 'Mewtwo', 'Psiquico', 'None', 1, true, 3);
var poke27 = new Pokemon(254, 'Sceptyle', 'Planta', 'None', 3, false, 2);
var poke28 = new Pokemon(386, 'Deoxys', 'Psiquico', 'None', 3, true, 4);
//Array para probar la lista
pokeArray = [poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8, poke9, poke10, poke11, poke12, 
    poke13, poke14, poke15, poke16, poke17, poke18, poke19, poke20, poke21, poke22, poke23, poke24, poke25, poke26, poke27, poke28];

//Se asigna la imagen del pokemon
for (var i =0; i < pokeArray.length; i++) {
    pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
    pokeArray[i].arrayPos = i;
}

// Creamos un boton para diferenciar los pokemon con diferentes formas (Megas ej)
$(".formas").click(function(){
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
$('.deletePokemon').click(function(){

    var deletePos = currentPokemon.arrayPos;

    //Solo permite eliminar Pokemon en el visor
    if(pokeDisplayed){
        console.log("Se borro: " + currentPokemon.toString());
        pokeArray.splice(deletePos,1);
    }
    
    //Reasigna las posiciones en el array de los Pokemon
    for (var i = deletePos; i < pokeArray.length; i++){
        pokeArray[i].arrayPos = i;
    }

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
    if (currentPokemon.type2 !== 'None'){
        $("#textoPk").html("Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2); 
    } else {
        $("#textoPk").html("Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1); 
    }
}

//Funciones para abrir la pokedex
$(".mitad1").click(function () {
    init();
});

$(".mitad2").click(function () {
    init();
});

// Inicia el menú de la pokedex
function init() {
    currentPokemon = pokeArray[0];//Controla el Pokemon que se ve en el visor de imagenes
    firstPokemon = pokeArray[0];//Controla cual es el primer Pokemon que se ve en la lista de 7
    $('.mitad1').animate({
        "left": "-49.5%"
    }, "slow");
    $('.mitad2').animate({
        "left": "+49.5%"
    }, "slow");
    $('.fondo').fadeIn("slow");
    //$('.ventanaPokemon').fadeIn("slow");
    //$('.imagenPokemon').fadeIn("slow");
    $('#imgListado.p1').fadeTo(10, 0.5);
    $('#imgListado.p7').fadeTo(10, 0.5);
    showList();
    updateList();

    
   // $('.p1, .p2, .p3, .p4, .p5, .p6, .p7').bind("click", '#imgLis   tado',eventosListaPokemon); // Genera y permite controlar las imagenes en un solo método
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
        showPokemonDetail();
        currentPokemon = pokeArray[firstPokemon.arrayPos + getEnum(event.target.className)];
        showInfo();
        pokeDisplayed = true;
    }

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

    $('.buttonRightViewer').fadeIn("slow");
    $('.buttonLeftViewer').fadeIn("slow");
    formCount = 1;
}

//Oculta el detalle
function hidePokemonDetail(){

    $('.ventanaPokemon').fadeOut("fast");
    $('.imagenPokemon').fadeOut("fast");

    $('.buttonRightViewer').fadeOut("slow");
    $('.buttonLeftViewer').fadeOut("slow");
}

//Muestra la lista
function showList(){
    $('#imgListado.p2').fadeIn("slow");
    $('#imgListado.p3').fadeIn("slow");
    $('#imgListado.p4').fadeIn("slow");
    $('#imgListado.p5').fadeIn("slow");
    $('#imgListado.p6').fadeIn("slow");
    $('#imgListado.p7').fadeIn("slow");
    $('#imgListado.p1').fadeIn("slow");

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
//TODO
$(".addPokemon").click(function () {
    //Prueba con formulario 
    engadirPokemon();
    if (pokeDisplayed){
        hidePokemonDetail();
    }
    //Prueba para comprobar que se añaden al array y se leen bien
   /*
    var newPoke = new Pokemon(150, 'Mewtwo', 'Psiquico', 'None', 1, true, 3, document.getElementById("pokeImg"));
    newPoke.image = "assets/pokemon_images/" + newPoke.id + ".png";
    newPoke.arrayPos = pokeArray.length;
    pokeArray.push(newPoke);
    alert("Hecho " + newPoke.id);
    //Metodo de insercion por el usuario
    //Faltara incluirlo en la BD
    /*var newId = parseInt(prompt("Id", "150"));
    var newName = prompt("Nombre", 'Mewtwo');
    var newType1 = prompt("Tipo1", 'Psiquico');
    var newType2 = prompt("Tipo2", 'None');
    var newGen = parseInt(prompt("Generacion", "1"));
    var newLegendary = Boolean(prompt("Legendario", "true"));
    var newForms = parseInt(prompt("Formas", "3"));
    var newPoke = new Pokemon(newId, newName, newType1, newType2, newGen, newLegendary, newForms);
    
    var newPoke = new Pokemon(150, 'Mewtwo', 'Psiquico', 'None', 1, true, 3);
    newPoke.image = "assets/pokemon_images/" + newPoke.id + ".png";
    newPoke.arrayPos = pokeArray.length;
    pokeArray.push(newPoke);
    alert("Hecho " + newPoke.id);
    console.log(newPoke.legendary === true);

    //Si es el unico Pokemon del array, pasa a ser el primero y actualiza la lista
    if (pokeArray.length === 1){
        firstPokemon = pokeArray[0];
        updateList();
    }*/
    
});

//Engadir es anhadir en gallego
function engadirPokemon(){
    hideList();
    showFormEngadir();
    engadirDisplayed = true;
}

// Metodo para mostrar el formulario
function showFormEngadir(){
    $(".engadirPokemon").fadeIn("slow");
}

//Oculta el formulario
function hideFormEngadir(){
    $(".engadirPokemon").fadeOut("fast");
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
    console.log(pokeArray.length)
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
$(".cerrarVentana").click(function () {
    if (pokeDisplayed) {
        showList();
        hidePokemonDetail();
        pokeDisplayed = false;
    }
    if (engadirDisplayed){
        showList();
        hideFormEngadir();
        engadirDisplayed = false;
    }
})

//Cierra la pokedex
$(".cerrar").click(function () {
    $('.mitad1').animate({
        "left": "0%"
    }, "slow");
    $('.mitad2').animate({
        "left": "0%"
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

});

//Reordena la pokedex
$(".cambiaOrden").click(function(){
    pokeArray = pokeArray.reverse();
    for (var i =0; i < pokeArray.length; i++) {
        pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
        pokeArray[i].arrayPos = i;
    }
    firstPokemon = pokeArray[0];
    updateList();
});

//Filtra busqueda por legendarios
function filterLegendaries(){
    legendariesFilter = true;
    legendaryArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].legendary){
            legendaryArray.push(pokeArray[i]);
        }
    }
    //Debugging
    for (var i = 0; i < legendaryArray.length; i++){
        legendaryArray[i].arrayPos = i;
        console.log(legendaryArray[i].toString());
    }
}

//Filtra busqueda por generacion
function filterGen(genNumber){
    genFilter = true;
    genArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].gen === genNumber){
            genArray.push(pokeArray[i]);
        }
    }
}

//Filtra busqueda por tipo
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

//Guarda en pokeArray el array que queramos filtrar. Guarda pokeArray en un backup para restaurarlo luego
function swapArrays(origin){
    backupArray = pokeArray;
    pokeArray = origin;
    console.log(backupArray[0].toString());
}

//Restaura el array de Pokemon
function restoreArray(){
    pokeArray = backupArray;
}


$('.soloLegendarios').click(function(){
    if (!legendariesFilter){
        filterLegendaries();
        swapArrays(legendaryArray);
    } else {
        restoreArray();
        legendariesFilter = false; 
    }
    updateList();
})

$('.generacion3').click(function(){
    if(!genFilter){
        filterGen(3);
        swapArrays(genArray);
    } else {
        restoreArray();
        genFilter = false;
    }
    updateList();
})

$('.soloTipo').click(function(){
    if(!typeFilter){
        filterType('None', 'Agua');
        swapArrays(typeArray);
    } else {
        restoreArray();
        typeFilter = false;
    }
    updateList();
})