package Equipo4.PokedexGestion;

import java.util.Arrays;

import com.mongodb.util.JSON;
public class Pokemon {
	private int pokedex_number;
	private int gen;
	private String name;
	private String type1;
	private String type2;
	private int legendary;
	
	private String[] abilities;
	private String japanese_name;
	
	private int hp;
	private int attack;
	private int defense;
	private int sp_attack;
	private int sp_defense;
	private int speed;
	
	private int base_total;
	private int base_egg_steps;
	private int base_happiness;
	private int capture_rate;
	private String classfication;
	private int experience_growth;
	private double height_m;
	private double weight_kg;
	private double percentage_male;
	
	private double against_normal;
	private double against_electric;
	private double against_water;
	private double against_fire;
	private double against_grass;
	private double against_bug;
	private double against_fight;
	private double against_flying;
	private double against_poison;
	private double against_ghost;
	private double against_psychic;
	private double against_rock;
	private double against_ground;
	private double against_ice;
	private double against_dragon;
	private double against_steel;
	private double against_dark;
	private double against_fairy;
	
	
	public Pokemon() {
		super();
	}
	public int getPokedex_Number() {
		return pokedex_number;
	}
	public void setPokedex_Number(int pokedex_number) {
		this.pokedex_number = pokedex_number;
	}
	public int getGen() {
		return gen;
	}
	public void setGen(int gen) {
		this.gen = gen;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType1() {
		return type1;
	}
	public void setType1(String type1) {
		this.type1 = type1;
	}
	public String getType2() {
		return type2;
	}
	public void setType2(String type2) {
		this.type2 = type2;
	}
	
	public int getLegendary() {
		return legendary;
	}
	public void setLegendary(int legendary) {
		this.legendary = legendary;
	}
	public String[] getAbilities() {
		return abilities;
	}
	public void setAbilities(String[] abilities) {
		this.abilities = abilities;
	}
	public String getJapanese_name() {
		return japanese_name;
	}
	public void setJapanese_name(String japanese_name) {
		this.japanese_name = japanese_name;
	}
	public int getHp() {
		return hp;
	}
	public void setHp(int hp) {
		this.hp = hp;
	}
	public int getAttack() {
		return attack;
	}
	public void setAttack(int attack) {
		this.attack = attack;
	}
	public int getDefense() {
		return defense;
	}
	public void setDefense(int defense) {
		this.defense = defense;
	}
	public int getSp_attack() {
		return sp_attack;
	}
	public void setSp_attack(int sp_attack) {
		this.sp_attack = sp_attack;
	}
	public int getSp_defense() {
		return sp_defense;
	}
	public void setSp_defense(int sp_defense) {
		this.sp_defense = sp_defense;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public int getBase_total() {
		return base_total;
	}
	public void setBase_total(int base_total) {
		this.base_total = base_total;
	}
	public int getBase_egg_steps() {
		return base_egg_steps;
	}
	public void setBase_egg_steps(int base_egg_steps) {
		this.base_egg_steps = base_egg_steps;
	}
	public int getBase_happiness() {
		return base_happiness;
	}
	public void setBase_happiness(int base_happiness) {
		this.base_happiness = base_happiness;
	}
	public int getCapture_rate() {
		return capture_rate;
	}
	public void setCapture_rate(int capture_rate) {
		this.capture_rate = capture_rate;
	}
	public String getClassfication() {
		return classfication;
	}
	public void setClassfication(String classfication) {
		this.classfication = classfication;
	}
	public int getExperience_growth() {
		return experience_growth;
	}
	public void setExperience_growth(int experience_growth) {
		this.experience_growth = experience_growth;
	}
	public double getHeight_m() {
		return height_m;
	}
	public void setHeight_m(double height_m) {
		this.height_m = height_m;
	}
	public double getWeight_kg() {
		return weight_kg;
	}
	public void setWeight_kg(double weight_kg) {
		this.weight_kg = weight_kg;
	}
	public double getPercentage_male() {
		return percentage_male;
	}
	public void setPercentage_male(double percentage_male) {
		this.percentage_male = percentage_male;
	}
	public double getAgainst_normal() {
		return against_normal;
	}
	public void setAgainst_normal(double against_normal) {
		this.against_normal = against_normal;
	}
	public double getAgainst_electric() {
		return against_electric;
	}
	public void setAgainst_electric(double against_electric) {
		this.against_electric = against_electric;
	}
	public double getAgainst_water() {
		return against_water;
	}
	public void setAgainst_water(double against_water) {
		this.against_water = against_water;
	}
	public double getAgainst_fire() {
		return against_fire;
	}
	public void setAgainst_fire(double against_fire) {
		this.against_fire = against_fire;
	}
	public double getAgainst_grass() {
		return against_grass;
	}
	public void setAgainst_grass(double against_grass) {
		this.against_grass = against_grass;
	}
	public double getAgainst_bug() {
		return against_bug;
	}
	public void setAgainst_bug(double against_bug) {
		this.against_bug = against_bug;
	}
	public double getAgainst_fight() {
		return against_fight;
	}
	public void setAgainst_fight(double against_fight) {
		this.against_fight = against_fight;
	}
	public double getAgainst_flying() {
		return against_flying;
	}
	public void setAgainst_flying(double against_flying) {
		this.against_flying = against_flying;
	}
	public double getAgainst_poison() {
		return against_poison;
	}
	public void setAgainst_poison(double against_poison) {
		this.against_poison = against_poison;
	}
	public double getAgainst_ghost() {
		return against_ghost;
	}
	public void setAgainst_ghost(double against_ghost) {
		this.against_ghost = against_ghost;
	}
	public double getAgainst_psychic() {
		return against_psychic;
	}
	public void setAgainst_psychic(double against_psychic) {
		this.against_psychic = against_psychic;
	}
	public double getAgainst_rock() {
		return against_rock;
	}
	public void setAgainst_rock(double against_rock) {
		this.against_rock = against_rock;
	}
	public double getAgainst_ground() {
		return against_ground;
	}
	public void setAgainst_ground(double against_ground) {
		this.against_ground = against_ground;
	}
	public double getAgainst_ice() {
		return against_ice;
	}
	public void setAgainst_ice(double against_ice) {
		this.against_ice = against_ice;
	}
	public double getAgainst_dragon() {
		return against_dragon;
	}
	public void setAgainst_dragon(double against_dragon) {
		this.against_dragon = against_dragon;
	}
	public double getAgainst_steel() {
		return against_steel;
	}
	public void setAgainst_steel(double against_steel) {
		this.against_steel = against_steel;
	}
	public double getAgainst_dark() {
		return against_dark;
	}
	public void setAgainst_dark(double against_dark) {
		this.against_dark = against_dark;
	}
	public double getAgainst_fairy() {
		return against_fairy;
	}
	public void setAgainst_fairy(double against_fairy) {
		this.against_fairy = against_fairy;
	}

	@Override
	public String toString() {
		return "Pokemon [pokedex_number=" + pokedex_number + ", gen=" + gen + ", name=" + name + ", type1=" + type1
				+ ", type2=" + type2 + ", legendary=" + legendary + ", abilities=" + Arrays.toString(abilities)
				+ ", japanese_name=" + japanese_name + ", hp=" + hp + ", attack=" + attack + ", defense=" + defense
				+ ", sp_attack=" + sp_attack + ", sp_defense=" + sp_defense + ", speed=" + speed + ", base_total="
				+ base_total + ", base_egg_steps=" + base_egg_steps + ", base_happiness=" + base_happiness
				+ ", capture_rate=" + capture_rate + ", classfication=" + classfication + ", experience_growth="
				+ experience_growth + ", height_m=" + height_m + ", weight_kg=" + weight_kg + ", percentage_male="
				+ percentage_male + ", against_normal=" + against_normal + ", against_electric=" + against_electric
				+ ", against_water=" + against_water + ", against_fire=" + against_fire + ", against_grass="
				+ against_grass + ", against_bug=" + against_bug + ", against_fight=" + against_fight
				+ ", against_flying=" + against_flying + ", against_poison=" + against_poison + ", against_ghost="
				+ against_ghost + ", against_psychic=" + against_psychic + ", against_rock=" + against_rock
				+ ", against_ground=" + against_ground + ", against_ice=" + against_ice + ", against_dragon="
				+ against_dragon + ", against_steel=" + against_steel + ", against_dark=" + against_dark
				+ ", against_fairy=" + against_fairy + "]";
	}
	
}
