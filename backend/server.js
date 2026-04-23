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
     database: "ejemplo_usuarios",   // Nombre de la base de datos que nos conectamos 
     waitForConnections: true,       // Hace que las nuevas peticiones esperan en cola hasta que haya una conexión libre. Si vale false esas nuevas peticiones fallan 
     connectionLimit: 10,            // Define el máximo de conexiones simultáneas al servidor MySQL 
     queueLimit: 0                   // Define el límite de peticiones en espera. El valor 0 define una cola infinita 
});