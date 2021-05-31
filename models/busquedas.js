const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    bdPath = './DB/weather_database.json'

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){

        // \w: cualquier letra del abecedario (mayuscula o minuscula), numero o _
        // \S: cualquier cosa que no sea un espacio.
        // * (hacerlo varias veces, de 0 a muchas)

        return this.historial.map( lugar => {

            return lugar.replace( /\w\S*/g, function( texto ){
                return texto.charAt(0).toUpperCase() + texto.substr(1).toLowerCase();
            });
        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_TOKEN,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenweather(){
        return {
            'appid': process.env.OPENWEATHER_TOKEN,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad( lugar = '' ){

        try {

            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });
            
            const respuesta = await instance.get();

            return respuesta.data.features.map( lugar => ({    // Para retornar un objeto de forma implicita se usó 'lugar => ({})' en lugar de 'lugar => {}'
                
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            })); // Retornar arreglo con lugares que conincidan con la búsqueda
            
        } catch(err){
            return [];
        }

    }

    async climaPorLugar( lat, lon ){

        try{
            
            // instance de axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenweather, lat, lon } // Se aplica desestructuracion par apoder enviar lat y long como parametros
            });

            // resp.data
            const respuesta = await instance.get();

            return {        // Datos de clima para el usuario
                desc: respuesta.data.weather[0].description,
                min: respuesta.data.main.temp_min,
                max: respuesta.data.main.temp_max,
                temp: respuesta.data.main.temp
            }

        } catch(error){
            throw error;
        }

    }

    agregarHistorial( lugar = '' ){
        // Prevenir duplicados
        if ( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0, 7)    // Para mantener solo los ultimos 7 registros

        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en una base de datos
        this.guardarBD();
    }

    guardarBD(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.bdPath, JSON.stringify( payload ) );

    }

    leerDB(){

        // Verificar si existe la DB y cargar la informacion si existe
        if ( !fs.existsSync( this.bdPath ) ) return;

        const info = fs.readFileSync( this.bdPath, { encoding: 'utf-8' } );
        const data = JSON.parse( info );

        this.historial = data.historial;

    }

}


module.exports = Busquedas;