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
import com.mongodb.util.JSON;

@RestController
public class PeticionesRest {

MongoDBQueries handler;//Objeto de la clase que maneja las queries de MongoDB
	
	@RequestMapping(value="/pokemon", method =RequestMethod.GET)
	public boolean initDataBase() {//Inicializacion de la BD. Solo llamado una vez al iniciar la aplicacion
		boolean done = false;
		handler = new MongoDBQueries();//Inicializacion del objeto
		handler.initialize();//Inicializacion de la BD y la coleccion
		handler.getFile();//Lectura del fichero JSON e introduccion en la coleccion
		done = true;
		return done;
	}
	
	@RequestMapping(value="/pokemon", method = RequestMethod.PUT)
	public List<Document> getPokemonList( @RequestBody SearchFilter poke){
		MongoCollection<Document> pokemon = handler.dataBase.getCollection("pokemon");//Coleccion a usar
		List<Document> pokemonList = new ArrayList<>();//Lista a devolver
		pokemonList = handler.getWithFilters(poke.isLegendary(), poke.getType1(), poke.getType2(), 
				poke.getGen(), poke.getName(), poke.getPokedexNumber(), poke.isSort(), pokemon);
				//Llamada al metodo que devuelve los Pokemon bajo los filtros indicados.
		for (Document p: pokemonList)
			System.out.println(p.toJson());//Muestra por consola
		return pokemonList;//Devuelve la lista al cliente
	}
	
	@RequestMapping(value="/pokemon", method = RequestMethod.POST)
	public boolean insertPokemon(@RequestBody Pokemon poke) {
		boolean done = false;
		MongoCollection<Document> pokemon = handler.dataBase.getCollection("pokemon", Document.class);//Coleccion a usar
		System.out.println("Pokemon a insertar:");
		System.out.println(poke.toString());
		Object pokeString = poke.toString();
		handler.insertPokemon(pokeString, pokemon);//Llama al metodo que introduce un Pokemon en la lista
		done = true;
		return done;
	}
	
	@RequestMapping(value="/pokemon", method = RequestMethod.DELETE)
	public boolean deletePokemon(@RequestBody SearchFilter poke) {
		boolean done = false;
		MongoCollection<Document> pokemon = handler.dataBase.getCollection("pokemon");//Coleccion a usar
		Bson filter = new Document("name", poke.getName());//Filtro que recoge el nombre del pokemon a borrar
		pokemon.findOneAndDelete(filter);//Borra el pokemon con el nombre indicado
		done = true;
		return done;
	}
	
}