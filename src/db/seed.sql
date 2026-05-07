-- Datos iniciales de desarrollo para probar el album por codigos.
-- Este script reinicia la tabla y elimina los datos actuales de desarrollo.
-- Interpretacion de quantity: 0 = faltante, 1 = conseguida, mayor a 1 = repetida.

TRUNCATE TABLE stickers RESTART IDENTITY;

-- Seccion especial del album: FWC00 a FWC19.
INSERT INTO stickers (sticker_number, player_name, country, position, quantity, notes)
SELECT
  'FWC' || LPAD(number::TEXT, 2, '0') AS sticker_number,
  'Estampilla FWC ' || LPAD(number::TEXT, 2, '0') AS player_name,
  'FWC' AS country,
  'Especial' AS position,
  CASE
    WHEN number IN (1, 5, 9, 13, 17) THEN 0
    WHEN number IN (2, 6, 10, 14, 18) THEN 2
    ELSE 1
  END AS quantity,
  'Seccion especial del album' AS notes
FROM generate_series(0, 19) AS number;

-- Selecciones del album: cada seleccion tiene codigos 01 a 20.
WITH teams(code, name) AS (
  VALUES
    ('MEX', 'Mexico'),
    ('RSA', 'Sudafrica'),
    ('KOR', 'Corea del Sur'),
    ('CZE', 'Republica Checa'),
    ('CAN', 'Canada'),
    ('BIH', 'Bosnia y Herzegovina'),
    ('QAT', 'Qatar'),
    ('SUI', 'Suiza'),
    ('BRA', 'Brasil'),
    ('MAR', 'Marruecos'),
    ('HAI', 'Haiti'),
    ('SCO', 'Escocia'),
    ('USA', 'Estados Unidos'),
    ('PAR', 'Paraguay'),
    ('AUS', 'Australia'),
    ('TUR', 'Turquia'),
    ('GER', 'Alemania'),
    ('CUW', 'Curazao'),
    ('CIV', 'Costa de Marfil'),
    ('ECU', 'Ecuador'),
    ('NED', 'Paises Bajos'),
    ('JPN', 'Japon'),
    ('SWE', 'Suecia'),
    ('TUN', 'Tunez'),
    ('BEL', 'Belgica'),
    ('EGY', 'Egipto'),
    ('IRN', 'Iran'),
    ('NZL', 'Nueva Zelanda'),
    ('ESP', 'Espana'),
    ('CPV', 'Cabo Verde'),
    ('KSA', 'Arabia Saudita'),
    ('URU', 'Uruguay'),
    ('FRA', 'Francia'),
    ('SEN', 'Senegal'),
    ('IRQ', 'Irak'),
    ('NOR', 'Noruega'),
    ('ARG', 'Argentina'),
    ('ALG', 'Argelia'),
    ('AUT', 'Austria'),
    ('JOR', 'Jordania'),
    ('POR', 'Portugal'),
    ('COD', 'RD Congo'),
    ('UZB', 'Uzbekistan'),
    ('COL', 'Colombia'),
    ('ENG', 'Inglaterra'),
    ('CRO', 'Croacia'),
    ('GHA', 'Ghana'),
    ('PAN', 'Panama')
),
numbers AS (
  SELECT generate_series(1, 20) AS number
)
INSERT INTO stickers (sticker_number, player_name, country, position, quantity, notes)
SELECT
  teams.code || LPAD(numbers.number::TEXT, 2, '0') AS sticker_number,
  'Estampilla ' || teams.code || ' ' || LPAD(numbers.number::TEXT, 2, '0') AS player_name,
  teams.code AS country,
  'Seleccion' AS position,
  CASE
    WHEN numbers.number IN (1, 5, 9, 13, 17) THEN 0
    WHEN numbers.number IN (2, 6, 10, 14, 18) THEN 2
    ELSE 1
  END AS quantity,
  'Estampilla de ' || teams.name AS notes
FROM teams
CROSS JOIN numbers
ORDER BY teams.code, numbers.number;
