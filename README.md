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
