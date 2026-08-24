/**
 * @namespace Interfaz
 * @description Funciones relacionadas con la presentación
 * de información en la interfaz gráfica.
 */

import { getCharacters } from "../api/rickAndMortyApi.js";

const charactersBody = document.querySelector("#characters-body");
const loading = document.querySelector("#loading");
const errorContainer = document.querySelector("#error");
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");
const pageInfo = document.querySelector("#page-info");

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

previousPage.addEventListener("click", () => {
    loadCharacters(currentPage - 1);
});

nextPage.addEventListener("click", () => {
    loadCharacters(currentPage + 1);
});

loadCharacters();