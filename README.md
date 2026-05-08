# World Cup Sticker Tracker - Backend

## Descripción

Este repositorio contiene la API REST del proyecto **World Cup Sticker Tracker**, una aplicación full stack para llevar control de estampillas del Mundial usando códigos de álbum.

El backend administra las estampillas, la conexión con PostgreSQL, las estadísticas globales del álbum, búsqueda, filtros, ordenamiento, paginación y documentación de API con OpenAPI y Swagger UI.

La API responde únicamente en formato JSON. El servidor no genera HTML y funciona como un backend HTTP independiente que puede ser consumido por cualquier cliente.

La app no usa imágenes reales de jugadores ni de estampillas. Cada registro representa una estampa mediante código, selección o categoría, cantidad y estado.

---

## Links del proyecto

- **Backend desplegado:**  
  https://proyecto1-world-cup-backend.onrender.com

- **Swagger UI desplegado:**  
  https://proyecto1-world-cup-backend.onrender.com/docs

- **Frontend desplegado:**  
  https://xpat95.github.io/proyecto1-world-cup-frontend/

- **Repositorio frontend:**  
  https://github.com/xPat95/proyecto1-world-cup-frontend.git

---

## Tecnologías usadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- cors
- Docker
- OpenAPI
- Swagger UI

---

## Funcionalidades principales

- CRUD completo de estampillas.
- Búsqueda por texto.
- Filtro por selección o categoría.
- Filtro por estado.
- Ordenamiento.
- Paginación.
- Estadísticas globales del álbum.
- Seed con álbum completo de 980 estampillas.
- Documentación OpenAPI.
- Swagger UI para visualizar y probar endpoints.
- CORS configurado para permitir consumo desde el frontend.
- Validaciones server-side con respuestas JSON descriptivas.

---

## Cumplimiento de requisitos

| Requisito | Estado |
|---|---|
| Backend HTTP independiente | Cumplido |
| Backend responde JSON | Cumplido |
| Backend no genera HTML | Cumplido |
| API REST | Cumplido |
| CRUD completo | Cumplido |
| Cliente separado del servidor | Cumplido |
| Persistencia en base de datos real | Cumplido |
| PostgreSQL como DBMS | Cumplido |
| CORS configurado | Cumplido |
| Dos repositorios separados | Cumplido |
| OpenAPI escrito | Cumplido |
| Swagger UI servido desde el backend | Cumplido |
| Códigos HTTP correctos | Cumplido |
| Validaciones server-side | Cumplido |
| Búsqueda con `q` | Cumplido |
| Paginación con `page` y `limit` | Cumplido |
| Ordenamiento con `sort` y `order` | Cumplido |
| Proyecto publicado en internet | Cumplido |
| README con instrucciones claras | Cumplido |

---

## Modelo de datos

La tabla principal es `stickers`.

Campos principales:

- `id`: identificador único.
- `sticker_number`: código de la estampilla, por ejemplo `MEX17`.
- `player_name`: referencia de la estampilla, por ejemplo `Estampilla MEX 17`.
- `country`: selección o categoría, por ejemplo `MEX`, `ARG` o `FWC`.
- `position`: tipo de estampilla, por ejemplo `Selección` o `Especial`.
- `quantity`: cantidad disponible.
- `notes`: notas opcionales.
- `created_at`: fecha de creación.
- `updated_at`: fecha de actualización.

El campo `player_name` se mantiene por compatibilidad con el CRUD, pero funciona como referencia o descripción de la estampilla.

---

## Lógica del álbum

El álbum usa códigos como identificador principal:

- `FWC00` a `FWC19` representan la sección especial del álbum.
- Las 48 selecciones tienen códigos del `01` al `20`.
- El seed genera 20 estampillas FWC y 960 estampillas de selecciones.
- Total inicial: 980 registros.

Ejemplos de códigos:

- `FWC00`
- `FWC19`
- `MEX01`
- `MEX17`
- `ARG03`
- `BRA20`

---

## Lógica de estados

El estado se calcula a partir de `quantity`:

- `quantity = 0` → Faltante
- `quantity = 1` → Conseguida
- `quantity > 1` → Repetida

Una estampilla repetida también cuenta como conseguida.

Para estadísticas:

- Faltantes = `quantity = 0`
- Conseguidas = `quantity >= 1`
- Repetidas = `quantity > 1`
- Progreso = `conseguidas / total * 100`

---

## Variables de entorno

Se debe crear un archivo `.env` local basado en `.env.example`.

Ejemplo:

