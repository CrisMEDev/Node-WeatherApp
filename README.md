# Clima app

Aplicación para verificar cómo está el clima en ciertaregión.

## Requerimientos
* Crear en el directorio raíz del proyecto el archivo que contendrá los tokens par las peticiones http

tokens.js
```
mapbox_token = 'MyToken';


module.exports = {
    mapbox_token
}
```

### Recursos usados

* Se usó el paquete [inquirer](https://www.npmjs.com/package/inquirer) para crear el menu y pedir inputs de usuario
* Se usó el paquete [colors](https://www.npmjs.com/package/colors) para mejorar la experiencia de usuario
* Se usó el paquete [axios](https://www.npmjs.com/package/axios) para realizar las peticiones http a la API

