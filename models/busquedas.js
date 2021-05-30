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

}


module.exports = Busquedas;