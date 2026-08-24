-- =============================================================================
-- BASE DE DATOS: SISTEMA DE RENDIMIENTO Y PRODUCTIVIDAD DE DELANTEROS
-- Motor: PostgreSQL
-- =============================================================================

-- 1. LIMPIEZA DE TABLAS (Por si se requiere reejecutar)
DROP TABLE IF EXISTS estadisticas_partido CASCADE;
DROP TABLE IF EXISTS jugadores CASCADE;
DROP TABLE IF EXISTS equipos CASCADE;

-- =============================================================================
-- 2. CREACIÓN DE TABLAS Y ESTRUCTURA RELACIONAL
-- =============================================================================

CREATE TABLE equipos (
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100)
);

CREATE TABLE jugadores (
    id_jugador SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    numero_dorsal INT NOT NULL,
    posicion VARCHAR(50) DEFAULT 'Delantero',
    id_equipo INT REFERENCES equipos(id_equipo) ON DELETE SET NULL
);

CREATE TABLE estadisticas_partido (
    id_estadistica SERIAL PRIMARY KEY,
    id_jugador INT REFERENCES jugadores(id_jugador) ON DELETE CASCADE,
    fecha_partido DATE NOT NULL,
    minutos_jugados INT NOT NULL CHECK (minutos_jugados >= 0 AND minutos_jugados <= 120),
    goles INT NOT NULL DEFAULT 0 CHECK (goles >= 0),
    opciones_gol_generadas INT NOT NULL DEFAULT 0 CHECK (opciones_gol_generadas >= 0),
    faltas_cometidas INT NOT NULL DEFAULT 0 CHECK (faltas_cometidas >= 0)
);

-- =============================================================================
-- 3. INSERCIÓN DE DATOS (DML)
-- =============================================================================

-- Insertar Equipos
INSERT INTO equipos (nombre, ciudad) VALUES 
('Deportivo Rayo', 'Bogotá'),
('Atlético Estelar', 'Medellín'),
('Real Cóndor', 'Cali'),
('Huracán FC', 'Barranquilla'),
('Tigres del Sur', 'Pasto'),
('Halcones Rojos', 'Bucaramanga'),
('Unión Jaguares', 'Pereira'),
('Costa Verde', 'Santa Marta');

-- Insertar Jugadores (32 delanteros distribuidos)
INSERT INTO jugadores (nombre, numero_dorsal, id_equipo) VALUES 
('Carlos Bacca', 9, 1),
('Radamel Falcao', 3, 1),
('Dayro Moreno', 17, 1),
('Duvan Zapata', 91, 1),

('Luis Díaz', 7, 2),
('Jhon Córdoba', 11, 2),
('Mateus Uribe', 8, 2),
('Rafael Santos Borré', 19, 2),

('Hugo Rodallega', 11, 3),
('Teófilo Gutiérrez', 29, 3),
('Dorlan Pabón', 8, 3),
('Jefferson Duque', 9, 3),

('Luis Muriel', 9, 4),
('Yimmi Chará', 23, 4),
('Harold Preciado', 7, 4),
('Roger Martínez', 10, 4),

('Cucho Hernández', 9, 5),
('Oscar Estupiñán', 19, 5),
('Cristian Arango', 10, 5),
('Emilio Aristizábal', 11, 5),

('Brayan León', 27, 6),
('Edwar López', 7, 6),
('Leonardo Castro', 23, 6),
('Adrián Ramos', 20, 6),

('Facundo Suárez', 9, 7),
('Gonzalo Lencina', 11, 7),
('Marco Pérez', 18, 7),
('Michael Rangel', 9, 7),

('Diber Cambindo', 27, 8),
('Pablo Sabbag', 11, 8),
('Luciano Pons', 9, 8),
('Fredy Montero', 10, 8);

