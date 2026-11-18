# Tata Origen

Aplicación web desarrollada como proyecto académico para la asignatura **Herramientas de Programación III** de la Institución Universitaria Pascual Bravo.

Tata Origen permite consultar un catálogo de productos de repostería, administrar productos e inventario, gestionar un carrito de compras y preparar pedidos para enviarlos mediante WhatsApp. Además, integra una API externa para mostrar recetas de postres como contenido de inspiración.

## Tecnologías utilizadas

- **HTML5:** estructura de la aplicación.
- **CSS3:** diseño y presentación de la interfaz.
- **JavaScript:** lógica de programación, interactividad y manipulación del DOM.
- **LocalStorage:** almacenamiento local de los productos.
- **Fetch API:** comunicación con un servicio externo.
- **TheMealDB:** API utilizada para consultar recetas de postres.

## Funcionalidades

### Catálogo de productos
- Visualización de productos de repostería.
- Consulta de precios, descripciones y existencias.
- Búsqueda por nombre, categoría o descripción.
- Identificación de productos agotados.
- Selección de productos para agregarlos al carrito.

### Administración de productos (CRUD)
- Crear productos.
- Consultar los productos registrados.
- Editar información de productos.
- Eliminar productos con confirmación.
- Validar campos obligatorios, nombres duplicados, precios y existencias.

Los cambios realizados en los productos se guardan en el almacenamiento local del navegador.

### Carrito de compras
- Agregar productos y sus variantes.
- Aumentar o disminuir cantidades.
- Cambiar presentaciones o sabores.
- Eliminar productos individuales.
- Vaciar el carrito.
- Consultar cantidades y valor total del pedido.
- Validar que las unidades solicitadas no superen el inventario disponible.

**Nota:** el contenido del carrito se administra durante la sesión de uso y no se conserva al recargar la página.

### Pedidos y contacto
- Formulario para registrar información del cliente.
- Validación de los campos del formulario.
- Presentación del resumen del pedido.
- Generación de un mensaje con los datos del pedido.
- Apertura de WhatsApp para continuar el proceso de compra.

El formulario de contacto muestra una confirmación en pantalla. No utiliza actualmente un servicio externo para enviar o almacenar esos mensajes.

### Inspiración dulce
- Consulta de recetas de postres mediante TheMealDB.
- Presentación de hasta cuatro recetas.
- Visualización del nombre y la imagen de cada receta.
- Mensajes para indicar el estado de carga o posibles errores de consulta.

## Tecnologías y recursos externos

| Recurso | Utilización |
|---|---|
| HTML5 | Estructura del sitio web. |
| CSS3 | Diseño y estilos de los componentes. |
| JavaScript | Funcionalidades y lógica de la aplicación. |
| LocalStorage | Persistencia local de los productos. |
| Fetch API | Solicitudes HTTP a la API externa. |
| TheMealDB | Consulta de recetas de postres. |
| WhatsApp | Medio para continuar el proceso de pedido. |

## Estructura del proyecto

```text
Tata-Origen/
│
├── index.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── app.js
│   ├── modelo.js
│   ├── vista.js
│   ├── controlador.js
│   │
│   └── servicios/
│       └── api.js
│
├── img/
│   └── imágenes de los productos
│
└── README.md
```

## Organización del código

El proyecto utiliza una separación de responsabilidades basada en el patrón Modelo-Vista-Controlador (MVC). La organización se encuentra distribuida en varios archivos JavaScript.

| Archivo | Responsabilidad |
|---|---|
| `modelo.js` | Contiene los datos de los productos, las operaciones del carrito, las validaciones del CRUD y las funciones de almacenamiento local. |
| `vista.js` | Contiene funciones para representar productos, mensajes, resúmenes y recetas en la interfaz. |
| `controlador.js` | Coordina operaciones del CRUD y la consulta de recetas, comunicando las funciones del modelo y la vista. |
| `app.js` | Inicializa la aplicación y configura eventos, búsqueda, carrito, formularios, pedidos y otras interacciones de la interfaz. |
| `servicios/api.js` | Realiza la solicitud a TheMealDB, procesa la respuesta JSON y transforma los datos recibidos. |
| `estilos.css` | Define los estilos visuales de la aplicación. |
| `index.html` | Contiene la estructura HTML y carga los archivos necesarios para ejecutar el proyecto. |

