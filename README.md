# World Cup Sticker Tracker - Backend

API REST para el tracker de estampillas del Mundial.

Este repositorio contendra el backend del proyecto, construido con Node.js, Express y PostgreSQL.

## Estado actual

El backend ya cuenta con Express, conexion a PostgreSQL usando `pg`, Docker Compose para levantar la base de datos y CRUD completo de estampillas.

Tambien incluye busqueda, filtros, ordenamiento y paginacion para `GET /stickers`.

## Instalacion

```bash
npm install
```

## Modo desarrollo

```bash
npm run dev
```

## Modo produccion

```bash
npm start
```

## Base de datos con Docker

Por ahora Docker se usa solamente para levantar PostgreSQL. El backend todavia se ejecuta localmente con `npm run dev`.

Levantar PostgreSQL:

```bash
docker compose up -d
```

Verificar el servicio:

```bash
docker compose ps
```

Detener PostgreSQL:

```bash
docker compose down
```

Datos de conexion:

- Host: `localhost`
- Puerto: `5432`
- Base de datos: `world_cup_stickers`
- Usuario: `postgres`
- Contrasena: `postgres`

## Esquema de base de datos

La tabla principal sera `stickers`. Esta tabla guardara la informacion basica de cada estampilla: numero, nombre, pais, posicion, cantidad y notas.

El campo `quantity` define el estado de la estampilla:

- `0`: faltante
- `1`: conseguida
- Mayor a `1`: repetida

El script del esquema se encuentra en `src/db/schema.sql`.

Ejecutar el esquema dentro del contenedor de PostgreSQL:

```bash
docker exec -i world-cup-stickers-db psql -U postgres -d world_cup_stickers < src/db/schema.sql
```

## Datos iniciales

El archivo `src/db/seed.sql` contiene datos de prueba para probar el CRUD, los filtros y el render visual por codigos de album.

Este seed reinicia la tabla usando `TRUNCATE`, por lo que elimina los datos actuales de desarrollo antes de insertar los registros iniciales.

Ejecutar base de datos, esquema y seed:

```bash
docker compose up -d
docker exec -i world-cup-stickers-db psql -U postgres -d world_cup_stickers < src/db/schema.sql
docker exec -i world-cup-stickers-db psql -U postgres -d world_cup_stickers < src/db/seed.sql
```

## Datos del album

El album usa codigos de estampilla como identificador principal.

- La seccion especial usa codigos `FWC00` a `FWC19`.
- Las selecciones usan codigo de tres letras mas numero de dos digitos.
- Ejemplos: `MEX01`, `ARG10`, `BRA20`.
- Cada seleccion tiene estampillas del `01` al `20`.
- El seed genera `20` estampillas FWC y `960` estampillas de selecciones, para un total de `980` registros.

El campo `quantity` define el estado:

- `0`: faltante
- `1`: conseguida
- Mayor a `1`: repetida

El campo `player_name` se mantiene por compatibilidad con el CRUD, pero en el seed se usa como referencia generica, por ejemplo `Estampilla MEX 01`.

## Conexion con PostgreSQL

El backend usa `pg` para conectarse a PostgreSQL. Las credenciales se leen desde variables de entorno, por lo que se debe crear un archivo `.env` local basado en `.env.example`.

Ejemplo:

```bash
copy .env.example .env
```

Levantar la base de datos y el backend:

```bash
npm install
docker compose up -d
npm run dev
```

Probar que la API responde:

```text
http://localhost:3000/ping
```

Probar la conexion con PostgreSQL:

```text
http://localhost:3000/ping/db
```

## Endpoint disponible

```http
GET /ping
```

Respuesta esperada:

```json
{
  "message": "pong"
}
```

Tambien existe un endpoint para probar la conexion con PostgreSQL:

```http
GET /ping/db
```

## Endpoints de estampillas disponibles

Actualmente hay endpoints para consultar, crear, editar y eliminar estampillas.

```http
GET /stickers
GET /stickers/stats
GET /stickers/:id
POST /stickers
PUT /stickers/:id
DELETE /stickers/:id
```

Ejemplo de body JSON para crear una estampilla:

```json
{
  "sticker_number": "ARG10",
  "player_name": "Estampilla ARG 10",
  "country": "ARG",
  "position": "Seleccion",
  "quantity": 1,
  "notes": "Estampilla de Argentina"
}
```

Ejemplo de body JSON para editar una estampilla:

```json
{
  "sticker_number": "ARG10",
  "player_name": "Estampilla ARG 10",
  "country": "ARG",
  "position": "Seleccion",
  "quantity": 2,
  "notes": "Repetida para intercambio"
}
```

`PUT /stickers/:id` devuelve `200` con la estampilla actualizada.

`DELETE /stickers/:id` devuelve `204` sin body si la estampilla se elimina correctamente.

Si la estampilla no existe, `PUT /stickers/:id` y `DELETE /stickers/:id` devuelven `404`.

El campo `quantity` define el estado visual de la estampilla:

- `0`: faltante
- `1`: conseguida
- Mayor a `1`: repetida

`GET /stickers/stats` devuelve las estadisticas globales del album completo y no depende de la pagina actual, busqueda ni filtros usados en `GET /stickers`.

Para estas estadisticas:

- Conseguidas = `quantity >= 1`
- Faltantes = `quantity = 0`
- Repetidas = `quantity > 1`
- Las repetidas tambien cuentan como conseguidas.

Para consultar datos, primero debe existir la tabla `stickers` en PostgreSQL. Puedes cargar datos de prueba con `src/db/seed.sql`.

## Busqueda, filtros, ordenamiento y paginacion

`GET /stickers` soporta parametros para buscar, filtrar, ordenar y paginar resultados.

Ejemplos:

```http
GET /stickers?q=messi
GET /stickers?country=Argentina
GET /stickers?status=missing
GET /stickers?status=owned
GET /stickers?status=duplicate
GET /stickers?sort=player_name&order=asc
GET /stickers?page=1&limit=10
```

`q` busca coincidencias en numero de estampilla, jugador, pais y posicion.

`country` filtra por pais o seleccion.

`status` se calcula a partir de `quantity`:

- `missing`: `quantity = 0`
- `owned`: `quantity >= 1`
- `duplicate`: `quantity > 1`

Una estampilla repetida tambien cuenta como conseguida, por lo que aparece en el filtro `owned`.

`sort` y `order` controlan el orden de los resultados.

`page` y `limit` controlan la paginacion.
