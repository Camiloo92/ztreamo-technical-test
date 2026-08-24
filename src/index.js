/**
 * @namespace Aplicacion
 * @description Punto de entrada para validar los requerimientos
 * de consumo de la API de Rick and Morty.
 */

import {
    getCharacters,
    getEpisode,
    getEpisodes
} from "./api/rickAndMortyApi.js";

/**
 * Prueba el consumo del endpoint de personajes.
 *
 * @function testCharacters
 * @memberof Aplicacion
 * @returns {Promise<void>}
 */
async function testCharacters() {
    const characters = await getCharacters();

    console.log("=== PRUEBA 1: PERSONAJES ===");
    console.log(JSON.stringify(characters, null, 2));
}

/**
 * Prueba el consumo de un episodio específico.
 *
 * @function testEpisode
 * @memberof Aplicacion
 * @returns {Promise<void>}
 */
async function testEpisode() {
    const episode = await getEpisode(1);

    console.log("=== PRUEBA 2: EPISODIO ===");
    console.log({
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode
    });
}

/**
 * Prueba el consumo de múltiples episodios.
 *
 * @function testEpisodes
 * @memberof Aplicacion
 * @returns {Promise<void>}
 */
async function testEpisodes() {
    const episodes = await getEpisodes([1, 2, 3]);

    console.log("=== PRUEBA 3: MÚLTIPLES EPISODIOS ===");
    console.log(JSON.stringify(episodes, null, 2));
}

/**
 * Ejecuta las pruebas de integración con la API.
 *
 * @function main
 * @memberof Aplicacion
 * @returns {Promise<void>}
 */
async function main() {
    try {
        await testCharacters();
        await testEpisode();
        await testEpisodes();
    } catch (error) {
        console.error(
            "No fue posible ejecutar las pruebas:",
            error.message
        );
    }
}

main();