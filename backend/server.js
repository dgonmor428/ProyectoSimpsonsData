const express = require("express");          // Importa el framework para crear el servidor web 
const mysql = require("mysql2");            // Importa el cliente para conectarnos a MySQL 
const cors = require("cors");                // Importa el módulo CORS (Cross-Origin Resource Sharing), que permite que el servidor acepte solicitudes desde un dominio diferente al suyo 

// Creamos una instancia de Express para nuestro servidor 
const server = express(); 
// Habilitamos las peticiones desde el frontend 
 server.use(cors());            // Habilita CORS para evitar bloqueos en las peticiones del navegador 
 server.use(express.json());    // Permite recibir datos en formato JSON en las peticiones 
   
 // Definimos las constantes necesarias para la conexión con el servidor 
 const PORT = 3000;  // Puerto donde correrá nuestro servidor 
   
 // Creamos un pool de conexiones, que hará que las conexiones se hagan bajo demanda según se vayan necesitando 
 const pool = mysql.createPool({ 
     host: "localhost",              // Dirección del servidor 
     port: 3306,                     // Puerto al que nos conectamos en MySQL 
     user: "root",                   // Usuario al que nos conectamos 
     password: "",                   // Contraseña del usuario al que nos conectamos 
     database: "simpsons",          // Nombre de la base de datos que nos conectamos 
     waitForConnections: true,       // Hace que las nuevas peticiones esperan en cola hasta que haya una conexión libre. Si vale false esas nuevas peticiones fallan 

     connectionLimit: 10,            // Define el máximo de conexiones simultáneas al servidor MySQL
     queueLimit: 0                    // Define el límite de peticiones en espera. El valor 0 define una cola infinita
 });
 //este es el GET, aqui pilla los datos del SQL
server.get("/badulaque", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Badulaque"; //Aqui lo selecciona todo de la tabla
    let valores = [];

    if (nombre) {
        sql += " WHERE nombre_producto LIKE ?";
        valores.push(`%${nombre}%`);
    }

    pool.query(sql, valores, (error, datos) => {
        if (error) return res.status(500).json({ error });
        res.json(datos);
    });
});


server.post("/badulaque", (req, res) => {
    const { codigo, nombre_producto } = req.body;

    const sql = "INSERT INTO Badulaque (codigo, nombre_producto) VALUES (?, ?)"; //Esto inserta los datos en la tabla

    pool.query(sql, [codigo, nombre_producto], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({
             mensaje: "Producto insertado correctamente", 
             datos: { codigo, nombre_producto } 
        });
    });
});

server.put("/badulaque/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_producto } = req.body;

    const sql = "UPDATE Badulaque SET nombre_producto=? WHERE codigo=?"; //Esto lo que hace es actualizar la tabla

    pool.query(sql, [nombre_producto, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});


server.delete("/badulaque/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Badulaque WHERE codigo=?"; //Aqui hace el delete para borrar el dato seleccionado

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});


server.get("/barMoe", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Bar_Moe"; //Aqui muestra todos los datos de la tabla del bar
    let valores = [];

    if (nombre) {
        sql += " WHERE nombre_producto LIKE ?";
        valores.push(`%${nombre}%`);
    }

    pool.query(sql, valores, (error, datos) => {
        if (error) return res.status(500).json({ error });
        res.json(datos);
    });
});

server.post("/barMoe", (req, res) => {
    const { codigo, nombre_producto } = req.body;

     const sql = "INSERT INTO Bar_Moe (codigo, nombre_producto) VALUES (?, ?)"; //Esto añade producto al bar

    pool.query(sql, [codigo, nombre_producto], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({
             mensaje: "Producto insertado correctamente", 
             datos: { codigo, nombre_producto } 
        });
    });
});

server.put("/barMoe/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_producto } = req.body;

    const sql = "UPDATE Bar_Moe SET nombre_producto=? WHERE codigo=?"; //(venga que esta ya nos la sabemos, repitamos todos juntos) Esto actualiza el producto que selecciones

    pool.query(sql, [nombre_producto, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});

server.delete("/barMoe/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Bar_Moe WHERE codigo=?"; //Y este es el borrado de productos

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});

