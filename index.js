const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");




const main = async() => {
    
    const busquedas = new Busquedas();
    let value;


    do {
        value = await inquirerMenu();
        
        switch( value ){
            case 1:
                // Mostrar mensaje para escribir
                const lugar = await leerInput('Dame una ciudad: ');
                console.log(lugar);

                // Buscar lugares
                // Selecionar el lugar
                // Datos del clima
                // Mostrar resultados
                console.log('\nInformacion de la cuidad\n'.green);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng');
                console.log('Temperatura');
                console.log('Minima:');
                console.log('Maxima:');
                break;
            case 2:
        }

        if ( value !== 0 ) await pausa();
    } while( value !== 0 );

}


main();
