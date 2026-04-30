// DOM
const PORT = 3000;
const ENDPOINT_SERVER = "http://localhost";
//Variables
let imagenmostrada = 0;

//Animación del ocapacity (es para que aparezca la página) 
setTimeout(() => {
    const contenedor = document.querySelector('body');
    if (contenedor) contenedor.style.opacity = '1';
}, 100);
setTimeout(() => {
    const contenedor = document.querySelector('.badulaque-body');
    if (contenedor) contenedor.style.opacity = '1';
}, 100);
setTimeout(() => {
    const contenedor = document.querySelector('.bardemoe-body');
    if (contenedor) contenedor.style.opacity = '1';
}, 100);

document.addEventListener("DOMContentLoaded", function () {
    //DOM
    const btnCambiarAtributo = document.getElementById("btnCambiarAtributo");
    const imagencambiar = document.getElementById("imagen-cambiar");
    const botonMostrarTodo = document.getElementById("botonmostrartodo");
    const botonBuscar = document.getElementById("botonbusquedaporproducto");
    const botonInsertar = document.getElementById("botoninsertarproducto");
    const botonEliminar = document.getElementById("botoneliminarproducto");
    const botonActualizar = document.getElementById("botonactualizarproducto");
    const salida = document.getElementById("mensajesalida");
    const pagina = window.location.pathname;
    let ENDPOINT_DATOS = "";

    if (pagina.includes("badulaque")) {
        ENDPOINT_DATOS = "badulaque";
    } 
    else if (pagina.includes("barMoe")) {
        ENDPOINT_DATOS = "barMoe";
    } 
    else if (pagina.includes("tiendaComics")) {
        ENDPOINT_DATOS = "tiendaComics";
    } 
    else if (pagina.includes("personajes")) {
        ENDPOINT_DATOS = "personajes";
    }

    function lenguajes() {
        const imagenes = [
            "../imagenes/logo_CSS3.svg",
            "../imagenes/logo_JavaScript.svg",
            "../imagenes/logo_HTML5.svg",
            "../imagenes/NodeJS.png",
            "../imagenes/Mysql.png"
        ];
        imagencambiar.src = imagenes[imagenmostrada];
        imagenmostrada = (imagenmostrada + 1) % 5;
    }

    function mostrarDatos(productos) {
        salida.innerHTML = "";

        if (productos.length === 0) {
            salida.innerHTML = "<p>No hay productos</p>";
        } else {
            productos.forEach(p => {
                let div = document.createElement("div");
                div.classList.add("grid-item");

                if (pagina.includes("personajes")) {
                    div.innerHTML = `
                        <p><strong>Nombre:</strong> ${p.nombre}</p>
                        <p><strong>Apellido:</strong> ${p.apellido1}</p>
                        <p><strong>Madre:</strong> ${p.madre}</p>
                        <p><strong>Padre:</strong> ${p.padre}</p>
                    `;
                } else if (pagina.includes("tiendaComics")) {
                    div.innerHTML = `
                        <p><strong>Nombre:</strong> ${p.nombre_comic}</p>
                        <p><strong>Serie:</strong> ${p.serie_comic}</p>
                        <p><strong>Páginas:</strong> ${p.numero_paginas}</p>
                    `;
                } else {
                    div.innerHTML = `
                        <p><strong>Nombre:</strong> ${p.nombre_producto}</p>
                        <p><strong>ID:</strong> ${p.codigo}</p>
                    `;
                }

                salida.appendChild(div);
            });
        }
    }
    function consultarDatos(filtro = "todos", valor = "") {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_PRODUCTOS = new URL(ENDPOINT_DATOS, ENDPOINT_SERVER_PUERTO);

        switch (filtro) {
            case "nombre":
                if (pagina.includes("tiendaComics")) {
                    ENDPOINT_SERVER_PRODUCTOS.searchParams.set('nombre_comic', valor);
                } else {
                    ENDPOINT_SERVER_PRODUCTOS.searchParams.set('nombre', valor);
                }
                break;
        }

        fetch(ENDPOINT_SERVER_PRODUCTOS)
            .then(respuesta_servidor => {
                if (!respuesta_servidor.ok) {
                    throw new Error("Error al obtener los productos.");
                }
                return respuesta_servidor.json();
            })
            .then(datos_productos => {
                mostrarDatos(datos_productos);
            })
            .catch(error => {
                console.error("Error consultando productos:", error);
                salida.innerHTML = `<p><b>Error</b>: ${error}</p>`;
            });
    }

    function insertarDato(producto) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_INSERTAR_PRODUCTOS = new URL(ENDPOINT_DATOS, ENDPOINT_SERVER_PUERTO);

        fetch(ENDPOINT_SERVER_INSERTAR_PRODUCTOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })
        .then(respuesta_servidor => {
            if (!respuesta_servidor.ok) {
                throw new Error("Error al insertar el producto.");
            }
            return respuesta_servidor.json();
        })
        .then(datos => {
            console.log(datos);
            alert(datos.mensaje);
            consultarDatos();
        })
        .catch(error => {
            console.error("Error al insertar el producto:", error);
            salida.innerHTML = `<p><b>Error</b>: ${error}</p>`;
        });
    }

    function eliminarProducto(dato) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_ELIMINAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${dato.codigo}`+ `/${dato.codigo_personaje}` ,ENDPOINT_SERVER_PUERTO);

        fetch(ENDPOINT_SERVER_ELIMINAR_PRODUCTOS, {
            method: "DELETE"
        })
        .then(respuesta_servidor => {
            if (!respuesta_servidor.ok) {
                throw new Error("Error al eliminar el producto.");
            }
            return respuesta_servidor.json();
        })
        .then(datos => {
            console.log(datos);
            alert(datos.mensaje);
            consultarDatos();
        })
        .catch(error => {
            console.error("Error al eliminar el producto:", error);
            salida.innerHTML = `<p><b>Error</b>: ${error}</p>`;
        });
    }

    function actualizarDato(dato) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${dato.codigo}`, ENDPOINT_SERVER_PUERTO
        );

        fetch(ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dato)
        })
        .then(respuesta_servidor => {
            if (!respuesta_servidor.ok) {
                throw new Error("Error al actualizar el producto.");
            }
            return respuesta_servidor.json();
        })
        .then(datos => {
            console.log(datos);
            alert(datos.mensaje);
            consultarDatos();
        })
        .catch(error => {
            console.error("Error al actualizar el producto:", error);
            salida.innerHTML = `<p><b>Error</b>: ${error}</p>`;
        });
    }

    if (btnCambiarAtributo) btnCambiarAtributo.addEventListener("click", lenguajes);
    if (botonMostrarTodo) botonMostrarTodo.addEventListener("click", () => consultarDatos());
    if (botonBuscar) botonBuscar.addEventListener("click", () => consultarDatos());
    if (botonInsertar) botonInsertar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 1111,
                nombre: "Prueba00",
                apellido1: "Prueba00",
                madre: "Prueba00",
                padre: "Prueba00",
                actor_doblaje: "Prueba00",
                primera_aparicion: "Prueba00"
            };
        } else if (pagina.includes("tiendaComics")) {
            producto = {
                codigo: 1111,
                nombre_comic: "Prueba00",
                serie_comic: "Prueba00",
                numero_paginas: 1111
            };
        } else {
            producto = {
                codigo: 1111,
                nombre_producto: "Prueba00"
            };
        }

        insertarDato(producto);
    });

    if (botonEliminar) botonEliminar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 111111
            };
        } else {
            producto = {
                codigo: 111111
            };
        }

        eliminarProducto(producto);
    });

    if (botonActualizar) botonActualizar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 99,
                nombre: "PruebaNombre",
                apellido1: "PruebaApellido",
                madre: "PruebaMadre",
                padre: "PruebaPadre",
                actor_doblaje: "PruebaActor",
                primera_aparicion: "PruebaAparicion"
            };
        } else if (pagina.includes("tiendaComics")) {
            producto = {
                codigo: 999,
                nombre_comic: "PruebaComicActualizado",
                serie_comic: "PruebaSerieActualizada",
                numero_paginas: 20
            };
        } else {
            producto = {
                codigo: 999,
                nombre_producto: "ProductoActualizado"
            };
        }

        actualizarProducto(producto);
    });

});
