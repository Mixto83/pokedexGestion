var pokeDisplayed = false;
var pokeSrc = "assets/pokemon_images/";

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
var poke21 = new Pokemon(21, 'Spearow', 'Bicho', 'Volador', 1, false, 1);
var poke22 = new Pokemon(22, 'Fearow', 'Bicho', 'Volador', 1, false, 1);
var poke23 = new Pokemon(23, 'Ekans', 'Veneno', 'None', 1, false, 1);
var poke24 = new Pokemon(24, 'Arbok', 'Veneno', 'None', 1, false, 1);
var poke25 = new Pokemon(25, 'Pikachu', 'Electrico', 'None', 1, false, 5);

pokeArray = [poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8, poke9, poke10, poke11, poke12, 
    poke13, poke14, poke15, poke16, poke17, poke18, poke19, poke20, poke21, poke22, poke23, poke24, poke25];
for (var i =0; i < pokeArray.length; i++) {
    pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
    pokeArray[i].arrayPos = i;
}

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
        document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
        pokeImg.src = currentPokemon.image;
    } else {
        pokeImg.src = null;
        document.getElementById("textoPk").innerHTML = "";
    }   
    updateList();

});

$(".buttonLeftViewer").click(function () {
    if (currentPokemon.arrayPos == 0) {
        currentPokemon = pokeArray[pokeArray.length - 1];
    } else {
        currentPokemon = pokeArray[currentPokemon.arrayPos - 1];
    }
    pokeImg.src = currentPokemon.image;
    if (currentPokemon.type2 !== 'None'){
        document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
    } else {
        document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1;
    }
    
});

$(".buttonRightViewer").click(function () {
    if (currentPokemon.arrayPos == pokeArray.length - 1) {
        currentPokemon = pokeArray[0];
    } else {
        currentPokemon = pokeArray[currentPokemon.arrayPos + 1];
    }

    pokeImg.src = currentPokemon.image;
    document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
});

$(".mitad1").click(function () {
    init();
});

$(".mitad2").click(function () {
    init();
});

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
$("body").on("click",".pokedexFondo .fondo #imgListado",function(event){
    eventosListaPokemon(event);
}); //Este permite que todo lo que se genere con #imgListado tenga este metodo directamente, sin tener que bindearlo dinamicamente

function eventosListaPokemon(event) {
    if(firstPokemon.arrayPos+getEnum(event.target.className)<=pokeArray.length){
    hideList();
    showPokemonDetail();
    currentPokemon = pokeArray[firstPokemon.arrayPos + getEnum(event.target.className)];
    pokeImg.src = currentPokemon.image;
    document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
    pokeDisplayed = true;
    }

}

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

function showPokemonDetail(){
    $('.ventanaPokemon').fadeIn("slow");
    $('.imagenPokemon').fadeIn("slow");

    $('.buttonRightViewer').fadeIn("slow");
    $('.buttonLeftViewer').fadeIn("slow");
    formCount = 1;
}

function hidePokemonDetail(){

    $('.ventanaPokemon').fadeOut("fast");
    $('.imagenPokemon').fadeOut("fast");

    $('.buttonRightViewer').fadeOut("slow");
    $('.buttonLeftViewer').fadeOut("slow");
}

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

$(".addPokemon").click(function () {
    //Prueba para comprobar que se añaden al array y se leen bien
    engadirPokemon();
   /*
    var newPoke = new Pokemon(150, 'Mewtwo', 'Psiquico', 'None', 1, true, 3, document.getElementById("pokeImg"));
    newPoke.image = "assets/pokemon_images/" + newPoke.id + ".png";
    newPoke.arrayPos = pokeArray.length;
    pokeArray.push(newPoke);
    alert("Hecho " + newPoke.id);*/
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
}

// Metodo para mostrar el formulario
function showFormEngadir(){
    $(".engadirPokemon").fadeIn("slow");
}

function hideFormEngadir(){
    $(".engadirPokemon").fadeOut("fast");
}

$(".buttonDown").click(function () {
    if (firstPokemon.arrayPos + 7 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.arrayPos+1];
    }
    updateList();
})

$(".buttonUp").click(function () {
    if (firstPokemon.arrayPos !== 0) {
        firstPokemon = pokeArray[firstPokemon.arrayPos - 1];
    }

    updateList();
})

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

function updateList(){
    console.log(pokeArray.length)
    if (pokeArray.length >= 1){
        document.getElementById("listaPk1").innerHTML = firstPokemon.id + " " + firstPokemon.name;
    } else {
        document.getElementById("listaPk1").innerHTML = "";
    }

    if (pokeArray.length >= 2){
        document.getElementById("listaPk2").innerHTML = pokeArray[firstPokemon.arrayPos+1].id + " " +
            pokeArray[firstPokemon.arrayPos+1].name;
    } else {
        document.getElementById("listaPk2").innerHTML = "";
    }

    if (pokeArray.length >= 3){
        document.getElementById("listaPk3").innerHTML = pokeArray[firstPokemon.arrayPos + 2].id + " " +
            pokeArray[firstPokemon.arrayPos + 2].name;
    } else {
        document.getElementById("listaPk3").innerHTML = "";
    }

    if (pokeArray.length >= 4){
        document.getElementById("listaPk4").innerHTML = pokeArray[firstPokemon.arrayPos + 3].id + " " +
            pokeArray[firstPokemon.arrayPos + 3].name;
    } else {
        document.getElementById("listaPk4").innerHTML = "";
    }

    if (pokeArray.length >= 5){
        document.getElementById("listaPk5").innerHTML = pokeArray[firstPokemon.arrayPos + 4].id + " " +
            pokeArray[firstPokemon.arrayPos + 4].name;
    } else {
        document.getElementById("listaPk5").innerHTML = "";
    }

    if (pokeArray.length >= 6){
        document.getElementById("listaPk6").innerHTML = pokeArray[firstPokemon.arrayPos + 5].id + " " +
        pokeArray[firstPokemon.arrayPos + 5].name;
    } else {
        document.getElementById("listaPk6").innerHTML = "";
    }

    if (pokeArray.length >= 7){
        document.getElementById("listaPk7").innerHTML = pokeArray[firstPokemon.arrayPos + 6].id + " " +
            pokeArray[firstPokemon.arrayPos + 6].name;
    } else {
        document.getElementById("listaPk7").innerHTML = "";
    }
    
}
$(".cerrarVentana").click(function () {
    if (pokeDisplayed) {
        showList();
        hidePokemonDetail();
        pokeDisplayed = false;

    }
})

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

    hideFormEngadir()

});

$(".cambiaOrden").click(function(){
    pokeArray = pokeArray.reverse();
    for (var i =0; i < pokeArray.length; i++) {
        pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
        pokeArray[i].arrayPos = i;
    }
    firstPokemon = pokeArray[0];
    updateList();
});