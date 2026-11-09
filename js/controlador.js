// controlador

function cargarCatalogoCRUD() {
    mostrarProductos(obtenerProductos());
}

function crearProductoCRUD(producto) {
    const error = agregarProducto(producto);
    if (error) {
        mostrarMensajeVista(error);
        return false;
    }
    cargarCatalogoCRUD();
    return true;
}

function editarProductoCRUD(id, datosActualizados) {
    const error = actualizarProducto(id, datosActualizados);
    if (error) {
        mostrarMensajeVista(error);
        return false;
    }
    cargarCatalogoCRUD();
    return true;
}

function eliminarProductoCRUD(id) {
    const eliminado = eliminarProducto(id);
    if (!eliminado) {
        mostrarMensajeVista("No se encontró el producto.");
        return false;
    }
    cargarCatalogoCRUD();
    return true;
}

function configurarCrearProductoCRUD() {
    const botonAgregar = document.getElementById("agregar-producto-crud");
    if (!botonAgregar) return;

    botonAgregar.addEventListener("click", function () {
        const nombre = prompt("Nombre del producto:");
        if (nombre === null) return;
        const categoria = prompt("Categoría del producto:");
        if (categoria === null) return;
        const descripcion = prompt("Descripción del producto:");
        if (descripcion === null) return;
        const imagen = prompt("Ruta de la imagen:", "img/nuevo-producto.jpeg");
        if (imagen === null) return;
        const precioTexto = prompt("Precio (solo números):");
        if (precioTexto === null) return;
        const stockTexto = prompt("Stock inicial (solo números):");
        if (stockTexto === null) return;

        const producto = {
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            descripcion: descripcion.trim(),
            imagen: imagen.trim(),
            precio: Number(precioTexto),
            stock: Number(stockTexto)
        };

        if (crearProductoCRUD(producto)) {
            alert("Producto agregado correctamente.");
        }
    });
}
