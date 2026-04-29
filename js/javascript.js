// Constantes necesarias para nuestro proyecto
const PORT = 3000;
const ENDPOINT_SERVER = "http://localhost";
const ENDPOINT_OBTENER_PERSONAJES = "personajes";
const ENDPOINT_INSERTAR_ELIMINAR_ACTUALIZAR_PERSONAJE = "personaje";

document.addEventListener("DOMContentLoaded", () => {

    // Obtenemos las referencias necesarias para operar con los botones, cajas de texto...
    const botonbuscartodo = document.getElementById("botonbuscartodo");                             // Botón para mostrar todos los personajes
    const botonbusquedaporapellido = document.getElementById("botonbusquedaporapellido");           // Botón para buscar por apellido
    const botoninsertarpersonaje = document.getElementById("botoninsertarpersonaje");               // Botón para insertar un nuevo personaje
    const botoneliminarPersonaje = document.getElementById("botoneliminarPersonaje");              // Botón para eliminar un personaje
    const botonactualizarPersonaje = document.getElementById("botonactualizarPersonaje");          // Botón para actualizar un personaje
    const busquedaporapellido = document.getElementById("busquedaporapellido");                    // Input de búsqueda por apellido
    const mensajesalida = document.getElementById("mensajesalida");                                // Contenedor donde se mostrarán los resultados

    // Función para mostrar en la web todos los personajes que rescatemos de la base de datos
    function mostrarPersonajes(personajes) {
        mensajesalida.innerHTML = ""; // Limpio el contenedor de resultados

        // Si no hay personajes encontrados, muestro un mensaje
        if (personajes.length === 0) {
            mensajesalida.innerHTML = "<p>No se encontraron personajes.</p>";
        } else {
            // Recorro la lista de personajes y creo un div para cada uno
            personajes.forEach(personaje => {
                let div = document.createElement("div");
                div.classList.add("grid-item");
                div.innerHTML = `<p><strong><u>Nombre:</u></strong> <span>${personaje.nombre} ${personaje.apellido1}</span></p>
                <p><strong><u>Madre:</u></strong> <span>${personaje.madre ?? "Desconocida"}</span></p>
                <p><strong><u>Padre:</u></strong> <span>${personaje.padre ?? "Desconocido"}</span></p>
                <p><strong><u>Actor de doblaje:</u></strong> <span>${personaje.actor_doblaje}</span></p>
                <p><strong><u>Primera aparición:</u></strong> <span>${personaje.primera_aparicion}</span></p>`;
                mensajesalida.appendChild(div); // Agrego el div al contenedor de salida
            });
        }
    }

    // Función para obtener datos de los personajes de la base de datos
    // Esta función admitirá un posible filtro para buscar personajes por apellido
    function consultarPersonajes(filtro = "todos", valor = "") {
        // Creo la URL del Endpoint del servidor para consultar personajes
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_PERSONAJES = new URL(ENDPOINT_OBTENER_PERSONAJES, ENDPOINT_SERVER_PUERTO);

        // Si se ha indicado un filtro, lo agrego a la URL con parámetros de consulta
        switch (filtro) {
            case "apellido":
                ENDPOINT_SERVER_PERSONAJES.searchParams.set('apellido1', valor); // Búsqueda por apellido
                break;
        }

        //console.log(ENDPOINT_SERVER_PERSONAJES.href);

        fetch(ENDPOINT_SERVER_PERSONAJES)
            .then(respuesta_servidor => {
                if (!respuesta_servidor.ok) {
                    throw new Error("Error al obtener los personajes.");
                }
                return respuesta_servidor.json();
            })
            .then(datos_personajes => {
                mostrarPersonajes(datos_personajes); // Muestro los personajes en la página
            })
            .catch(error => {
                console.error("Error consultando personajes:", error); // Muestro el error en la consola
                mensajesalida.innerHTML = `<p><b>Error</b>: ${error}</p>`; // Muestro mensaje de error en la interfaz
            });
    }

    // Función para insertar un personaje en la base de datos. Eso se hará mediante el método POST
    function insertarPersonaje(personaje) {
        // Creo la URL del Endpoint del servidor para insertar un personaje
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_INSERTAR_PERSONAJES = new URL(ENDPOINT_INSERTAR_ELIMINAR_ACTUALIZAR_PERSONAJE, ENDPOINT_SERVER_PUERTO);

        //console.log(ENDPOINT_SERVER_INSERTAR_PERSONAJES.href);

        fetch(ENDPOINT_SERVER_INSERTAR_PERSONAJES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personaje)
        })
            .then(respuesta_servidor => {
                if (!respuesta_servidor.ok) {
                    throw new Error("Error al insertar el personaje.");
                }
                return respuesta_servidor.json();
            })
            .then(datos => {
                console.log(datos);
                alert(datos.mensaje);
            })
            .catch(error => {
                console.error("Error al insertar el personaje:", error); // Muestro el error en la consola
                mensajesalida.innerHTML = `<p><b>Error</b>: ${error}</p>`; // Muestro mensaje de error en la interfaz
            });
    }

    // Función para eliminar un personaje en la base de datos. Eso se hará mediante el método DELETE
    function eliminarPersonaje(personaje) {
        // Creo la URL del Endpoint del servidor para eliminar el personaje
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_ELIMINAR_PERSONAJES = new URL(ENDPOINT_INSERTAR_ELIMINAR_ACTUALIZAR_PERSONAJE + `/${personaje.codigo_personaje}`, ENDPOINT_SERVER_PUERTO);

        //console.log(ENDPOINT_SERVER_ELIMINAR_PERSONAJES.href);

        fetch(ENDPOINT_SERVER_ELIMINAR_PERSONAJES, {
            method: "DELETE"
        })
            .then(respuesta_servidor => {
                if (!respuesta_servidor.ok) {
                    throw new Error("Error al eliminar el personaje.");
                }
                return respuesta_servidor.json();
            })
            .then(datos => {
                console.log(datos);
                alert(datos.mensaje);
            })
            .catch(error => {
                console.error("Error al eliminar el personaje:", error); // Muestro el error en la consola
                mensajesalida.innerHTML = `<p><b>Error</b>: ${error}</p>`; // Muestro mensaje de error
            });
    }

    // Función para actualizar los datos de un personaje en la base de datos. Eso se hará mediante el método PUT
    function actualizarPersonaje(personaje) {
        // Creo la URL del Endpoint del servidor para actualizar el personaje
        const ENDPOINT_SERVER_PUERTO = new URL(ENDPOINT_SERVER);
        ENDPOINT_SERVER_PUERTO.port = PORT;

        const ENDPOINT_SERVER_ACTUALIZAR_PERSONAJES = new URL(ENDPOINT_INSERTAR_ELIMINAR_ACTUALIZAR_PERSONAJE + `/${personaje.codigo_personaje}`, ENDPOINT_SERVER_PUERTO);

        //console.log(ENDPOINT_SERVER_ACTUALIZAR_PERSONAJES.href);

        fetch(ENDPOINT_SERVER_ACTUALIZAR_PERSONAJES, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personaje)
        })
            .then(respuesta_servidor => {
                if (!respuesta_servidor.ok) {
                    throw new Error("Error al actualizar el personaje.");
                }
                return respuesta_servidor.json();
            })
            .then(datos => {
                console.log(datos);
                alert(datos.mensaje);
            })
            .catch(error => {
                console.error("Error al actualizar el personaje:", error); // Muestro el error en la consola
                mensajesalida.innerHTML = `<p><b>Error</b>: ${error}</p>`; // Muestro mensaje de error en la interfaz
            });
    }

    // Eventos click de los botones
    botonbuscartodo.addEventListener("click", () => consultarPersonajes());

    botonbusquedaporapellido.addEventListener("click", () => consultarPersonajes("apellido", busquedaporapellido.value.trim()));

    botoninsertarpersonaje.addEventListener("click", () => {
        // Creo un objeto personaje con datos inventados fijos
        const personaje_nuevo = {
            codigo_personaje: 99,
            nombre: "00Prueba",
            apellido1: "00Prueba",
            madre: "00Prueba",
            padre: "00Prueba",
            actor_doblaje: "00Prueba",
            primera_aparicion: "00Prueba"
        };

        insertarPersonaje(personaje_nuevo);
    });

    botoneliminarPersonaje.addEventListener("click", () => {
        // Creo un objeto personaje con datos inventados fijos
        const personaje = {
            codigo_personaje: 99
        };

        eliminarPersonaje(personaje);
    });

    botonactualizarPersonaje.addEventListener("click", () => {
        // Creo un objeto personaje con datos inventados fijos
        const personaje = {
            codigo_personaje: 99,
            nombre: "00Prueba00",
            apellido1: "00Prueba00",
            madre: "00Prueba00",
            padre: "00Prueba00",
            actor_doblaje: "00Prueba00",
            primera_aparicion: "00Prueba00"
        };

        actualizarPersonaje(personaje);
    });

});
