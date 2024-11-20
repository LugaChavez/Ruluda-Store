import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

// Función para formatear el precio
function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR").format(precio); // Formato de número con separadores de miles
}

export default function crearCard(id,imagen,nombre,precio){
    const producto= document.createElement("li");
    producto.className="productos__item";
    producto.dataset.id = id;  // Guardamos el id en un atributo 'data-id'

    // Formatear el precio antes de mostrarlo
    const precioFormateado = "$" + formatearPrecio(precio);

    producto.innerHTML=`
    <img src="${imagen}" alt="imagen producto">
    <p>${nombre}</p>
    <h2>${precioFormateado}</h2>
    <button class="btn-eliminar"><i class="fa-solid fa-trash icon" alt="icono eliminar"></i></button>
    `;

    eliminarProducto(producto, id);
    
    return producto;
}

async function eliminarProducto (productoItem, id){
    const botonEliminar=productoItem.querySelector('.btn-eliminar');
    botonEliminar.addEventListener('click', async function(){
        try {
            // Solicitud DELETE a la API para eliminar el producto
            const respuesta = await conexionAPI.eliminarProducto(id);
            
            if (respuesta.ok) {
                // Si la respuesta es exitosa, eliminamos el producto del DOM
                productoItem.remove();
                alert("Producto eliminado exitosamente");
            } else {
                alert("Error al eliminar el producto");
            }
        } catch (e) {
            alert("Error al eliminar el producto: " + e);
        }
    });
}

async function listarProductos(){
    try{
        const listaAPI = await conexionAPI.listarProductos();

        listaAPI.forEach(producto=>lista.appendChild(crearCard(producto.id,producto.imagen,producto.nombre,producto.precio)));
    }catch{
        lista.innerHTML=`<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexión :/ </h2>`;
    }  
}

listarProductos();
