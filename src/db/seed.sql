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
    WHEN number IN (0, 4, 8, 12, 16) THEN 0
    WHEN number IN (2, 6, 10, 14, 18) THEN 2
    WHEN number = 19 THEN 3
    ELSE 1
  END AS quantity,
  'Sección especial del álbum' AS notes
FROM generate_series(0, 19) AS number;

-- Selecciones del album: cada seleccion tiene codigos 01 a 20.
WITH teams(name, code) AS (
  VALUES
    ('México', 'MEX'),
    ('Sudáfrica', 'RSA'),
    ('Corea del Sur', 'KOR'),
    ('República Checa', 'CZE'),
    ('Canadá', 'CAN'),
    ('Bosnia y Herzegovina', 'BIH'),
    ('Qatar', 'QAT'),
    ('Suiza', 'SUI'),
    ('Brasil', 'BRA'),
    ('Marruecos', 'MAR'),
    ('Haití', 'HAI'),
    ('Escocia', 'SCO'),
    ('Estados Unidos', 'USA'),
    ('Paraguay', 'PAR'),
    ('Australia', 'AUS'),
    ('Turquía', 'TUR'),
    ('Alemania', 'GER'),
    ('Curazao', 'CUW'),
    ('Costa de Marfil', 'CIV'),
    ('Ecuador', 'ECU'),
    ('Países Bajos', 'NED'),
    ('Japón', 'JPN'),
    ('Suecia', 'SWE'),
    ('Túnez', 'TUN'),
    ('Bélgica', 'BEL'),
    ('Egipto', 'EGY'),
    ('Irán', 'IRN'),
    ('Nueva Zelanda', 'NZL'),
    ('España', 'ESP'),
    ('Cabo Verde', 'CPV'),
    ('Arabia Saudita', 'KSA'),
    ('Uruguay', 'URU'),
    ('Francia', 'FRA'),
    ('Senegal', 'SEN'),
    ('Irak', 'IRQ'),
    ('Noruega', 'NOR'),
    ('Argentina', 'ARG'),
    ('Argelia', 'ALG'),
    ('Austria', 'AUT'),
    ('Jordania', 'JOR'),
    ('Portugal', 'POR'),
    ('RD Congo', 'COD'),
    ('Uzbekistán', 'UZB'),
    ('Colombia', 'COL'),
    ('Inglaterra', 'ENG'),
    ('Croacia', 'CRO'),
    ('Ghana', 'GHA'),
    ('Panamá', 'PAN')
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

SELECT COUNT(*) AS total_stickers FROM stickers;

-- Consultas opcionales de verificacion:
-- SELECT * FROM stickers WHERE country = 'FWC';
-- SELECT * FROM stickers WHERE country = 'MEX';
