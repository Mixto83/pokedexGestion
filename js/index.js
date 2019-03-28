class Pokemon {
    constructor(id, name, type1, type2, gen, legendary, nForms){
        this.id = id;
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.gen = gen;
        this.legendary = legendary;
        this.nForms = nForms;
    }

    toString(){
        return "id: " + this.id + ", name: " + this.name + ", type1: " + this.type1 + ", type2: " + this.type2
        +", gen: " + this.gen + ", legendary: " + this.legendary + ", nForms: " + this.nForms + ", arrayPos: " 
        + this.arrayPos;
    }
}

//Constructor con todos los elementos de la base de datos
function createPrueba(){
    pokePrueba = new Pokemon();
    pokePrueba.abilities = "['MarLlamas', 'Torrente']";
    pokePrueba.fire = 1;
    pokePrueba.water = 1;
    pokePrueba.grass = 1;
    pokePrueba.electric = 1;
    pokePrueba.psychic = 1;
    pokePrueba.ghost = 1;
    pokePrueba.fight = 1;
    pokePrueba.normal = 1;
    pokePrueba.flying = 1;
    pokePrueba.ground = 1;
    pokePrueba.rock = 1;
    pokePrueba.poison = 1;
    pokePrueba.bug = 1;
    pokePrueba.ice = 1;
    pokePrueba.dragon = 1;
    pokePrueba.dark = 1;
    pokePrueba.steel = 1;
    pokePrueba.fairy = 1;
    pokePrueba.eggSteps = 200;
    pokePrueba.happiness = 200;
    pokePrueba.baseTotal = 200;
    pokePrueba.captureRate = 200;
    pokePrueba.classification = "\"Esto es una descripcion\"";
    pokePrueba.defense = 200;
    pokePrueba.spAttack = 200;
    pokePrueba.speed = 200;
    pokePrueba.hp = 200;
    pokePrueba.spDefense = 200;
    pokePrueba.expGrowth = 200;
    pokePrueba.height = 200;
    pokePrueba.japName = "\"Marshadow en Japones\"";
    pokePrueba.name = "\"Marshadow\"";
    pokePrueba.percMale = 50;
    pokePrueba.id = 802;
    pokePrueba.type1 = "\"fighting\"";
    pokePrueba.type2 = "\"ghost\"";
    pokePrueba.weight = 50;
    pokePrueba.gen = 5;
    pokePrueba.legendaryNum = 1;
}

