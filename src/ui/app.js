/**
 * @namespace Interfaz
 * @description Funciones relacionadas con la presentación
 * de información en la interfaz gráfica.
 */

import {
    getCharacters,
    getEpisode,
    getEpisodes
} from "../api/rickAndMortyApi.js";

const charactersBody = document.querySelector("#characters-body");
const loading = document.querySelector("#loading");
const errorContainer = document.querySelector("#error");

const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");
const pageInfo = document.querySelector("#page-info");

const episodeId = document.querySelector("#episode-id");
const searchEpisode = document.querySelector("#search-episode");
const episodeResult = document.querySelector("#episode-result");

const episodeOne = document.querySelector("#episode-one");
const episodeTwo = document.querySelector("#episode-two");
const episodeThree = document.querySelector("#episode-three");
const searchEpisodes = document.querySelector("#search-episodes");
const episodesResult = document.querySelector("#episodes-result");

let currentPage = 1;
let totalPages = 1;

/**
 * Renderiza los personajes obtenidos desde la API.
 *
 * @function renderCharacters
 * @memberof Interfaz
 * @param {Object[]} characters Lista de personajes.
 * @returns {void}
 */
function renderCharacters(characters) {
    charactersBody.innerHTML = "";

    characters.forEach((character) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>
            <img
                src="${character.image}"
                alt="${character.name}"
                class="character-image"
        >
        </td>
            <td>${character.id}</td>
            <td>${character.name}</td>
            <td>${character.status}</td>
            <td>${character.species}</td>
            <td>${character.gender}</td>
        `;

        charactersBody.appendChild(row);
    });
}

/**
 * Muestra un mensaje de error al usuario.
 *
 * @function showError
 * @memberof Interfaz
 * @param {string} message Mensaje que será mostrado.
 * @returns {void}
 */
function showError(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove("hidden");
}

/**
 * Obtiene los personajes y actualiza la interfaz.
 *
 * @function loadCharacters
 * @memberof Interfaz
 * @returns {Promise<void>}
 */
async function loadCharacters(page = 1) {
    try {
        loading.classList.remove("hidden");

        const data = await getCharacters(page);

        currentPage = page;
        totalPages = data.info.pages;

        renderCharacters(data.results);

        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

        previousPage.disabled = currentPage === 1;
        nextPage.disabled = currentPage === totalPages;
    } catch (error) {
        console.error(error);

        showError(
            "No fue posible cargar los personajes. Intenta nuevamente."
        );
    } finally {
        loading.classList.add("hidden");
    }
}
/**
 * Obtiene y muestra un episodio específico.
 *
 * @function loadEpisode
 * @memberof Interfaz
 * @returns {Promise<void>}
 */
async function loadEpisode() {
    try {
        const id = Number(episodeId.value);

        if (!id) {
            episodeResult.textContent = "Ingresa un ID de episodio válido (1 al 51).";
            episodeResult.classList.remove("hidden");
            return;
        }

        const episode = await getEpisode(id);

        episodeResult.innerHTML = `
            <strong>${episode.name}</strong><br>
            Fecha de emisión: ${episode.air_date}<br>
            Código: ${episode.episode}
        `;

        episodeResult.classList.remove("hidden");
    } catch (error) {
        console.error(error);

        episodeResult.textContent =
            "No fue posible encontrar el episodio.";
        episodeResult.classList.remove("hidden");
    }
}

/**
 * Obtiene y muestra tres episodios seleccionados.
 *
 * @function loadEpisodes
 * @memberof Interfaz
 * @returns {Promise<void>}
 */
async function loadEpisodes() {
    try {
        const ids = [
            Number(episodeOne.value),
            Number(episodeTwo.value),
            Number(episodeThree.value)
        ];

        if (ids.some((id) => !id)) {
            episodesResult.textContent =
                "Ingresa los tres IDs de episodios válidos (1 al 51).";
            episodesResult.classList.remove("hidden");
            return;
        }

        const episodes = await getEpisodes(ids);

        episodesResult.innerHTML = episodes.map((episode) => `
            <div>
                <strong>${episode.name}</strong><br>
                Fecha de emisión: ${episode.air_date}<br>
                Código: ${episode.episode}
            </div>
            <hr>
        `).join("");

        episodesResult.classList.remove("hidden");
    } catch (error) {
        console.error(error);

        episodesResult.textContent =
            "No fue posible obtener los episodios.";
        episodesResult.classList.remove("hidden");
    }
}

previousPage.addEventListener("click", () => {
    loadCharacters(currentPage - 1);
});

nextPage.addEventListener("click", () => {
    loadCharacters(currentPage + 1);
});

searchEpisode.addEventListener("click", loadEpisode);

searchEpisodes.addEventListener("click", loadEpisodes);


loadCharacters();