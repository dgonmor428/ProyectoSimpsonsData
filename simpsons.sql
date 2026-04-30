-- Crear y usar la base de datos simpsons
CREATE DATABASE IF NOT EXISTS simpsons;
USE simpsons;

-- 1.  Badulaque
CREATE TABLE badulaque (
    codigo INT,
    nombre_producto VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;

-- 2. Tabla Bar de Moe
CREATE TABLE bar_Moe (
    codigo INT,
    nombre_producto VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;

-- 3. Tabla Tienda de Comics
CREATE TABLE Tienda_Comics (
    codigo INT,
    nombre_comic VARCHAR(255) NOT NULL,
    serie_comic VARCHAR(255),
    numero_paginas INT,
    CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;

-- 4. Tabla Personajes Principales
CREATE TABLE Personajes_Principales (
    codigo_personaje INT,
    nombre VARCHAR(255) NOT NULL,
    apellido1 VARCHAR(255) NOT NULL,
    madre VARCHAR(255),
    padre VARCHAR(255),
    actor_doblaje VARCHAR(255) NOT NULL,
    primera_aparicion VARCHAR(255) NOT NULL,
    CONSTRAINT PRIMARY KEY (codigo_personaje)
) ENGINE=INNODB;


-- TABLAS DE RELACIONES 


CREATE TABLE Personajes_Principales_compra_Badulaque (
    codigo_personaje INT,
    codigo_badulaque INT,
    PRIMARY KEY (codigo_personaje, codigo_badulaque),
    FOREIGN KEY (codigo_personaje) REFERENCES Personajes_Principales(codigo_personaje),
    FOREIGN KEY (codigo_badulaque) REFERENCES Badulaque(codigo)
) ENGINE=INNODB;

CREATE TABLE Personajes_Principales_compra_Tienda_Comics (
    codigo_personaje INT,
    codigo_tienda_comics INT,
    PRIMARY KEY (codigo_personaje, codigo_tienda_comics),
    FOREIGN KEY (codigo_personaje) REFERENCES Personajes_Principales(codigo_personaje),
    FOREIGN KEY (codigo_tienda_comics) REFERENCES Tienda_Comics(codigo)
) ENGINE=INNODB;

CREATE TABLE Personajes_Principales_beben_Bar_Moe (
    codigo_personaje INT,
    codigo_bar_moe INT,
    PRIMARY KEY (codigo_personaje, codigo_bar_moe),
    FOREIGN KEY (codigo_personaje) REFERENCES Personajes_Principales(codigo_personaje),
    FOREIGN KEY (codigo_bar_moe) REFERENCES Bar_Moe(codigo)
) ENGINE=INNODB;


-- INSERCIÓN DE DATOS

-- Badulaque
INSERT INTO badulaque (codigo, nombre_producto) VALUES 
(10, 'Fresisuis de fresa'),
(20, 'Buzz Cola'),
(30, 'Krusty Os'),
(40, 'Rosquillas'),
(50, 'Armas para suicidarse'),
(60, 'Revistas Playtío'),
(70, 'Salchichas del suelo'),
(80, 'Gambas a punto de caducar'),
(90, 'Jasper en el congelador'),
(100, 'Jamon rancio');

-- Bar de Moe
INSERT INTO Bar_Moe (codigo, nombre_producto) VALUES 
(1010, 'Cerveza Duff'),
(1011, 'Flambeado de Moe'),
(1012, 'Moe et Chandon'),
(1013, 'Coctel Olvidalotodo'),
(1014, 'Leche(pintura)'),
(1015, 'Huevos en Salmuera'),
(1016, 'Leche(real)'),
(1017, 'Patatas millonarias de cumpleaños del tío Moe'),
(1018, 'Comida casera de la buena. Frita a la perfección');

-- Tienda de Comics
INSERT INTO Tienda_Comics (codigo, nombre_comic, serie_comic, numero_paginas) 
VALUES 
(500, 'Simpsons Comics #1', 'Simpsons Comics', 29),
(501, 'La casa arbol del terror #7', 'Simpsons Comics', 29),
(502, 'Simpsons Comics #139', 'Simpsons Comics', 29),
(503, 'Simpsons Comics #139', 'Simpsons Comics', 29),
(504, 'Simpsons Comics #28', 'Simpsons Comics', 29),
(505, 'Bartman #2', 'Simpsons Comics', 29),
(506, 'Simpsons Comics #4', 'Simpsons Comics', 29),
(507, 'Casa arbol del terror #3', 'Simpsons Comics', 29),
(508, 'Bartman #22', 'Simpsons Comics', 29),
(509, 'Radioactivo-Man #2', 'Simpsons Comics', 29),
(510, 'Rasca y pica #1', 'Simpsons Comics', 29);
-- Personajes Principales
INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) VALUES 
(1, 'Homer', 'Simpson', 'Mona', 'Abraham', 'Carlos Ysbert', 'El show de Tracey Ullman'),
(2, 'Marge', 'Simpson', 'Jaqueline', 'Clancy', 'Margarita de Francia', 'El show de Tracey Ullman'),
(3, 'Bart', 'Simpson', 'Marge', 'Homer', 'Sara Vivas', 'El show de Tracey Ullman'),
(4, 'Lisa', 'Simpson', 'Marge', 'Homer', 'Isatxa Menjibar', 'El show de Tracey Ullman'),
(5, 'Maggie', 'Simpson', 'Marge', 'Homer', 'Mar Bordallo', 'El show de Tracey Ullman'),
(6, 'Ned', 'Flanders', 'Mona', 'Ned Sr', 'Carlos del Pino', 'Los Simpsons (1x01)'),
(7, 'Maude', 'Flanders', NULL, NULL, 'Laura Palacios', 'Los Simpsons (2x19)'),
(8, 'Rod', 'Flanders', 'Maude', 'Ned', 'Chelo Vivares', 'Los Simpsons (1x07)'),
(9, 'Todd', 'Flanders', 'Maude', 'Ned', 'Chelo Vivares', 'Los Simpsons (1x01)'),
(10, 'Edna', 'Krabappel/Flanders', NULL, NULL, 'Celia Ballester', 'Los Simpsons (1x02)'),
(11, 'Charles Montgomery', 'Burns', 'Daphne', 'Clifford', 'Javier Franquelo (DEP)/Vicente Gil', 'Los Simpsons (1x01)'),
(12, 'Waylon', 'Smithers', NULL, 'Waylon Sr', 'Javier García', 'Los Simpsons (1x03)'),
(13, 'Apu', 'Nahasapeemapetilon', 'Miss Nahasapeemapetilon', NULL, 'Javier García', 'Los Simpsons (1x08)'),
(14, 'Jeff', 'Albertson', NULL, 'Sr Albertson', 'David García', 'Los Simpsons (2x34)'),
(15, 'Moe', 'Szyslak', 'Mom', 'Morty', 'Juan Perucho', 'Los Simpsons (1x01)'),
(16, 'Barney', 'Gumble', NULL, 'Arnie', 'Juan Carlos Lozano', 'Los Simpsons (1x01)'),
(17, 'Lenny', 'Leonard', NULL, NULL, 'Abraham Aguilar', 'Los Simpsons (1x09)'),
(18, 'Carl', 'Carlson', 'Ms Carlson', 'Mr Carlson', 'Juan Antonio Arroyo', 'Los Simpsons (1x10)'),
(19, 'Clancy', 'Wiggum', NULL, 'Iggy', 'Juan Perucho', 'Los Simpsons (1x03)'),
(20, 'Nelson', 'Muntz', 'Miss Muntz', NULL, 'Chelo Vivares', 'Los Simpsons (1x05)'),
(21, 'Data', 'Base', NULL, 'Database Sr', 'Chelo Vivares', 'Los Simpsons (1x12)');