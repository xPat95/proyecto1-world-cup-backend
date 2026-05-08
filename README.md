# World Cup Sticker Tracker - Backend

## Descripcion

Este repositorio contiene la API REST del proyecto **World Cup Sticker Tracker**, una aplicacion full stack para llevar control de estampillas del Mundial usando codigos de album.

El backend administra las estampillas, la conexion con PostgreSQL, estadisticas globales del album, busqueda, filtros, ordenamiento, paginacion y documentacion de API con OpenAPI y Swagger UI.

La app no usa imagenes reales de jugadores ni de estampillas. Cada registro representa una estampa mediante codigo, seleccion o categoria, cantidad y estado.

## Repositorios relacionados

- Frontend: https://github.com/xPat95/proyecto1-world-cup-frontend.git

## Links del proyecto

- Backend desplegado: [Pendiente de agregar despues del despliegue]
- Swagger UI desplegado: [Pendiente de agregar despues del despliegue]
- Frontend desplegado: [Pendiente de agregar despues del despliegue]

## Tecnologias usadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors
- Docker
- OpenAPI
- Swagger UI

## Funcionalidades principales

- CRUD completo de estampillas.
- Busqueda por texto.
- Filtro por seleccion o categoria.
- Filtro por estado.
- Ordenamiento.
- Paginacion.
- Estadisticas globales del album.
- Seed con album completo de 980 estampillas.
- Documentacion OpenAPI.
- Swagger UI para visualizar y probar endpoints.

## Modelo de datos

La tabla principal es `stickers`.

Campos principales:

- `id`: identificador unico.
- `sticker_number`: codigo de la estampilla, por ejemplo `MEX17`.
- `player_name`: referencia de la estampilla, por ejemplo `Estampilla MEX 17`.
- `country`: seleccion o categoria, por ejemplo `MEX`, `ARG` o `FWC`.
- `position`: tipo de estampilla, por ejemplo `Seleccion` o `Especial`.
- `quantity`: cantidad disponible.
- `notes`: notas opcionales.
- `created_at`: fecha de creacion.
- `updated_at`: fecha de actualizacion.

El campo `player_name` se mantiene por compatibilidad con el CRUD, pero funciona como referencia o descripcion de la estampilla.

## Logica del album

El album usa codigos como identificador principal:

- `FWC00` a `FWC19` representan la seccion especial del album.
- Las 48 selecciones tienen codigos del `01` al `20`.
- El seed genera 20 estampillas FWC y 960 estampillas de selecciones.
- Total inicial: 980 registros.

Ejemplos de codigos:

- `FWC00`
- `FWC19`
- `MEX01`
- `MEX17`
- `ARG03`
- `BRA20`

## Logica de estados

El estado se calcula a partir de `quantity`:

- `quantity = 0` -> Faltante
- `quantity = 1` -> Conseguida
- `quantity > 1` -> Repetida

Una estampilla repetida tambien cuenta como conseguida.

Para estadisticas:

- Faltantes = `quantity = 0`
- Conseguidas = `quantity >= 1`
- Repetidas = `quantity > 1`
- Progreso = `conseguidas / total * 100`

## Variables de entorno

Se debe crear un archivo `.env` local basado en `.env.example`.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=world_cup_stickers
DB_USER=postgres
DB_PASSWORD=postgres
```

En Windows se puede copiar el archivo de ejemplo con:

```bash
copy .env.example .env
```

## Instalacion local

Instalar dependencias:

```bash
npm install
```

## Levantar PostgreSQL con Docker

Levantar la base de datos:

```bash
docker compose up -d
```

Verificar el contenedor:

```bash
docker compose ps
```

PostgreSQL queda disponible en:

```text
localhost:5432
```

## Crear schema y cargar seed

Crear la tabla `stickers`:

```bash
docker exec -i world-cup-stickers-db psql -U postgres -d world_cup_stickers < src/db/schema.sql
```

Cargar datos iniciales:

```bash
docker exec -i world-cup-stickers-db psql -U postgres -d world_cup_stickers < src/db/seed.sql
```

El archivo `seed.sql` reinicia los datos de desarrollo usando `TRUNCATE` y carga 980 estampillas:

- `FWC00` a `FWC19`
- 48 selecciones x 20 estampillas

## Correr backend localmente

```bash
npm run dev
```

El backend corre en:

```text
http://localhost:3000
```

## Endpoints principales

- `GET /ping`
- `GET /ping/db`
- `GET /stickers`
- `GET /stickers/stats`
- `GET /stickers/:id`
- `POST /stickers`
- `PUT /stickers/:id`
- `DELETE /stickers/:id`

## Query params de GET /stickers

`GET /stickers` soporta:

- `q`: busqueda en `sticker_number`, `player_name`, `country` y `position`.
- `country`: filtro por seleccion o categoria.
- `status`: filtro por estado.
- `sort`: campo de ordenamiento.
- `order`: direccion del ordenamiento.
- `page`: pagina solicitada.
- `limit`: cantidad por pagina, maximo 50.

Valores de `status`:

- `missing` -> `quantity = 0`
- `owned` -> `quantity >= 1`
- `duplicate` -> `quantity > 1`

Campos permitidos para `sort`:

- `id`
- `sticker_number`
- `player_name`
- `country`
- `position`
- `quantity`
- `created_at`
- `updated_at`

Valores permitidos para `order`:

- `asc`
- `desc`

## Ejemplos de prueba

```text
http://localhost:3000/ping
http://localhost:3000/stickers?limit=20
http://localhost:3000/stickers?q=MEX
http://localhost:3000/stickers?country=ARG
http://localhost:3000/stickers?status=owned
http://localhost:3000/stickers/stats
```

## OpenAPI y Swagger

La especificacion OpenAPI esta en:

```text
src/docs/openapi.yaml
```

Swagger UI esta disponible localmente en:

```text
http://localhost:3000/docs
```

Para usar Swagger UI, levantar el backend con:

```bash
npm run dev
```

## Estructura del proyecto

```text
src/
  app.js
  server.js
  db/
    connection.js
    schema.sql
    seed.sql
  routes/
    stickers.routes.js
  controllers/
    stickers.controller.js
  models/
    stickers.model.js
  docs/
    openapi.yaml
```

## Screenshots

Pendiente de agregar capturas despues de probar la app.

Capturas sugeridas:

- Swagger UI.
- Respuesta de `/stickers`.
- Respuesta de `/stickers/stats`.

## Notas de entrega

El frontend esta en un repositorio separado y se conectara al backend desplegado cuando ambos servicios esten publicados en linea.

Despues del deploy se reemplazaran los placeholders de links por las URLs reales del backend, Swagger UI y frontend.
