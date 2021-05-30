const axios = require('axios');

class Busquedas {

    historial = ['Guanajuato', 'Tamaulipas', 'Veracruz'];

    constructor(){
        // TODO: leer DB si existe
    }

    async ciudad( lugar = '' ){

        try {

            // peticion http
            // console.log('Ciudad', lugar);
            
            const respuesta = await axios.get('https://reqres.in/api/users?page=2');
            console.log(respuesta.data);
            
            return []; // Retornar arreglo con lugares que conincidan con la búsqueda
            
        } catch(err){
            return [];
        }

    }

}


module.exports = Busquedas;