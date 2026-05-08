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