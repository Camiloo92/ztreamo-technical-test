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
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
}

/**
 * Obtiene la lista de personajes.
 *
 * @function getCharacters
 * @memberof RickAndMortyAPI
 * @returns {Promise<Object>} Respuesta de personajes de la API.
 */
export async function getCharacters() {
    return await request("/character");
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