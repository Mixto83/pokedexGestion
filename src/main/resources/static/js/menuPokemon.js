///////////////////////////////////////////////////////////////////////////gestionMenuPokemon
function showPokemonDetail() { //Muestra el detalle
    $('.ventanaPokemon').fadeIn("slow");
    $('.imagenPokemon').fadeIn("slow");
    //$('.buttonDelete').fadeIn("slow");

    $('.buttonRightViewer').fadeIn("slow");
    $('.buttonLeftViewer').fadeIn("slow");
    formCount = 1;
    $('.buttonBack').fadeIn("slow");
}

function hidePokemonDetail() { //Oculta el detalle
    $('.ventanaPokemon').fadeOut("fast");
    $('.imagenPokemon').fadeOut("fast");
    //$('.buttonDelete').fadeOut("fast");

    $('.buttonRightViewer').fadeOut("slow");
    $('.buttonLeftViewer').fadeOut("slow");

    $('.buttonBack').fadeOut("slow");
    $('.buttonChangeForm').fadeOut("slow");
}

//Se muestra u oculta el boton de borrado cuando se pasa el raton por encima de la imagen del Pokemon
$('.imagenPokemon').mouseover(function () {
    $('.buttonDelete').fadeIn("slow");
})

$('.imagenPokemon').mouseout(function () {
    if ($('.buttonDelete').is(':hover') === false) {
        $('.buttonDelete').fadeOut("slow");
    }
})

$('.buttonDelete').mouseout(function () {
    if ($('.imagenPokemon').is(':hover') === false) {
        $('.buttonDelete').fadeOut("slow");
    }
})

// Function para eliminar el pokemon que se muestra en pantalla
$('.buttonDelete').click(function () {
    var deletePos = currentPokemon.arrayPos;
    //Solo permite eliminar Pokemon en el visor
    if (pokeDisplayed) {
        pokeArray.splice(deletePos, 1);
    }
    //Reasigna las posiciones en el array de los Pokemon
    updatePokemonIndex();

    //Si el pokemon borrado es el ultimo, coge el primero, si no, coge el siguiente
    if (deletePos === pokeArray.length) {
        currentPokemon = pokeArray[0];
    } else {
        currentPokemon = pokeArray[deletePos];
    }
    //Si la lista esta vacia, ponemos a null first y current Poke
    //En caso de borrar uno de los 7 ultimos Pokemon o de borrar el primero, actualiza correctamente la lista
    if (pokeArray.length === 0) {
        firstPokemon = null;
        currentPokemon = null;
    } else if (deletePos >= pokeArray.length - 6 && pokeArray.length >= 7) {
        firstPokemon = pokeArray[pokeArray.length - 7];
    } else if (firstPokemon.arrayPos === deletePos) {
        firstPokemon = currentPokemon;
    }
    //Refleja visualmente los cambios
    if (currentPokemon !== null) {
        showInfo();
    } else {
        pokeImg.src = null;
        $("#textoPk").html("");
    }
    updateList();
});

// Creamos un boton para diferenciar los pokemon con diferentes formas (Megas ej)
$(".buttonChangeForm").click(function () {
    if (currentPokemon.nForms > 1) {
        formCount++;
        if (formCount <= currentPokemon.nForms) {
            currentPokemon.image = "assets/pokemon_images/" + currentPokemon.id + "-" + formCount + ".png";
        } else {
            formCount = 1;
            currentPokemon.image = "assets/pokemon_images/" + currentPokemon.id + ".png";
        }
        pokeImg.src = currentPokemon.image;
    }
})

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
function showInfo() {
    pokeImg.src = currentPokemon.image;
    if (currentPokemon.type2 !== "") {
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