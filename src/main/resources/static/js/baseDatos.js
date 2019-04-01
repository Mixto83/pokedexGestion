
function peticionAServidor() {
    var petition = {
        legendary: legendaryBool,
        type1: type1Value,
        type2: type2Value,
        gen: genValue,
        name: nameValue,
        pokedexNumber: idValue
    }
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/test',
        data: JSON.stringify(petition),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (dataReceived) {
        console.log(dataReceived);
    })
}