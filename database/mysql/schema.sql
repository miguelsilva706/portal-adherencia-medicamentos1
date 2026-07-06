-- ============================================================
-- Portal de Adherencia a Medicamentos - Esquema MySQL
-- Datos transaccionales: usuarios, pacientes, medicamentos, recordatorios
-- ============================================================

CREATE DATABASE IF NOT EXISTS adherencia_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE adherencia_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo    VARCHAR(150) NOT NULL,
    correo             VARCHAR(150) NOT NULL UNIQUE,
    contrasena         VARCHAR(255) NOT NULL,
    telefono           VARCHAR(30),
    fecha_nacimiento   DATE,
    rol                ENUM('PACIENTE', 'CUIDADOR', 'ADMINISTRADOR') NOT NULL,
    activo             BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en          DATETIME NOT NULL,
    actualizado_en     DATETIME
);

CREATE TABLE IF NOT EXISTS pacientes (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id          BIGINT NOT NULL UNIQUE,
    cuidador_id         BIGINT NULL,
    codigo_paciente     VARCHAR(20),
    condiciones_medicas TEXT,
    cuenta_activa       BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en           DATETIME NOT NULL,
    CONSTRAINT fk_paciente_usuario  FOREIGN KEY (usuario_id)  REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_paciente_cuidador FOREIGN KEY (cuidador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS medicamentos (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    paciente_id    BIGINT NOT NULL,
    nombre         VARCHAR(150) NOT NULL,
    categoria      VARCHAR(80),
    dosis          VARCHAR(40) NOT NULL,
    frecuencia     VARCHAR(60) NOT NULL,
    instrucciones  VARCHAR(255),
    activo         BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en      DATETIME NOT NULL,
    CONSTRAINT fk_medicamento_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recordatorios (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    medicamento_id   BIGINT NOT NULL,
    hora_programada  TIME NOT NULL,
    estado           ENUM('PROGRAMADO', 'COMPLETADO', 'PENDIENTE', 'OMITIDO') NOT NULL DEFAULT 'PROGRAMADO',
    fecha_hora_toma  DATETIME NULL,
    creado_en        DATETIME NOT NULL,
    CONSTRAINT fk_recordatorio_medicamento FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id) ON DELETE CASCADE
);

CREATE INDEX idx_medicamentos_paciente ON medicamentos(paciente_id);
CREATE INDEX idx_recordatorios_medicamento ON recordatorios(medicamento_id);
CREATE INDEX idx_pacientes_cuidador ON pacientes(cuidador_id);
