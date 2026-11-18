//Servicio para consultar recetas de postres 
async function obtenerPostresAPI() {
    const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert";

    try {
        console.log("Consultando API:", url);

        const respuesta = await fetch(url);

        console.log("Estado HTTP:", respuesta.status);

        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }

        const datos = await respuesta.json();

        console.log("Datos recibidos:", datos);

        if (!datos.meals) {
            throw new Error("La API no devolvió recetas.");
        }

        return datos.meals.map((receta) => ({
            id: receta.idMeal,
            nombre: receta.strMeal,
            imagen: receta.strMealThumb
        }));

    } catch (error) {
        console.error("Error real de la API:", error);
        throw error;
    }
}