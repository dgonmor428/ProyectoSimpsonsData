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
    inicializador();
    inicializarTooltips();
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