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

public class MongoDBQueries {
	static JSONArray pokemonList;
	public static MongoDatabase dataBase;
	
	//Inicializacion de la conexion con Mongo. Conecta con MongoDB, crea la BD si no existe y crea la coleccion
		public void initialize() {
			   MongoClient client = new MongoClient("localhost", 27017);
		       dataBase = client.getDatabase("test");
		       //Muestra las bases de datos que hay.
		       MongoCursor<String> dbsCursor = client.listDatabaseNames().iterator();
		       while (dbsCursor.hasNext()) {
		    	   System.out.println(dbsCursor.next());
		       }
		       cleanDB(); //Borramos las colecciones de la base de datos para evitar error de repeticiones
		       dataBase.createCollection("pokemon"); //Creamos la base de datos pokemon
		       //Pedimos que nos muestre por pantalla las colecciones que hay en la base de datos
		       System.out.println("Coleciones de " + dataBase.getName() + ":");
		       MongoIterable<String>  colls = dataBase.listCollectionNames();
		       for (String s : colls) {
				    System.out.println(s);
				}
		}
	
		//Limpia la base de datos, eliminando todas las colecciones que haya en ella.
		//Este metodo no es necesario, pero para la practica conviene tener la base de datos completamente vacia
		public static void cleanDB() {
			MongoIterable<String> colls = dataBase.listCollectionNames();
		       for (String s : colls) {
		    	   MongoCollection<Document> deletableCollection = dataBase.getCollection(s);
		    	   deletableCollection.drop();
				}
		}
	
	//Funcion que recoge el JSON de Pokemon y lo guarda en un JSONArray para luego introducirlo a MongoDB.
	public void getFile(){
		JSONParser jsonParser = new JSONParser();
		
		try (FileReader reader = new FileReader("pokemonBD.json")){
			//Read JSON File
			Object obj = jsonParser.parse(reader);
			pokemonList = (JSONArray) obj;
			//Iterar sobre el array
			for (int i = 0; i < pokemonList.size(); i++) {
				//System.out.print("Iteracion" + i + ": ");
				//System.out.println(pokemonList.get(i));
				JSONToMongo(pokemonList.get(i), dataBase.getCollection("pokemon", Document.class));
			}
		} catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	//Funcion que inserta un objeto Pokemon en la coleccion
	public static void JSONToMongo(Object pokemon, MongoCollection<Document> collection) {
		Document document = Document.parse(pokemon.toString());
		collection.insertOne(document);
	}
	
	//Lectura de la coleccion. Metodo Auxiliar
	public static void readCollection(MongoCollection<Document> collection) {
		System.out.println(collection.toString());
	}
	
	//Recoge la coleccion completa. Se puede eliminar cuando todo vaya bien.
	public void getFromCollection(MongoCollection<Document> _collection) {
		List<Document> pokeList = _collection.find().into(new ArrayList<Document>());
		for (Document a : pokeList) {
			System.out.println(a.toJson());
		}
	}
	
	//Recoge la coleccion con los filtros que se le indiquen
	public List<Document> getWithFilters(boolean _legendary, String _type1, String _type2, int _gen,
			String _name, int _pokedexNumber, MongoCollection<Document> _collection) {
		List<Bson> fields = new ArrayList<>();
		
		if (_legendary) {
			fields.add(new Document("is_legendary", 1));
		}
			
		if (_gen > 0) {
			//No pongo limite porque podemos meter personalizados
			fields.add(new Document("generation", _gen));
		}
			
		if (_name != "") {
			fields.add(new Document("name", _name));
		}
			
		if (_pokedexNumber > 0) {
			//No pongo limite porque podemos meter personalizados
			fields.add(new Document("pokedex_number", _pokedexNumber));
		}
			
		if (_type1 != "" && _type2 != "") {
			List <Bson> typeFields = new ArrayList<>();
			//Consulta a realizar: (tipo1=tipo1 AND tipo2=tipo2) OR (tipo1=tipo2 AND tipo2=tipo1)
			
			typeFields.add(new Document("type1", _type1));
			typeFields.add(new Document("type2", _type2));
			Bson typeFilter1 = new Document("$and", typeFields);//C1: tipo1=tipo1 AND tipo2=tipo2
			typeFields = new ArrayList<>();//Reinicio lista
			typeFields.add(new Document("type1", _type2));
			typeFields.add(new Document("type2", _type1));
			Bson typeFilter2 = new Document("$and", typeFields);//C2: tipo1=tipo2 AND tipo2=tipo1
			typeFields = new ArrayList<>();//Reinicio lista
			typeFields.add(typeFilter1);
			typeFields.add(typeFilter2);
			fields.add(new Document("$or", typeFields));//C1 OR C2	
		}else if (_type1 != "") {
			//Consulta a realizar (tipo1=tipo1) OR (tipo2=tipo1)
			List <Bson> typeFields = new ArrayList<>();
			typeFields.add(new Document("type1", _type1));
			typeFields.add(new Document("type2", _type1));
			fields.add(new Document("$or", typeFields));
		} else if (_type2 != "") {
			//Consulta a realizar (tipo1=tipo2) OR (tipo2=tipo2)
			List <Bson> typeFields = new ArrayList<>();
			typeFields.add(new Document("type1", _type2));
			typeFields.add(new Document("type2", _type2));
			fields.add(new Document("$or", typeFields));
		}
				
		//Aqui se juntan todos
		Bson filter = new Document("$and", fields);

		List<Document> pokeList = _collection.find(filter).into(new ArrayList<Document>());

		return pokeList;
	}
}
