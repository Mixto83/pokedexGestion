///////////////////////////////////////////////////////////////////////////gestionFormularioAnadirPokemon
function showFormEngadir(){ //Muestra el forumalio para anadir pokemon
    $(".engadirPokemon").fadeIn("slow");
    $(".buttonBack").fadeIn("slow");
    $(".buttonConfirmar").fadeIn("slow");
}

function hideFormEngadir(){ //Oculta el formulario para anadir pokemon
    $(".engadirPokemon").fadeOut("fast");
    $(".buttonBack").fadeOut("slow");
    $(".buttonConfirmar").fadeOut("slow");
}

function addPokemon() { //Nuevo Pokemon
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
    if (pokeArray.length === 1) {
        firstPokemon = pokeArray[0];
    }
    console.log("Pokemon Engadido");
    createPrueba();
    updateList();
}

$('.buttonConfirmar').click(function () { //boton de confirmar
    addPokemon();
})

function engadirPokemon() { //Engadir es anhadir en gallego
    hideList();
    hideFilters();
    showFormEngadir();
    resetAddForm();
    engadirDisplayed = true;
}

function resetAddForm() { //Resetea los valores del formulario
    $('.tipo1Add').val('Fuego');
    $('.tipo2Add').val("");
    $('.nombreAdd').val('Nuevo Nombre');
    $('.genAdd').val(0);
    //$('habilidad').val('llamas');
    $('.legendarioAdd').prop('checked', false);
    $('.numberFormsAdd').val(1);
    //$('descripcionAdd').val('');
}