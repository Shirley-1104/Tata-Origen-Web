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
    const contenedor =
        document.getElementById(
            "lista-productos"
        );

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    listaProductos.forEach(
        (producto) => {
            const tarjeta =
                document.createElement(
                    "article"
                );

            tarjeta.classList.add(
                "producto-card"
            );

            // Imagen
            const imagen =
                document.createElement(
                    "img"
                );

            imagen.src =
                producto.imagen;

            imagen.alt =
                producto.nombre;

            // Contenido
            const contenido =
                document.createElement(
                    "div"
                );

            contenido.classList.add(
                "producto-info"
            );

            // Nombre
            const titulo =
                document.createElement(
                    "h3"
                );

            titulo.textContent =
                producto.nombre;

            // Categoria
            const categoria =
                document.createElement(
                    "p"
                );

            categoria.classList.add(
                "producto-categoria"
            );

            categoria.textContent =
                producto.categoria;

            // Descripcion
            const descripcion =
                document.createElement(
                    "p"
                );

            descripcion.classList.add(
                "producto-descripcion"
            );

            descripcion.textContent = producto.descripcion;

            contenido.appendChild(
                titulo
            );

            contenido.appendChild(
                categoria
            );

            contenido.appendChild(
                descripcion
            );


            // Presentaciones de alfajores
            if (producto.presentaciones) {
                const tituloPresentaciones =
                    document.createElement(
                        "h4"
                    );

                tituloPresentaciones.textContent =
                    "Presentaciones:";

                const listaPresentaciones =
                    document.createElement(
                        "ul"
                    );

                producto.presentaciones.forEach(
                    (presentacion) => {
                        const elemento =
                            document.createElement(
                                "li"
                            );

                        const cantidad =
                            obtenerCantidadEnCarrito(
                                producto.id,
                                presentacion.nombre
                            );

                        const disponible =
                            presentacion.stock -
                            cantidad;

                        elemento.textContent =
                            `${presentacion.nombre} - $${presentacion.precio.toLocaleString("es-CO")} - Stock: ${disponible}`;

                        listaPresentaciones.appendChild(
                            elemento
                        );
                    }
                );

                contenido.appendChild(
                    tituloPresentaciones
                );

                contenido.appendChild(
                    listaPresentaciones
                );
            }


            // sabores de postres
            if (producto.sabores) {
                const tituloSabores =
                    document.createElement(
                        "h4"
                    );

                tituloSabores.textContent =
                    "Sabores disponibles:";

                const listaSabores =
                    document.createElement(
                        "ul"
                    );

                producto.sabores.forEach(
                    (sabor) => {
                        const elemento =
                            document.createElement(
                                "li"
                            );

                        const cantidad =
                            obtenerCantidadEnCarrito(
                                producto.id,
                                sabor.nombre
                            );

                        const disponible =
                            sabor.stock -
                            cantidad;

                        elemento.textContent =
                            `${sabor.nombre} - Stock: ${disponible}`;

                        listaSabores.appendChild(
                            elemento
                        );
                    }
                );

                contenido.appendChild(
                    tituloSabores
                );

                contenido.appendChild(
                    listaSabores
                );
            }


            // productos sin variantes
            if (
                !producto.presentaciones &&
                !producto.sabores
            ) {
                const precio =
                    document.createElement(
                        "p"
                    );

                precio.classList.add(
                    "precio-producto"
                );

                precio.textContent =
                    `$${producto.precio.toLocaleString("es-CO")}`;

                const cantidad =
                    obtenerCantidadEnCarrito(
                        producto.id,
                        null
                    );

                const stock =
                    document.createElement(
                        "p"
                    );

                stock.textContent =
                    `Stock disponible: ${producto.stock - cantidad}`;

                contenido.appendChild(
                    precio
                );

                contenido.appendChild(
                    stock
                );
            }


            // boton agregar al carrito
            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            let productoAgotado = false;


            // verificar stock de alfajores
            if (producto.presentaciones) {
                productoAgotado =
                    producto.presentaciones.every(
                        (presentacion) => {
                            const cantidadEnCarrito =
                                obtenerCantidadEnCarrito(
                                    producto.id,
                                    presentacion.nombre
                                );

                            return (
                                cantidadEnCarrito >=
                                presentacion.stock
                            );
                        }
                    );
            }


            // verificar stock de postres
            else if (producto.sabores) {
                productoAgotado =
                    producto.sabores.every(
                        (sabor) => {
                            const cantidadEnCarrito =
                                obtenerCantidadEnCarrito(
                                    producto.id,
                                    sabor.nombre
                                );

                            return (
                                cantidadEnCarrito >=
                                sabor.stock
                            );
                        }
                    );
            }


            // verificar stock general
            else {
                const cantidadEnCarrito =
                    obtenerCantidadEnCarrito(
                        producto.id,
                        null
                    );

                productoAgotado =
                    cantidadEnCarrito >=
                    producto.stock;
            }


            // estado visual del botón
            if (productoAgotado) {
                boton.classList.add(
                    "btn-agotado"
                );

                boton.textContent =
                    "Agotado";

                boton.disabled = true;

                tarjeta.classList.add(
                    "agotado"
                );
            } else {
                boton.classList.add(
                    "btn-principal"
                );

                boton.textContent =
                    "Agregar al carrito";

                boton.addEventListener(
                    "click",
                    () => {
                        seleccionarProducto(
                            producto.id
                        );
                    }
                );
            }

            contenido.appendChild(
                boton
            );


            // agregar imagen y contenido
            tarjeta.appendChild(
                imagen
            );

            tarjeta.appendChild(
                contenido
            );

            contenedor.appendChild(
                tarjeta
            );


            // boton eliminar
            const botonEliminar =
                document.createElement(
                    "button"
                );

            botonEliminar.type =
                "button";

            botonEliminar.classList.add(
                "btn-eliminar"
            );

            botonEliminar.textContent =
                "Eliminar";

            botonEliminar.dataset.id =
                producto.id;

            contenido.appendChild(
                botonEliminar
            );


            // boton editar
            const botonEditar =
                document.createElement("button");

            botonEditar.type = "button";
            botonEditar.classList.add("btn-editar");
            botonEditar.textContent = "Editar";
            botonEditar.dataset.id = producto.id;

            contenido.appendChild(botonEditar);
        }
    );
}
