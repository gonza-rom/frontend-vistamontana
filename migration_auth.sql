-- Script de migración para sistema de autenticación y pagos
-- Ejecutar en phpMyAdmin en la base de datos hospedaje_vista_montana

-- 1. Crear tabla de administradores
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Insertar usuario admin por defecto
-- Contraseña: admin123 (hasheada con bcrypt)
INSERT INTO `administradores` (`username`, `password`, `nombre`, `email`) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'admin@vistamontana.com')
ON DUPLICATE KEY UPDATE username=username;

-- 3. Agregar columnas a la tabla reservas para comprobantes
ALTER TABLE `reservas` 
ADD COLUMN IF NOT EXISTS `comprobante_url` varchar(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `pago_verificado` tinyint(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS `fecha_verificacion` timestamp NULL DEFAULT NULL;

-- 4. Verificar que todo se creó correctamente
SELECT 'Tabla administradores creada' as status;
SELECT * FROM administradores;
SELECT 'Columnas agregadas a reservas' as status;
DESCRIBE reservas;
