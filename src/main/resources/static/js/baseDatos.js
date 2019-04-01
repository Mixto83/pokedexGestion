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