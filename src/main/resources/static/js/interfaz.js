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
var ordenAscValue = true;
var backupDone = false;


var youNeedSlice = false;
var queryString;
var pokePrueba;

var pokeSrc = "assets/pokemon_images/";

var pokeArray = [];
initDataBase();

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