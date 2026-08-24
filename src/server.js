/**
 * @namespace Servidor
 * @description Servidor HTTP local para servir la interfaz gráfica.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDirectory = __dirname;

/**
 * Determina el tipo MIME de un archivo.
 *
 * @function getContentType
 * @memberof Servidor
 * @param {string} filePath Ruta del archivo.
 * @returns {string} Tipo MIME correspondiente.
 */
function getContentType(filePath) {
    const extension = path.extname(filePath);

    const contentTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css"
    };

    return contentTypes[extension] || "text/plain";
}


const server = http.createServer((request, response) => {
    const requestedPath = request.url === "/"
        ? "/ui/index.html"
        : new URL(request.url, `http://localhost:${PORT}`).pathname;

    const filePath = path.resolve(
        sourceDirectory,
        `.${requestedPath}`
    );

    if (!filePath.startsWith(sourceDirectory)) {
        response.writeHead(403, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        response.end("Acceso no permitido");
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(404, {
                "Content-Type": "text/plain; charset=utf-8"
            });

            response.end("Archivo no encontrado");
            return;
        }

        response.writeHead(200, {
            "Content-Type": `${getContentType(filePath)}; charset=utf-8`
        });

        response.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
