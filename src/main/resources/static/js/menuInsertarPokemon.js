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

$('.habilidadAdd').change(function () {
	arrayAbs.push("\'"+$('.habilidadAdd').val()+"\'");
})

function addPokemon() { //Nuevo Pokemon
	var stringAbs = "["+arrayAbs.toString()+"]";
    var jsonNew = {
        pokedex_number : 802,//Default for testing
        gen : $('.genAdd').val(),
        name : $('.nombreAdd').val(),
		type1 : $('.tipo1Add').val(),
		type2 : $('.tipo2Add').val(),
		is_legendary: $(".legendarioAdd").prop('checked'),
		abilities: stringAbs,
		japanese_name : $('.nombreJAdd').val(),
        
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
		height_m : $('.alturaAdd').val(),
		weight_kg : $('.pesoAdd').val(),
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
    hideFormEngadir();
    showList();
    showFilters();
    var newPokemon = new Pokemon(jsonNew);
    insertNewPokemon(newPokemon);
    
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
	$('.nombreJAdd').val('Nuevo Nombre');
    $('.genAdd').val(1);
	$('habilidad').val('');
	arrayAbs = [];
    $('.legendarioAdd').prop('checked', false);
	$('.numberFormsAdd').val(1);
	$('.pesoAdd').val(0);
	$('.alturaAdd').val(0);
    //$('descripcionAdd').val('');
}