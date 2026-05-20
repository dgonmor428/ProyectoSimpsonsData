// DOM
const PORT = 3000;
const ENDPOINT_SERVER = "http://localhost";
//Variables
let imagenmostrada = 0;
let videomostrado = 0;
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
    //Para los videos
    const btnCambiarVideo = document.getElementById("btnCambiarVideo");
    const videocambiar = document.getElementById("video-cambiar");
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
    //Parte de la api externa DOM
    const endpoint_frases = "https://thesimpsonsapi.com/api/characters";
    const frases = document.querySelector(".boton-frase");
    const resultado = document.querySelector(".resultado-frase");

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

    /**
    * @brief Parte del cambio de lenguajes, es decir, hay un botón que cada vez de pulsarlo te devuelve una imagen de un lenguaje de programación diferente utilizados.
    */
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

 /**
  * @brief Funcion para cambiar de clips, a alegir entre el viejo Judio en calzoncillos, la cancion del Badulaque y la del monorail
  */
    function videos() {
        const videos = [
            "../videos/monorail.mp4",
            "../videos/quienquiereunbadulaque.mp4",
            "../videos/yeguagris.mp4",
        ];
      videocambiar.src = videos[videomostrado];
        videomostrado = (videomostrado + 1) % videos.length;
    }


    /**
     * @brief Saca una frase aleatoria de Los Simpsons (API)
     */
    function FrasesSimpsons() {
        fetch(endpoint_frases)
            .then(response => {
                // STATUS HTTP
                // 200 OK
                // 404 no existe
                // 500 error servidor
                if (!response.ok) {
                    throw new Error("Error al obtener la frase");
                }
                return response.json();
            })
            .then(data => {
                // En la API hay arrays, entonces tengo que irme al apartado results para obtener la información necesaria
                // Los personajes están en data.results, NO en data directamente
                const lista = data.results;
                // Escoge un personaje aleatorio del array de la api esa
                const id = lista[Math.floor(Math.random() * lista.length)];
                // Elige una frase aleatoria del array de PHRASES por que es un array con subsarrays
                const frase = id.phrases[Math.floor(Math.random() * id.phrases.length)];
                //Decoración html
                resultado.innerHTML = `
                    <div class="frases">
                        <h3>${id.name}</h3>
                        <p>"${frase}"</p>
                    </div>
                `;
            })
            .catch(error => {
                resultado.innerHTML = `<p>${error.name}: ${error.message}</p>`;
            });
    }

    /**
     * @brief Función para mostrar los datos obtenidos de la base de datos en el HTML
     */
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
    
    /**
     * @brief Consulta datos al servidor con filtro (el nombre)
     */
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

    /**
     * @brief Función para insertar un nuevo producto, personaje en la base de datos
     */
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

    /**
     * @brief Función para eliminar un producto o personaje de la base de datos
     */
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

    /**
     * @brief Función para actualizar un producto o personaje en la base de datos 
     */
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
    //Alejandro hay una pagina que se llama desarrollo web que te sale cosas interesante ahí es donde he visto el tema de los sonidos y lo he ajustado un poco nada más. Por si te interesa
    //Eventos:
    //Botón para cambiar la imagen de los lenguajes de programación
    if (btnCambiarAtributo) btnCambiarAtributo.addEventListener("click", lenguajes);
    btnCambiarVideo.addEventListener("click", videos);
    //Botón para mostrar una frase aleatoria de los simpsons
    if (frases) frases.addEventListener("click", FrasesSimpsons);
    //Botón para mostrar todos los datos
    if (botonMostrarTodo) botonMostrarTodo.addEventListener("click", () => {
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/homer.mp3");
        sonido.play();
    consultarDatos();});
    //Busca por filtro (nombre) de los personajes
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/apu.mp3");
        sonido.play();
    consultarDatos("nombre", busquedapornombre.value.trim());
    });
    //Busca por filtro (nombre) de los productos
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/apu.mp3");
        sonido.play();
    consultarDatos("nombre", busquedapornombre_producto.value.trim());
    });
    //Busca por filtro (nombre) de los comics
    if (botonBuscar) botonBuscar.addEventListener("click", () => {
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/apu.mp3");
        sonido.play();
    consultarDatos("nombre", busquedapornombre_comic.value.trim());
    });
    //Botón para insertar un nuevo producto/personaje/comic en la base de datos, además se le puede modificar lo que quieras insertar
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
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/moe.mp3");
        sonido.play();
        insertarDato(producto);
    });
    //Botón para eliminar un nuevo producto/personaje/comic en la base de datos, además se le puede modificar lo que quieras eliminar
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
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/bart.mp3");
        sonido.play();
        eliminarProducto(producto);
    });
    //Botón para actualizar un nuevo producto/personaje/comic en la base de datos, además se le puede modificar lo que quieras actualizar
    if (botonActualizar) botonActualizar.addEventListener("click", () => {
        let producto;

        if (pagina.includes("personajes")) {
            producto = {
                codigo_personaje: 2,
                nombre: "PruebanombreActualizado",
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
        //Esto es algo extra que no aparece en los documentos, es para añadir un sonido al interactuar con un botón. Hay que pulsar varias veces nunca a la primera funciona, no se porqué.
        const sonido = new Audio("../audio/miau.mp3");
        sonido.play();
        actualizarDato(producto);
    });
});
