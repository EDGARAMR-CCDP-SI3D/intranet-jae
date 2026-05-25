const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');
let data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

data.branches = [
  { id: 'b_sol', name: "Sucursal Sol", address: "Av. del Sol, Centro Comercial Plaza del Sol 1 Loc. 3D", ext: "230", img: "/assets/recursos/Imagen13.jpg", description: "Esta sucursal cuenta con tres espacios operativos. La Sala 21 es la de mayor capacidad con un aforo de 55 personas, ofreciendo servicios de categoría Premier y Platino tanto para necesidades inmediatas (NI) como para previsión. La Sala 22 permite hasta 45 personas y atiende servicios inmediatos de nivel Oro, Bronce, Clásico y Básico, mientras que en previsión cubre los niveles Clásico y Oro. Por último, la Sala 23 tiene una capacidad para 35 personas y se destina exclusivamente a los servicios gestionados mediante Póliza, tanto en necesidad inmediata como en previsión." },
  { id: 'b_parque', name: "Sucursal Parque", address: "Carretera Libre a Celaya Km 12.5, Col. Los Ángeles, Corregidora", ext: "350", img: "/assets/recursos/IMG_6717.jpg", description: "En esta ubicación hay dos salas activas y dos fuera de servicio. La Sala 31 puede recibir hasta 50 personas y se enfoca en servicios Premier, Platino y Oro para ambas modalidades (inmediata y previsión). La Sala 32 tiene un aforo de 35 personas, manejando servicios inmediatos Bronce y Clásico, y previsión únicamente Clásica. Las Salas 33 y 34 se encuentran actualmente marcadas como 'Sin Operar' y no tienen aforo asignado." },
  { id: 'b_centro', name: "Sucursal Centro", address: "Av Constituyentes 12 Oriente, Col. Centro, Querétaro", ext: "470", img: "/assets/recursos/IMG_6685.jpg", description: "Esta sucursal opera con cinco salas distintas. La Sala 41 tiene capacidad para 30 personas y brinda atención de nivel Premier, Platino y Oro en ambas modalidades. Las Salas 42 y 44 son idénticas en características: ambas tienen un aforo de 20 personas, atienden necesidades inmediatas Bronce, Clásico y Básico, y servicios de previsión nivel Clásico. La Sala 43 es la más pequeña con un aforo de 15 personas, dedicada exclusivamente a trámites por Póliza. Finalmente, la Sala 45 es la más amplia, con capacidad para 50 personas, ofreciendo servicios Premier, Platino y Oro en modalidad inmediata y de previsión." },
  { id: 'b_juri', name: "Sucursal Juriquilla", address: "Av. de las Ciencias No. 2999, Col. Juriquilla, Querétaro", ext: "590", img: "/assets/recursos/IMG_6631.jpg", description: "Aquí se dispone de cuatro salas, con características físicas particulares. La Sala 51 tiene capacidad para 50 personas y atiende servicios Premier y Platino en ambas modalidades; cabe destacar que este espacio es el resultado de la fusión de las salas 53 y 54. La Sala 52, ubicada en la planta alta, tiene un aforo de 40 personas y también está dedicada a servicios Premier y Platino. Las Salas 53 y 54 funcionan como 'salas dinámicas'; la 53 permite 20 personas (servicios inmediatos Oro/Bronce y previsión Oro), y la 54 permite 15 personas (exclusiva para nivel Clásico en ambas modalidades)." },
  { id: 'b_sjr', name: "Sucursal San Juan del Río", address: "Av. Gral. Felipe Ángeles 50A, San Juan del Río", ext: "600", img: "/assets/recursos/IMG_6645.jpg", description: "Esta es la sucursal con configuraciones más complejas debido a la fusión de espacios. La Sala 61 tiene el mayor aforo de toda la lista, con capacidad para 80 personas, y ofrece servicios Premier, Platino y Oro; este espacio se logra fusionando las salas 65 y 64 junto con el lobby. La Sala 62 admite a 30 personas y se usa para la 'Mejora de Póliza' (sin aplicar en previsión), lográndose al fusionar la sala 65 con el lobby. La Sala 63 tiene capacidad para 30 personas y ofrece servicios inmediatos Bronce/Oro y previsión Clásica; funciona fusionando las salas 64 y 65, pero tiene una nota importante de mantenimiento: su motor no sirve. Finalmente, las Salas 64 y 65 son 'salas dinámicas'; la 64 tiene aforo de 20 personas (servicios inmediatos Básico/Clásico, sin previsión) y la 65 permite 15 personas (exclusiva para Póliza)." },
  { id: 'b_med', name: "Sucursal Medievo", address: "Dirección Medievo", ext: "Extensión", img: "/assets/recursos/IMG_6808.jpg", description: "Sucursal Medievo con instalaciones de primer nivel y atención personalizada." }
];