```env
PORT=3000
DATABASE_URL=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=world_cup_stickers
DB_USER=postgres
DB_PASSWORD=postgres

## Variables de entorno

Se debe crear un archivo `.env` local basado en `.env.example`.

Ejemplo:

```env
PORT=3000
DATABASE_URL=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=world_cup_stickers
DB_USER=postgres
DB_PASSWORD=postgres
```

En desarrollo local, si `DATABASE_URL` está vacía, el backend usa:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

En producción, si existe `DATABASE_URL`, el backend usa esa cadena de conexión para PostgreSQL y habilita SSL.

En Render se configura `DATABASE_URL` con la URL de conexión de la base de datos PostgreSQL.

En Windows se puede copiar el archivo de ejemplo con:

```bash
copy .env.example .env
```

---

## Instalación local

Instalar dependencias:

```bash
npm install
```

---

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

---

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

---

## Correr backend localmente

```bash
npm run dev
```

El backend corre en:

```text
http://localhost:3000
```

---

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/ping` | Verifica que el servidor esté activo |
| GET | `/ping/db` | Verifica la conexión con PostgreSQL |
| GET | `/stickers` | Lista estampillas con búsqueda, filtros, ordenamiento y paginación |
| GET | `/stickers/stats` | Devuelve estadísticas globales del álbum |
| GET | `/stickers/:id` | Obtiene una estampilla por ID |
| POST | `/stickers` | Crea una estampilla |
| PUT | `/stickers/:id` | Edita una estampilla existente |
| DELETE | `/stickers/:id` | Elimina una estampilla |

---

## Query params de `GET /stickers`

`GET /stickers` soporta:

- `q`: búsqueda en `sticker_number`, `player_name`, `country` y `position`.
- `country`: filtro por selección o categoría.
- `status`: filtro por estado.
- `sort`: campo de ordenamiento.
- `order`: dirección del ordenamiento.
- `page`: página solicitada.
- `limit`: cantidad por página, máximo 50.

Valores de `status`:

- `missing` → `quantity = 0`
- `owned` → `quantity >= 1`
- `duplicate` → `quantity > 1`

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

---

## Códigos HTTP usados

La API usa códigos HTTP según el resultado de cada operación:

- `200 OK`: consultas o actualizaciones correctas.
- `201 Created`: creación correcta.
- `204 No Content`: eliminación correcta.
- `400 Bad Request`: datos inválidos.
- `404 Not Found`: estampilla no encontrada.
- `500 Internal Server Error`: error interno del servidor.

---

## Ejemplos de prueba local

```text
http://localhost:3000/ping
http://localhost:3000/stickers?limit=20
http://localhost:3000/stickers?q=MEX
http://localhost:3000/stickers?country=ARG
http://localhost:3000/stickers?status=owned
http://localhost:3000/stickers/stats
http://localhost:3000/docs
```

---

## Ejemplos de uso publicado

```text
https://proyecto1-world-cup-backend.onrender.com/ping
https://proyecto1-world-cup-backend.onrender.com/stickers?limit=20
https://proyecto1-world-cup-backend.onrender.com/stickers?q=MEX
https://proyecto1-world-cup-backend.onrender.com/stickers?country=ARG
https://proyecto1-world-cup-backend.onrender.com/stickers?status=owned
https://proyecto1-world-cup-backend.onrender.com/stickers/stats
https://proyecto1-world-cup-backend.onrender.com/docs
```

---

## OpenAPI y Swagger

La especificación OpenAPI está en:

```text
src/docs/openapi.yaml
```

Swagger UI está disponible localmente en:

```text
http://localhost:3000/docs
```

Swagger UI también está disponible en producción:

```text
https://proyecto1-world-cup-backend.onrender.com/docs
```

Para usar Swagger UI de forma local, primero se debe levantar el backend con:

```bash
npm run dev
```

Swagger permite visualizar y probar los endpoints de la API desde el navegador.

---

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
docker-compose.yml
.env.example
package.json
README.md
```

---

## Screenshots

Pendiente de agregar capturas después de probar la app.

Capturas sugeridas:

- Swagger UI.
- Respuesta de `/stickers`.
- Respuesta de `/stickers/stats`.

---

## Notas de entrega

Este backend está publicado en Render y consume una base de datos PostgreSQL en línea.

El frontend está en un repositorio separado y consume este backend publicado.

Frontend publicado:

```text
https://xpat95.github.io/proyecto1-world-cup-frontend/
```

Repositorio frontend:

```text
https://github.com/xPat95/proyecto1-world-cup-frontend.git
```