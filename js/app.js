// carrito
let carrito = [];

// estado del formulario
let modoPedido = false;


// FUNCIONES AUXILIARES

// actualiza el resumen del carrito
function actualizarResumen() {
    const productosDiferentes = document.getElementById("total-productos");
    const totalUnidades = document.getElementById("total-unidades");
    const totalCarrito = document.getElementById("resumen-total");

    if (
        !productosDiferentes ||
        !totalUnidades ||
        !totalCarrito
    ) {
        return;
    }

    const cantidadProductos = carrito.filter(
        (item) => item.cantidad > 0
    ).length;

    const cantidadUnidades = carrito.reduce(
        (total, item) => total + item.cantidad, 0
    );

    const valorTotal = carrito.reduce(
        (total, item) => total +
            (item.precio * item.cantidad),
        0
    );

    productosDiferentes.textContent = cantidadProductos;
    totalUnidades.textContent = cantidadUnidades;
    totalCarrito.textContent = `$${valorTotal.toLocaleString("es-CO")}`;
}


// mensajes en la pagina
function mostrarMensaje(mensaje) {
    const mensajeFormulario = document.getElementById(
        "mensaje-formulario"
    );

    if (!mensajeFormulario) {
        return;
    }

    mensajeFormulario.textContent = mensaje;
    mensajeFormulario.classList.add("mensaje-error");
}


// activar el modo de contacto
function activarModoContacto() {
    modoPedido = false;

    const titulo = document.getElementById("titulo-contacto");
    const descripcion = document.getElementById("descripcion-contacto");
    const mensajeContacto = document.getElementById(
        "contenedor-mensaje-contacto"
    );

    const botonConfirmar = document.getElementById("confirmar-pedido");
    const resumen = document.getElementById("resumen-pedido");
    const informacionPedido = document.getElementById("informacion-pedido");
    const pago = document.getElementById("pago");

    if (
        !titulo || !descripcion || !botonConfirmar
    ) {
        return;
    }

    titulo.textContent = "Contacto";
    descripcion.textContent = "Registra tus datos para recibir información sobre nuestros productos o realizar una consulta.";
    botonConfirmar.textContent = "Enviar información";

    if (mensajeContacto) {
        mensajeContacto.hidden = false;
    }

    if (resumen) {
        resumen.hidden = true;
    }

    if (informacionPedido) {
        informacionPedido.hidden = true;
    }

    if (pago) {
        pago.required = false;
    }
}


// activar el modo de pedido
function activarModoPedido() {
    modoPedido = true;

    const titulo = document.getElementById("titulo-contacto");
    const descripcion = document.getElementById("descripcion-contacto");
    const mensajeContacto = document.getElementById("mensaje-contacto");
    const botonConfirmar = document.getElementById("confirmar-pedido");
    const resumen = document.getElementById("resumen-pedido");
    const informacionPedido = document.getElementById("informacion-pedido");
    const pago = document.getElementById("pago");

    if (
        !titulo || !descripcion || !botonConfirmar
    ) {
        return;
    }

    titulo.textContent = "Confirmar pedido";

    descripcion.textContent =
        "Revisa los productos de tu pedido, completa tus datos y confirma la compra.";

    botonConfirmar.textContent = "Confirmar pedido";

    if (mensajeContacto) {
        mensajeContacto.hidden = false;
    }

    if (resumen) {
        resumen.hidden = false;
    }

    if (informacionPedido) {
        informacionPedido.hidden = false;
    }

    if (pago) {
        pago.required = true;
    }
}


// agrega un producto al carrito
function agregarAlCarrito(
    productoId, variante, precio
) {
    const itemExistente =
        carrito.find(
            (item) =>
                item.productoId === productoId &&
                item.variante === variante
        );

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            productoId: productoId,
            variante: variante,
            precio: precio,
            cantidad: 1
        });
    }
}


// obtener la cantidad de una variante
function obtenerCantidadEnCarrito(
    productoId, variante
) {
    const productoCarrito =
        carrito.find(
            (item) =>
                item.productoId === productoId &&
                item.variante === variante
        );

    return productoCarrito
        ? productoCarrito.cantidad
        : 0;
}


// FUNCIONES DE DIBUJO

