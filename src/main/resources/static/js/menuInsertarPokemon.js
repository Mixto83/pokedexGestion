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
    var jsonNew = {
        pokedex_number : 802,//Default for testing
        gen : parseInt($('.genAdd').val()),
        name : $('.nombreAdd').val(),
		type1 : $('.tipo1Add').val(),
		type2 : $('.tipo2Add').val(),
		legendary: 0,//Default for testing
		abilities:  "['Prueba']",//Default for testing
		japanese_name : "Za Warudo",//Default for testing
        
		//Stats de combate
		hp : 50,
		attack : 50,
		defense : 50,
		sp_attack : 50,
		sp_defense : 50,
		speed : 50,
		
		//Stats de otro tipo
		base_total : 50,
		base_egg_steps : 50,
		base_happiness : 50,
		capture_rate : 50,
		classfication : $('.descripcionAdd').val(),
		experience_growth : 50,
		height_m : 50,
		weight_kg : 50,
		percentage_male : 50,
		
		//Debilidades
		against_normal : 1,
		against_electric : 1,
		against_water : 1,
		against_fire : 1,
		against_grass : 1,
		against_bug : 1,
		against_fight : 1, 
		against_flying : 1,
		against_poison : 1,
		against_ghost : 1,
		against_psychic : 1,
		against_rock : 1,
		against_ground : 1,
		against_ice : 1,
		against_dragon : 1,
		against_steel : 1,
		against_dark : 1,
		against_fairy : 1
    }
    console.log(jsonNew.against_bug);
    console.log(jsonNew.type1);
    console.log(jsonNew.name);
    var newPokemon = new Pokemon(jsonNew);
    insertNewPokemon(newPokemon);
    /*var newId = pokeArray.length + 1;//Provisional
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
    }*/
    
    //updateList();
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