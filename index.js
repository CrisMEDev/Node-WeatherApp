const { inquirerMenu, pausa } = require("./helpers/inquirer")




const main = async() => {
    
    let value;

    do {
        value = await inquirerMenu();
        console.log(value);

        if ( value !== 0 ) await pausa();
    } while( value !== 0 );

}


main();