// buscar productos
function buscarProductos() {
    const buscador = document.getElementById(
            "buscador-productos"
        );

    const contador = document.getElementById(
            "contador-resultados"
        );

    if (!buscador || !contador) {
        return [];
    }

    const textoBusqueda = buscador.value
            .trim()
            .toLowerCase();

    if (textoBusqueda === "") {
        mostrarProductos(productos);

        contador.textContent = `${productos.length} productos`;

        return productos;
    }

    const resultados =
        productos.filter(
            (producto) => {
                const nombre = producto.nombre.toLowerCase();

                const categoria = producto.categoria.toLowerCase();

                const descripcion = producto.descripcion.toLowerCase();

                return (
                    nombre.includes(
                        textoBusqueda
                    ) ||
                    categoria.includes(
                        textoBusqueda
                    ) ||
                    descripcion.includes(
                        textoBusqueda
                    )
                );
            }
        );

    mostrarProductos(resultados);

    if (resultados.length === 0) {
        contador.textContent =
            "0 coincidencias";
    } else {
        contador.textContent = `${resultados.length} resultado(s)`;
    }

    return resultados;
}


// mostrar los productos

// muestra tabla resumen
function mostrarTablaResumen() {
    const tabla = document.getElementById(
            "tabla-productos"
        );

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    productos.forEach(
        (producto) => {
            const fila = document.createElement(
                    "tr"
                );

            const nombre = document.createElement(
                    "td"
                );

            nombre.textContent = producto.nombre;

            const categoria = document.createElement(
                    "td"
                );

            categoria.textContent = producto.categoria;

            const stock = document.createElement(
                    "td"
                );

            if (
                producto.stock !==
                undefined
            ) {
                stock.textContent = producto.stock;
            } else if (
                producto.presentaciones
            ) {
                stock.textContent =
                    producto.presentaciones.reduce(
                        (
                            total,
                            presentacion
                        ) =>
                            total +
                            presentacion.stock,
                        0
                    );
            } else if (
                producto.sabores
            ) {
                stock.textContent = producto.sabores.reduce(
                        (
                            total, sabor
                        ) =>
                            total + sabor.stock,
                        0
                    );
            }

            fila.appendChild(
                nombre
            );

            fila.appendChild(
                categoria
            );

            fila.appendChild(
                stock
            );

            tabla.appendChild(
                fila
            );
        }
    );
}


