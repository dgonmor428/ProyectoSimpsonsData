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
    //Para las imagenes
    const btnCambiarAtributo = document.getElementById("btnCambiarAtributo");
    const imagencambiar = document.getElementById("imagen-cambiar");
    //Para los botones de cada pestaña
    const botonMostrarTodo = document.getElementById("botonmostrartodo");
    const botonBuscar = document.getElementById("botonbusquedaporproducto");
    const busquedapornombre = document.getElementById("busquedapornombre");
    const busquedapornombre_producto = document.getElementById("busquedapornombre_producto");
    const busquedapornombre_comic = document.getElementById("busquedapornombre_comic");
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
            "../imagenes/css.webp",
            "../imagenes/js.webp",
            "../imagenes/NodeJS.png",
            "../imagenes/Mysql.png",
            "../imagenes/html5-logo.webp"
        ];
        imagencambiar.src = imagenes[imagenmostrada];
        imagenmostrada = (imagenmostrada + 1) % 5;
    }

    function mostrarDatos(productos) {
        salida.innerHTML = "";

        if (productos.length === 0) {
            salida.innerHTML = "<p>No existe ningún dato relacionado. Por favor introduce otro dato correctamente.</p>";
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
                        <p><strong>Actor:</strong> ${p.actor_doblaje}</p>
                        <p><strong>Primera_aparicion:</strong> ${p.primera_aparicion}</p>
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
                    ENDPOINT_SERVER_PRODUCTOS.searchParams.set('nombre', valor);
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

    function insertarDato(dato) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_INSERTAR_PRODUCTOS = new URL(ENDPOINT_DATOS, ENDPOINT_SERVER_PUERTO);

        fetch(ENDPOINT_SERVER_INSERTAR_PRODUCTOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dato)
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

    function eliminarProducto(producto) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        let ENDPOINT_SERVER_ELIMINAR_PRODUCTOS;

        if (pagina.includes("personajes")) {
            ENDPOINT_SERVER_ELIMINAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${producto.codigo_personaje}`, ENDPOINT_SERVER_PUERTO);
        } else {
            ENDPOINT_SERVER_ELIMINAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${producto.codigo}`, ENDPOINT_SERVER_PUERTO);
        }

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

    function actualizarDato(producto) {
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        let ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS;

         if (pagina.includes("personajes")) {
            ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${producto.codigo_personaje}`, ENDPOINT_SERVER_PUERTO);
        } else {
            ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS = new URL(ENDPOINT_DATOS + `/${producto.codigo}`, ENDPOINT_SERVER_PUERTO);
        }

        fetch(ENDPOINT_SERVER_ACTUALIZAR_PRODUCTOS, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
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
    //Busca por nombre de los personajes
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
    consultarDatos("nombre", busquedapornombre.value.trim());
    });
    //Busca por nombre de los productos
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
    consultarDatos("nombre", busquedapornombre_producto.value.trim());
    });
    //Busca por nombre de comic
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
    consultarDatos("nombre", busquedapornombre_comic.value.trim());
    });
    if (botonInsertar) botonInsertar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 1234522242,
                nombre: "Prueba01325",
                apellido1: "Prueba01",
                madre: "Prueba01",
                padre: "Prueba01",
                actor_doblaje: "Prueba00",
                primera_aparicion: "Prueba00"
            };
        } else if (pagina.includes("tiendaComics")) {
            producto = {
                codigo: 1111234,
                nombre_comic: "Prueba001",
                serie_comic: "Prueba001",
                numero_paginas: 1111
            };
        } else {
            producto = {
                codigo: 1010,
                nombre_producto: "Prueba001"
            };
        }

        insertarDato(producto);
    });

    if (botonEliminar) botonEliminar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 1234522242
            };
        } else {
            producto = {
                codigo: 1111234
            };
        }

        eliminarProducto(producto);
    });

    if (botonActualizar) botonActualizar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 2,
                nombre: "PruebaNombrea123",
                apellido1: "PruebaApellido",
                madre: "PruebaMadre",
                padre: "PruebaPadre",
                actor_doblaje: "PruebaActor",
                primera_aparicion: "PruebaAparicion"
            };
        } else if (pagina.includes("tiendaComics")) {
            producto = {
                codigo: 510,
                nombre_comic: "PruebaComicActualizado",
                serie_comic: "PruebaSerieActualizada",
                numero_paginas: 20
            };
        } else {
            producto = {
                codigo: 1010,
                nombre_producto: "ProductoActualizado"
            };
        }

        actualizarDato(producto);
    });

});
