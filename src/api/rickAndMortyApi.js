/**
 * @namespace RickAndMortyAPI
 * @description Funciones para consumir la API pública de Rick and Morty alojada en la URL
 */
const BASE_URL = "https://rickandmortyapi.com/api";


/**
 * Realiza petición GET a la API de Rick and Morty.
 *
 * @function request
 * @memberof RickAndMortyAPI
 * @param {string} endpoint Listado de endpoint que se desea consultar.
 * @returns {Promise<Object|Array>} Datos obtenidos de la API.
 * @throws {Error} Cuando la respuesta HTTP no es exitosa.
 */
async function request(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(
                `Error HTTP ${response.status}: ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        throw error;
    }
}

/**
 * Obtiene la lista de personajes según las páginas del API.
 *
 * @function getCharacters
 * @memberof RickAndMortyAPI
 * @returns {Promise<Object>} Respuesta de personajes de la API.
 */
export async function getCharacters(page = 1, name = "") {
    const query = new URLSearchParams({
        page: page.toString()
    });

    if (name) {
        query.set("name", name);
    }

    return await request(`/character?${query.toString()}`);
}

/**
 * Obtiene un episodio específico.
 *
 * @function getEpisode
 * @memberof RickAndMortyAPI
 * @param {number} id Identificador del episodio.
 * @returns {Promise<Object>} Información del episodio.
 */
export async function getEpisode(id) {
    return await request(`/episode/${id}`);
}

/**
 * Obtiene múltiples episodios.
 *
 * @function getEpisodes
 * @memberof RickAndMortyAPI
 * @param {number[]} ids Identificadores de los episodios.
 * @returns {Promise<Object|Object[]>} Información de los episodios solicitados.
 */
export async function getEpisodes(ids) {
    return await request(`/episode/[${ids.join(",")}]`);
}