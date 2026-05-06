# World Cup Sticker Tracker - Backend

API REST para el tracker de estampillas del Mundial.

Este repositorio contendra el backend del proyecto, construido con Node.js, Express y PostgreSQL.

## Estado actual

Este commit inicializa el backend con Node.js y Express, y agrega un endpoint de prueba para verificar que la API responde.

Todavia no hay conexion real a base de datos, endpoints de estampillas ni logica de CRUD.

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

## Conexion con PostgreSQL

El backend usa `pg` para conectarse a PostgreSQL. Las credenciales se leen desde variables de entorno, por lo que se debe crear un archivo `.env` local basado en `.env.example`.

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

## Endpoints de estampillas disponibles

Actualmente hay endpoints para consultar y crear estampillas.

```http
GET /stickers
GET /stickers/:id
POST /stickers
```

Ejemplo de body JSON para crear una estampilla:

```json
{
  "sticker_number": "ARG-10",
  "player_name": "Lionel Messi",
  "country": "Argentina",
  "position": "Delantero",
  "quantity": 1,
  "notes": "Primera estampilla registrada"
}
```

El campo `quantity` define el estado visual de la estampilla:

- `0`: faltante
- `1`: conseguida
- Mayor a `1`: repetida

Para consultar datos, primero debe existir la tabla `stickers` en PostgreSQL. El seed data se agregara en un commit posterior.
