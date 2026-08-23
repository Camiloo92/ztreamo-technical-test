import { getEpisode } from "./api/rickAndMortyApi.js";

async function main() {
    try {
        const episode = await getEpisode(3);

        console.log("Nombre:", episode.name);
        console.log("Fecha de emisión:", episode.air_date);
        console.log("Código:", episode.episode);
    } catch (error) {
        console.error(
            "No fue posible obtener el episodio:",
            error.message
        );
    }
}

main();