const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jae-super-secret-key-2026';

/**
 * Middleware para validar el token JWT y extraer el usuario.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Formato esperado: "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado: No se proporcionó un token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({ error: 'Acceso denegado: Token inválido o expirado.' });
    }
    // Añadimos el payload del token (que contiene el ID y Rol del usuario) al request
    req.user = userPayload;
    next();
  });
};

/**
 * Middleware de Control de Acceso Basado en Roles (RBAC).
 * Verifica si el usuario logueado tiene alguno de los roles permitidos.
 * 
 * @param {Array<string>} allowedRoles - Ejemplo: ['SUPERADMIN', 'ADMIN']
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Si el usuario no está seteado o su rol no está en la lista de permitidos
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Acceso prohibido: Tu rol no tiene permisos para realizar esta acción.',
        requiredRoles: allowedRoles
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
