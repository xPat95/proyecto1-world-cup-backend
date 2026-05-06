-- Datos iniciales de desarrollo para probar el CRUD de estampillas.
-- Este script reinicia la tabla y elimina los datos actuales de desarrollo.
-- Interpretacion de quantity: 0 = faltante, 1 = conseguida, mayor a 1 = repetida.

TRUNCATE TABLE stickers RESTART IDENTITY;

INSERT INTO stickers (sticker_number, player_name, country, position, quantity, notes)
VALUES
('ARG-10', 'Lionel Messi', 'Argentina', 'Delantero', 1, 'Estampilla conseguida'),
('ARG-11', 'Angel Di Maria', 'Argentina', 'Delantero', 0, 'Pendiente por conseguir'),
('ARG-23', 'Emiliano Martinez', 'Argentina', 'Portero', 2, 'Repetida para intercambio'),
('ARG-07', 'Rodrigo De Paul', 'Argentina', 'Mediocampista', 1, 'Album principal'),
('BRA-10', 'Neymar Jr', 'Brasil', 'Delantero', 0, 'Faltante especial'),
('BRA-20', 'Vinicius Junior', 'Brasil', 'Delantero', 1, 'Conseguida en sobre'),
('BRA-05', 'Casemiro', 'Brasil', 'Mediocampista', 3, 'Varias repetidas'),
('BRA-01', 'Alisson Becker', 'Brasil', 'Portero', 1, 'Titular'),
('FRA-10', 'Kylian Mbappe', 'Francia', 'Delantero', 2, 'Repetida'),
('FRA-07', 'Antoine Griezmann', 'Francia', 'Mediocampista', 1, 'Conseguida'),
('FRA-13', 'N''Golo Kante', 'Francia', 'Mediocampista', 0, 'Faltante'),
('FRA-01', 'Hugo Lloris', 'Francia', 'Portero', 1, 'Coleccion base'),
('ESP-09', 'Alvaro Morata', 'Espana', 'Delantero', 1, 'Conseguida'),
('ESP-08', 'Pedri', 'Espana', 'Mediocampista', 2, 'Repetida para cambio'),
('ESP-16', 'Rodri', 'Espana', 'Mediocampista', 0, 'Pendiente'),
('ESP-23', 'Unai Simon', 'Espana', 'Portero', 1, 'Album principal'),
('ENG-09', 'Harry Kane', 'Inglaterra', 'Delantero', 1, 'Capitan'),
('ENG-10', 'Jude Bellingham', 'Inglaterra', 'Mediocampista', 0, 'Faltante'),
('ENG-07', 'Bukayo Saka', 'Inglaterra', 'Delantero', 2, 'Repetida'),
('ENG-01', 'Jordan Pickford', 'Inglaterra', 'Portero', 1, 'Conseguida'),
('POR-07', 'Cristiano Ronaldo', 'Portugal', 'Delantero', 3, 'Repetida importante'),
('POR-08', 'Bruno Fernandes', 'Portugal', 'Mediocampista', 1, 'Conseguida'),
('POR-10', 'Bernardo Silva', 'Portugal', 'Mediocampista', 0, 'Pendiente'),
('POR-22', 'Diogo Costa', 'Portugal', 'Portero', 1, 'Album principal'),
('GER-10', 'Jamal Musiala', 'Alemania', 'Mediocampista', 1, 'Conseguida'),
('GER-07', 'Kai Havertz', 'Alemania', 'Delantero', 0, 'Faltante'),
('GER-06', 'Joshua Kimmich', 'Alemania', 'Defensa', 2, 'Repetida'),
('GER-01', 'Manuel Neuer', 'Alemania', 'Portero', 1, 'Veterano'),
('MEX-11', 'Santiago Gimenez', 'Mexico', 'Delantero', 1, 'Conseguida'),
('MEX-22', 'Hirving Lozano', 'Mexico', 'Delantero', 2, 'Repetida'),
('MEX-13', 'Guillermo Ochoa', 'Mexico', 'Portero', 0, 'Faltante'),
('USA-10', 'Christian Pulisic', 'Estados Unidos', 'Delantero', 1, 'Conseguida'),
('USA-08', 'Weston McKennie', 'Estados Unidos', 'Mediocampista', 0, 'Pendiente'),
('USA-04', 'Tyler Adams', 'Estados Unidos', 'Mediocampista', 2, 'Repetida'),
('URU-09', 'Luis Suarez', 'Uruguay', 'Delantero', 1, 'Conseguida'),
('URU-15', 'Federico Valverde', 'Uruguay', 'Mediocampista', 3, 'Repetida para intercambio');
