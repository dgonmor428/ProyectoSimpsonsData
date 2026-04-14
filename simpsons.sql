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
)ENGINE=INNODB;

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