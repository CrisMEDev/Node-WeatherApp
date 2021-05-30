require('dotenv').config()      // Carga el archivo .env y crea las respectivas variables de entorno

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    const busquedas = new Busquedas();
    let value;


    do {
        value = await inquirerMenu();
        
        switch( value ){
            case 1:
                // Mostrar mensaje para escribir
                const busqueda = await leerInput('Dame una ciudad: ');
                
                // Buscar lugares
                const lugares = await busquedas.ciudad( busqueda );
                
                // Selecionar el lugar
                const idLugarSeleccionado = await listarLugares( lugares );
                if ( idLugarSeleccionado === '0' ) continue;

                const lugarSeleccionado = lugares.find( lugar => lugar.id === idLugarSeleccionado );

                // Guardar en DB
                busquedas.agregarHistorial( lugarSeleccionado.nombre );

                // Datos del clima
                const clima = await busquedas.climaPorLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la cuidad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre );
                console.log('Lat:', lugarSeleccionado.lat );
                console.log('Lng', lugarSeleccionado.lng );
                console.log('Temperatura: ', clima.temp);
                console.log('Descripcion: ', clima.desc);
                console.log('Minima: ', clima.min);
                console.log('Maxima: ', clima.max);
                break;
            case 2:
                busquedas.historial.forEach( ( lugar, index ) => {
                    console.log(`${index + 1}. ${ lugar }`.blue);
                });


                break;
        }

        if ( value !== 0 ) await pausa();
    } while( value !== 0 );

}


main();
