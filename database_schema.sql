-- Esquema de Base de Datos PostgreSQL para Grupo JAE

-- 1. EXTENSIONES Y FUNCIONES BASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Función genérica para logs de auditoría
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, record_id, action, new_value, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW), current_setting('jae.current_user_id', true)::uuid);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_value, new_value, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), current_setting('jae.current_user_id', true)::uuid);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_value, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), current_setting('jae.current_user_id', true)::uuid);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


-- 2. TABLAS PRINCIPALES

-- Tabla de Usuarios (Empleados)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- SUPERADMIN, ADMIN, VENTAS, OPERACIONES, CAJA
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Auditoría
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    old_value JSONB,
    new_value JSONB,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Servicios (Módulo Operaciones)
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    folio VARCHAR(50) UNIQUE NOT NULL, -- Ej. SDNI-0001
    client_name VARCHAR(255) NOT NULL,
    deceased_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'COTIZACION', -- COTIZACION, PREPARACION, VELACION, EVENTOS_RELIGIOSOS, DESTINO_FINAL, CONCLUIDO
    is_locked BOOLEAN DEFAULT FALSE, -- Regla de negocio: si está concluido, se bloquea.
    created_by UUID REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Documentos Asociados a Servicios
CREATE TABLE service_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL, -- COTIZACION, CERTIFICADO_MEDICO, TITULARIDAD, ETC
    file_path TEXT NOT NULL, -- Ej. /servicios/2026/05/SDNI-000X/cotizacion.pdf
    uploaded_by UUID REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Prospectos (Módulo CRM)
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    stage VARCHAR(50) DEFAULT 'FRIO', -- FRIO, CALIENTE, CIERRE
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL, -- Asesor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Gestor Documental Interno
CREATE TABLE internal_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- FORMATOS_DESCUENTO, POLITICAS, etc.
    file_path TEXT NOT NULL,
    required_role VARCHAR(50), -- Solo este rol (y superiores) puede ver
    is_favorite BOOLEAN DEFAULT FALSE,
    uploaded_by UUID REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 3. TRIGGERS DE AUDITORÍA
CREATE TRIGGER audit_services_trigger
AFTER INSERT OR UPDATE OR DELETE ON services
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_leads_trigger
AFTER INSERT OR UPDATE OR DELETE ON leads
FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_users_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION log_audit_event();
