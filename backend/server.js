// Importamos los módulos necesarios 
const express = require("express");         // Importa el framework para crear el servidor web 
const mysql = require("mysql2");            // Importa el cliente para conectarnos a MySQL 
const cors = require("cors");               // Importa el módulo CORS (Cross-Origin Resource Sharing), que permite que el servidor acepte solicitudes desde un dominio diferente al suyo 
 
// Creamos una instancia de Express para nuestro servidor 
const server = express(); 
  
// Habilitamos las peticiones desde el frontend 
server.use(cors());            // Habilita CORS para evitar bloqueos en las peticiones del navegador 
server.use(express.json());    // Permite recibir datos en formato JSON en las peticiones 
   
// Definimos las constantes necesarias para la conexión con el servidor 
const PORT = 3000;  // Puerto donde correrá nuestro servidor 
  
// Creamos un pool de conexiones, que hará que las conexiones se hagan bajo demanda según se vayan necesitando 
const pool_mysql = mysql.createPool({ 
     host: "localhost",              // Dirección del servidor 
     port: 3306,                     // Puerto al que nos conectamos en MySQL 
     user: "root",                   // Usuario al que nos conectamos 
     password: "",                   // Contraseña del usuario al que nos conectamos 
     database: "simpsons",   // Nombre de la base de datos que nos conectamos 
     waitForConnections: true,       // Hace que las nuevas peticiones esperan en cola hasta que haya una conexión libre. Si vale false esas nuevas peticiones fallan 
     connectionLimit: 10,            // Define el máximo de conexiones simultáneas al servidor MySQL 
     queueLimit: 0                   // Define el límite de peticiones en espera. El valor 0 define una cola infinita 
});

server.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente. Ve a /usuarios para ver los datos.");
});

server.get("/badulaque", (req, res) => {
    const ciudad = req.query.ciudad;
    let valores = [];
    let sql = "SELECT * FROM Badulaque";

    if (ciudad) {
        sql += " WHERE ciudad = ?";
        valores.push(ciudad);
    }

    
    pool_mysql.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ 
                mensaje: "Error al consultar la base de datos",
                detalle: error.message 
            });
        }
        res.json(resultados);
    });
});


server.get("/barMoe", (req, res) => {
    const ciudad = req.query.ciudad;
    let valores = [];
    let sql = "SELECT * FROM Bar_Moe";

    if (ciudad) {
        sql += " WHERE ciudad = ?";
        valores.push(ciudad);
    }

    
    pool_mysql.query(sql, valores, (error, resultados) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ 
                mensaje: "Error al consultar la base de datos",
                detalle: error.message 
            });
        }
        res.json(resultados);
    });
});



function iniciarServidor() {
    pool_mysql.getConnection((error, connection) => {
        if (error) {
            console.error("--- ERROR DE CONEXIÓN ---");
            console.error("No se pudo conectar a MySQL. Revisa si el servicio está activo o si el puerto/password son correctos.");
            console.error("Detalle:", error.code);
            process.exit(1);
        }
        
        // Si llegamos aquí, la conexión es correcta
        connection.release();
        server.listen(PORT, () => {
            console.log(`Bienvenido al Badulaque http://localhost:${PORT}`);
            console.log(`Endpoint de productos de calidad dudosa en el badulaque: http://localhost:${PORT}/badulaque`);
            console.log(`Endpoint de cogorzas baratas: http://localhost:${PORT}/barMoe`);
        });
        
    });
}


iniciarServidor();