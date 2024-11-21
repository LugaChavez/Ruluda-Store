import { conexionAPI } from "./conexionAPI.js";
import crearCard from "./mostrarProductos.js";

async function buscarProducto(evento) {
    evento.preventDefault();
    
    const datosDeBusqueda=document.querySelector("[data-busqueda]").value;
    const busqueda = await conexionAPI.buscarProducto(datosDeBusqueda);
    
    const lista=document.querySelector("[data-lista]");
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    
    busqueda.forEach(producto=>lista.appendChild(crearCard(producto.precio,producto.imagen,producto.nombre)));
   
    if(busqueda.length==0){
        lista.innerHTML=`<h2 class="mensaje__titulo">No se encontro ningún producto para ${datosDeBusqueda}</h2>`;
    } else { lista.innerHTML=`<h2 class="mensaje__titulo">Mostrando resultados para ${datosDeBusqueda}</h2>`;}
    //console.log(busqueda);
}
const boton=document.querySelector("[data-boton-busqueda]");
boton.addEventListener("click",evento => buscarProducto(evento))

const inputBusqueda = document.querySelector("[data-busqueda]");
inputBusqueda.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        buscarProducto(evento);  // Llamamos a la función de búsqueda
    }
})


