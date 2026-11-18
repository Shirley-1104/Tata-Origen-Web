function mostrarMensajeVista(mensaje) {
    const mensajeFormulario = document.getElementById(
        "mensaje-formulario"
    );

    if (mensajeFormulario) {
        mensajeFormulario.textContent = mensaje;
        mensajeFormulario.classList.add("mensaje-error");
    } else {
        alert(mensaje);
    }
}

//mostrar productos
function mostrarProductos(listaProductos) {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    listaProductos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        if (producto.agotado) {
            tarjeta.classList.add("agotado");
        }

        // Imagen
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        // Contenido
        const contenido = document.createElement("div");
        contenido.classList.add("producto-info");

        // Nombre
        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        // Categoría
        const categoria = document.createElement("p");
        categoria.classList.add("producto-categoria");
        categoria.textContent = producto.categoria;

        // Descripción
        const descripcion = document.createElement("p");
        descripcion.classList.add("producto-descripcion");
        descripcion.textContent = producto.descripcion;

        contenido.appendChild(titulo);
        contenido.appendChild(categoria);
        contenido.appendChild(descripcion);

        // Presentaciones
        if (producto.presentaciones) {
            const tituloPresentaciones = document.createElement("h4");
            tituloPresentaciones.textContent = "Presentaciones:";

            const listaPresentaciones = document.createElement("ul");

            producto.presentaciones.forEach((presentacion) => {
                const elemento = document.createElement("li");

                elemento.textContent =
                    `${presentacion.nombre} - $${presentacion.precio.toLocaleString("es-CO")} - Stock: ${presentacion.stockDisponible}`;

                listaPresentaciones.appendChild(elemento);
            });

            contenido.appendChild(tituloPresentaciones);
            contenido.appendChild(listaPresentaciones);
        }

        // Sabores
        if (producto.sabores) {
            const tituloSabores = document.createElement("h4");
            tituloSabores.textContent = "Sabores disponibles:";

            const listaSabores = document.createElement("ul");

            producto.sabores.forEach((sabor) => {
                const elemento = document.createElement("li");

                elemento.textContent =
                    `${sabor.nombre} - Stock: ${sabor.stockDisponible}`;

                listaSabores.appendChild(elemento);
            });

            contenido.appendChild(tituloSabores);
            contenido.appendChild(listaSabores);
        }

        // Productos sin variantes
        if (!producto.presentaciones && !producto.sabores) {
            const precio = document.createElement("p");
            precio.classList.add("precio-producto");

            precio.textContent =
                `$${producto.precio.toLocaleString("es-CO")}`;

            const stock = document.createElement("p");
            stock.textContent =
                `Stock disponible: ${producto.stockDisponible}`;

            contenido.appendChild(precio);
            contenido.appendChild(stock);
        }

        // Botón agregar al carrito
        const botonAgregar = document.createElement("button");
        botonAgregar.type = "button";
        botonAgregar.dataset.accion = "agregar";
        botonAgregar.dataset.id = producto.id;

        if (producto.agotado) {
            botonAgregar.classList.add("btn-agotado");
            botonAgregar.textContent = "Agotado";
            botonAgregar.disabled = true;
        } else {
            botonAgregar.classList.add("btn-principal");
            botonAgregar.textContent = "Agregar al carrito";
        }

        contenido.appendChild(botonAgregar);

        // Boton eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.dataset.id = producto.id;

        contenido.appendChild(botonEliminar);

        // Boton editar
        const botonEditar = document.createElement("button");
        botonEditar.type = "button";
        botonEditar.classList.add("btn-editar");
        botonEditar.textContent = "Editar";
        botonEditar.dataset.id = producto.id;

        contenido.appendChild(botonEditar);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);

        contenedor.appendChild(tarjeta);
    });
}


// Mostrar resumen del carrito
function mostrarResumen(datos) {
    const productosDiferentes =
        document.getElementById("total-productos");

    const totalUnidades =
        document.getElementById("total-unidades");

    const totalCarrito =
        document.getElementById("resumen-total");

    if (
        !productosDiferentes ||
        !totalUnidades ||
        !totalCarrito
    ) {
        return;
    }

    productosDiferentes.textContent =
        datos.productosDiferentes;

    totalUnidades.textContent =
        datos.totalUnidades;

    totalCarrito.textContent =
        `$${datos.total.toLocaleString("es-CO")}`;
}

// mostrar estado de carga
function mostrarCargaAPI() {
    const estado = document.getElementById("estado-api");

    if (estado) {
        estado.textContent = "Cargando recetas...";
    }
}


// mostrar error de consulta
function mostrarErrorAPI() {
    const estado = document.getElementById("estado-api");

    if (estado) {
        estado.textContent = "No fue posible cargar las recetas. Intenta nuevamente.";
    }
}


// mostrar recetas recibidas de la API
// Mostrar recetas de inspiración
function mostrarInspiracion(listaRecetas) {
    const contenedor = document.getElementById("lista-inspiracion");
    const estado = document.getElementById("estado-api");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (estado) {
        estado.textContent = "";
    }

    listaRecetas.forEach((receta) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-inspiracion");

        const imagen = document.createElement("img");
        imagen.src = receta.imagen;
        imagen.alt = receta.nombre;
        imagen.loading = "lazy";

        const titulo = document.createElement("h3");
        titulo.textContent = receta.nombre;

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);

        contenedor.appendChild(tarjeta);
    });
}
