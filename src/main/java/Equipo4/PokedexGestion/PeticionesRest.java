package Equipo4.PokedexGestion;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@RestController
public class PeticionesRest {

	@RequestMapping(value="/test", method = RequestMethod.PUT)
	public List<Document> getPokemonList( @RequestBody Pokemon poke){
		System.out.println(poke.toString());
		System.out.println("dddddddd");
		MongoDBQueries handler = new MongoDBQueries();
		handler.initialize();//Inicializo BD y coleccion
		handler.getFile();//Recojo json e inserto en coleccion
		MongoCollection<Document> pokemon = handler.dataBase.getCollection("pokemon");//Manejo coleccion
		List<Document> pokemonList = new ArrayList<>();
		//pokemonList = handler.getWithFilters(_legendary, _type1, _type2, _gen, _name, _pokedexNumber, pokemon);
		pokemonList = handler.getWithFilters(poke.isLegendary(), poke.getType1(), poke.getType2(), 
				poke.getGen(), poke.getName(), poke.getPokedexNumber(), pokemon);

		for (Document p: pokemonList)
			System.out.println(p.toJson());
		return pokemonList;
	}
	
}