package Equipo4.PokedexGestion;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.Sorts;

public class MongoDBQueries {
	
	public static MongoDatabase dataBase;//Base de datos con la que trabaja el servidor
	
	
		public void initialize() {//Inicializacion de la conexion con Mongo. Conecta con MongoDB, crea la BD si no existe y crea la coleccion
			   MongoClient client = new MongoClient("localhost", 27017);//Establece nuevo cliente
		       dataBase = client.getDatabase("test");//Obtiene o Crea la BD sobre la que trabajar
		       
		       MongoCursor<String> dbsCursor = client.listDatabaseNames().iterator();
		       while (dbsCursor.hasNext()) {
		    	   System.out.println(dbsCursor.next());//Muestra las bases de datos
		       }
		       
		       cleanDB(); //Borra las colecciones de la base de datos para evitar errores
		       dataBase.createCollection("pokemon"); //Crea la coleccion pokemon
		       System.out.println("Coleciones de " + dataBase.getName() + ":");
		       MongoIterable<String>  colls = dataBase.listCollectionNames();
		       for (String s : colls) {
				    System.out.println(s);//Muestra por pantalla las colecciones que hay en la BD
				}
		}
	
		public static void cleanDB() {//Elimina todas las colecciones de la Base de Datos
			MongoIterable<String> colls = dataBase.listCollectionNames();
		       for (String s : colls) {
		    	   MongoCollection<Document> deletableCollection = dataBase.getCollection(s);
		    	   deletableCollection.drop();
				}
		}
	
	public void getFile(){//Recoge el fichero de Pokemon y lo guarda en un JSONArrays
		JSONParser jsonParser = new JSONParser();
		JSONArray pokemonList;//Array que recoge el objeto Pokemon
		try (FileReader reader = new FileReader("pokemonBD.json")){
			Object obj = jsonParser.parse(reader);//Read JSON File
			pokemonList = (JSONArray) obj;		
			for (int i = 0; i < pokemonList.size(); i++) {//Iterar sobre el array
				JSONToMongo(pokemonList.get(i), dataBase.getCollection("pokemon", Document.class));//Pasa cada objeto JSON a la coleccion
			}
		} catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	public static void JSONToMongo(Object pokemon, MongoCollection<Document> collection) {//Inserta un objeto Pokemon en la coleccion
		Document document = Document.parse(pokemon.toString());
		collection.insertOne(document);
	}
		
	public List<Document> getWithFilters(boolean _legendary, String _type1, String _type2, int _gen,
			String _name, int _pokedexNumber, boolean _sort, MongoCollection<Document> _collection) {	//Recoge la coleccion con los filtros que se le indiquen
		List<Bson> fields = new ArrayList<>();//Lista donde se van a guardar los filtros de busqueda
		boolean notNull = false;//Flag que comprueba si se ha aplicado al menos un filtro
		
		if (_legendary) {//Filtrar "solo Pokemon legendarios"
			fields.add(new Document("is_legendary", 1));
			notNull = true;
		}
			
		if (_gen > 0) {//Filtrar por generacion
			fields.add(new Document("generation", _gen));
			notNull = true;
		}
			
		if (_name != "") {//Filtrar por nombre
			fields.add(new Document("name", _name));
			notNull = true;
		}
			
		if (_pokedexNumber > 0) {//Filtrar por numero de pokedex
			fields.add(new Document("pokedex_number", _pokedexNumber));
			notNull = true;
		}
			
		if (_type1 != "" && _type2 != "") {
			List <Bson> typeFields = new ArrayList<>();
			//Consulta a realizar: (tipo1=tipo1 AND tipo2=tipo2) OR (tipo1=tipo2 AND tipo2=tipo1)
			typeFields.add(new Document("type1", _type1));//A1 => tipo1 = tipo1
			typeFields.add(new Document("type2", _type2));//A2 => tipo2 = tipo2
			Bson typeFilter1 = new Document("$and", typeFields);//C1 => A1 and A2
			typeFields = new ArrayList<>();//Reinicio lista
			typeFields.add(new Document("type1", _type2));//B1 => tipo1 = tipo2
			typeFields.add(new Document("type2", _type1));//B2 => tipo2 = tipo1
			Bson typeFilter2 = new Document("$and", typeFields);//C2 => B1 and B2
			typeFields = new ArrayList<>();//Reinicio lista
			typeFields.add(typeFilter1);//C1
			typeFields.add(typeFilter2);//C2
			fields.add(new Document("$or", typeFields));//FIN => C1 OR C2	
			notNull = true;
		}else if (_type1 != "") {
			//Consulta a realizar (tipo1=tipo1) OR (tipo2=tipo1)
			List <Bson> typeFields = new ArrayList<>();
			typeFields.add(new Document("type1", _type1));//A => tipo1 = tipo1
			typeFields.add(new Document("type2", _type1));//B => tipo2 = tipo1
			fields.add(new Document("$or", typeFields));//FIN => A OR B
			notNull = true;
		} else if (_type2 != "") {
			//Consulta a realizar (tipo1=tipo2) OR (tipo2=tipo2)
			List <Bson> typeFields = new ArrayList<>();
			typeFields.add(new Document("type1", _type2));//A => tipo1 = tipo2
			typeFields.add(new Document("type2", _type2));//B => tipo2 = tipo2
			fields.add(new Document("$or", typeFields));//FIN => A OR B
			notNull = true;
		}
		
		Bson sort;//Ordenacion en funcion del numero de la pokedex
		if (!_sort) {
			sort = Sorts.descending("pokedex_number");
		} else {
			sort = Sorts.ascending("pokedex_number");
		}
		
		List<Document> pokeList = new ArrayList<>();//Lista de pokemon a devolver
		
		if (notNull) {//Se juntan todos los filtros en una unica query
			Bson filter = new Document("$and", fields);
			pokeList = _collection.find(filter).sort(sort).into(new ArrayList<Document>());
		} else {//Si no se ha aplicado ningun filtro, se llama a find() sin parametros
			pokeList = _collection.find().sort(sort).into(new ArrayList<Document>());
		}
		return pokeList;//Devuelve la lista
	}
}