server.get("/tiendaComics", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Tienda_Comics"; //Dentro del CRUD esta es la R de Read, osea, que te enseña todos los datos
    let valores = [];

    if (nombre) {
        sql += " WHERE nombre_comic LIKE ?";
        valores.push(`%${nombre}%`);
    }

    pool.query(sql, valores, (error, datos) => {
        if (error) return res.status(500).json({ error });
        res.json(datos);
    });
});

server.post("/tiendaComics", (req, res) => {
    const { codigo, nombre_comic, serie_comic, numero_paginas } = req.body;

    const sql = "INSERT INTO Tienda_Comics (codigo, nombre_comic, serie_comic, numero_paginas) VALUES (?, ?, ?, ?)"; //Aqui puedes poner otro comic (centro del CRUD es la C de Create)

    pool.query(sql, [codigo, nombre_comic, serie_comic, numero_paginas], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({
             mensaje: "Producto insertado correctamente", 
             datos: { codigo, nombre_comic, serie_comic, numero_paginas } 
        });
    });
});

server.put("/tiendaComics/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_comic, serie_comic, numero_paginas } = req.body;

    const sql = "UPDATE Tienda_Comics SET nombre_comic=?, serie_comic=?, numero_paginas=? WHERE codigo=?"; //UPDATE, exacto, dentro del CRUD esta es la U, te actualiza los datos que selecciones

    pool.query(sql, [nombre_comic, serie_comic, numero_paginas, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});

server.delete("/tiendaComics/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Tienda_Comics WHERE codigo=?"; //Y este es el D de nuestro CRUD, que elimina el dato seleccionado

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});



server.get("/personajes", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Personajes_Principales"; //Aqui para que veas a los personajes, con sus datos, actor de doblaje en castellano y primera aparicion
    let valores = [];

    if (nombre) {
        sql += " WHERE nombre LIKE ?";
        valores.push(`%${nombre}%`);
    }

    pool.query(sql, valores, (error, datos) => {
        if (error) return res.status(500).json({ error });
        res.json(datos);
    });
});

server.post("/personajes", (req, res) => {
    const { codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = "INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion) VALUES (?, ?, ?, ?, ?, ?, ?)"; //Esto es para que pongas otro personaje (Que siendo Los Simpsons puedes poner cientos, o autoinsertarte tú mismo)

    pool.query(sql,
        [codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion],
        (error) => {
            if (error) return res.status(500).json({ error });
            res.json({
             mensaje: "Producto insertado correctamente", 
             datos: { codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } 
        });
        }
    );
});

server.put("/personajes/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = "UPDATE Personajes_Principales SET nombre=?, apellido1=?, madre=?, padre=?, actor_doblaje=?, primera_aparicion=? WHERE codigo_personaje=?"; // Por si te arrepientes de poner algún personaje (como Disney que se arrepintió de poner a Michael Jackson en el primer capitulo de la temporada 3) pues lo actualizas y como si nada hubiera pasado

    pool.query(sql,
        [nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion, id],
        (error) => {
            if (error) return res.status(500).json({ error });
            res.json({ mensaje: "Se ha actualizado correctamente" });
        }
    );
});

server.delete("/personajes/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM Personajes_Principales WHERE codigo_personaje=?"; //O por el contrario si quieres borrar un personaje (como borraron a Lionel Hutz y Troy McClure) pues aqui se borra directametne

    pool.query(sql, [id], (error) => {
        if (error){
            console.error("Error en DELETE:", error);
            return res.status(500).json({ error });
        } 
        res.json({ mensaje: "Se ha eliminado correctamente" });
    });
});

/**
 * Función para arrancar el servidor
 */
function iniciarServidor() { 
    // Solo arrancamos el servidor cuando la BD está conectada 
    pool.getConnection((error, connection) => { 
        if (error) { 
            console.error("Error conectando a MySQL:", error); 
            process.exit(1); // Si falla la BD, cerramos el server 
        } 
        connection.release(); 
        // Iniciamos el servidor en el puerto especificado 
        server.listen(PORT, () => { 
            // Confirmación en la consola de que se ha lanzado el servidor OK 
            console.log(`Conectado a MySQL. Servidor corriendo en http://localhost:${PORT}`); 
        }); 
    }); 
}

iniciarServidor(); //Para arrancar el servidor