-- Insertar Estadísticas de Partidos (Múltiples fechas / Jornadas)
INSERT INTO estadisticas_partido (id_jugador, fecha_partido, minutos_jugados, goles, opciones_gol_generadas, faltas_cometidas) VALUES 
-- JORNADA 1 (2026-02-01)
(1, '2026-02-01', 90, 2, 5, 2),
(2, '2026-02-01', 60, 2, 2, 0),
(3, '2026-02-01', 85, 1, 4, 1),
(4, '2026-02-01', 45, 0, 1, 3),
(5, '2026-02-01', 90, 1, 3, 1),
(6, '2026-02-01', 70, 0, 3, 5),
(7, '2026-02-01', 90, 0, 1, 2),
(8, '2026-02-01', 75, 1, 2, 2),
(9, '2026-02-01', 90, 2, 6, 0),
(10, '2026-02-01', 80, 0, 4, 4),
(11, '2026-02-01', 90, 1, 2, 1),
(12, '2026-02-01', 65, 1, 1, 2),
(13, '2026-02-01', 90, 3, 4, 1),
(14, '2026-02-01', 80, 0, 2, 0),
(15, '2026-02-01', 90, 1, 5, 3),
(16, '2026-02-01', 70, 0, 2, 2),

-- JORNADA 2 (2026-02-08)
(1, '2026-02-08', 90, 1, 4, 2),
(2, '2026-02-08', 60, 1, 2, 1),
(3, '2026-02-08', 90, 2, 5, 2),
(4, '2026-02-08', 90, 1, 3, 4),
(5, '2026-02-08', 90, 2, 5, 0),
(6, '2026-02-08', 80, 1, 3, 3),
(7, '2026-02-08', 90, 1, 2, 1),
(8, '2026-02-08', 85, 0, 3, 3),
(9, '2026-02-08', 90, 1, 3, 2),
(10, '2026-02-08', 90, 1, 5, 5),
(11, '2026-02-08', 75, 0, 1, 0),
(12, '2026-02-08', 90, 2, 4, 1),
(13, '2026-02-08', 60, 0, 1, 2),
(14, '2026-02-08', 90, 1, 3, 1),
(15, '2026-02-08', 80, 2, 3, 2),
(16, '2026-02-08', 90, 1, 4, 3),

-- JORNADA 3 (2026-02-15)
(1, '2026-02-15', 75, 0, 2, 1),
(2, '2026-02-15', 90, 1, 3, 0),
(3, '2026-02-15', 90, 1, 3, 3),
(5, '2026-02-15', 90, 1, 4, 1),
(6, '2026-02-15', 90, 2, 4, 2),
(7, '2026-02-15', 60, 0, 0, 1),
(8, '2026-02-15', 90, 1, 4, 1),
(9, '2026-02-15', 90, 0, 2, 3),
(10, '2026-02-15', 70, 0, 2, 2),
(13, '2026-02-15', 85, 1, 3, 0),
(14, '2026-02-15', 90, 2, 4, 2),
(17, '2026-02-15', 90, 2, 5, 1),
(18, '2026-02-15', 80, 1, 2, 2),
(19, '2026-02-15', 90, 1, 3, 0),
(20, '2026-02-15', 65, 0, 1, 1),

-- JORNADA 4 (2026-02-22)
(17, '2026-02-22', 90, 1, 4, 0),
(18, '2026-02-22', 90, 2, 3, 1),
(19, '2026-02-22', 70, 0, 2, 3),
(20, '2026-02-22', 90, 1, 2, 2),
(21, '2026-02-22', 90, 0, 1, 4),
(22, '2026-02-22', 85, 1, 3, 1),
(23, '2026-02-22', 90, 2, 5, 2),
(24, '2026-02-22', 60, 0, 1, 0),
(25, '2026-02-22', 90, 1, 3, 2),
(26, '2026-02-22', 75, 1, 2, 1),
(27, '2026-02-22', 90, 2, 4, 3),
(28, '2026-02-22', 80, 0, 1, 2),

-- JORNADA 5 (2026-03-01)
(21, '2026-03-01', 90, 1, 2, 2),
(22, '2026-03-01', 90, 0, 2, 3),
(23, '2026-03-01', 80, 1, 3, 1),
(24, '2026-03-01', 90, 2, 3, 1),
(25, '2026-03-01', 60, 0, 1, 1),
(26, '2026-03-01', 90, 2, 4, 2),
(27, '2026-03-01', 90, 1, 3, 1),
(28, '2026-03-01', 70, 0, 0, 0),
(29, '2026-03-01', 90, 2, 6, 4),
(30, '2026-03-01', 85, 1, 2, 2),
(31, '2026-03-01', 90, 0, 1, 1),
(32, '2026-03-01', 65, 1, 3, 0);