data.rooms = [
  // Sol
  { id: 'r_s1', branchId: 'b_sol', name: 'Sala 21', type: 'PREMIER/PLATINO', capacity: 55, observations: 'Inmediata/Previsión', img: '/assets/recursos/IMG_6631.jpg' },
  { id: 'r_s2', branchId: 'b_sol', name: 'Sala 22', type: 'ORO/BRONCE / CLASICO/BASICO', capacity: 45, observations: 'Previsión Clásico y Oro', img: '/assets/recursos/IMG_6645.jpg' },
  { id: 'r_s3', branchId: 'b_sol', name: 'Sala 23', type: 'PÓLIZA', capacity: 35, observations: 'Exclusiva para Póliza', img: '/assets/recursos/IMG_6682.jpg' },
  // Parque
  { id: 'r_p1', branchId: 'b_parque', name: 'Sala 31', type: 'PREMIER/PLATINO/ORO', capacity: 50, observations: 'Inmediata/Previsión', img: '/assets/recursos/Imagen13.jpg' },
  { id: 'r_p2', branchId: 'b_parque', name: 'Sala 32', type: 'BRONCE/CLASICO', capacity: 35, observations: 'Previsión únicamente Clásica', img: '/assets/recursos/IMG_6717.jpg' },
  { id: 'r_p3', branchId: 'b_parque', name: 'Sala 33', type: 'SIN OPERAR', capacity: 0, observations: 'Sin Operar', img: '/assets/recursos/IMG_6815.jpg' },
  { id: 'r_p4', branchId: 'b_parque', name: 'Sala 34', type: 'SIN OPERAR', capacity: 0, observations: 'Sin Operar', img: '/assets/recursos/IMG_6820.jpg' },
  // Centro
  { id: 'r_c1', branchId: 'b_centro', name: 'Sala 41', type: 'PREMIER/PLATINO/ORO', capacity: 30, observations: 'Inmediata/Previsión', img: '/assets/recursos/IMG_6655.jpg' },
  { id: 'r_c2', branchId: 'b_centro', name: 'Sala 42', type: 'BRONCE/CLASICO/BASICO', capacity: 20, observations: 'Previsión nivel Clásico', img: '/assets/recursos/IMG_6685.jpg' },
  { id: 'r_c3', branchId: 'b_centro', name: 'Sala 43', type: 'PÓLIZA', capacity: 15, observations: 'Exclusiva Póliza', img: '/assets/recursos/IMG_6693.jpg' },
  { id: 'r_c4', branchId: 'b_centro', name: 'Sala 44', type: 'BRONCE/CLASICO/BASICO', capacity: 20, observations: 'Previsión nivel Clásico', img: '/assets/recursos/IMG_6685.jpg' },
  { id: 'r_c5', branchId: 'b_centro', name: 'Sala 45', type: 'PREMIER/PLATINO/ORO', capacity: 50, observations: 'Inmediata/Previsión', img: '/assets/recursos/IMG_6631.jpg' },
  // Juriquilla
  { id: 'r_j1', branchId: 'b_juri', name: 'Sala 51', type: 'PREMIER/PLATINO', capacity: 50, observations: 'Fusión 53+54', img: '/assets/recursos/IMG_6717.jpg' },
  { id: 'r_j2', branchId: 'b_juri', name: 'Sala 52', type: 'PREMIER/PLATINO', capacity: 40, observations: 'Planta Alta', img: '/assets/recursos/Imagen13.jpg' },
  { id: 'r_j3', branchId: 'b_juri', name: 'Sala 53', type: 'ORO/BRONCE', capacity: 20, observations: 'Dinámica - Previsión Oro', img: '/assets/recursos/IMG_6645.jpg' },
  { id: 'r_j4', branchId: 'b_juri', name: 'Sala 54', type: 'CLASICO', capacity: 15, observations: 'Dinámica - Exclusiva Clásico', img: '/assets/recursos/IMG_6682.jpg' },
  // San Juan del Río
  { id: 'r_sjr1', branchId: 'b_sjr', name: 'Sala 61', type: 'PREMIER/PLATINO/ORO', capacity: 80, observations: 'Fusión 65+64+Lobby', img: '/assets/recursos/IMG_6820.jpg' },
  { id: 'r_sjr2', branchId: 'b_sjr', name: 'Sala 62', type: 'MEJORA DE PÓLIZA', capacity: 30, observations: 'Fusión 65+Lobby (Sin Previsión)', img: '/assets/recursos/IMG_6815.jpg' },
  { id: 'r_sjr3', branchId: 'b_sjr', name: 'Sala 63', type: 'BRONCE/ORO', capacity: 30, observations: 'Fusión 64+65 - NO SIRVE MOTOR', img: '/assets/recursos/IMG_6655.jpg' },
  { id: 'r_sjr4', branchId: 'b_sjr', name: 'Sala 64', type: 'BASICO/CLASICO', capacity: 20, observations: 'Dinámica - Sin Previsión', img: '/assets/recursos/IMG_6693.jpg' },
  { id: 'r_sjr5', branchId: 'b_sjr', name: 'Sala 65', type: 'PÓLIZA', capacity: 15, observations: 'Dinámica - Exclusiva Póliza', img: '/assets/recursos/IMG_6631.jpg' }
];

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
console.log("Database updated successfully.");
