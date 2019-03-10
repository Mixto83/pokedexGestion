var pokeDisplayed = false;

var pokeSrc = "assets/pokemon_images/";
var poke1 = new Pokemon(1, 'Bulbasaur', 'Planta', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
var poke2 = new Pokemon(2, 'Ivysaur', 'Planta', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
var poke3 = new Pokemon(3, 'Venusaur', 'Planta', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
var poke4 = new Pokemon(4, 'Charmander', 'Fuego', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke5 = new Pokemon(5, 'Charmeleon', 'Fuego', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke6 = new Pokemon(6, 'Charizard', 'Fuego', 'Volador', 1, false, 1, document.getElementById("pokeImg"));
var poke7 = new Pokemon(7, 'Squirtle', 'Agua', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke8 = new Pokemon(8, 'Wartortle', 'Agua', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke9 = new Pokemon(9, 'Blastoise', 'Agua', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke10 = new Pokemon(10, 'Caterpie', 'Bicho', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke11 = new Pokemon(11, 'Metapod', 'Bicho', 'None', 1, false, 1, document.getElementById("pokeImg"));
var poke12 = new Pokemon(12, 'Butterfree', 'Bicho', 'Volador', 1, false, 1, document.getElementById("pokeImg"));
var poke13 = new Pokemon(13, 'Weedle', 'Bicho', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
var poke14 = new Pokemon(14, 'Kakuna', 'Bicho', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
var poke15 = new Pokemon(15, 'Beedrill', 'Bicho', 'Veneno', 1, false, 2, document.getElementById("pokeImg"));

pokeArray = [poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8, poke9, poke10, poke11, poke12, poke13, poke14, poke15];
for (var i in pokeArray) {
    pokeArray[i].image = "assets/pokemon_images/" + pokeArray[i].id + ".png";
}

$(".buttonLeftViewer").click(function () {
    if (currentPokemon.id == 1) {
        currentPokemon = pokeArray[pokeArray.length - 1];
    } else {
        currentPokemon = pokeArray[currentPokemon.id - 2];
    }
    pokeImg.src = currentPokemon.image;
    document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
});

$(".buttonRightViewer").click(function () {
    //Hara falta un if que compruebe si tiene varias formas
    if (currentPokemon.id == pokeArray.length) {
        currentPokemon = pokeArray[0];
    } else {
        currentPokemon = pokeArray[currentPokemon.id];
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
    currentPokemon = pokeArray[0];
    firstPokemon = pokeArray[0];
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

    document.getElementById("listaPk1").innerHTML = pokeArray[0].id + " " +
        pokeArray[0].name;
    document.getElementById("listaPk2").innerHTML = pokeArray[1].id + " " +
        pokeArray[1].name;
    document.getElementById("listaPk3").innerHTML = pokeArray[2].id + " " +
        pokeArray[2].name;
    document.getElementById("listaPk4").innerHTML = pokeArray[3].id + " " +
        pokeArray[3].name;
    document.getElementById("listaPk5").innerHTML = pokeArray[4].id + " " +
        pokeArray[4].name;
    document.getElementById("listaPk6").innerHTML = pokeArray[5].id + " " +
        pokeArray[5].name;
    document.getElementById("listaPk7").innerHTML = pokeArray[6].id + " " +
        pokeArray[6].name;

    
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
    console.log(event.target.className);
    hideList();
    currentPokemon = pokeArray[firstPokemon.id-1 + getEnum(event.target.className)];
    pokeImg.src = currentPokemon.image;
    document.getElementById("textoPk").innerHTML = "Nombre: " + currentPokemon.name + "\nTipo1: " +
        currentPokemon.type1 + "\nTipo2: " + currentPokemon.type2;
    pokeDisplayed = true;

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

    $('.ventanaPokemon').fadeIn("slow");
    $('.imagenPokemon').fadeIn("slow");

    $('.buttonRightViewer').fadeIn("slow");
    $('.buttonLeftViewer').fadeIn("slow");
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

    $('.ventanaPokemon').fadeOut("fast");
    $('.imagenPokemon').fadeOut("fast");

    $('.buttonRightViewer').fadeOut("slow");
    $('.buttonLeftViewer').fadeOut("slow");
}

$(".addPokemon").click(function () {
    //Prueba para comprobar que se añaden al array y se leen bien
    var newPoke = new Pokemon(16, 'Pidgey', 'Normal', 'Veneno', 1, false, 1, document.getElementById("pokeImg"));
    newPoke.image = "assets/pokemon_images/" + newPoke.id + ".png";
    pokeArray.push(newPoke);
    alert("Hecho" + newPoke.id);
});

$(".buttonDown").click(function () {
    if (firstPokemon.id + 6 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id];
    }
    document.getElementById("listaPk1").innerHTML = firstPokemon.id + " " +
        firstPokemon.name;
    document.getElementById("listaPk2").innerHTML = pokeArray[firstPokemon.id].id + " " +
        pokeArray[firstPokemon.id].name;
    document.getElementById("listaPk3").innerHTML = pokeArray[firstPokemon.id + 1].id + " " +
        pokeArray[firstPokemon.id + 1].name;
    document.getElementById("listaPk4").innerHTML = pokeArray[firstPokemon.id + 2].id + " " +
        pokeArray[firstPokemon.id + 2].name;
    document.getElementById("listaPk5").innerHTML = pokeArray[firstPokemon.id + 3].id + " " +
        pokeArray[firstPokemon.id + 3].name;
    document.getElementById("listaPk6").innerHTML = pokeArray[firstPokemon.id + 4].id + " " +
        pokeArray[firstPokemon.id + 4].name;
    document.getElementById("listaPk7").innerHTML = pokeArray[firstPokemon.id + 5].id + " " +
        pokeArray[firstPokemon.id + 5].name;
    /*var pos = $('.imgListado7').position();
    alert(pos);
    $('.imgListado1').position(pos);
    $('.imgListado1').animate({"top":"470px"},"slow");
    $('.imgListado2').animate({"top":"-10px"},"slow");
    $('.imgListado3').animate({"top":"70px"},"slow");
    $('.imgListado4').animate({"top":"150px"},"slow");
    $('.imgListado5').animate({"top":"230px"},"slow");
    $('.imgListado6').animate({"top":"310px"},"slow");
    $('.imgListado7').animate({"top":"390px"},"slow");
    $('.imgListado7').fadeTo(10,1);
    $('.imgListado2').fadeTo(10,0.5);
    */
})

$(".buttonUp").click(function () {
    if (firstPokemon.id !== 1) {
        firstPokemon = pokeArray[firstPokemon.id - 2];
    }
    document.getElementById("listaPk1").innerHTML = firstPokemon.id + " " +
        firstPokemon.name;
    document.getElementById("listaPk2").innerHTML = pokeArray[firstPokemon.id].id + " " +
        pokeArray[firstPokemon.id].name;
    document.getElementById("listaPk3").innerHTML = pokeArray[firstPokemon.id + 1].id + " " +
        pokeArray[firstPokemon.id + 1].name;
    document.getElementById("listaPk4").innerHTML = pokeArray[firstPokemon.id + 2].id + " " +
        pokeArray[firstPokemon.id + 2].name;
    document.getElementById("listaPk5").innerHTML = pokeArray[firstPokemon.id + 3].id + " " +
        pokeArray[firstPokemon.id + 3].name;
    document.getElementById("listaPk6").innerHTML = pokeArray[firstPokemon.id + 4].id + " " +
        pokeArray[firstPokemon.id + 4].name;
    document.getElementById("listaPk7").innerHTML = pokeArray[firstPokemon.id + 5].id + " " +
        pokeArray[firstPokemon.id + 5].name;
})

$(".buttonRight").click(function () {
    if (firstPokemon.id + 12 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 6];
    } else if (firstPokemon.id + 11 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 5];
    } else if (firstPokemon.id + 10 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 4];
    } else if (firstPokemon.id + 9 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 3];
    } else if (firstPokemon.id + 8 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 2];
    } else if (firstPokemon.id + 7 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id + 1];
    } else if (firstPokemon.id + 6 < pokeArray.length) {
        firstPokemon = pokeArray[firstPokemon.id];
    }

    document.getElementById("listaPk1").innerHTML = firstPokemon.id + " " +
        firstPokemon.name;
    document.getElementById("listaPk2").innerHTML = pokeArray[firstPokemon.id].id + " " +
        pokeArray[firstPokemon.id].name;
    document.getElementById("listaPk3").innerHTML = pokeArray[firstPokemon.id + 1].id + " " +
        pokeArray[firstPokemon.id + 1].name;
    document.getElementById("listaPk4").innerHTML = pokeArray[firstPokemon.id + 2].id + " " +
        pokeArray[firstPokemon.id + 2].name;
    document.getElementById("listaPk5").innerHTML = pokeArray[firstPokemon.id + 3].id + " " +
        pokeArray[firstPokemon.id + 3].name;
    document.getElementById("listaPk6").innerHTML = pokeArray[firstPokemon.id + 4].id + " " +
        pokeArray[firstPokemon.id + 4].name;
    document.getElementById("listaPk7").innerHTML = pokeArray[firstPokemon.id + 5].id + " " +
        pokeArray[firstPokemon.id + 5].name;
})

$(".buttonLeft").click(function () {
    if (firstPokemon.id - 8 >= 0) {
    firstPokemon = pokeArray[firstPokemon.id - 8];
    } else if (firstPokemon.id - 7 >= 0) {
        firstPokemon = pokeArray[firstPokemon.id - 7];
    } else if (firstPokemon.id - 6 >= 0) {
        firstPokemon = pokeArray[firstPokemon.id - 6];
    } else if (firstPokemon.id - 5 >= 0) {
        firstPokemon = pokeArray[firstPokemon.id - 5];
    } else if (firstPokemon.id - 5 >= 0) {
            firstPokemon = pokeArray[firstPokemon.id - 5];
    } else if (firstPokemon.id - 4 >= 0) {
        firstPokemon = pokeArray[firstPokemon.id - 4];
    } else if (firstPokemon.id - 3 >= 0) {
        firstPokemon = pokeArray[firstPokemon.id - 3];
    } else if (firstPokemon.id - 2 >= 0){
        firstPokemon = pokeArray[firstPokemon.id - 2];
    }
    document.getElementById("listaPk1").innerHTML = firstPokemon.id + " " +
        firstPokemon.name;
    document.getElementById("listaPk2").innerHTML = pokeArray[firstPokemon.id].id + " " +
        pokeArray[firstPokemon.id].name;
    document.getElementById("listaPk3").innerHTML = pokeArray[firstPokemon.id + 1].id + " " +
        pokeArray[firstPokemon.id + 1].name;
    document.getElementById("listaPk4").innerHTML = pokeArray[firstPokemon.id + 2].id + " " +
        pokeArray[firstPokemon.id + 2].name;
    document.getElementById("listaPk5").innerHTML = pokeArray[firstPokemon.id + 3].id + " " +
        pokeArray[firstPokemon.id + 3].name;
    document.getElementById("listaPk6").innerHTML = pokeArray[firstPokemon.id + 4].id + " " +
        pokeArray[firstPokemon.id + 4].name;
    document.getElementById("listaPk7").innerHTML = pokeArray[firstPokemon.id + 5].id + " " +
        pokeArray[firstPokemon.id + 5].name;
})

$(".cerrarVentana").click(function () {
    if (pokeDisplayed) {
        showList();
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
    /*$('.fondo').animate({
        opacity:0,
        width:"toggle"
    },100);*/
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

});