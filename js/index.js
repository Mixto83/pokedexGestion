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



