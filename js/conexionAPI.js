async function listarProductos(){
    const conexion = await fetch("https://my-json-server.typicode.com/LugaChavez/Ruluda-Store/productos/",{
    method:"GET",
    headers:{
    "Content-type":"application/json"}
    });

    const conexionConvertida = await conexion.json();
    /*console.log(conexionConvertida);*/
    return conexionConvertida;
}

async function agregarProducto(nombre,precio,imagen) {
    const conexion= await fetch ("https://my-json-server.typicode.com/LugaChavez/Ruluda-Store/productos/", {
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
    
    try {const conexion = await fetch(`https://my-json-server.typicode.com/LugaChavez/Ruluda-Store/productos?q=${palabraClave}`);
    const conexionConvertida = await conexion.json();

    console.log(conexionConvertida); 

    return conexionConvertida;
    }catch (error) { 
        console.error('Error al buscar productos:', error);
        return [];  //En caso de error, retornar un arreglo vacío
    }
}

async function eliminarProducto(id) {
    const conexion = await fetch(`https://my-json-server.typicode.com/LugaChavez/Ruluda-Store/productos/{id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
               body:JSON.stringify({
                id:id
        })
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
