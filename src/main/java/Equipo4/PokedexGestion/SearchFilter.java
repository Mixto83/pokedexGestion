package Equipo4.PokedexGestion;

public class SearchFilter {//Sirve para controlar los criterios de busqueda o filtros.
	private int pokedexNumber;
	private int gen;
	private String name;
	private String type1;
	private String type2;
	private boolean legendary;
	private boolean sort;
	
	public SearchFilter() {
		super();
		this.pokedexNumber = 0;
		this.gen = 0;
		this.name = "";
		this.type1 = "";
		this.type2 = "";
		this.legendary = false;
		this.sort = true;
	}

	public int getPokedexNumber() {
		return pokedexNumber;
	}

	public void setPokedexNumber(int pokedexNumber) {
		this.pokedexNumber = pokedexNumber;
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

	public boolean isLegendary() {
		return legendary;
	}

	public void setLegendary(boolean legendary) {
		this.legendary = legendary;
	}
	
	public boolean isSort() {
		return sort;
	}

	public void setSort(boolean sort) {
		this.sort = sort;
	}

	@Override
	public String toString() {
		return "Pokemon [pokedexNumber=" + pokedexNumber + ", gen=" + gen + ", name=" + name + ", type1=" + type1
				+ ", type2=" + type2 + ", legendary=" + legendary + ", sort=" + sort + "]";
	}

	
	
}