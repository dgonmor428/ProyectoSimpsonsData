--Crear y usar la base de datos simpsons
Create database simpsons;
use simpsons;

--Creación de la tabla Badaluque
Create table Baduluque (
codigo INT,
nombre_producto VARCHAR(255) NOT NULL
CONSTRAINT PRIMARY KEY (codigo)
)ENGINE=INNODB;

--Creación de la tabla Bar de Moe
Create table Bar_Moe (
  codigo INT,
  nombre_producto VARCHAR(255) NOT NULL,
  CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;
--Creación de la tabla tienda de comics
Create table Tienda_Comics (
codigo INT,
nombre_comic VARCHAR(255) NOT NULL,
serie_comic VARCHAR(255),
numero_paginas INT
CONSTRAINT PRIMARY KEY (codigo)

)ENGINE=INNODB;
--Creación de la tabla personajes principales
Create table Personajes_Principales (
codigo_personaje INT,
nombre VARCHAR(255) NOT NULL,
apellido1 VARCHAR(255) NOT NULL,
madre VARCHAR(255),
padre VARCHAR(255),
actor_doblaje VARCHAR(255) NOT NULL,
primera_aparicion VARCHAR(255) NOT NULL,
CONSTRAINT PRIMARY KEY (codigo)
)ENGINE=INNODB;

--Faltan poner las relaciones entre las tablas (ver en el MER)


--Inserto 

--Badulaque
INSERT INTO Baduluque (codigo, nombre_producto) 
VALUES (1, 'Fresisuis de fresa');


--Bar de Moe
INSERT INTO Bar_Moe (codigo, nombre_producto) 
VALUES (101, 'Cerveza Duff');

--La mazmorra del androide
INSERT INTO Tienda_Comics (codigo, nombre_comic, serie_comic, numero_paginas) 
VALUES (50, 'Simpsons Comics #1', 'Simpsons Comics', 29);

--"Wiki" de personajes
INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (1, 'Homer', 'Simpson', 'Mona', 'Abraham', 'Carlos Ysbert', 'El show de Tracey Ullman');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (2, 'Marge', 'Simpson', 'Jaqueline', 'Clancy', 'Margarita de Francia', 'El show de Tracey Ullman');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (3, 'Bart', 'Simpson', 'Marge', 'Homer', 'Sara Vivas', 'El show de Tracey Ullman');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (4, 'Lisa', 'Simpson', 'Marge', 'Homer', 'Isatxa Menjibar', 'El show de Tracey Ullman');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (5, 'Maggie', 'Simpson', 'Marge', 'Homer', 'Mar Bordallo', 'El show de Tracey Ullman');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (6, 'Ned', 'Flanders', 'Mona', 'Ned Sr', 'Carlos del Pino', 'Los Simpsons (1x01)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (7, 'Maude', 'Flanders', 'null', 'null', 'Laura Palacios', 'Los Simpsons (2x19)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (8, 'Rod', 'Flanders', 'Maude', 'Ned', 'Chelo Vivares', 'Los Simpsons (1x07)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (19, 'Todd', 'Flanders', 'Maude', 'Ned', 'Chelo Vivares', 'Los Simpsons (1x01)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (10, 'Edna', 'Krabappel/Flanders', 'null', 'null', 'Celia Ballester', 'Los Simpsons (1x02)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (11, 'Charles Montgomery', 'Burns', 'Daphne', 'Clifford', 'Javier Franquelo (DEP)/Vicente Gil', 'Los Simpsons (1x01)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (12, 'Waylon', 'Smithers', 'null', 'Waylon Sr', 'Javier García', 'Los Simpsons (1x03)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (13, 'Apu', 'Nahasapeemapetilon', 'Miss Nahasapeemapetilon', 'null', 'Javier García', 'Los Simpsons (1x08)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (14, 'Jeff', 'Albertson', 'Null', 'Sr Albertson', 'David García', 'Los Simpsons (2x34)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (15, 'Moe', 'Szyslak', 'Mom', 'Morty', 'Juan Perucho', 'Los Simpsons (1x01)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (16, 'Barney', 'Gumble', 'Null', 'Arnie', 'Juan Carlos Lozano', 'Los Simpsons (1x01)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (17, 'Lenny', 'Leonard', 'null', 'null', 'Abraham Aguilar', 'Los Simpsons (1x09)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (18, 'Carl', 'Carlson', 'Ms Carlson', 'Mr Carlson', 'Juan Antonio Arroyo', 'Los Simpsons (1x10)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (19, 'Clancy', 'Wiggum', 'Null', 'Iggy', 'Juan Perucho', 'Los Simpsons (1x03)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (20, 'Nelson', 'Muntz', 'Miss Muntz', 'Null', 'Chelo Vivares', 'Los Simpsons (1x05)');

INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) 
VALUES (21, 'Data', 'Base', 'Null', 'Database Sr', 'Chelo Vivares', 'Los Simpsons (1x12)');