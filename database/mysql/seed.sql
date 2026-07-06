-- ============================================================
-- Datos iniciales de ejemplo
-- Contraseña para todos los usuarios de ejemplo: "password"
-- ============================================================

USE adherencia_db;

INSERT INTO usuarios (nombre_completo, correo, contrasena, telefono, fecha_nacimiento, rol, activo, creado_en)
VALUES
('Administrador General', 'admin@mediadherencia.pe', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+51 900 000 000', '1985-01-01', 'ADMINISTRADOR', TRUE, NOW()),
('Maria Garcia Lopez', 'maria.garcia@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+51 933 102 500', '1955-04-12', 'PACIENTE', TRUE, NOW()),
('Carmen Nuñez Vega', 'carmen.nunez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+51 933 102 501', '1990-06-20', 'CUIDADOR', TRUE, NOW());

-- El paciente Maria Garcia queda vinculado a la cuidadora Carmen Nuñez
INSERT INTO pacientes (usuario_id, cuidador_id, codigo_paciente, condiciones_medicas, cuenta_activa, creado_en)
SELECT u1.id, u2.id, 'ID-PAC-001', 'Hipertensión, diabetes tipo 2', TRUE, NOW()
FROM usuarios u1, usuarios u2
WHERE u1.correo = 'maria.garcia@example.com' AND u2.correo = 'carmen.nunez@example.com';

INSERT INTO medicamentos (paciente_id, nombre, categoria, dosis, frecuencia, instrucciones, activo, creado_en)
SELECT p.id, 'Metformina', 'Antidiabético', '500mg', '2x al día', 'Tomar con alimentos para reducir molestias gástricas', TRUE, NOW()
FROM pacientes p JOIN usuarios u ON p.usuario_id = u.id WHERE u.correo = 'maria.garcia@example.com';

INSERT INTO medicamentos (paciente_id, nombre, categoria, dosis, frecuencia, instrucciones, activo, creado_en)
SELECT p.id, 'Losartán', 'Antihipertensivo', '50mg', '1x al día', 'Tomar en ayunas', TRUE, NOW()
FROM pacientes p JOIN usuarios u ON p.usuario_id = u.id WHERE u.correo = 'maria.garcia@example.com';
