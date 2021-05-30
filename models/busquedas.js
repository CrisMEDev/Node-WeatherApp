class Busquedas {

    historial = ['Guanajuato', 'Tamaulipas', 'Veracruz'];

    constructor(){
        // TODO: leer DB si existe
    }

    async ciudad( lugar = '' ){
        // peticion http
        console.log(lugar);

        return []; // Retornar arreglo con lugares que conincidan con la búsqueda
    }

}


module.exports = Busquedas;