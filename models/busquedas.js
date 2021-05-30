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
            console.log(respuesta.data);
            
            return []; // Retornar arreglo con lugares que conincidan con la búsqueda

        } catch(err){
            return [];
        }

    }

}


module.exports = Busquedas;