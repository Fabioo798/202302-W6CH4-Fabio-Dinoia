# Week 6 - Challenge 4
### Calculadora WebService
Crea una calculadora en Node en forma de web.

El programa debe recibir dos números por query params (p.e. http://localhost:8000/calculator?a=6&b=3), y devolver el siguiente HTML:

### Resultados:

6 + 3 = 9

6 - 3 = 3

6 * 3 = 18

6 / 3 = 2

Si el usuario no ha proporcionado alguno de los números o éstos no son de tipo número, la aplicación debe devolver un HTML con un mensaje de error e interrumpir la ejecución del programa con un código de error.

La app debe abrirse en un puerto por defecto que esté configurado como variable de entorno, pero también se tiene que poder decir expresamente por línea de comandos en qué puerto queremos que se abra (p.e., node . --port 4000). Usar el paquete commander.

Si la request no va a /calculator, la app debe responder con un 404.

### Opción extra
Recoger los números en un formulario y recalcular los valores, utilizando SOLO vanila TS

# API REST Things I already know
Crea una API REST que se conecte a un fichero JSON, para manipular recursos de tipo cosas que ya sé. El JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp. Duplica el fichero JSON de datos para que una sea la de pruebas y otra la de producción.

La API REST debe tener los siguientes endpoints:

[GET] /things -> devuelve el array de cosas que ya sé

[GET] /things/:idThing -> devuelve una cosa que ya sé

[DELETE] /things/:idThing -> borra una cosa que ya sé

[POST] /things -> crea una cosa que ya sé (la recibe en el body)

[PATCH] /things -> modifica una cosa que ya sé (la recibe en el body)

### Opción extra
Para iniciar la API, el programa debe mostrarle al usuario las siguientes preguntas (utiliza el paquete inquirer):

¿En qué puerto quieres que se inicie la API? (respuesta por defecto: 4000)
¿Qué fichero quieres usar? (pregunta con varias opciones, una única respuesta)
Pruebas
Producción
¿Quieres permitir que los clientes puedan crear, borrar y modificar? (respuesta de sí o no)

## Stopper

when implement GET with id, it compiles and it open the server run on port, but when i inser an id this error occur:

```node.js
ode:_http_outgoing:644
    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:387:5)
    at ServerResponse.setHeader (node:_http_outgoing:644:11)
    at Server.<anonymous> (file:///C:/Users/Fabio/OneDrive%20-%20students.uninettunouniversity.net/Documenti/ISDI%20-%20Curso/202302-w6ch4-fabio-dinoia/dist/index.js:24:11)
    at Server.emit (node:events:513:28)
    at parserOnIncoming (node:_http_server:998:12)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:128:17) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
```
