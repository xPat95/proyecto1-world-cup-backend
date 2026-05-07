-- Script inicial para la base de datos del tracker de estampillas.
-- La tabla stickers representa cada estampilla del album del Mundial.
-- sticker_number guarda el codigo del album, por ejemplo FWC00, MEX01 o ARG20.
-- player_name se conserva por compatibilidad con el CRUD y puede usarse como referencia o descripcion.
-- Interpretacion de quantity:
-- 0 = faltante, 1 = conseguida, mayor a 1 = repetida.

-- Para reiniciar manualmente la tabla durante desarrollo, descomentar:
-- DROP TABLE IF EXISTS stickers;

CREATE TABLE IF NOT EXISTS stickers (
  id SERIAL PRIMARY KEY,
  sticker_number VARCHAR(20) NOT NULL,
  player_name VARCHAR(120) NOT NULL,
  country VARCHAR(80) NOT NULL,
  position VARCHAR(60),
  quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
