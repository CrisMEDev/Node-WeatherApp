# Clima app

**Aplicación para verificar cómo está el clima en ciertaregión.**

## Requerimientos
* Crear en el directorio raíz del proyecto el archivo que contendrá los tokens par las peticiones http (Filename: .env)

.env file
```
MAPBOX_TOKEN=MyToken
OPENWEATHER_TOKEN=MyToken
```

### Recursos usados

* Se usó el paquete [inquirer](https://www.npmjs.com/package/inquirer) para crear el menu y pedir inputs de usuario
* Se usó el paquete [colors](https://www.npmjs.com/package/colors) para mejorar la experiencia de usuario
* Se usó el paquete [axios](https://www.npmjs.com/package/axios) para realizar las peticiones http a la API
* Se usó el paquete [dotenv](https://www.npmjs.com/package/dotenv) para establecer las variables de entorno

### Documentación a consultar

Para obtener los tokens y aprender como usar las API's de esta app, visita:

* [Mapbox](https://www.mapbox.com/)
* [MapBox geocoding](https://docs.mapbox.com/api/search/geocoding/)
* [OpenWeather](https://openweathermap.org/)

