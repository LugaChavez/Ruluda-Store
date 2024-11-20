import { conexionAPI } from "./conexionAPI.js";
const formulario = document.querySelector("[data-formulario] form");

async function crearProducto(evento) {

    evento.preventDefault();
    const nombre= document.querySelector("[data-nombre]").value;
    const precio = parseFloat(document.querySelector("[data-precio]").value);
    const imagen= document.querySelector("[data-url-imagen]").value;
    
    try{
        await conexionAPI.agregarProducto(nombre,precio,imagen);
        alert("Producto agregado exitosamente");
    }catch(e){
        alert(e);
    }
    formulario.reset();
}

formulario.addEventListener("submit",evento=>crearProducto(evento));