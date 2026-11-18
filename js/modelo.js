// DATOS Y REFERENCIAS
// Modelo 

let productos = [
    {
        id: 1,
        nombre: "Alfajores",
        categoria: "Alfajores",
        descripcion: "Alfajores artesanales rellenos de arequipe.",
        imagen: "img/alfajores.jpeg",
        presentaciones: [
            {
                nombre: "Caja x6",
                precio: 12000,
                stock: 10
            },
            {
                nombre: "Bolsa x4",
                precio: 7000,
                stock: 15
            },
            {
                nombre: "Alfajor grande individual",
                precio: 8000,
                stock: 8
            }
        ]
    },

    {
        id: 2,
        nombre: "Postres refrigerados",
        categoria: "Postres",
        descripcion: "Postres cremosos preparados artesanalmente.",
        imagen: "img/postres.jpeg",
        sabores: [
            {
                nombre: "Frutos Rojos",
                stock: 5
            },
            {
                nombre: "Maracuyá",
                stock: 8
            },
            {
                nombre: "Tres leches",
                stock: 6
            },
            {
                nombre: "Oreo",
                stock: 10
            },
            {
                nombre: "Red Velvet",
                stock: 4
            }
        ],
        precio: 8000
    },

    {
        id: 3,
        nombre: "Torta Red Velvet",
        precio: 30000,
        categoria: "Tortas",
        descripcion:
            "Torta Red Velvet con frosting de queso crema, tamaño personal.",
        imagen: "img/tortas.jpeg",
        stock: 3
    },

    {
        id: 4,
        nombre: "Mesa de postres",
        categoria: "Mesa de postres",
        descripcion:
            "Servicio de mesa de postres personalizada para celebraciones y eventos.",
        imagen: "img/mesa-postres.png",
        precio: 150000,
        stock: 2
    },

    {
        id: 5,
        nombre: "Galleta Tata Fiesta",
        categoria: "Galletas",
        descripcion:
            "Galletas artesanales ideales para compartir y celebrar momentos especiales.",
        imagen: "img/GalletasTataFiesta.jpeg",
        precio: 6000,
        stock: 10
    },

    {
        id: 6,
        nombre: "Brownie de Milo",
        categoria: "Brownie",
        descripcion:
            "Brownie de milo humedo y suave, pensado para los amantes del milo.",
        imagen: "img/brownie.jfif",
        precio: 10000,
        stock: 8
    }
];

// carrito
let carrito = [];

//Agregar productos al carrito
function agregarAlCarrito(productoId, variante, precio){
    const itemExistente = carrito.find(
        (item) => item.productoId === productoId &&
        item.variante === variante
    );

    if (itemExistente){
        itemExistente.cantidad++;
    }else{
        carrito.push({
            productoId: productoId,
            variante: variante,
            precio: precio,
            cantidad: 1
        });
    }
}

//Consulta cantidad de una variante
function obtenerCantidadEnCarrito(productoId, variante){
    const productoCarrito = carrito.find(
        (item) => item.productoId === productoId &&
        item.variante === variante
    );

    return productoCarrito ? productoCarrito.cantidad : 0;
}

// Aumentar la cantidad de un producto en el carrito
function incrementarCantidadCarrito(index) {
    const item = carrito[index];

    if (!item) {
        return {
            exito: false,
            mensaje: "No se encontró el producto en el carrito."
        };
    }

    const producto = productos.find(
        (productoActual) => productoActual.id === item.productoId
    );

    if (!producto) {
        return {
            exito: false,
            mensaje: "No se encontró el producto en el catálogo."
        };
    }

    let stock;

    // Consultar stock de presentaciones
    if (producto.presentaciones) {
        const presentacion = producto.presentaciones.find(
            (p) => p.nombre === item.variante
        );

        if (!presentacion) {
            return {
                exito: false,
                mensaje: "No se encontró la presentación seleccionada."
            };
        }

        stock = presentacion.stock;
    }

    // Consultar stock de sabores
    else if (producto.sabores) {
        const sabor = producto.sabores.find(
            (s) => s.nombre === item.variante
        );

        if (!sabor) {
            return {
                exito: false,
                mensaje: "No se encontró el sabor seleccionado."
            };
        }

        stock = sabor.stock;
    }

    // Consultar stock de productos simples
    else {
        stock = producto.stock;
    }

    if (!Number.isFinite(stock)) {
        return {
            exito: false,
            mensaje: "El stock de este producto no es válido."
        };
    }

    if (item.cantidad >= stock) {
        return {
            exito: false,
            mensaje: "No puedes agregar más unidades. Has alcanzado el stock disponible."
        };
    }

    item.cantidad++;

    return { exito: true };
}


// Disminuir la cantidad de un producto en el carrito
function reducirCantidadCarrito(index) {
    const item = carrito[index];

    if (!item) {
        return false;
    }

    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    return true;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
    if (index < 0 || index >= carrito.length) {
        return false;
    }

    carrito.splice(index, 1);
    return true;
}

// Vaciar todos los productos del carrito
function limpiarCarrito() {
    carrito = [];
}

