/*var legendariesFilter = false;
var genFilter = false;
var typeFilter = false;
var nameFilter = false;
var idFilter = false;
*/
var pokeDisplayed = false;
var pokeOpen = false;
var engadirDisplayed = false;
var configDisplayed = false;

var generalFilter = false;

var legendaryBool = false;
var type1Value = "";
var type2Value = "";
var genValue = 0;
var idValue = 0;
var nameValue = "";
var backupDone = false;

var youNeedSlice = false;
var queryString;
var pokePrueba;

var pokeSrc = "assets/pokemon_images/";
//Variables para probar que funciona la lista
var poke1 = new Pokemon(1, 'Bulbasaur', 'grass', 'poison', 1, false, 1);
var poke2 = new Pokemon(2, 'Ivysaur', 'grass', 'poison', 1, false, 1);
var poke3 = new Pokemon(3, 'Venusaur', 'grass', 'poison', 1, false, 2);
var poke4 = new Pokemon(4, 'Charmander', 'fire', "", 1, false, 1);
var poke5 = new Pokemon(5, 'Charmeleon', 'fire', "", 1, false, 1);
var poke6 = new Pokemon(6, 'Charizard', 'fire', 'flying', 1, false, 3);
var poke7 = new Pokemon(7, 'Squirtle', 'water', "", 1, false, 1);
var poke8 = new Pokemon(8, 'Wartortle', 'water', "", 1, false, 1);
var poke9 = new Pokemon(9, 'Blastoise', 'water', "", 1, false, 2);
var poke10 = new Pokemon(10, 'Caterpie', 'bug', "", 1, false, 1);
var poke11 = new Pokemon(11, 'Metapod', 'bug', "", 1, false, 1);
var poke12 = new Pokemon(12, 'Butterfree', 'bug', 'flying', 1, false, 1);
var poke13 = new Pokemon(13, 'Weedle', 'bug', 'poison', 1, false, 1);
var poke14 = new Pokemon(14, 'Kakuna', 'bug', 'poison', 1, false, 1);
var poke15 = new Pokemon(15, 'Beedrill', 'bug', 'poison', 1, false, 2);
var poke16 = new Pokemon(16, 'Pidgey', 'normal', 'flying', 1, false, 1);
var poke17 = new Pokemon(17, 'Pidgeotto', 'normal', 'flying', 1, false, 1);
var poke18 = new Pokemon(18, 'Pidgeot', 'normal', 'flying', 1, false, 2);
var poke19 = new Pokemon(19, 'Rattata', 'normal', "", 1, false, 1);
var poke20 = new Pokemon(20, 'Raticate', 'normal', "", 1, false, 1);
var poke21 = new Pokemon(21, 'Spearow', 'normal', 'flying', 1, false, 1);
var poke22 = new Pokemon(22, 'Fearow', 'normal', 'flying', 1, false, 1);
var poke23 = new Pokemon(23, 'Ekans', 'poison', "", 1, false, 1);
var poke24 = new Pokemon(24, 'Arbok', 'poison', "", 1, false, 1);
var poke25 = new Pokemon(25, 'Pikachu', 'electric', "", 1, false, 5);
var poke26 = new Pokemon(150, 'Mewtwo', 'psychic', "", 1, true, 3);
var poke27 = new Pokemon(254, 'Sceptyle', 'grass', "", 3, false, 2);
var poke28 = new Pokemon(386, 'Deoxys', 'psychic', "", 3, true, 4);
var poke29 = new Pokemon(793, 'Nihilego', 'psychic', "", 7, true, 1);
//Array para probar la lista
pokeArray = [poke1, poke2, poke3, poke4, poke5, poke6, poke7, poke8, poke9, poke10, poke11, poke12,
    poke13, poke14, poke15, poke16, poke17, poke18, poke19, poke20, poke21, poke22, poke23, poke24, poke25, poke26, poke27, poke28, poke29];

