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


function obtenerProductos() {
    return productos;
}

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