// Cambiar presentación o sabor de un producto
function cambiarVarianteCarrito(index, nuevaVariante) {
    const item = carrito[index];

    if (!item) {
        return {
            exito: false,
            mensaje: "No se encontró el producto en el carrito."
        };
    }

    const producto = productos.find(
        (p) => p.id === item.productoId
    );

    if (!producto) {
        return {
            exito: false,
            mensaje: "No se encontró el producto."
        };
    }

    let variante;
    let nuevoPrecio;
    let stock;

    if (producto.presentaciones) {
        variante = producto.presentaciones.find(
            (p) => p.nombre === nuevaVariante
        );

        nuevoPrecio = variante?.precio;
    } else if (producto.sabores) {
        variante = producto.sabores.find(
            (s) => s.nombre === nuevaVariante
        );

        nuevoPrecio = producto.precio;
    }

    if (!variante) {
        return {
            exito: false,
            mensaje: "La variante seleccionada no existe."
        };
    }

    stock = variante.stock;

    const otroItem = carrito.find(
        (otro, otroIndex) =>
            otro.productoId === producto.id &&
            otro.variante === nuevaVariante &&
            otroIndex !== index
    );

    const cantidadTotal = otroItem
        ? otroItem.cantidad + item.cantidad
        : item.cantidad;

    if (cantidadTotal > stock) {
        return {
            exito: false,
            mensaje: "No hay suficiente stock para unir estas cantidades."
        };
    }

    if (otroItem) {
        otroItem.cantidad = cantidadTotal;
        carrito.splice(index, 1);
    } else {
        item.variante = nuevaVariante;
        item.precio = nuevoPrecio;
    }

    return { exito: true };
}

//Almacenamiento
const CLAVE_PRODUCTOS = "tataOrigen_productos";


function cargarProductos() {
    const productosGuardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (productosGuardados) {
        try {
            return JSON.parse(productosGuardados);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    return productos;
}

function guardarProductos() {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

productos = cargarProductos();

//consultas
function obtenerProductos() {
    return productos;
}

//Obtener resumen del carrito 
function obtenerResumenCarrito(){
    const productosDiferentes = carrito.filter(
        (item) => item.cantidad > 0
    ).length;

    const totalUnidades = carrito.reduce(
        (total, item) => total + item.cantidad, 0
    );

    const total = carrito.reduce(
        (acumulado, item) => acumulado + item.precio * item.cantidad, 0
    );

    return {
        productosDiferentes,
        totalUnidades,
        total
    };
}


// Obtener productos con disponibilidad calculada
function obtenerProductosParaVista() {
    return productos.map((producto) => {
        const productoVista = { ...producto };

        // Productos con presentaciones
        if (producto.presentaciones) {
            productoVista.presentaciones =
                producto.presentaciones.map((presentacion) => {
                    const cantidad = obtenerCantidadEnCarrito(
                        producto.id, presentacion.nombre
                    );

                    return {
                        ...presentacion,
                        stockDisponible: presentacion.stock - cantidad
                    };
                });

            productoVista.agotado =
                productoVista.presentaciones.every(
                    (presentacion) => presentacion.stockDisponible <= 0
                );
        }

        // Productos con sabores
        else if (producto.sabores) {
            productoVista.sabores =
                producto.sabores.map((sabor) => {
                    const cantidad = obtenerCantidadEnCarrito(
                        producto.id,
                        sabor.nombre
                    );

                    return {
                        ...sabor,
                        stockDisponible: sabor.stock - cantidad
                    };
                });

            productoVista.agotado =
                productoVista.sabores.every(
                    (sabor) => sabor.stockDisponible <= 0
                );
        }

        // Productos sin variantes
        else {
            const cantidad = obtenerCantidadEnCarrito(
                producto.id,
                null
            );

            productoVista.stockDisponible =
                producto.stock - cantidad;

            productoVista.agotado =
                productoVista.stockDisponible <= 0;
        }

        return productoVista;
    });
}


//Validaciones
function validar(producto, idExcluir = null) {
    if (!producto.nombre || !producto.nombre.trim()) {
        return "El nombre del producto es obligatorio.";
    }

    if (!producto.categoria || !producto.categoria.trim()) {
        return "La categoría es obligatoria.";
    }

    const duplicado = productos.some(
        (productoActual) =>
            productoActual.nombre.trim().toLowerCase() ===
                producto.nombre.trim().toLowerCase() &&
            productoActual.id !== idExcluir
    );

    if (duplicado) {
        return "Ya existe un producto con ese nombre.";
    }

    if (
        producto.precio !== undefined &&
        (!Number.isFinite(Number(producto.precio)) || Number(producto.precio) <= 0)
    ) {
        return "El precio debe ser un número mayor que cero.";
    }

    if (
        producto.stock !== undefined &&
        (!Number.isFinite(Number(producto.stock)) || Number(producto.stock) < 0)
    ) {
        return "El stock debe ser un número igual o mayor que cero.";
    }

    return "";
}

function agregarProducto(producto) {
    const error = validar(producto);

    if (error) {
        return error;
    }

    const nuevoProducto = {
        ...producto,
        id: productos.length > 0
            ? Math.max(...productos.map((p) => p.id)) + 1
            : 1
    };

    productos.push(nuevoProducto);
    guardarProductos();

    return "";
}

function actualizarProducto(id, datosActualizados) {
    const indice = productos.findIndex(
        (producto) => producto.id === Number(id)
    );

    if (indice === -1) {
        return "No se encontró el producto.";
    }

    const productoActualizado = {
        ...productos[indice],
        ...datosActualizados,
        id: productos[indice].id
    };

    const error = validar(productoActualizado, Number(id));

    if (error) {
        return error;
    }

    productos[indice] = productoActualizado;
    guardarProductos();

    return "";
}

function eliminarProducto(id) {
    const indice = productos.findIndex(
        (producto) => producto.id === Number(id)
    );

    if (indice === -1) {
        return false;
    }

    productos.splice(indice, 1);
    guardarProductos();

    return true;
}