// mostrar el carrito
function mostrarCarrito() {
    const contenedor = document.getElementById(
            "contenido-carrito"
        );

    const totalElemento = document.getElementById(
            "total-carrito"
        );

    const botonPedido = document.getElementById(
            "realizar-pedido"
        );

    if (
        !contenedor ||
        !totalElemento
    ) {
        return;
    }

    contenedor.innerHTML = "";


    // carrito vacio 
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>🛒 Tu carrito está vacío.</p>

                <span>
                    Agrega alguno de nuestros productos
                    para comenzar tu pedido.
                </span>
            </div>
        `;

        totalElemento.textContent = "0";

        const panelAgregar = document.getElementById(
                "agregar-productos"
            );

        if (panelAgregar) {
            panelAgregar.hidden = true;
        }

        if (botonPedido) {
            botonPedido.disabled = true;
        }

        actualizarResumen();
        return;
    }

    let total = 0;


    // recorrer carrito 
    carrito.forEach(
        (item, index) => {
            const producto =
                productos.find(
                    (productoActual) =>
                        productoActual.id === item.productoId
                );

            if (!producto) {
                return;
            }

            const subtotal = item.precio * item.cantidad;

            total += subtotal;

            const tarjeta = document.createElement(
                    "div"
                );

            tarjeta.classList.add(
                "item-carrito"
            );


            // selector de presentaciones
            let selectorPresentacion = "";

            if (
                producto.presentaciones
            ) {
                const opciones =
                    producto.presentaciones
                        .map(
                            (
                                presentacion
                            ) => {
                                const cantidadEnCarrito =
                                    obtenerCantidadEnCarrito(
                                        producto.id,
                                        presentacion.nombre
                                    );

                                const disponible =
                                    presentacion.stock -
                                    cantidadEnCarrito;

                                return `
                                    <option
                                        value="${presentacion.nombre}"
                                        ${presentacion.nombre ===
                                        item.variante
                                        ? "selected"
                                        : ""
                                    }
                                        ${disponible <= 0 &&
                                        presentacion.nombre !==
                                        item.variante
                                        ? "disabled"
                                        : ""
                                    }
                                    >
                                        ${presentacion.nombre}
                                        - $${presentacion.precio.toLocaleString("es-CO")}
                                        ${disponible <= 0 &&
                                        presentacion.nombre !==
                                        item.variante
                                        ? " (Agotado)"
                                        : ""
                                    }
                                    </option>
                                `;
                            }
                        )
                        .join("");

                selectorPresentacion = `
                    <label class="label-variante">
                        Presentación:
                    </label>

                    <select
                        class="selector-variante"
                        data-index="${index}"
                        data-tipo="presentacion"
                    >
                        ${opciones}
                    </select>
                `;
            }


            // selector de sabores
            let selectorSabor = "";

            if (producto.sabores) {
                const opciones =
                    producto.sabores
                        .map(
                            (sabor) => {
                                const cantidadEnCarrito =
                                    obtenerCantidadEnCarrito(
                                        producto.id,
                                        sabor.nombre
                                    );

                                const disponible =
                                    sabor.stock -
                                    cantidadEnCarrito;

                                return `
                                    <option
                                        value="${sabor.nombre}"
                                        ${sabor.nombre ===
                                        item.variante
                                        ? "selected"
                                        : ""
                                    }
                                        ${disponible <= 0 &&
                                        sabor.nombre !==
                                        item.variante
                                        ? "disabled"
                                        : ""
                                    }
                                    >
                                        ${sabor.nombre}
                                        ${disponible <= 0 &&
                                        sabor.nombre !==
                                        item.variante
                                        ? " (Agotado)"
                                        : ""
                                    }
                                    </option>
                                `;
                            }
                        )
                        .join("");

                selectorSabor = `
                    <label class="label-variante">
                        Sabor:
                    </label>

                    <select
                        class="selector-variante"
                        data-index="${index}"
                        data-tipo="sabor"
                    >
                        ${opciones}
                    </select>
                `;
            }


            // informacion del producto
            tarjeta.innerHTML = `
                <div class="info-item-carrito">
                    <h3>
                        ${producto.nombre}
                    </h3>

                    ${selectorPresentacion}

                    ${selectorSabor}

                    ${!producto.presentaciones &&
                    !producto.sabores
                    ? `
                                <p class="precio-unitario">
                                    $${item.precio.toLocaleString("es-CO")} c/u
                                </p>
                            `
                    : ""
                }
                </div>

                <div class="cantidad-carrito">
                    <button
                        type="button"
                        class="btn-cantidad"
                        data-accion="disminuir"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <span>
                        ${item.cantidad}
                    </span>

                    <button
                        type="button"
                        class="btn-cantidad"
                        data-accion="aumentar"
                        data-index="${index}"
                    >
                        +
                    </button>
                </div>

                <div class="subtotal-carrito">
                    <span class="precio-unitario">
                        $${item.precio.toLocaleString("es-CO")} c/u
                    </span>

                    <strong>
                        $${subtotal.toLocaleString("es-CO")}
                    </strong>
                </div>

                <button
                    type="button"
                    class="btn-eliminar"
                    data-accion="eliminar"
                    data-index="${index}"
                >
                    Eliminar
                </button>
            `;

            contenedor.appendChild(
                tarjeta
            );
        }
    );


    // mostrar total
    totalElemento.textContent =
        total.toLocaleString("es-CO");


    // activa el boton de pedido
    if (botonPedido) {
        botonPedido.disabled =
            false;
    }

    actualizarResumen();
}


// muestra el resumen del pedido
function mostrarResumenPedido() {
    const resumen = document.getElementById(
            "resumen-pedido"
        );

    if (!resumen) {
        return;
    }


    // sin productos
    if (carrito.length === 0) {
        resumen.innerHTML = `
            <p class="resumen-vacio">
                No hay productos en el carrito.
            </p>
        `;

        return;
    }


    let total = 0;

    let contenido = `
        <div class="resumen-pedido">

            <h3>
                Resumen de tu pedido
            </h3>
    `;


    // recorre productos
    carrito.forEach(
        (item) => {
            const producto =
                productos.find(
                    (productoActual) =>
                        productoActual.id === item.productoId
                );

            if (!producto) {
                return;
            }

            const subtotal = item.precio * item.cantidad;

            total += subtotal;

            contenido += `
                <div class="resumen-item">

                    <div>

                        <strong>
                            ${producto.nombre}
                        </strong>

                        ${item.variante
                    ? `
                                    <span>
                                        ${item.variante}
                                    </span>
                                `
                    : ""
                }

                        <small>
                            Cantidad: ${item.cantidad}
                        </small>

                    </div>

                    <strong>
                        $${subtotal.toLocaleString("es-CO")}
                    </strong>

                </div>
            `;
        }
    );


    contenido += `
            <div class="resumen-total">

                <span>
                    Total del pedido
                </span>

                <strong>
                    $${total.toLocaleString("es-CO")}
                </strong>
            </div>
        </div>
    `;

    resumen.innerHTML = contenido;
}


// muestra opciones de productos y agrega 
function mostrarOpcionesAgregarProductos() {
    const contenedor =
        document.getElementById(
            "opciones-agregar-productos"
        );

    const panel =
        document.getElementById(
            "agregar-productos"
        );

    if (
        !contenedor ||
        !panel
    ) {
        return;
    }

    contenedor.innerHTML = "";


    // categorias disponibles
    const categorias = [
        "Alfajores",
        "Postres",
        "Tortas",
        "Mesa de postres",
        "Galletas",
        "Brownie"
    ];


    // crea categorias
    categorias.forEach(
        (categoria) => {
            const productosCategoria =
                productos.filter(
                    (producto) =>
                        producto.categoria ===
                        categoria
                );

            if (
                productosCategoria.length ===
                0
            ) {
                return;
            }

            const categoriaContenedor =
                document.createElement(
                    "div"
                );

            categoriaContenedor.classList.add(
                "categoria-agregar"
            );

            const botonCategoria =
                document.createElement(
                    "button"
                );

            botonCategoria.type = "button";

            botonCategoria.classList.add(
                "btn-categoria-agregar"
            );

            const nombreCategoria =
                document.createElement(
                    "span"
                );

            nombreCategoria.textContent = categoria;

            const icono =
                document.createElement(
                    "span"
                );

            icono.classList.add(
                "icono-desplegable"
            );

            icono.textContent = "⌄";

            botonCategoria.appendChild(
                nombreCategoria
            );

            botonCategoria.appendChild(
                icono
            );

            const contenidoCategoria =
                document.createElement(
                    "div"
                );

            contenidoCategoria.classList.add(
                "contenido-categoria-agregar"
            );


            // crea productos de la categoria
            productosCategoria.forEach(
                (producto) => {


                    // presentaciones de alfajores
                    if (
                        producto.presentaciones
                    ) {
                        producto.presentaciones.forEach(
                            (
                                presentacion
                            ) => {
                                const cantidad =
                                    obtenerCantidadEnCarrito(
                                        producto.id,
                                        presentacion.nombre
                                    );

                                const disponible = presentacion.stock - cantidad;

                                const boton = document.createElement(
                                        "button"
                                    );

                                boton.type = "button";

                                boton.classList.add(
                                    "btn-agregar-variante"
                                );

                                boton.dataset.producto = producto.id;
                                boton.dataset.variante = presentacion.nombre;
                                boton.dataset.precio = presentacion.precio;

                                const nombre = document.createElement(
                                        "strong"
                                    );

                                nombre.textContent = presentacion.nombre;

                                const precio = document.createElement(
                                    "span"
                                );

                                precio.textContent = `$${presentacion.precio.toLocaleString("es-CO")}`;

                                boton.appendChild(nombre);
                                boton.appendChild(precio);

                                if (
                                    disponible <= 0
                                ) {
                                    boton.disabled = true;
                                    const agotado = document.createElement("small");
                                    agotado.textContent = "Agotado";
                                    boton.appendChild(agotado);
                                }

                                contenidoCategoria.appendChild(boton);
                            }
                        );
                    }


                    // sabores de postres
                    else if (
                        producto.sabores
                    ) {
                        producto.sabores.forEach(
                            (sabor) => {
                                const cantidad = obtenerCantidadEnCarrito(
                                    producto.id,
                                    sabor.nombre
                                );

                                const disponible = sabor.stock - cantidad;
                                const boton = document.createElement("button");
                                boton.type = "button";
                                boton.classList.add("btn-agregar-variante");
                                boton.dataset.producto = producto.id;
                                boton.dataset.variante = sabor.nombre;
                                boton.dataset.precio = producto.precio;
                                const nombre = document.createElement("strong");
                                nombre.textContent = sabor.nombre;
                                const precio = document.createElement("span");
                                precio.textContent = `$${producto.precio.toLocaleString("es-CO")}`;
                                boton.appendChild(nombre);
                                boton.appendChild(precio);

                                if (
                                    disponible <= 0
                                ) {
                                    boton.disabled = true;

                                    const agotado = document.createElement("small");

                                    agotado.textContent = "Agotado";

                                    boton.appendChild(agotado);
                                }

                                contenidoCategoria.appendChild(boton);
                            }
                        );
                    }


                    // productos simples
                    else {
                        const cantidad = obtenerCantidadEnCarrito(producto.id, null
                        );

                        const disponible = producto.stock - cantidad;
                        const boton = document.createElement("button");
                        boton.type = "button";
                        boton.classList.add("btn-agregar-variante");
                        boton.dataset.producto = producto.id;
                        boton.dataset.variante = "";
                        boton.dataset.precio = producto.precio;
                        const nombre = document.createElement("strong");
                        nombre.textContent = producto.nombre;
                        const precio = document.createElement("span");
                        precio.textContent = `$${producto.precio.toLocaleString("es-CO")}`;
                        boton.appendChild(nombre);
                        boton.appendChild(precio);

                        if (
                            disponible <= 0
                        ) {
                            boton.disabled = true;

                            const agotado = document.createElement(
                                "small"
                            );

                            agotado.textContent = "Agotado";

                            boton.appendChild(agotado);
                        }

                        contenidoCategoria.appendChild(boton);
                    }
                }
            );


            categoriaContenedor.appendChild(botonCategoria);
            categoriaContenedor.appendChild(contenidoCategoria);
            contenedor.appendChild(categoriaContenedor);
        }
    );

    panel.hidden = false;
}


// aumenta la cantidad de un producto
function aumentarCantidad(index) {
    const item = carrito[index];

    if (!item) {
        return;
    }

    const producto = productos.find(
        (productoActual) =>
            productoActual.id ===
            item.productoId
    );

    if (!producto) {
        return;
    }

    let stock = 0;


    // stock de presentacion
    if (producto.presentaciones) {
        const presentacion = producto.presentaciones.find(
            (p) =>
                p.nombre ===
                item.variante
        );

        if (!presentacion) {
            return;
        }

        stock = presentacion.stock;
    }


    // stock de sabor
    else if (producto.sabores) {
        const sabor = producto.sabores.find(
            (s) =>
                s.nombre === item.variante
        );

        if (!sabor) {
            return;
        }

        stock = sabor.stock;
    }


    // stock de producto simple
    else {
        stock = producto.stock;
    }


    // validar stock
    if (
        item.cantidad >= stock
    ) {
        mostrarMensaje(
            "No puedes agregar más unidades. Has alcanzado el stock disponible."
        );
        return;
    }

    item.cantidad++;

    mostrarCarrito();
    mostrarProductos(productos);
}


// disminuye la cantidad de un producto
function disminuirCantidad(index) {
    const item = carrito[index];

    if (!item) {
        return;
    }

    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        carrito.splice(
            index,
            1
        );
    }

    mostrarCarrito();
    mostrarProductos(productos);
}


// enviar el pedido por WhatsApp
function enviarPedidoWhatsApp() {
    const nombre = document.getElementById(
        "nombre"
    ).value.trim();

    const apellido = document.getElementById(
        "apellido"
    ).value.trim();

    const telefono = document.getElementById(
        "telefono"
    ).value.trim();

    const direccion = document.getElementById(
        "direccion"
    ).value.trim();

    const pago = document.getElementById(
        "pago"
    ).value;

    const instrucciones = document.getElementById(
        "instrucciones"
    ).value.trim();

    const planGarantia = document.getElementById(
        "plan-garantia"
    ).value;

    let mensaje =
        `Hola, Tata Origen. Quiero realizar el siguiente pedido:%0A%0A`;

    mensaje +=
        `*Cliente:* ${nombre} ${apellido}%0A`;

    mensaje +=
        `*Teléfono:* ${telefono}%0A`;

    mensaje +=
        `*Dirección:* ${direccion}%0A`;

    mensaje +=
        `*Método de pago:* ${pago}%0A%0A`;

    mensaje +=
        `*Pedido:*%0A`;

    let total = 0;


    // agregar productos al mensaje
    carrito.forEach(
        (item) => {
            const producto = productos.find(
                (productoActual) =>
                    productoActual.id ===
                    item.productoId
            );

            if (!producto) {
                return;
            }

            const subtotal = item.precio * item.cantidad;

            total += subtotal;

            mensaje += `- ${producto.nombre}`;

            if (item.variante) {
                mensaje += ` (${item.variante})`;
            }

            mensaje +=
                ` x${item.cantidad} - $${subtotal.toLocaleString("es-CO")}%0A`;
        }
    );

    mensaje +=
        `%0A*Total del pedido:* $${total.toLocaleString("es-CO")}%0A`;


    // Plan de garantia
    if (
        planGarantia === "ninguno"
    ) {
        mensaje +=
            `*Plan de garantía:* No desea adquirir uno%0A`;
    } else {
        const nombresGarantia = {
            basico: "Plan Básico - $0",
            pro: "Plan Pro - $5.000",
            premium: "Plan Premium - $10.000"
        };

        mensaje +=
            `*Plan de garantía:* ${nombresGarantia[planGarantia]}%0A`;
    }


    // instrucciones de entrega
    if (instrucciones) {
        mensaje +=
            `%0A*Instrucciones de entrega:*%0A${instrucciones}`;
    }

    const numeroWhatsApp =
        "573022231469";

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(
        url,
        "_blank"
    );
}


// EVENTOS

// configura eventos del carrito
function configurarEventosCarrito() {
    const contenedor = document.getElementById(
        "contenido-carrito"
    );

    if (!contenedor) {
        return;
    }


    // eventos de botones
    contenedor.addEventListener(
        "click",
        function (event) {
            const boton =
                event.target.closest(
                    "button"
                );

            if (!boton) {
                return;
            }

            const accion = boton.dataset.accion;

            const index = Number(
                boton.dataset.index
            );

            if (
                accion === "aumentar"
            ) {
                aumentarCantidad(
                    index
                );
            }

            if (
                accion === "disminuir"
            ) {
                disminuirCantidad(
                    index
                );
            }

            if (
                accion === "eliminar"
            ) {
                carrito.splice(
                    index,
                    1
                );

                mostrarCarrito();
                mostrarProductos(
                    productos
                );
            }
        }
    );


    // eventos de variantes
    contenedor.addEventListener(
        "change",
        function (event) {
            if (
                !event.target.classList.contains(
                    "selector-variante"
                )
            ) {
                return;
            }

            const select = event.target;

            const index = Number(
                select.dataset.index
            );

            const nuevaVariante = select.value;
            const item = carrito[index];

            if (!item) {
                return;
            }

            const producto = productos.find(
                (productoActual) =>
                    productoActual.id ===
                    item.productoId
            );

            if (!producto) {
                return;
            }

            let nuevoPrecio = item.precio;


            // cambiar presentacion
            if (
                producto.presentaciones
            ) {
                const presentacion = producto.presentaciones.find(
                    (p) =>
                        p.nombre ===
                        nuevaVariante
                );

                if (!presentacion) {
                    return;
                }


                // verificar variante repetida
                const otroItem = carrito.find(
                    (
                        otro,
                        otroIndex
                    ) =>
                        otro.productoId ===
                        producto.id &&
                        otro.variante ===
                        nuevaVariante &&
                        otroIndex !==
                        index
                );

                if (otroItem) {
                    const cantidadTotal =
                        otroItem.cantidad +
                        item.cantidad;

                    if (
                        cantidadTotal >
                        presentacion.stock
                    ) {
                        mostrarMensaje(
                            "No hay suficiente stock para unir estas cantidades."
                        );

                        mostrarCarrito();

                        return;
                    }

                    otroItem.cantidad = cantidadTotal;

                    carrito.splice(
                        index,
                        1
                    );

                    mostrarCarrito();
                    return;
                }

                nuevoPrecio = presentacion.precio;
            }


            // cambiar sabor
            if (
                producto.sabores
            ) {
                const sabor = producto.sabores.find(
                    (s) =>
                        s.nombre ===
                        nuevaVariante
                );

                if (!sabor) {
                    return;
                }


                // verificar variante repetida
                const otroItem = carrito.find(
                    (
                        otro,
                        otroIndex
                    ) =>
                        otro.productoId ===
                        producto.id &&
                        otro.variante ===
                        nuevaVariante &&
                        otroIndex !==
                        index
                );

                if (otroItem) {
                    const cantidadTotal = otroItem.cantidad + item.cantidad;

                    if (
                        cantidadTotal > sabor.stock
                    ) {
                        mostrarMensaje(
                            "No hay suficiente stock para unir estas cantidades."
                        );

                        mostrarCarrito();
                        return;
                    }

                    otroItem.cantidad = cantidadTotal;

                    carrito.splice(
                        index,
                        1
                    );

                    mostrarCarrito();
                    return;
                }

                nuevoPrecio = producto.precio;
            }

            item.variante = nuevaVariante;
            item.precio = nuevoPrecio;

            mostrarCarrito();
            mostrarProductos(
                productos
            );
        }
    );
}


// configura el panel de agregar productos
function configurarAgregarMasProductos() {
    const boton = document.getElementById(
        "agregar-mas-productos"
    );

    const panel = document.getElementById(
        "agregar-productos"
    );

    const contenedor = document.getElementById(
        "opciones-agregar-productos"
    );

    if (
        !boton || !panel || !contenedor
    ) {
        return;
    }


    // abre y cierra el panel
    boton.addEventListener(
        "click",
        function () {
            if (panel.hidden) {
                mostrarOpcionesAgregarProductos();

                panel.hidden = false;
            } else {
                panel.hidden = true;
            }
        }
    );


    // eventos del panel
    contenedor.addEventListener(
        "click",
        function (event) {

            // abrir y cerrar categorias
            const botonCategoria = event.target.closest(
                ".btn-categoria-agregar"
            );

            if (botonCategoria) {
                const categoria = botonCategoria.closest(
                    ".categoria-agregar"
                );

                if (!categoria) {
                    return;
                }

                const estabaAbierta = categoria.classList.contains(
                    "abierta"
                );


                // cerrar categorias
                contenedor
                    .querySelectorAll(
                        ".categoria-agregar"
                    )
                    .forEach(
                        (elemento) => {
                            elemento.classList.remove(
                                "abierta"
                            );
                        }
                    );


                // abrir categoria seleccionada
                if (!estabaAbierta) {
                    categoria.classList.add(
                        "abierta"
                    );
                }

                return;
            }


            // agregar variantes
            const botonVariante = event.target.closest(
                ".btn-agregar-variante"
            );

            if (!botonVariante) {
                return;
            }

            const productoId = Number(
                botonVariante.dataset.producto
            );

            const variante = botonVariante.dataset.variante ||
                null;

            const precio = Number(
                botonVariante.dataset.precio
            );

            const producto = productos.find(
                (productoActual) =>
                    productoActual.id ===
                    productoId
            );

            if (!producto) {
                return;
            }


            // obtener stock
            let stock = 0;

            if (
                producto.presentaciones
            ) {
                const presentacion = producto.presentaciones.find(
                    (presentacionActual) =>
                        presentacionActual.nombre ===
                        variante
                );

                if (!presentacion) {
                    return;
                }

                stock = presentacion.stock;
            } else if (
                producto.sabores
            ) {
                const sabor = producto.sabores.find(
                    (saborActual) =>
                        saborActual.nombre ===
                        variante
                );

                if (!sabor) {
                    return;
                }

                stock = sabor.stock;
            } else {
                stock = producto.stock;
            }


            // cantidad actual
            const cantidadActual = obtenerCantidadEnCarrito(
                productoId,
                variante
            );

            if (
                cantidadActual >=
                stock
            ) {
                mostrarMensaje(
                    "No hay más unidades disponibles de esta opción."
                );

                return;
            }


            // agregar producto
            agregarAlCarrito(
                productoId,
                variante,
                precio
            );


            // actualizar vistas
            mostrarCarrito();
            mostrarProductos(
                productos
            );

            mostrarOpcionesAgregarProductos();
        }
    );
}


// vaciar el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        return;
    }

    carrito = [];

    mostrarCarrito();
    mostrarResumenPedido();
    mostrarProductos(productos);
}


// selecciona un producto desde el catalogo
function seleccionarProducto(idProducto) {
    const producto = productos.find(
        (productoActual) =>
            productoActual.id ===
            idProducto
    );

    if (!producto) {
        return;
    }


    // presentaciones de alfajores
    if (
        producto.presentaciones
    ) {
        const presentacionDisponible = producto.presentaciones.find(
            (presentacion) => {
                const cantidad = obtenerCantidadEnCarrito(
                    producto.id,
                    presentacion.nombre
                );

                return (
                    presentacion.stock >
                    cantidad
                );
            }
        );

        if (!presentacionDisponible) {
            mostrarMensaje(
                "Todas las presentaciones de este producto están agotadas."
            );

            mostrarProductos(
                productos
            );

            return;
        }

        agregarAlCarrito(
            producto.id,
            presentacionDisponible.nombre,
            presentacionDisponible.precio
        );
    }


    // sabores de postres
    else if (
        producto.sabores
    ) {
        const saborDisponible = producto.sabores.find(
            (sabor) => {
                const cantidad = obtenerCantidadEnCarrito(
                    producto.id,
                    sabor.nombre
                );

                return (
                    sabor.stock >
                    cantidad
                );
            }
        );

        if (!saborDisponible) {
            mostrarMensaje(
                "Todos los sabores de este producto están agotados."
            );

            mostrarProductos(
                productos
            );

            return;
        }

        agregarAlCarrito(
            producto.id,
            saborDisponible.nombre,
            producto.precio
        );
    }


    // productos simples
    else {
        const cantidad = obtenerCantidadEnCarrito(
            producto.id,
            null
        );

        if (
            cantidad >=
            producto.stock
        ) {
            mostrarMensaje(
                "Este producto está agotado."
            );

            mostrarProductos(
                productos
            );

            return;
        }

        agregarAlCarrito(
            producto.id,
            null,
            producto.precio
        );
    }


    // actualizar vistas
    mostrarCarrito();
    mostrarProductos(
        productos
    );
}


// EVENTOS DE LA PAGINA

// buscador
function configurarBuscador() {
    const buscador = document.getElementById(
        "buscador-productos"
    );

    if (!buscador) {
        return;
    }

    buscador.addEventListener(
        "input",
        buscarProductos
    );

    buscador.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key !==
                "Enter"
            ) {
                return;
            }

            event.preventDefault();

            const resultados = buscarProductos();

            if (
                resultados.length ===
                0
            ) {
                return;
            }

            const catalogo = document.getElementById(
                "catalogo"
            );

            if (catalogo) {
                catalogo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    );
}


// eliminar productos del catalogo
function configurarEliminarProductos() {
    const listaProductos = document.getElementById(
        "lista-productos"
    );

    if (!listaProductos) {
        return;
    }

    listaProductos.addEventListener(
        "click",
        function (event) {
            const botonEliminar = event.target.closest(
                ".btn-eliminar"
            );

            if (!botonEliminar) {
                return;
            }

            const idProducto =
                Number(
                    botonEliminar.dataset.id
                );

            const confirmar = confirm(
                "¿Deseas eliminar este producto del catálogo?"
            );

            if (!confirmar) {
                return;
            }


            eliminarProductoCRUD(idProducto);
            mostrarProductos(obtenerProductos());
        }
    );
}


// boton vaciar carrito
function configurarVaciarCarrito() {
    const botonVaciar = document.getElementById(
        "vaciar-carrito"
    );

    if (!botonVaciar) {
        return;
    }

    botonVaciar.addEventListener(
        "click",
        vaciarCarrito
    );
}


// boton realizar pedido
function configurarRealizarPedido() {
    const botonRealizarPedido = document.getElementById(
        "realizar-pedido"
    );

    if (!botonRealizarPedido) {
        return;
    }

    botonRealizarPedido.addEventListener(
        "click",
        function () {
            if (
                carrito.length ===
                0
            ) {
                mostrarMensaje(
                    "Debes agregar al menos un producto al carrito."
                );

                return;
            }

            mostrarResumenPedido();

            activarModoPedido();

            const contacto =
                document.getElementById(
                    "contacto"
                );

            if (contacto) {
                contacto.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    );
}


// formulario
function configurarFormulario() {
    const formulario =
        document.querySelector(
            "#contacto form"
        );

    if (!formulario) {
        return;
    }

    formulario.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();


            // validar formulario
            if (
                !formulario.checkValidity()
            ) {
                formulario.reportValidity();

                return;
            }


            // enviar pedido
            if (modoPedido) {
                enviarPedidoWhatsApp();

                formulario.reset();

                carrito = [];

                mostrarCarrito();
                mostrarResumenPedido();
                activarModoContacto();
                return;
            }


            // enviar informacion de contacto
            const nombre = document.getElementById(
                "nombre"
            ).value.trim();

            const mensajeFormulario = document.getElementById(
                "mensaje-formulario"
            );

            if (
                mensajeFormulario
            ) {
                mensajeFormulario.textContent =
                    `Gracias, ${nombre}. Hemos recibido tu información. Nos pondremos en contacto contigo pronto.`;

                mensajeFormulario.classList.remove(
                    "mensaje-error"
                );
            }

            formulario.reset();
        }
    );
}


function configurarEditarProductos() {
    const listaProductos = document.getElementById("lista-productos");

    if (!listaProductos) return;

    listaProductos.addEventListener("click", function (event) {
        const botonEditar = event.target.closest(".btn-editar");

        if (!botonEditar) return;

        const idProducto = Number(botonEditar.dataset.id);
        const producto = productos.find(p => p.id === idProducto);

        if (!producto) return;

        const nuevoNombre = prompt("Nombre del producto:", producto.nombre);
        if (nuevoNombre === null) return;

        const nuevoPrecio = prompt(
            "Precio del producto (deja vacío si tiene presentaciones o sabores):",
            producto.precio ?? ""
        );

        if (nuevoPrecio === null) return;


        const datosActualizados = {
            ...producto,
            nombre: nuevoNombre.trim()
        };

        if (nuevoPrecio.trim() !== "" && producto.precio !== undefined) {
            datosActualizados.precio = Number(nuevoPrecio);
        }

        const actualizado = editarProductoCRUD(idProducto, datosActualizados);

        if (actualizado) {
            alert("Producto actualizado.");
        }

    });
}


// INICIO

// inicializacion de la aplicacion 
document.addEventListener(
    "DOMContentLoaded",
    () => {
        mostrarProductos(productos);
        mostrarCarrito();
        configurarBuscador();
        configurarEliminarProductos();
        configurarEventosCarrito();
        configurarAgregarMasProductos();
        configurarVaciarCarrito();
        configurarRealizarPedido();
        configurarFormulario();
        mostrarResumenPedido();
        actualizarResumen();
        activarModoContacto();
        mostrarTablaResumen();
        configurarEditarProductos();
        configurarCrearProductoCRUD();
    }
);