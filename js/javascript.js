//DOM
const btnCambiarAtributo = document.getElementById("btnCambiarAtributo");
const imagencambiar = document.getElementById("imagen-cambiar");
const Personajes = document.querySelector(".Personajes");
const BarMoe = document.querySelector(".BarMoe");
const Badulaque = document.querySelector(".Badulaque");
const Comics = document.querySelector(".Comics");


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

//Para que inicialice la función creadas.
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded ejecutado");
    inicializador();
    

    //Integracion del frontend y el backend (Alejandro)
    const btnMostrar = document.getElementById("botonmostrartodo");
    const btnBuscar = document.getElementById("botonbusquedaporproducto");
    const btnInsertar = document.getElementById("botoninsertarproducto");
    const btnActualizar = document.getElementById("botonactualizarproducto");
    const btnEliminar = document.getElementById("botoneliminarproducto");
    const mensajesDiv = document.getElementById("mensajesalida");

    if (!btnMostrar) return; 

    const BASE_URL = "http://localhost:3000";
    const ENDPOINT = `${BASE_URL}/badulaque`;

    function mostrarMensaje(texto, tipo) {
        if (!mensajesDiv) return;
        mensajesDiv.innerHTML = `<div class="mensaje ${tipo}">${texto}</div>`;
        setTimeout(() => { if (mensajesDiv.innerHTML.includes(texto)) mensajesDiv.innerHTML = ""; }, 4000);
    }

    function mostrarLista(productos) {
        if (!mensajesDiv) return;
        if (!productos || productos.length === 0) {
            mensajesDiv.innerHTML = "<p>No hay productos en Badulaque.</p>";
            return;
        }
        let html = `<h3>Productos de Badulaque</h3><ul class="lista-badulaque">`;
        productos.forEach(prod => {
            html += `<li><strong>${prod.codigo}</strong> - ${prod.nombre_producto}</li>`;
        });
        html += `</ul>`;
        mensajesDiv.innerHTML = html;
    }

    async function obtenerProductos() {
        console.log("Obteniendo productos...");
        try {
            const resp = await fetch(ENDPOINT);
            if (!resp.ok) throw new Error("Error HTTP");
            const data = await resp.json();
            mostrarLista(data);
        } catch (error) {
            mostrarMensaje("No se pudo conectar con el backend en " + BASE_URL, "error");
        }
    }

    async function buscarProducto(nombre) {
        if (!nombre.trim()) return obtenerProductos();
        try {
            const resp = await fetch(`${ENDPOINT}?nombre=${encodeURIComponent(nombre)}`);
            if (!resp.ok) throw new Error();
            const data = await resp.json();
            if (data.length === 0) mensajesDiv.innerHTML = `<p>No se encontró "${nombre}"</p>`;
            else mostrarLista(data);
        } catch (error) {
            mostrarMensaje("Error en búsqueda", "error");
        }
    }

    async function insertarProducto() {
        const codigo = prompt("Código numérico:");
        if (!codigo || isNaN(parseInt(codigo))) return mostrarMensaje("Código inválido", "error");
        const nombre = prompt("Nombre del producto:");
        if (!nombre || !nombre.trim()) return mostrarMensaje("Nombre vacío", "error");
        try {
            const resp = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo: parseInt(codigo), nombre_producto: nombre.trim() })
            });
            if (!resp.ok) throw new Error(await resp.text());
            mostrarMensaje("Producto insertado", "success");
            obtenerProductos();
        } catch (error) {
            mostrarMensaje("Error al insertar", "error");
        }
    }

    async function actualizarProducto() {
        const codigo = prompt("Código a actualizar:");
        if (!codigo || isNaN(parseInt(codigo))) return mostrarMensaje("Código inválido", "error");
        const nuevoNombre = prompt("Nuevo nombre:");
        if (!nuevoNombre || !nuevoNombre.trim()) return mostrarMensaje("Nombre vacío", "error");
        try {
            const resp = await fetch(`${ENDPOINT}/${parseInt(codigo)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre_producto: nuevoNombre.trim() })
            });
            if (!resp.ok) throw new Error();
            mostrarMensaje("Producto actualizado", "success");
            obtenerProductos();
        } catch (error) {
            mostrarMensaje("Error al actualizar", "error");
        }
    }

    async function eliminarProducto() {
        const codigo = prompt("Código a eliminar:");
        if (!codigo || isNaN(parseInt(codigo))) return mostrarMensaje("Código inválido", "error");
        if (!confirm(`¿Eliminar producto ${codigo}?`)) return;
        try {
            const resp = await fetch(`${ENDPOINT}/${parseInt(codigo)}`, { method: "DELETE" });
            if (!resp.ok) throw new Error();
            mostrarMensaje("Producto eliminado", "success");
            obtenerProductos();
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    }

    btnMostrar.addEventListener("click", obtenerProductos);
    btnBuscar.addEventListener("click", () => {
        const nombre = prompt("Nombre a buscar:");
        if (nombre !== null) buscarProducto(nombre);
    });
    btnInsertar.addEventListener("click", insertarProducto);
    btnActualizar.addEventListener("click", actualizarProducto);
    btnEliminar.addEventListener("click", eliminarProducto);

    obtenerProductos();
    
})

function inicializador() {
    //Este botón se encuentra en el sobre nosotros para cambiar las técnicas usadas (HTML, CSS o JS)
    if (btnCambiarAtributo) {
        btnCambiarAtributo.addEventListener("click", () => {
            Lenguajes()
    })
    }
}
/**
 * @brief Cada vez que le das al botón lanza una imagen del lenguaje usado (HTML, CSS o JS y más)
 */
function Lenguajes(){
    const imagenes = [
        "../imagenes/logo_CSS3.svg",
        "../imagenes/logo_JavaScript.svg",
        "../imagenes/logo_HTML5.svg",
        "../imagenes/NodeJS.png",
        "../imagenes/Mysql.png"
    ];
    imagencambiar.src = imagenes[imagenmostrada];
    imagenmostrada = (imagenmostrada + 1) % 5;
};