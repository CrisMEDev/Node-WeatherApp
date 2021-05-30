const axios = require('axios');

class Busquedas {

    historial = ['Guanajuato', 'Tamaulipas', 'Veracruz'];

    constructor(){
        // TODO: leer DB si existe
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

}


module.exports = Busquedas;