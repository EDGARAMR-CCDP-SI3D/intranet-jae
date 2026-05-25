const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Middleware simulado de autenticación y obtención de usuario
const authMiddleware = (req, res, next) => {
    // Aquí iría la validación JWT
    req.user = { id: 'uuid-del-usuario', role: 'OPERACIONES' };
    next();
};

// Configuración de Multer para la estructura jerárquica: /servicios/año/mes/folio/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const folio = req.body.folio || 'SDNI-DEFAULT'; // Debería validarse

        // Ruta base en el servidor (Windows Server)
        const destPath = path.join('C:', 'JAE_Storage', 'servicios', year, month, folio);
        
        // Crear directorios si no existen
        fs.mkdirSync(destPath, { recursive: true });
        
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        // Renombrar el archivo al tipo de documento, ej: cotizacion.pdf
        const docType = req.body.documentType || 'documento';
        const ext = path.extname(file.originalname);
        cb(null, `${docType.toLowerCase()}${ext}`);
    }
});

const upload = multer({ storage });

// 1. Crear un nuevo servicio (Genera Folio)
router.post('/services', authMiddleware, async (req, res) => {
    try {
        const { clientName, deceasedName } = req.body;
        // Aquí iría la lógica del ORM (Ej. Prisma) para insertar en BD
        // El Folio se autogeneraría en la lógica de negocio.
        // await prisma.$executeRaw`SET LOCAL jae.current_user_id = ${req.user.id}`;
        // const newService = await prisma.services.create({...});
        
        res.status(201).json({ message: 'Servicio creado', folio: 'SDNI-0002' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Actualizar estado del servicio (Checklist)
router.patch('/services/:folio/status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const { folio } = req.params;
        
        // Verificar regla de negocio: ¿Está bloqueado?
        // const service = await prisma.services.findUnique({ where: { folio }});
        // if (service.isLocked && req.user.role !== 'SUPERADMIN') return res.status(403).json({ error: 'Servicio finalizado. Solo administradores pueden modificar.' });
        
        // Actualizar estado y si el status es 'CONCLUIDO', setear isLocked = true
        // await prisma.services.update({...});

        res.json({ message: 'Estado actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Subir un documento PDF al servicio
router.post('/services/:folio/documents', authMiddleware, upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se envió ningún archivo' });
        }
        
        const { documentType } = req.body;
        const filePath = req.file.path;
        
        // Insertar registro en service_documents usando el filePath
        // await prisma.service_documents.create({...});

        res.status(201).json({ message: 'Documento subido con éxito', path: filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