//Se asigna la imagen del pokemon
for (var i = 0; i < pokeArray.length; i++) {
    pokeArray[i].image = pokeSrc + pokeArray[i].id + ".png";
    pokeArray[i].arrayPos = i;
}
/////////////////////////////////////////////////////////////////////////botonCierre
$(".buttonClose").click(function () { //Cierra la pokedex
    pokeOpen = false;
    $('.mitad1').animate({
        "left": "0px"
    }, "slow");
    $('.mitad2').animate({
        "left": "0px"
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
    hideConfiguration();

});

$(".buttonBack").click(function () { //Cierra la ventana de detalle
    showList();
    showFilters();
    if (pokeDisplayed) {
        hidePokemonDetail();
        pokeDisplayed = false;
    }
    if (engadirDisplayed) {
        hideFormEngadir();
        engadirDisplayed = false;
    }
    if (configDisplayed) {
        hideConfiguration();
        configDisplayed = false;
    }
})

function busquedaIntensa(boolLegend_, type1_, type2_, gen_, name_, id_number) {
    generalFilter = true;
    copyArray = [];
    if (boolLegend_) {
        if (type1_ !== "") {
            if (type2_ !== "") {
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Type1 != 'None y Type2 es None, asi que (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Type 1 == None, asi que para Type 2 !='None': (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)

            if (type2_ !== "") {
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Para Type2 == None: BORRAR TIPOS
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_ && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].gen === gen_) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_) && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary && pokeArray[i].name.includes(name_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].legendary && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].legendary) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        //Borrar Legendarios
        if (type1_ !== "") {
            if (type2_ !== "") {
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].name.includes(name_) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                    ((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                        && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (((pokeArray[i].type1 === type1_ && pokeArray[i].type2 === type2_) || (pokeArray[i].type1 === type2_
                                    && pokeArray[i].type2 === type1_))) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                //Type1 != 'None y Type2 es None, asi que (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (
                                    (pokeArray[i].type1 === type1_ || pokeArray[i].type2 === type1_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Type 1 == None, asi que para Type 2 !='None': (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)

            if (type2_ !== "") {
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].name.includes(name_) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number) &&
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (
                                    (pokeArray[i].type1 === type2_ || pokeArray[i].type2 === type2_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                if (gen_ !== 0) {
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_) && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_ && pokeArray[i].name.includes(name_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].gen === gen_ && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].gen === gen_) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    }
                } else {
                    //Borrar Gen
                    if (name_ !== "") {
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (pokeArray[i].name.includes(name_) && idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            //Borrar ID
                            for (var i = 0; i < pokeArray.length; i++) {
                                if (pokeArray[i].name.includes(name_)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        }
                    } else {
                        //Borrar Nombre
                        if (id_number !== 0) {
                            for (var i = 0; i < pokeArray.length; i++) {
                                var idString = pokeArray[i].id.toString();
                                if (idString.includes(id_number)) {
                                    copyArray.push(pokeArray[i]);
                                }
                            }
                        } else {
                            for (var i = 0; i < pokeArray.length; i++) {
                                copyArray.push(pokeArray[i]);
                            }
                        }
                    }
                }
            }
        }
    }
}


/* FUNCIONES ANTIGUAS
//Crea un nuevo Array en el que guarda los Pokemon legendarios
function filterLegendaries(){
    //legendariesFilter = true;
    legendaryArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].legendary){
            legendaryArray.push(pokeArray[i]);
        }
    }
    //Debugging
    for (var i = 0; i < legendaryArray.length; i++){
        legendaryArray[i].arrayPos = i;
    }
}

//Crea un nuevo Array en el que guarda los Pokemon de la generacion buscada
function filterGen(genNumber){
    genFilter = true;
    genArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].gen === genNumber){
            genArray.push(pokeArray[i]);
        }
    }
}

//Crea un nuevo Array en el que guarda los Pokemon del tipo buscado
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
//Crea un nuevo Array en el que solo introduce los Pokemon que tengan un idnombre con el string introducido
function searchByName(pokeName){
    //Falta evitar que distinga entre mayuscula y minuscula
    nameFilter = true;
    nameArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        if (pokeArray[i].name.includes(pokeName)){
            nameArray.push(pokeArray[i]);
        }
    }
}

//Crea un nuevo Array en el que solo introduce los Pokemon que tengan un id con el numero introducido
function searchById(pokeId){
    idFilter = true;
    idArray = [];
    for (var i = 0; i < pokeArray.length; i++){
        var idString = pokeArray[i].id.toString();
        if (idString.includes(pokeId)){
            idArray.push(pokeArray[i]);
        }
    }
}*/