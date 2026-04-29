const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const server = express();
server.use(cors());
server.use(express.json());

server.use(express.static(path.resolve(__dirname, "../")));

const PORT = 3000;

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "simpsons"
});



server.get("/badulaque", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Badulaque";
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

    const sql = "INSERT INTO Badulaque VALUES (?, ?)";

    pool.query(sql, [codigo, nombre_producto], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Insertado" });
    });
});

server.put("/badulaque/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_producto } = req.body;

    const sql = "UPDATE Badulaque SET nombre_producto=? WHERE codigo=?";

    pool.query(sql, [nombre_producto, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});


server.delete("/badulaque/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Badulaque WHERE codigo=?";

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});


server.get("/barMoe", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Bar_Moe";
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

    const sql = "INSERT INTO Bar_Moe VALUES (?, ?)";

    pool.query(sql, [codigo, nombre_producto], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Insertado" });
    });
});

server.put("/barMoe/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_producto } = req.body;

    const sql = "UPDATE Bar_Moe SET nombre_producto=? WHERE codigo=?";

    pool.query(sql, [nombre_producto, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});

server.delete("/barMoe/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Bar_Moe WHERE codigo=?";

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});



server.get("/tienda-comics", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Tienda_Comics";
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

server.post("/tienda-comics", (req, res) => {
    const { codigo, nombre_comic, serie_comic, numero_paginas } = req.body;

    const sql = "INSERT INTO Tienda_Comics VALUES (?, ?, ?, ?)";

    pool.query(sql, [codigo, nombre_comic, serie_comic, numero_paginas], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Insertado" });
    });
});

server.put("/tienda-comics/:codigo", (req, res) => {
    const codigo = req.params.codigo;
    const { nombre_comic, serie_comic, numero_paginas } = req.body;

    const sql = "UPDATE Tienda_Comics SET nombre_comic=?, serie_comic=?, numero_paginas=? WHERE codigo=?";

    pool.query(sql, [nombre_comic, serie_comic, numero_paginas, codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Actualizado" });
    });
});

server.delete("/tienda-comics/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    const sql = "DELETE FROM Tienda_Comics WHERE codigo=?";

    pool.query(sql, [codigo], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});



server.get("/personajes-principales", (req, res) => {
    const nombre = req.query.nombre;
    let sql = "SELECT * FROM Personajes_Principales";
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

server.post("/personajes-principales", (req, res) => {
    const { codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = "INSERT INTO Personajes_Principales VALUES (?, ?, ?, ?, ?, ?, ?)";

    pool.query(sql,
        [codigo_personaje, nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion],
        (error) => {
            if (error) return res.status(500).json({ error });
            res.json({ mensaje: "Insertado" });
        }
    );
});

server.put("/personajes-principales/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion } = req.body;

    const sql = "UPDATE Personajes_Principales SET nombre=?, apellido1=?, madre=?, padre=?, actor_doblaje=?, primera_aparicion=? WHERE codigo_personaje=?";

    pool.query(sql,
        [nombre, apellido1, madre, padre, actor_doblaje, primera_aparicion, id],
        (error) => {
            if (error) return res.status(500).json({ error });
            res.json({ mensaje: "Actualizado" });
        }
    );
});

server.delete("/personajes-principales/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM Personajes_Principales WHERE codigo_personaje=?";

    pool.query(sql, [id], (error) => {
        if (error) return res.status(500).json({ error });
        res.json({ mensaje: "Eliminado" });
    });
});



server.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
