const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const server = express();
server.use(cors());
server.use(express.json());

const PORT = 3000;


server.use(express.static(path.join(__dirname, '..')));

const pool_mysql = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "simpsons",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


server.get("/badulaque", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM badulaque";
    let params = [];
    if (nombre) {
        sql += " WHERE nombre_producto LIKE ?";
        params.push(`%${nombre}%`);
    }
    pool_mysql.query(sql, params, (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Senior Homer eso no esta en mi Badulaque" });
        }
        res.json(resultados);
    });
});

server.post("/badulaque", (req, res) => {
    const { codigo, nombre_producto } = req.body;
    if (!codigo || !nombre_producto) {
        return res.status(400).json({ error: "Faltan campos" });
    }
    const sql = "INSERT INTO Badulaque (codigo, nombre_producto) VALUES (?, ?)";
    pool_mysql.query(sql, [codigo, nombre_producto], (error, result) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Sera posible que me intentes vender productos duplicados" });
            }
            console.error(error);
            return res.status(500).json({ error: "No se pudo insertar" });
        }
        res.status(201).json({ mensaje: "Grasias vuelva pronto" });
    });
});

server.put("/badulaque/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const { nombre_producto } = req.body;
    if (!nombre_producto) {
        return res.status(400).json({ error: "No sabe leer? nesesitas un nombre_producto" });
    }
    const sql = "UPDATE Badulaque SET nombre_producto = ? WHERE codigo = ?";
    pool_mysql.query(sql, [nombre_producto, codigo], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al actualizar hagalo de nuevo" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado busque mejor en los almacenes Costington" });
        }
        res.json({ mensaje: "Producto actualizado" });
    });
});

server.delete("/badulaque/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const sql = "DELETE FROM Badulaque WHERE codigo = ?";
    pool_mysql.query(sql, [codigo], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al eliminar" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    });
});


server.get("/barMoe", (req, res) => {
    const sql = "SELECT codigo, nombre_producto FROM ar_Moe";
    pool_mysql.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: "A ver Pasmao, que da fallo, no lo ves?" });
        res.json(resultados);
    });
});

server.get("/tienda-comics", (req, res) => {
    const sql = "SELECT codigo, nombre_comic, serie_comic, numero_paginas FROM Tienda_Comics";
    pool_mysql.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: "Peor Base de Datos de la Historia" });
        res.json(resultados);
    });
});

server.get("/personajes-principales", (req, res) => {
    const sql = "SELECT codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion FROM Personajes_Principales";
    pool_mysql.query(sql, (error, resultados) => {
        if (error) return res.status(500).json({ error: "Mosquis aqui da fallo" });
        res.json(resultados);
    });
});

// Iniciar servidor
pool_mysql.getConnection((error, connection) => {
    if (error) {
        console.error("Error conectando a MySQL:", error.message);
        process.exit(1);
    }
    connection.release();
    server.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
        console.log(`Inicio en: http://localhost:${PORT}/index.html`)
        console.log(`Productos baratos en: http://localhost:${PORT}/pages/badulaque.html`);
        console.log(`Cogorzas baratas en:http://localhost:${PORT}/pages/barMoe.html`)
    });
});
