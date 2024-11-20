async function listarProductos(){
    const conexion = await fetch("http://localhost:3001/productos",{
    method:"GET",
    headers:{
    "Content-type":"application/json"}
    });

    const conexionConvertida = await conexion.json();
    /*console.log(conexionConvertida);*/
    return conexionConvertida;
}

async function agregarProducto(nombre,precio,imagen) {
    const conexion= await fetch ("http://localhost:3001/productos", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    })

    if(!conexion.ok){
        throw new Error("Ha ocurrido un error al agregar el producto")
    }
    const conexionConvertida= await conexion.json();
    
    return conexionConvertida;
}

async function buscarProducto(palabraClave){
    
    try {const conexion = await fetch(`http://localhost:3001/productos?q=${palabraClave}`);
    const conexionConvertida = await conexion.json();

    console.log(conexionConvertida); 

    return conexionConvertida;
    }catch (error) { 
        console.error('Error al buscar productos:', error);
        return [];  //En caso de error, retornar un arreglo vacío
    }
}

async function eliminarProducto(id) {
    const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });

    if (!conexion.ok) {
        throw new Error("Ha ocurrido un error al eliminar el producto");
    }
    return conexion;  // Devolvemos la respuesta de la API
}

export const conexionAPI = {
    listarProductos,agregarProducto,buscarProducto,eliminarProducto
}