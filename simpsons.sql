--Crear y usar la base de datos simpsons
Create database simpsons;
use simpsons;

--Creación de la tabla Baduluque
Create table Baduluque (
  codigo INT,
  nombre_productos VARCHAR(255) NOT NULL,
  CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;
--Creación de la tabla Bar de Moe
Create table Bar_Moe (
  codigo INT,
  nombre_productos VARCHAR(255) NOT NULL,
  CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;
--Creación de la tabla tienda de comics
Create table Tienda_Comics (
  codigo INT,
  nombre_comics VARCHAR(255) NOT NULL,
  serie_comic VARCHAR(255) NOT NULL,
  CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;
--Creación de la tabla personajes principales
Create table Personajes_Principales (
  codigo INT,
  nombre_productos VARCHAR(255) NOT NULL,
  CONSTRAINT PRIMARY KEY (codigo)
) ENGINE=INNODB;

--Inserto 