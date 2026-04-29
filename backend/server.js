// Importamos los módulos necesarios
const express = require("express");    // Importa el framework para crear el servidor web
const mysql = require("mysql2");       // Importa el cliente para conectarnos a MySQL
const cors = require("cors");          // Importa el módulo CORS (Cross-Origin Resource Sharing), que permite que el servidor acepte solicitudes desde un dominio diferente al suyo

// Creamos una instancia de Express para nuestro servidor
const server = express();

// Habilitamos las peticiones desde el frontend
server.use(cors());             // Habilita CORS para evitar bloqueos en las peticiones del navegador
server.use(express.json());     // Permite recibir datos en formato JSON en las peticiones

// Definimos las constantes necesarias para la conexión con el servidor
const PORT = 3000; // Puerto donde correrá nuestro servidor

// Creamos un pool de conexiones, que hará que las conexiones se hagan bajo demanda según se vayan necesitando
const pool_mysql = mysql.createPool({
    host: "localhost",          // Dirección del servidor
    port: 3306,                 // Puerto al que nos conectamos en MySQL
    user: "root",               // Usuario al que nos conectamos
    password: "",               // Contraseña del usuario al que nos conectamos
    database: "simpsons",       // Nombre de la base de datos que nos conectamos
    waitForConnections: true,   // Hace que las nuevas peticiones esperan en cola hasta que haya una conexión libre. Si vale false esas nuevas peticiones fallan
    connectionLimit: 10,        // Define el máximo de conexiones simultáneas al servidor MySQL
    queueLimit: 0               // Define el límite de peticiones en espera. El valor 0 define una cola infinita
});

// Función para iniciar nuestro servidor
function iniciarServidor() {
    // Solo arrancamos el servidor cuando la BD está conectada
    pool_mysql.getConnection((error, connection) => {
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

// Llamamos a la función para que nuestro servidor se lance
iniciarServidor();

// -------------------------------------------------------
// ENDPOINTS DE LA API
// -------------------------------------------------------

// Endpoint GET - Obtener todos los personajes (con filtro opcional por apellido)
server.get("/personajes", (req, res) => {
    const apellido1 = req.query.apellido1;
    let valores = [];
    let sql = "SELECT * FROM Personajes_Principales";

    // Compruebo si existe un parámetro para filtrar por apellido
    if (apellido1) {
        sql += " WHERE apellido1 = ?";
        valores.push(apellido1);
    }

    pool_mysql.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error });
        }

        res.json(resultados);
    });
});

// Endpoint GET - Obtener los personajes cuyo padre sea Homer
server.get("/personajes_hijo_homer", (req, res) => {
    const sql = "SELECT * FROM Personajes_Principales WHERE padre = 'Homer'";

    pool_mysql.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error });
        }

        res.json(resultados);
    });
});

// Endpoint POST - Insertar un nuevo personaje
server.post("/personaje", (req, res) => {
    // Utilizamos la variable req que contiene toda la información que envía el cliente al servidor
    const { codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = `
        INSERT INTO Personajes_Principales (codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    pool_mysql.query(
        sql,
        [codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion],
        (error, resultado) => {
            if (error) {
                console.error("Error en INSERT:", error);
                return res.status(500).json({ error });
            }

            res.json({
                mensaje: "Personaje insertado correctamente",
                datos: { codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion }
            });
        }
    );
});

// Endpoint PUT - Actualizar un personaje existente (clave primaria: codigo_personaje)
server.put("/personaje/:codigo_personaje", (req, res) => {
    // Utilizamos la variable req que contiene toda la información que envía el cliente al servidor
    const codigo_personaje = req.params.codigo_personaje;
    const { nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = `
        UPDATE Personajes_Principales
        SET nombre = ?, apellido1 = ?, madre = ?, padre = ?, actor_doblaje = ?, primera_aparicion = ?
        WHERE codigo_personaje = ?
    `;

    pool_mysql.query(
        sql,
        [nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion, codigo_personaje],
        (error, resultado) => {
            if (error) {
                console.error("Error en UPDATE:", error);
                return res.status(500).json({ error });
            }

            res.json({ mensaje: "Personaje actualizado" });
        }
    );
});

// Endpoint DELETE - Eliminar un personaje (clave primaria: codigo_personaje)
server.delete("/personaje/:codigo_personaje", (req, res) => {
    // Utilizamos la variable req que contiene toda la información que envía el cliente al servidor
    const codigo_personaje = req.params.codigo_personaje;

    const sql = "DELETE FROM Personajes_Principales WHERE codigo_personaje = ?";

    pool_mysql.query(sql, [codigo_personaje], (error) => {
        if (error) {
            console.error("Error en DELETE:", error);
            return res.status(500).json({ error });
        }

        res.json({ mensaje: "Personaje eliminado" });
    });
});
