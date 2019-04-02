function peticionAServidor() {
    var petition = {
        legendary: legendaryBool,
        type1: type1Value,
        type2: type2Value,
        gen: genValue,
        name: nameValue,
        pokedexNumber: idValue,
        sort: ordenAscValue
    }
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/pokemon',
        data: JSON.stringify(petition),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (dataReceived) {
        console.log(dataReceived.length);
        pokeArray = [];
        for (var i = 0; i < dataReceived.length; i++) {
            var pokemon = new Pokemon(dataReceived[i]);
            pokeArray.push(pokemon);
        }
        //petitionDone = true;
        //Se asigna la imagen del pokemon
        for (var i = 0; i < pokeArray.length; i++) {
            pokeArray[i].setImages(pokeSrc);
            pokeArray[i].setArrayPos(i);
        }
        firstPokemon = pokeArray[0];
        updateList();
        showBoxesFromList();
    })
}

function initDataBase() {
    $.ajax({
        method: "GET",
        url: 'http://localhost:8080/pokemon/',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function () {
        peticionAServidor();
    })
}

function removePokemon(pokemonToDelete){
    var deletePetition = {
        legendary: pokemonToDelete.legendary,
        type1: pokemonToDelete.type1,
        type2: pokemonToDelete.type2,
        gen: pokemonToDelete.gen,
        name: pokemonToDelete.name,
        pokedexNumber: pokemonToDelete.id,
        sort: true
    }
    $.ajax({
        method: "DELETE",
        url: 'http://localhost:8080/pokemon/',
        data: JSON.stringify(deletePetition),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(){
        console.log("Pokemon eliminado");
    })
}

function insertNewPokemon(_newPokemon){
    var legendaryToInsert;
    if (_newPokemon.legendary){
        legendaryToInsert = 1;
    } else {
        legendaryToInsert = 0;
    }
    /*var insertPetition = {
        id : _newPokemon.pokedex_number,
		name : _newPokemon.name,
		type1 : _newPokemon.type1,
		type2 : _newPokemon.type2,
		generation : _newPokemon.gen,
		is_legendary: legendaryToInsert,
		abilities:  _newPokemon.abilities,
		japanese_name : _newPokemon.japanese_name,
		
		//Stats de combate
		hp : _newPokemon.hp,
		attack : _newPokemon.attack,
		defense : _newPokemon.defense,
		sp_attack : _newPokemon.sp_attack,
		sp_defense : _newPokemon.sp_defense,
		speed : _newPokemon.speed,
		
		//Stats de otro tipo
		base_total : _newPokemon.base_total,
		base_egg_steps : _newPokemon.base_egg_steps,
		base_happiness : _newPokemon.base_happiness,
		capture_rate : _newPokemon.capture_rate,
		classfication : _newPokemon.classfication,
		experience_growth : _newPokemon.experience_growth,
		height_m : _newPokemon.height_m,
		weight_kg : _newPokemon.weight_kg,
		percentage_male : _newPokemon.percentage_male,
		
		//Debilidades
		against_normal : _newPokemon.against_normal,
		against_electric : _newPokemon.against_electric,
		against_water : _newPokemon.against_water,
		against_fire : _newPokemon.against_fire,
		against_grass : _newPokemon.against_grass,
		against_bug : _newPokemon.against_bug,
		against_fight : _newPokemon.against_fight, 
		against_flying : _newPokemon.against_flying,
		against_poison : _newPokemon.against_poison,
		against_ghost : _newPokemon.against_ghost,
		against_psychic : _newPokemon.against_psychic,
		against_rock : _newPokemon.against_rock,
		against_ground : _newPokemon.against_ground,
		against_ice : _newPokemon.against_ice,
		against_dragon : _newPokemon.against_dragon,
		against_steel : _newPokemon.against_steel,
		against_dark : _newPokemon.against_dark,
		against_fairy : _newPokemon.against_fairy
    }*/
    var insertPetition = {
        pokedex_number : 802,
        gen : 8,
        name : "Marshadow",
		type1 : "Fighting",
		type2 : "Ghost",
		legendary: 1,
		abilities:  ["Prueba"],
		japanese_name : "Za Warudo",
		
		//Stats de combate
		hp : 200,
		attack : 200,
		defense : 200,
		sp_attack : 200,
		sp_defense : 200,
		speed : 200,
		
		//Stats de otro tipo
		base_total : 200,
		base_egg_steps : 200,
		base_happiness : 200,
		capture_rate : 200,
		classfication : "Eoooo",
		experience_growth : 200,
		height_m : 200,
		weight_kg : 200,
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
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/pokemon/',
        data: JSON.stringify(insertPetition),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(){
        console.log("Pokemon anadido");
        updateList();
    })
}