**Funcionamiento de la arquitectura:**

- **Modelo:** administra los datos y las operaciones sobre ellos.
- **Vista:** presenta la información y actualiza los elementos visuales.
- **Controlador:** coordina determinadas operaciones entre el modelo y la vista.
- **Inicialización y eventos:** `app.js` configura el comportamiento general y conecta las interacciones del usuario con las funciones del sistema.

La separación facilita la identificación de responsabilidades y permite organizar el desarrollo y mantenimiento del código.

## Almacenamiento de datos

La aplicación utiliza `localStorage`, una funcionalidad del navegador que permite guardar información en el dispositivo del usuario.

La información de los productos se convierte a formato JSON para almacenarse y posteriormente recuperarse.

La clave utilizada para guardar los productos es:

```javascript
const CLAVE_PRODUCTOS = "tataOrigen_productos";
```

Cuando se inicia la aplicación, se verifica si existen productos almacenados. Si no hay información guardada, se utilizan los productos iniciales definidos en el modelo.

El almacenamiento es local al navegador: no existe actualmente una base de datos ni sincronización entre diferentes dispositivos.

## Integración con TheMealDB API

Se utiliza la API pública de TheMealDB para consultar recetas pertenecientes a la categoría de postres.

**Endpoint utilizado:**

```text
https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert
```

**Características de la solicitud:**

- Método HTTP: `GET`.
- Parámetro: `c=Dessert`.
- Formato de respuesta: JSON.
- Servicio: TheMealDB.

### Funcionamiento de la consulta

1. La aplicación solicita las recetas mediante `fetch`.
2. Se verifica que la respuesta HTTP sea correcta mediante `response.ok`.
3. Se convierte la respuesta a formato JSON.
4. Se comprueba que la respuesta contenga recetas.
5. Se transforman los datos recibidos para utilizar únicamente el identificador, nombre e imagen.
6. Se muestran hasta cuatro recetas en la sección de inspiración.

La consulta utiliza funciones asíncronas (`async/await`) y manejo de errores mediante `try/catch`.

**Ejemplo de transformación de los datos:**

```javascript
return datos.meals.map((receta) => ({
    id: receta.idMeal,
    nombre: receta.strMeal,
    imagen: receta.strMealThumb
}));
```

**Documentación de la API:**  
https://www.themealdb.com/api.php

## Instalación y ejecución

1. Descargar el proyecto o clonarlo desde GitHub.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar `index.html` mediante una extensión como Live Server.
4. Abrir la dirección local generada en el navegador.

Se recomienda utilizar un servidor local para probar la aplicación y sus solicitudes a la API.

## Documentación oficial consultada

Las siguientes fuentes sirvieron como referencia para implementar funcionalidades del proyecto:

| Documentación | Aplicación en el proyecto |
|---|---|
| [MDN - Introducción al DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction) | Comprender la estructura del DOM y cómo acceder y modificar elementos HTML desde JavaScript. |
| [MDN - Uso de Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch) | Realizar solicitudes HTTP y obtener información de TheMealDB. |
| [MDN - Funciones async](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) | Gestionar operaciones asíncronas durante las consultas a la API. |
| [MDN - Window.localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) | Guardar y recuperar los productos registrados en el navegador. |

## Repositorio

Código fuente: [Agregar enlace del repositorio de GitHub].

## Aplicación publicada

Enlace de acceso: [Agregar enlace de publicación, si está disponible].

---

**Proyecto académico — Herramientas de Programación III**  
Institución Universitaria Pascual Bravo  
2026
