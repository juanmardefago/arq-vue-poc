### Accommodations Vue App

#### Live version: http://arq1-app.mooo.com

#### Stack
Esta app utiliza un stack similar a MEAN pero con Vue en lugar del viejo Angular, y con Feathers (que es un framework sobre express) para simplificar la generacion del CRUD.

##### Frontend

* [Vue](https://vuejs.org/)

##### Backend

* [Feathers](https://feathersjs.com/) para generar el CRUD.
* [MongoDB](https://www.mongodb.com/) como base de datos.

### Repositorio

Para mantener todo el codigo compatible entre el frontend y el backend, sin tener que matchear versiones, y debido a que somos pocos desarolladores, decidimos utilizar una estrategia mono-repository para nuestro versionado.

### Cómo levantar la app?

En el root del mono-repository se encuentra un package.json con algunos script para levantar la app, correr el linter en ambos proyetos, y demás.

Si bien levantar el proyecto con el script del root es más simple, dado que se encarga de levantar ambos repos con un parallel session, recomendamos levantar cada uno de los proyectos por separado, para poder tener en diferentes sesiones la consola y poder acceder a los logs de ambos servicios.

#### Para levantarlo desde root:

`npm run start`

#### Para levantar el frontend solo:

`cd frontend && npm run serve`

Esto levanta la version development con hot-reload.

#### Para levantar el backend solo:

`cd backend && npm run start`

### Dockerfiles

Ambos servicios cuentan con un Dockerfile para generar sus respectivas imagenes de docker.

Estos son usados también en el CI del proyecto, para generar las imagenes de producción y pushearlas a dockerhub.

### docker-compose

El proyecto cuenta con un docker-compose.yml, pero este fue pensado para utilizar en el deploy, no para un ambiente de desarrollo, dado que utiliza las imagenes generadas para producción por el CI.
