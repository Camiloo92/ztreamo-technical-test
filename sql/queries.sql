-- =====================================================
-- CONSULTA 1 - PROMEDIO DE GOL
-- =====================================================

SELECT
    j.nombre,
    j.numero_dorsal,
    SUM(e.minutos_jugados) AS total_minutos,
    ROUND(AVG(e.goles), 2) AS promedio_goles
FROM jugadores j
LEFT JOIN estadisticas_partido e
    ON j.id_jugador = e.id_jugador
GROUP BY
    j.id_jugador,
    j.nombre,
    j.numero_dorsal
ORDER BY promedio_goles DESC;


-- =====================================================
-- CONSULTA 2 - MAYOR APROVECHAMIENTO
-- =====================================================

SELECT
    j.id_jugador,
    j.nombre,
    SUM(e.opciones_gol_generadas) AS total_oportunidades,
    SUM(e.goles) AS total_goles,
    ROUND(
        SUM(e.opciones_gol_generadas)::numeric /
        NULLIF(SUM(e.goles), 0),
        2
    ) AS oportunidades_por_gol
FROM jugadores j
LEFT JOIN estadisticas_partido e
    ON j.id_jugador = e.id_jugador
GROUP BY
    j.id_jugador,
    j.nombre
ORDER BY oportunidades_por_gol ASC;


-- =====================================================
-- CONSULTA 3 - FAIR PLAY
-- =====================================================

SELECT
    j.id_jugador,
    j.nombre,
    SUM(e.faltas_cometidas) AS total_faltas
FROM jugadores j
LEFT JOIN estadisticas_partido e
    ON j.id_jugador = e.id_jugador
GROUP BY
    j.id_jugador,
    j.nombre
ORDER BY total_faltas ASC;


-- =====================================================
-- CONSULTA 4 - CONSULTA INTEGRADA
-- =====================================================

SELECT
    j.nombre AS jugador,
    e.nombre AS equipo,
    SUM(ep.goles) AS total_goles_jugador,
    SUM(ep.minutos_jugados) AS total_minutos,
    SUM(SUM(ep.goles)) OVER (
        PARTITION BY e.id_equipo
    ) AS total_goles_equipo
FROM jugadores j
JOIN equipos e
    ON j.id_equipo = e.id_equipo
LEFT JOIN estadisticas_partido ep
    ON j.id_jugador = ep.id_jugador
GROUP BY
    j.id_jugador,
    j.nombre,
    e.id_equipo,
    e.nombre
ORDER BY
    e.nombre,
    total_goles_jugador DESC;