# ZTREAMO - Prueba Técnica

## Descripción

Proyecto desarrollado para la evaluación técnica de consumo de APIs REST y consultas SQL relacionales con PostgreSQL.

## Tecnologías

- JavaScript
- Node.js
- HTML
- CSS
- PostgreSQL
- Rick and Morty API

## Requisitos

- Node.js
- PostgreSQL

## Ejecución

Clonar el repositorio:

```bash
git clone https://github.com/Camiloo92/ztreamo-technical-test.git
cd ztreamo-technical-test
```

Ejecutar el servidor:

```bash
node src/server.js
```

Abrir en el navegador:

```text
http://localhost:3000
```

## Parte 1 - Rick and Morty API

La aplicación consume la API pública de Rick and Morty.

### Personajes

- Consulta de personajes.
- Paginación.
- Búsqueda por nombre parcial o completo.
- Visualización de imagen, ID, nombre, estado, especie y origen.

### Episodio individual

Permite consultar un episodio mediante su ID y mostrar:

- Nombre.
- Fecha de emisión.
- Código del episodio.

### Múltiples episodios

Permite seleccionar tres IDs de episodios y consultar sus datos simultáneamente.

## Parte 2 - PostgreSQL

Las soluciones SQL se encuentran en:

```text
/sql/queries.sql
```

El archivo de datos proporcionado para preparar la base de datos se encuentra en:

```text
/sql/Datos.sql
```

## Estructura del proyecto

```text
ztreamo-technical-test/
│
├── src/
│   ├── api/
│   │   └── rickAndMortyApi.js
│   │
│   ├── ui/
│   │   ├── app.js
│   │   ├── index.html
│   │   └── styles.css
│   │
│   ├── index.js
│   └── server.js
│
├── sql/
│   ├── Datos.sql
│   └── queries.sql
│
├── README.md
└── package.json
```

## Manejo de errores

Las solicitudes a la API validan las respuestas HTTP y capturan errores para mostrar mensajes entendibles durante la ejecución.

## Autor

**Iván Camilo Casallas Calle**

Tecnólogo en análisis y desarrollo de software
