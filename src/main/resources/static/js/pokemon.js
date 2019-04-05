class Pokemon {
	constructor(jsonPokemon){
		//Informacion clave
		this.id = jsonPokemon.pokedex_number;
		this.name = jsonPokemon.name;
		this.type1 = jsonPokemon.type1;
		this.type2 = jsonPokemon.type2;
		this.gen = jsonPokemon.generation;
		if (jsonPokemon.is_legendary){
			this.legendary = true;
		} else {
			this.legendary = false;
		}
		this.abilities = jsonPokemon.abilities;
		this.japanese_name = jsonPokemon.japanese_name;
		
		//Stats de combate
		this.hp = jsonPokemon.hp;
		this.attack = jsonPokemon.attack;
		this.defense = jsonPokemon.defense;
		this.sp_attack = jsonPokemon.sp_attack;
		this.sp_defense = jsonPokemon.sp_defense;
		this.speed = jsonPokemon.speed;
		
		//Stats de otro tipo
		this.base_total = jsonPokemon.base_total;
		this.base_egg_steps = jsonPokemon.base_egg_steps;
		this.base_happiness = jsonPokemon.base_happiness;
		this.capture_rate = jsonPokemon.capture_rate;
		this.classfication = jsonPokemon.classfication;
		this.experience_growth = jsonPokemon.experience_growth;
		this.height_m = jsonPokemon.height_m;
		this.weight_kg = jsonPokemon.weight_kg;
		this.percentage_male = jsonPokemon.percentage_male;
		
		//Debilidades
		this.against_normal = jsonPokemon.against_normal;
		this.against_electric = jsonPokemon.against_electric;
		this.against_water = jsonPokemon.against_water;
		this.against_fire = jsonPokemon.against_fire;
		this.against_grass = jsonPokemon.against_grass;
		this.against_bug = jsonPokemon.against_bug;
		this.against_fight = jsonPokemon.against_fight; 
		this.against_flying = jsonPokemon.against_flying;
		this.against_poison = jsonPokemon.against_poison;
		this.against_ghost = jsonPokemon.against_ghost;
		this.against_psychic = jsonPokemon.against_psychic;
		this.against_rock = jsonPokemon.against_rock;
		this.against_ground = jsonPokemon.against_ground;
		this.against_ice = jsonPokemon.against_ice;
		this.against_dragon = jsonPokemon.against_dragon;
		this.against_steel = jsonPokemon.against_steel;
		this.against_dark = jsonPokemon.against_dark;
		this.against_fairy = jsonPokemon.against_fairy;

		this.nForms = 0;
    }
    
    setImages(_src){
        this.image = _src + this.id + ".png";
    }

    setArrayPos(_pos){
        this.arrayPos = _pos;
    }
		
	toString(){
	        return "id: " + this.id + ", name: " + this.name + ", type1: " + this.type1 + ", type2: " + this.type2
	        +", gen: " + this.gen + ", legendary: " + this.legendary + ", nForms: " + this.nForms + ", arrayPos: " 
	        + this.arrayPos;
	    }
	}