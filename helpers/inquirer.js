require('colors');
const inquirer = require('inquirer');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        suffix: 'Use las flechas arriba y abajo',
        choices: [

            {
                value: '1',
                name: `${'1.'.blue.italic.bold} ${'Crear tarea'.italic.magenta}`
            },
            {
                value: '2',
                name: `${'2.'.blue.italic.bold} ${'Listar tareas'.italic.magenta}`
            },
            {
                value: '3',
                name: `${'3.'.blue.italic.bold} ${'Listar tareas completadas'.italic.magenta}`
            },
            {
                value: '4',
                name: `${'4.'.blue.italic.bold} ${'Listar tareas pendientes'.italic.magenta}`
            },
            {
                value: '5',
                name: `${'5.'.blue.italic.bold} ${'Completar tarea(s)'.italic.magenta}`
            },
            {
                value: '6',
                name: `${'6.'.blue.italic.bold} ${'Borrar tarea'.italic.magenta}`
            },
            {
                value: '0',
                name: `${'0.'.blue.italic.bold} ${'Salir'.italic.magenta}`
            }
            
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('**************************'.cyan);
    console.log('  Seleccione una opción'.green);
    console.log('**************************\n'.cyan);

    // De acuerdo al name asignado, se aplica desestructuración de objetos
    const {opcion} = await inquirer.prompt(menuOptions);

    return opcion;
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.yellow} para continuar`
        }
    ];

    await inquirer.prompt(question);

}

const leerInput = async( mensaje ) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate( value ){
                if ( value.length === 0 ){
                    return 'Por favor, ingrese una tarea';
                }
                return true;    // La validación pasó
            }

        }
    ];

    const { descripcion } = await inquirer.prompt(question);
    return descripcion;
}

const listadoBorrarTareas = async(tareas = []) => {
    const choices = tareas.map( ( tarea, i ) => {
        return {
            value: tarea.id,
            name: `${ i + 1 }. ${ tarea.descripcion }`.cyan
        }
    });

    choices.unshift({
        value: '0',
        name: `0. Cancelar`.cyan
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}

const mostrarListadoChecks = async(tareas = []) => {
    const choices = tareas.map( ( tarea, i ) => {
        return {
            value: tarea.id,
            name: `${ i + 1 }. ${ tarea.descripcion }`.cyan,
            checked: ( tarea.completadoEn ) ? true : false      // Marca las tareas completadas
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTareas,
    confirmar,
    mostrarListadoChecks
}

