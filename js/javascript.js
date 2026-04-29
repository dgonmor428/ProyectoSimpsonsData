document.addEventListener("DOMContentLoaded", () => {

    const pagina = window.location.pathname;

    let URL = "";

        if (pagina.includes("badulaque")) {
            URL = "http://localhost:3000/badulaque";
        } 
        else if (pagina.includes("barMoe")) {
            URL = "http://localhost:3000/barMoe";
        } 
        else if (pagina.includes("tiendaComics")) {
            URL = "http://localhost:3000/tiendaComics";
        } 
        else if (pagina.includes("personajes")) {
            URL = "http://localhost:3000/personajes";
        }

    
    const botonMostrarTodo = document.getElementById("botonmostrartodo");
    const botonBuscar = document.getElementById("botonbusquedaporproducto");
    const botonInsertar = document.getElementById("botoninsertarproducto");
    const botonEliminar = document.getElementById("botoneliminarproducto");
    const botonActualizar = document.getElementById("botonactualizarproducto");
    const salida = document.getElementById("mensajesalida");

    
    function mostrarProductos(productos) {
        salida.innerHTML = "";

        if (productos.length === 0) {
            salida.innerHTML = "<p>No hay productos</p>";
            return;
        }

        productos.forEach(p => {
            salida.innerHTML += `
                <div>
                    <p><b>${p.nombre_producto}</b></p>
                    <p>ID: ${p.codigo}</p>
                    <hr>
                </div>
            `;
        });
    }

    
    function consultarProductos(nombre = "") {
        let urlFinal = URL;

        if (nombre !== "") {
            urlFinal += `?nombre=${nombre}`;
        }

        fetch(urlFinal)
            .then(res => res.json())
            .then(datos => mostrarProductos(datos))
            .catch(err => console.error("Error:", err));
    }

   
    function insertarProducto() {
        const codigo = prompt("Código:");
        const nombre = prompt("Nombre producto:");

        const producto = {
            codigo: codigo,
            nombre_producto: nombre
        };

        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        })
        .then(res => res.json())
        .then(res => {
            alert(res.mensaje || res.error);
            consultarProductos();
        });
    }

   
    function eliminarProducto() {
        const codigo = prompt("Código a eliminar:");

        fetch(`${URL}/${codigo}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            alert(res.mensaje || res.error);
            consultarProductos();
        });
    }

    function actualizarProducto() {
        const codigo = prompt("Código:");
        const nombre = prompt("Nuevo nombre:");

        fetch(`${URL}/${codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_producto: nombre })
        })
        .then(res => res.json())
        .then(res => {
            alert(res.mensaje || res.error);
            consultarProductos();
        });
    }

    
    botonMostrarTodo.addEventListener("click", () => consultarProductos());

    botonBuscar.addEventListener("click", () => {
        const nombre = prompt("Buscar producto:");
        consultarProductos(nombre);
    });

    botonInsertar.addEventListener("click", insertarProducto);
    botonEliminar.addEventListener("click", eliminarProducto);
    botonActualizar.addEventListener("click", actualizarProducto);

    
    consultarProductos();
});
