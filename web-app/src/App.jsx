import React, { useState, useEffect } from 'react';
import { 
  Search, CheckSquare, Plus, Folder, UserCheck, Shield, Lock, Unlock, 
  Upload, FileText, ChevronRight, ChevronLeft, BarChart2, Bell, Trash2, 
  Calendar, Clipboard, CheckCircle, AlertTriangle, Filter, 
  Sparkles, Settings, ArrowRight, UserPlus, Star, LayoutGrid, 
  ListTodo, Info, HelpCircle, Edit3, ArrowUpRight, Eye, RefreshCw, LogIn, LogOut, LockOpen, ArrowUpDown, Trash, EyeOff, MapPin, Phone, User, ChevronDown, FolderPlus, ArrowUp, ArrowDown,
  ShoppingBag, Users, Save, X, Flame, MessageSquare, Mail, TrendingUp, Download, Menu
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN DE NEGOCIO & PERMISOS
// ==========================================
const ROLES = {
  CLIENTE: 'CLIENTE',
  EMPLEADO: 'EMPLEADO',
  ADMIN: 'ADMIN' // soporte@grupojae.mx
};

const STAGES = [
  { id: 'COTIZACION', label: '1. Cotización y Trámites', desc: 'Apertura de folio y trámites legales básicos' },
  { id: 'PREPARACION', label: '2. Tratamiento Estético / Prep.', desc: 'Tanatopraxia y preparación del cuerpo' },
  { id: 'VELACION', label: '3. Velación / Homenaje', desc: 'Instalación de sala y atención a familiares' },
  { id: 'EVENTOS_RELIGIOSOS', label: '4. Misa / Evento Religioso', desc: 'Celebraciones litúrgicas acordadas' },
  { id: 'DESTINO_FINAL', label: '5. Destino Final', desc: 'Cremación o Sepultura en panteón' }
];

const EMPTY_EXTRA_FIELDS = [
  { title: '', value: '', showToClient: false },
  { title: '', value: '', showToClient: false },
  { title: '', value: '', showToClient: false },
  { title: '', value: '', showToClient: false },
  { title: '', value: '', showToClient: false }
];

const INITIAL_SERVICES = [
  {
    id: 's1',
    folio: 'SDNI0001',
    clientName: 'Roberto Sánchez',
    deceasedName: 'Rosa Sánchez',
    orderService: 'Servicio Memorial Aeternum Premium',
    phones: ['811-234-5678', '811-987-6543'],
    initialNotes: 'Familia solicita cremación directa posterior a velación de 4 horas.',
    status: 'COTIZACION',
    isLocked: false,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    subtasks: [
      { id: 'st1', text: 'Obtención de Certificado Médico', completed: true },
      { id: 'st2', text: 'Verificación de Plan / Pago', completed: true },
      { id: 'st3', text: 'Preparación y embalsamado', completed: false }
    ],
    notes: [
      { id: 'n1', author: 'Soporte JAE', text: 'Se recibió el acta médica inicial de la funeraria asociada.', timestamp: new Date(Date.now() - 3600000 * 40).toISOString() }
    ],
    documents: [
      { name: 'Cotización.pdf', type: 'Cotización', path: '/servicios/2026/05/SDNI0001/cotizacion.pdf' }
    ],
    contractedPackage: 'Aeternum Memorial Premium',
    totalCost: 45000,
    paymentStatus: 'PAGADO',
    paymentMethod: 'Transferencia Bancaria',
    wakeLocation: 'Capilla Ecuménica de Homenaje Mayor (Sala Cruz)',
    extras: 'Cafetería gourmet ilimitada, violinista en misa, flores premium',
    wakeRoom: 'Sala Cruz Mayor',
    cremationTime: '2026-05-22T16:00',
    extraFields: [...EMPTY_EXTRA_FIELDS]
  },
  {
    id: 's2',
    folio: 'SDNI0002',
    clientName: 'María Elena Garza',
    deceasedName: 'Héctor Garza Ortiz',
    orderService: 'Servicio de Inhumación Tradicional',
    phones: ['818-111-2222'],
    initialNotes: 'Familia desea ataúd metálico de color caoba.',
    status: 'PREPARACION',
    isLocked: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    subtasks: [
      { id: 'st1', text: 'Obtención de Certificado Médico', completed: true },
      { id: 'st2', text: 'Verificación de Plan / Pago', completed: true },
      { id: 'st3', text: 'Preparación y embalsamado', completed: true }
    ],
    notes: [
      { id: 'n1', author: 'Empleado Corporativo', text: 'Cuerpo preparado adecuadamente por tanatopractor de guardia.', timestamp: new Date(Date.now() - 3600000 * 18).toISOString() }
    ],
    documents: [
      { name: 'Certificado_Medico.pdf', type: 'Certificado Médico', path: '/servicios/2026/05/SDNI0002/certificado_medico.pdf' }
    ],
    contractedPackage: 'Inhumación Tradicional Oro',
    totalCost: 65000,
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'Crédito Interno a 3 meses',
    wakeLocation: 'Capilla San Gabriel, Sucursal Gómez Morín',
    extras: 'Servicio de catering extendido, ataúd extra premium',
    wakeRoom: 'Sala San Gabriel 2',
    cremationTime: '',
    extraFields: [...EMPTY_EXTRA_FIELDS]
  },
  {
    id: 's3',
    folio: 'SDNI0003',
    clientName: 'Eduardo Mier',
    deceasedName: 'Sofía Mier Cantú',
    orderService: 'Servicio Cremación Directa',
    phones: ['811-555-6666', '811-777-8888'],
    initialNotes: 'Familia solicita urna de mármol blanco.',
    status: 'CONCLUIDO',
    isLocked: true,
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    subtasks: [
      { id: 'st1', text: 'Obtención de Certificado Médico', completed: true },
      { id: 'st2', text: 'Verificación de Plan / Pago', completed: true },
      { id: 'st3', text: 'Preparación y embalsamado', completed: true }
    ],
    notes: [
      { id: 'n1', author: 'Soporte JAE', text: 'Servicio concluido satisfactoriamente y cenizas entregadas.', timestamp: new Date(Date.now() - 3600000 * 48).toISOString() }
    ],
    documents: [
      { name: 'Cotización.pdf', type: 'Cotización', path: '/servicios/2026/05/SDNI0003/cotizacion.pdf' },
      { name: 'Certificado_Medico.pdf', type: 'Certificado Médico', path: '/servicios/2026/05/SDNI0003/certificado_medico.pdf' }
    ],
    contractedPackage: 'Cremación Express',
    totalCost: 28000,
    paymentStatus: 'PAGADO',
    paymentMethod: 'Tarjeta de Crédito',
    wakeLocation: 'No requiere velación (cremación directa)',
    extras: 'Urna tallada a mano en mármol',
    wakeRoom: 'No aplica',
    cremationTime: '2026-05-18T10:00',
    extraFields: [...EMPTY_EXTRA_FIELDS]
  }
];

const INITIAL_LEADS = [
  {
    id: 'l1',
    name: 'Familia Ortiz Valdés',
    phone: '811-000-1111',
    email: 'ortiz.valdez@gmail.com',
    stage: 'FRIO',
    assignedTo: 'e1',
    createdBy: 'e1',
    contactMethod: 'Llamada Telefónica',
    firstNote: 'Primer contacto telefónico. Interesados en plan de previsión familiar.',
    nextActivityDate: '2026-05-25',
    serviceOffered: 'Plan Aeternum Familiar',
    quoteAmount: 38000,
    customFields: {},
    notes: [
      { id: 'ln1', author: 'Empleado Corporativo', text: 'Primer contacto telefónico. Interesados en plan de previsión familiar.', timestamp: new Date(Date.now() - 3600000 * 20).toISOString() }
    ],
    documents: [],
    isDiscarded: false,
    isHot: false,
    nextContactDate: '2026-05-25',
    nextContactTask: 'Llamar para dar seguimiento a dudas de mensualidades'
  },
  {
    id: 'l2',
    name: 'Familia González Garza',
    phone: '812-444-5555',
    email: 'gonzalez.garza@outlook.com',
    stage: 'CALIENTE',
    assignedTo: 'admin',
    createdBy: 'admin',
    contactMethod: 'WhatsApp',
    firstNote: 'Se envió cotización formal por correo. Respondieron con dudas sobre facilidades de pago.',
    nextActivityDate: '2026-05-20',
    serviceOffered: 'Cremación Express Premium',
    quoteAmount: 32000,
    customFields: {},
    notes: [
      { id: 'ln2', author: 'Soporte Grupo JAE', text: 'Se envió cotización formal por correo. Respondieron con dudas sobre facilidades de pago.', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() }
    ],
    documents: [
      { id: 'ld1', name: 'Cotizacion_Preliminar_Gonzalez.pdf', path: '/crm/cotizacion_preliminar.pdf' }
    ],
    isDiscarded: false,
    isHot: true,
    nextContactDate: '2026-05-20',
    nextContactTask: 'Enviar tabla de amortización para mensualidades congeladas'
  }
];

const INITIAL_CONTACT_METHODS = [
  'Llamada Telefónica', 'WhatsApp', 'Correo Electrónico',
  'Visita Presencial', 'Redes Sociales', 'Referido'
];

const INITIAL_INTERNAL_DOCS = [];
const INITIAL_DOCUMENT_CATEGORIES = [
  { id: 'cat_manuales', name: 'Manuales', parentId: null, order: 0 },
  { id: 'cat_formatos', name: 'Formatos de Descuento', parentId: null, order: 1 },
  { id: 'cat_politicas', name: 'Políticas', parentId: null, order: 2 },
  { id: 'cat_reglamentos', name: 'Reglamentos', parentId: null, order: 3 }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'a1',
    title: 'Nueva Sala "Cielo" Inaugurada',
    content: 'Nos complace anunciar la apertura de nuestra nueva sala de velación premium "Cielo", equipada con tecnología de punta y la mayor comodidad para las familias.',
    tag: 'Instalaciones',
    img: '/assets/recursos/IMG_6820.jpg',
    startDate: '2026-05-01',
    endDate: '2026-06-30'
  },
  {
    id: 'a2',
    title: 'Taller de Tanatología Infantil Especial',
    content: 'Este sábado 23 de mayo contaremos con el taller especial "Pintando recuerdos con amor" impartido por la Dra. Mariana Garza. Cupo limitado.',
    tag: 'Eventos',
    img: '/assets/recursos/Imagen13.jpg',
    startDate: '2026-05-10',
    endDate: '2026-05-25'
  },
  {
    id: 'a3',
    title: 'Campaña de Previsión Familiar 2026',
    content: 'Ofrece a tus clientes un 15% de descuento adicional en planes de previsión Aeternum contratados durante esta quincena. Revisa los nuevos formatos.',
    tag: 'Ventas',
    img: '/assets/recursos/IMG_6717.jpg',
    startDate: '2026-05-15',
    endDate: '2026-05-30'
  }
];

// ==========================================
// DECORACIONES DE FONDO DINÁMICO (SLIDESHOW)
// ==========================================
const SLIDE_IMAGES = [
  '/assets/recursos/IMG_6631.jpg',
  '/assets/recursos/IMG_6645.jpg',
  '/assets/recursos/IMG_6655.jpg',
  '/assets/recursos/IMG_6682.jpg',
  '/assets/recursos/IMG_6685.jpg',
  '/assets/recursos/IMG_6693.jpg',
  '/assets/recursos/IMG_6717.jpg',
  '/assets/recursos/IMG_6720.jpg',
  '/assets/recursos/IMG_6808.jpg',
  '/assets/recursos/IMG_6820.jpg'
];

const INITIAL_BRANCHES = [
  { id: 'b_sol', name: "Sucursal Sol", address: "Av. del Sol, Centro Comercial Plaza del Sol 1 Loc. 3D", ext: "230", img: "/assets/recursos/Imagen13.jpg", description: "Esta sucursal cuenta con tres espacios operativos. La Sala 21 es la de mayor capacidad con un aforo de 55 personas, ofreciendo servicios de categoría Premier y Platino tanto para necesidades inmediatas (NI) como para previsión. La Sala 22 permite hasta 45 personas y atiende servicios inmediatos de nivel Oro, Bronce, Clásico y Básico, mientras que en previsión cubre los niveles Clásico y Oro. Por último, la Sala 23 tiene una capacidad para 35 personas y se destina exclusivamente a los servicios gestionados mediante Póliza, tanto en necesidad inmediata como en previsión." },
  { id: 'b_parque', name: "Sucursal Parque", address: "Carretera Libre a Celaya Km 12.5, Col. Los Ángeles, Corregidora", ext: "350", img: "/assets/recursos/IMG_6717.jpg", description: "En esta ubicación hay dos salas activas y dos fuera de servicio. La Sala 31 puede recibir hasta 50 personas y se enfoca en servicios Premier, Platino y Oro para ambas modalidades (inmediata y previsión). La Sala 32 tiene un aforo de 35 personas, manejando servicios inmediatos Bronce y Clásico, y previsión únicamente Clásica. Las Salas 33 y 34 se encuentran actualmente marcadas como 'Sin Operar' y no tienen aforo asignado." },
  { id: 'b_centro', name: "Sucursal Centro", address: "Av Constituyentes 12 Oriente, Col. Centro, Querétaro", ext: "470", img: "/assets/recursos/IMG_6685.jpg", description: "Esta sucursal opera con cinco salas distintas. La Sala 41 tiene capacidad para 30 personas y brinda atención de nivel Premier, Platino y Oro en ambas modalidades. Las Salas 42 y 44 son idénticas en características: ambas tienen un aforo de 20 personas, atienden necesidades inmediatas Bronce, Clásico y Básico, y servicios de previsión nivel Clásico. La Sala 43 es la más pequeña con un aforo de 15 personas, dedicada exclusivamente a trámites por Póliza. Finalmente, la Sala 45 es la más amplia, con capacidad para 50 personas, ofreciendo servicios Premier, Platino y Oro en modalidad inmediata y de previsión." },
  { id: 'b_juri', name: "Sucursal Juriquilla", address: "Av. de las Ciencias No. 2999, Col. Juriquilla, Querétaro", ext: "590", img: "/assets/recursos/IMG_6631.jpg", description: "Aquí se dispone de cuatro salas, con características físicas particulares. La Sala 51 tiene capacidad para 50 personas y atiende servicios Premier y Platino en ambas modalidades; cabe destacar que este espacio es el resultado de la fusión de las salas 53 y 54. La Sala 52, ubicada en la planta alta, tiene un aforo de 40 personas y también está dedicada a servicios Premier y Platino. Las Salas 53 y 54 funcionan como 'salas dinámicas'; la 53 permite 20 personas (servicios inmediatos Oro/Bronce y previsión Oro), y la 54 permite 15 personas (exclusiva para nivel Clásico en ambas modalidades)." },
  { id: 'b_sjr', name: "Sucursal San Juan del Río", address: "Av. Gral. Felipe Ángeles 50A, San Juan del Río", ext: "600", img: "/assets/recursos/IMG_6645.jpg", description: "Esta es la sucursal con configuraciones más complejas debido a la fusión de espacios. La Sala 61 tiene el mayor aforo de toda la lista, con capacidad para 80 personas, y ofrece servicios Premier, Platino y Oro; este espacio se logra fusionando las salas 65 y 64 junto con el lobby. La Sala 62 admite a 30 personas y se usa para la 'Mejora de Póliza' (sin aplicar en previsión), lográndose al fusionar la sala 65 con el lobby. La Sala 63 tiene capacidad para 30 personas y ofrece servicios inmediatos Bronce/Oro y previsión Clásica; funciona fusionando las salas 64 y 65, pero tiene una nota importante de mantenimiento: su motor no sirve. Finalmente, las Salas 64 y 65 son 'salas dinámicas'; la 64 tiene aforo de 20 personas (servicios inmediatos Básico/Clásico, sin previsión) y la 65 permite 15 personas (exclusiva para Póliza)." },
  { id: 'b_med', name: "Sucursal Medievo", address: "Dirección Medievo", ext: "Extensión", img: "/assets/recursos/IMG_6808.jpg", description: "Sucursal Medievo con instalaciones de primer nivel y atención personalizada." }
];

const INITIAL_ROOMS = [
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

const INITIAL_PRODUCTS = [
  {
    id: 'p_covid',
    name: "Cremación COVID",
    desc: "Servicio de cremación preventiva con protocolo COVID-19 completo. Incluye traslado inmediato, preparación básica, urna metálica estándar y gestoría de trámites.",
    price: 13500,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6631.jpg",
    gallery: ["/assets/recursos/IMG_6682.jpg", "/assets/recursos/IMG_6685.jpg"],
    hasPromo: false
  },
  {
    id: 'p_directa',
    name: "Paquetes a Futuro – Cremación Directa",
    desc: "Plan de cremación directa a futuro sin velación. Incluye traslados locales en carroza, preparación higiénica del cuerpo, cremación y urna de madera clásica estándar.",
    price: 15000,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6645.jpg",
    gallery: ["/assets/recursos/IMG_6682.jpg", "/assets/recursos/Imagen13.jpg"],
    hasPromo: false
  },
  {
    id: 'p_basico',
    name: "Paquetes a Futuro – Plan Básico",
    desc: "Plan básico a previsión familiar. Incluye traslado, preparación, velación en sala estándar JAE (hasta 4 horas), cremación y urna metálica o de cerámica estándar.",
    price: 16500,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6682.jpg",
    gallery: ["/assets/recursos/IMG_6685.jpg", "/assets/recursos/Imagen13.jpg"],
    hasPromo: false
  },
  {
    id: 'p_bronce',
    name: "Paquetes a Futuro – Plan Bronce",
    desc: "Servicio de previsión premium. Incluye ataúd de madera de fina manufactura con apariencia mate o brillo. Medidas estándar: 195 x 60 x 46 cm. Urna Vertical París o similar, velación de hasta 24 horas y cremación.",
    price: 26250,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6820.jpg",
    gallery: ["/assets/recursos/IMG_6685.jpg", "/assets/recursos/IMG_6693.jpg", "/assets/recursos/IMG_6808.jpg", "/assets/recursos/IMG_6815.jpg", "/assets/recursos/IMG_6631.jpg"],
    hasPromo: true,
    promoDiscount: 15,
    promoStartDate: "2026-05-01",
    promoEndDate: "2026-06-30",
    promoLabel: "Buen Fin Previsión"
  },
  {
    id: 'p_clasico',
    name: "Paquetes a Futuro – Plan Clásico",
    desc: "Plan clásico integral de previsión. Cuenta con ataúd metálico premium con acabados satinados, velación de 24 horas, cafetería básica, cremación y urna clásica.",
    price: 22500,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6717.jpg",
    gallery: ["/assets/recursos/IMG_6645.jpg", "/assets/recursos/IMG_6685.jpg"],
    hasPromo: false
  },
  {
    id: 'p_oro',
    name: "Paquetes a Futuro – Plan Oro",
    desc: "Plan de alta gama. Incluye ataúd de madera fina barnizada de cedro u oyamel, velación en Capilla de Honor tipo Oro, servicio de cafetería ilimitada, flores de honor y cremación con urna de mármol pulido.",
    price: 30000,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6815.jpg",
    gallery: ["/assets/recursos/IMG_6820.jpg", "/assets/recursos/IMG_6682.jpg", "/assets/recursos/IMG_6631.jpg"],
    hasPromo: false
  },
  {
    id: 'p_platino',
    name: "Paquetes a Futuro – Plan Platino",
    desc: "Plan de lujo total. Incluye velación en nuestra exclusiva Capilla Platino, arreglos florales extraordinarios diseñados a medida, ataúd de madera de caoba fina maciza y urna artesanal grabada.",
    price: 60000,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6655.jpg",
    gallery: ["/assets/recursos/IMG_6693.jpg", "/assets/recursos/IMG_6685.jpg"],
    hasPromo: false
  },
  {
    id: 'p_premier',
    name: "Paquetes a Futuro – Plan Premier",
    desc: "Nuestra máxima distinción familiar. Capilla monumental privada con sala de descanso y cafetería gourmet exclusiva, violines/música litúrgica solemne en vivo, ataúd imperial de maderas preciosas, urna de mármol italiano y cobertura total de previsión sin límites.",
    price: 75000,
    category: "Paquetes",
    img: "/assets/recursos/IMG_6693.jpg",
    gallery: ["/assets/recursos/IMG_6820.jpg", "/assets/recursos/IMG_6815.jpg", "/assets/recursos/IMG_6682.jpg"],
    hasPromo: false
  },
  {
    id: 'p_poliza_fam',
    name: "Póliza Familiar de Previsión Aeternum",
    desc: "Cobertura anual familiar completa para hasta 5 miembros. Incluye traslado en carroza de emergencia, preparación higiénica de emergencia y tarifas fijas preferenciales congeladas en capillas y servicios de inhumación o cremación.",
    price: 1800,
    category: "Pólizas",
    img: "/assets/recursos/IMG_6717.jpg",
    gallery: ["/assets/recursos/IMG_6720.jpg"],
    hasPromo: false
  },
  {
    id: 'p_fosa',
    name: "Fosa a Perpetuidad en Parque Funerario",
    desc: "Propiedad a perpetuidad en fosa doble en nuestro Parque Funerario Jardín de los Ángeles. Cuenta con mantenimiento permanente de áreas verdes, título de propiedad oficial y servicios de inhumación y excavación preferenciales.",
    price: 24000,
    category: "Espacios",
    img: "/assets/recursos/IMG_6720.jpg",
    gallery: ["/assets/recursos/IMG_6717.jpg", "/assets/recursos/IMG_6808.jpg"],
    hasPromo: false
  },
  {
    id: 'p_nicho',
    name: "Nicho Ecológico Cuádruple",
    desc: "Nicho monumental a perpetuidad con capacidad para hasta 4 urnas. Fachada de granito pulido, opción de placa de bronce grabada y mantenimiento de áreas comunes incluido.",
    price: 14500,
    category: "Espacios",
    img: "/assets/recursos/IMG_6808.jpg",
    gallery: ["/assets/recursos/IMG_6717.jpg", "/assets/recursos/IMG_6720.jpg"],
    hasPromo: true,
    promoDiscount: 10,
    promoStartDate: "2026-05-15",
    promoEndDate: "2026-06-15",
    promoLabel: "Especial Primavera"
  },
  {
    id: 'p_ataud_cedro',
    name: "Ataúd de Cedro Imperial (Mejora)",
    desc: "Elegante ataúd fabricado enteramente en madera de cedro rojo seleccionada con barniz brillante premium, herrajes de bronce pulido y tapicería capitonada de seda natural.",
    price: 28500,
    category: "Mejoras",
    img: "/assets/recursos/IMG_6631.jpg",
    gallery: ["/assets/recursos/IMG_6655.jpg"],
    hasPromo: false
  },
  {
    id: 'p_urna_carrara',
    name: "Urna de Mármol Blanco Carrara (Mejora)",
    desc: "Urna cineraria de diseño esférico elegante tallada a mano en una sola pieza de auténtico mármol italiano Carrara. Detalles metálicos dorados pulidos.",
    price: 6500,
    category: "Mejoras",
    img: "/assets/recursos/IMG_6682.jpg",
    gallery: ["/assets/recursos/IMG_6815.jpg"],
    hasPromo: false
  }
];

const INITIAL_DIRECTORY = [
  { id: 'dir_1', extension: '401', name: 'R.I CENTRO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_2', extension: '722', name: 'VENTAS SOL 2', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_3', extension: '3001', name: 'CelAeternum', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_4', extension: '101', name: 'R.I MEDIEVO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_5', extension: '743', name: 'VENTAS CENTRO 3', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_6', extension: '108', name: 'GERENTE 2', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_7', extension: '721', name: 'VENTAS SOL 1', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_8', extension: '201', name: 'R.I SOL', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_9', extension: '301', name: 'R.I PARQUE', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_10', extension: '104', name: 'INGRESOS', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_11', extension: '106', name: 'NOMINA', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_12', extension: '402', name: 'ANFITRIONES CENTRO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_13', extension: '302', name: 'CREMATORIO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_14', extension: '105', name: 'GERENTE 1', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_15', extension: '902', name: 'GERENTE VENTAS', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_16', extension: '501', name: 'R.I JURIQUILLA', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_17', extension: '600', name: 'ENCARGADO DE SUCURSAL SJR', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_18', extension: '700', name: 'REDES SOCIALES', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_19', extension: '723', name: 'VENTAS SOL 3', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_20', extension: '762', name: 'VENTAS SJR 2', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_21', extension: '720', name: 'GUARDIA VENTAS SOL', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_22', extension: '740', name: 'GUARDIA VENTAS CENTRO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_23', extension: '741', name: 'VENTAS CENTRO 1', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_24', extension: '751', name: 'VENTAS JURIQUILLA 1', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_25', extension: '752', name: 'VENTAS JURIQUILLA 2', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_26', extension: '753', name: 'VENTAS JURIQUILLA 3', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_27', extension: '761', name: 'VENTAS SJR 1', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_28', extension: '901', name: 'GERENTE GENERAL', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_29', extension: '742', name: 'VENTAS CENTRO 2', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_30', extension: '730', name: 'GUARDIA VENTAS PARQUE', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_31', extension: '300', name: 'ENCARGADO DE SUCURSAL PARQUE', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_32', extension: '110', name: 'RECLUTADOR DE TALENTO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_33', extension: '200', name: 'ENCARGADO DE SUCURSAL SOL', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_34', extension: '102', name: 'CAPITAL HUMANO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_35', extension: '103', name: 'EGRESOS', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_36', extension: '107', name: 'AUXILIAR DE INGRESOS', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_37', extension: '109', name: 'COMPRAS', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_38', extension: '900', name: 'DIRECTOR GENERAL', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_39', extension: '400', name: 'ENCARGADO DE SUCURSAL CENTRO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_40', extension: '500', name: 'ENCARGADO DE SUCURSAL JURIQUILLA', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_41', extension: '601', name: 'R.I SJR', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_42', extension: '3000', name: 'CelCentro', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_43', extension: '760', name: 'GUARDIA VENTAS SJR', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_44', extension: '750', name: 'GUARDIA VENTAS JURIQUILLA', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_45', extension: '999', name: 'Soporte-ARDO', photo: '', showToClients: false, showToEmployees: true },
  { id: 'dir_46', extension: '100', name: 'SISTEMAS', photo: '', showToClients: false, showToEmployees: true },
];

export const INITIAL_DIRECTORY_GROUPS = [
  { id: 'g_medievo', name: 'Sucursal Medievo', order: 1 },
  { id: 'g_sol', name: 'Plaza del Sol', order: 2 },
  { id: 'g_parque', name: 'Parque Funerario', order: 3 },
  { id: 'g_centro', name: 'Sucursal Centro', order: 4 },
  { id: 'g_juriquilla', name: 'Juriquilla', order: 5 },
  { id: 'g_sjr', name: 'San Juan del Río', order: 6 },
  { id: 'g_ventas', name: 'Ventas y Guardias', order: 7 },
  { id: 'g_directivos', name: 'Cargos Directivos', order: 8 },
  { id: 'g_otros', name: 'Otros / Soporte', order: 9 }
];

export const getGroupIdFromExtension = (ext) => {
  const numStr = String(ext || '').trim();
  if (numStr.startsWith('1')) return 'g_medievo';
  if (numStr.startsWith('2')) return 'g_sol';
  if (numStr.startsWith('3')) return 'g_parque';
  if (numStr.startsWith('4')) return 'g_centro';
  if (numStr.startsWith('5')) return 'g_juriquilla';
  if (numStr.startsWith('6')) return 'g_sjr';
  if (numStr.startsWith('7')) return 'g_ventas';
  if (numStr.startsWith('9')) {
    if (numStr === '999') return 'g_otros';
    return 'g_directivos';
  }
  return 'g_otros';
};

export const getDirectoryGroup = (dir, groups = INITIAL_DIRECTORY_GROUPS) => {
  if (dir.groupId && groups.some(g => g.id === dir.groupId)) {
    return groups.find(g => g.id === dir.groupId);
  }
  // Fallback to legacy prefix logic
  const legacyGroupId = getGroupIdFromExtension(dir.extension);
  const foundGroup = groups.find(g => g.id === legacyGroupId);
  if (foundGroup) return foundGroup;
  
  const otrosGroup = groups.find(g => g.id === 'g_otros' || g.name.toLowerCase().includes('otros'));
  return otrosGroup || { id: 'g_otros', name: 'Otros / Soporte', order: 999 };
};

// Mantener compatibilidad con llamadas existentes si las hubiera
export const DIRECTORY_CATEGORIES = [
  'Todos',
  'Sucursal Medievo',
  'Plaza del Sol',
  'Parque Funerario',
  'Sucursal Centro',
  'Juriquilla',
  'San Juan del Río',
  'Ventas y Guardias',
  'Cargos Directivos',
  'Otros / Soporte'
];

export const getExtensionCategory = (ext) => {
  const numStr = String(ext || '').trim();
  if (numStr.startsWith('1')) return 'Sucursal Medievo';
  if (numStr.startsWith('2')) return 'Plaza del Sol';
  if (numStr.startsWith('3')) return 'Parque Funerario';
  if (numStr.startsWith('4')) return 'Sucursal Centro';
  if (numStr.startsWith('5')) return 'Juriquilla';
  if (numStr.startsWith('6')) return 'San Juan del Río';
  if (numStr.startsWith('7')) return 'Ventas y Guardias';
  if (numStr.startsWith('9')) {
    if (numStr === '999') return 'Otros / Soporte';
    return 'Cargos Directivos';
  }
  return 'Otros / Soporte';
};

const getActivePromo = (prod) => {
  if (!prod || !prod.hasPromo || !prod.promoDiscount || !prod.promoStartDate || !prod.promoEndDate) {
    return null;
  }
  try {
    const todayStr = new Date().toLocaleDateString('sv-SE'); // Formato YYYY-MM-DD local robusto
    if (todayStr >= prod.promoStartDate && todayStr <= prod.promoEndDate) {
      const discount = Number(prod.promoDiscount) || 0;
      const discountedPrice = Math.round(prod.price * (1 - discount / 100));
      return {
        discount,
        label: prod.promoLabel || 'Oferta Especial',
        startDate: prod.promoStartDate,
        endDate: prod.promoEndDate,
        discountedPrice
      };
    }
  } catch (e) {
    console.error('Error al evaluar promoción:', e);
  }
  return null;
};

// ==========================================
// COMPONENTE: CARRUSEL DE INICIO
// ==========================================
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image: '/assets/recursos/IMG_6631.jpg',
      title: 'Promoción Especial',
      subtitle: 'Paquetes de Previsión con beneficios exclusivos'
    },
    {
      id: 2,
      image: '/assets/recursos/Imagen13.jpg',
      title: 'Eventos Destacados',
      subtitle: 'Acompáñenos en nuestras conferencias sobre Tanatología'
    },
    {
      id: 3,
      image: '/assets/recursos/IMG_6820.jpg',
      title: 'Nuestras Instalaciones',
      subtitle: 'Espacios dignos y confortables en Querétaro'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${
              idx === currentSlide ? 'scale-105' : 'scale-100'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081225]/90 via-[#081225]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center text-white">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light mb-4 drop-shadow-lg max-w-4xl leading-tight">
              {slide.title}
            </h2>
            <p className="text-sm md:text-lg text-white/90 max-w-2xl font-light">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  // Forzar limpieza de base de datos de prueba local en el navegador del cliente para cumplir con su instrucción al 100%
  useEffect(() => {
    if (!localStorage.getItem('jae_clean_slate_v5')) {
      localStorage.removeItem('jae_services');
      localStorage.removeItem('jae_leads');
      localStorage.removeItem('jae_internal_docs');
      localStorage.removeItem('jae_announcements');
      localStorage.removeItem('jae_audit_logs');
      localStorage.removeItem('jae_tasks');
      localStorage.setItem('jae_clean_slate_v5', 'true');
      window.location.reload();
    }
  }, []);

  // ==========================================
  // ESTADOS DE SESIÓN Y VISTAS
  // ==========================================
  const [currentUser, setCurrentUser] = useState({ role: ROLES.CLIENTE }); 
  const [currentModule, setCurrentModule] = useState('CLIENT_VIEW'); // Por defecto, la Landing de Cliente
  const [clientSection, setClientSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ==========================================
  // ESTADOS DE FONDO DINÁMICO Y TARJETAS INICIO
  // ==========================================
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (currentModule === 'CLIENT_VIEW') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
      }, 5500);
      return () => clearInterval(timer);
    }
  }, [currentModule]);

  const [landingCards, setLandingCards] = useState([
    { id: 'c1', title: 'Duelo y Aceptación Grupal', desc: 'Sesión tanatológica grupal y presencial para brindar paz y apoyo emocional a las familias.', img: '/assets/recursos/Imagen13.jpg' },
    { id: 'c2', title: 'Plática: Recordar con Amor', desc: 'Conferencias virtuales dedicadas a honrar la memoria de nuestros seres queridos en un entorno seguro.', img: '/assets/recursos/IMG_6717.jpg' },
    { id: 'c3', title: 'Ceremonia de Homenaje de la Luz', desc: 'Celebración litúrgica solemne y encendido de velas por la paz eterna de las almas que amamos.', img: '/assets/recursos/IMG_6682.jpg' }
  ]);
  
  // Sesiones Globales
  const [systemConfig, setSystemConfig] = useState({ sessionTimeoutMinutes: 15 });
  const [activeSessions, setActiveSessions] = useState([]);

  // Login states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Gestión de Roles Dinámicos
  const [roles, setRoles] = useState([
    { id: 'rol_admin', name: 'Administrador Supremo', permissions: { INTRANET: true, OPERATIONS: true, CRM: true, DOCS: true, ADMIN: true } },
    { id: 'rol_asesor', name: 'Asesor de Ventas', permissions: { INTRANET: true, OPERATIONS: false, CRM: true, DOCS: false, ADMIN: false } }
  ]);

  // Datos del Sistema
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [internalDocs, setInternalDocs] = useState(INITIAL_INTERNAL_DOCS);
  const [documentCategories, setDocumentCategories] = useState(INITIAL_DOCUMENT_CATEGORIES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Entregar Acta de Sofia Morales a Caja', completed: false, date: 'Hoy' },
    { id: 't2', title: 'Llamar al cliente de la cotización SDNI-0001', completed: true, date: 'Hoy' },
    { id: 't3', title: 'Revisar pendientes del CRM con Gerente', completed: false, date: 'Mañana' }
  ]);
  const [auditLogs, setAuditLogs] = useState([
    { id: 'log1', tableName: 'users', recordId: 'admin', action: 'INSERT', oldValue: null, newValue: { name: 'Soporte JAE', role: 'ADMIN' }, userId: 'admin', createdAt: new Date().toISOString() }
  ]);

  // Configuración del CRM dinámico
  const [crmColumns, setCrmColumns] = useState(['FRIO', 'CALIENTE', 'CIERRE']);
  const [customFormFields, setCustomFormFields] = useState(['Formulario Evento X']);
  const [contactMethods, setContactMethods] = useState(INITIAL_CONTACT_METHODS);
  const [activeUsers, setActiveUsers] = useState([
    { id: 'admin', name: 'Soporte Grupo JAE', email: 'soporte@grupojae.mx', password: '12345#JAE', roleId: 'rol_admin', role: ROLES.ADMIN, avatar: '', isActive: true },
    { id: 'e1', name: 'Empleado Corporativo', email: 'empleado@grupojae.mx', password: '54321#JAE', roleId: 'rol_asesor', role: ROLES.EMPLEADO, avatar: '', isActive: true }
  ]);

  // Dynamic CRM forms
  const [crmForms, setCrmForms] = useState([
    {
      id: 'f1',
      title: 'Estudio de Previsión Funeraria',
      published: true,
      fields: [
        { id: 'f_age', label: 'Edad del titular', type: 'number', required: true },
        { id: 'f_budget', label: 'Presupuesto Estimado', type: 'number', required: false },
        { id: 'f_package', label: 'Paquete de Interés', type: 'select', options: ['Cremación Express', 'Homenaje Tradicional', 'Premium JAE'], required: true },
        { id: 'f_notes', label: 'Observaciones de Prospección', type: 'text', required: false }
      ]
    }
  ]);

  // Dynamic CRM submissions
  const [crmFormSubmissions, setCrmFormSubmissions] = useState([]);

  // Tanatology & corporate events
  const [events, setEvents] = useState([
    { id: 'e_1', title: 'Taller: Sanando el Duelo en Familia', date: '2026-05-24', time: '18:00', location: 'Capilla Principal JAE', description: 'Un espacio de apoyo guiado por expertos en tanatología.', registeredLeads: ['l2'] },
    { id: 'e_2', title: 'Conferencia: Recordar con Luz', date: '2026-06-05', time: '19:30', location: 'Transmisión Online JAE', description: 'Liturgia solemne y reflexión de resiliencia.', registeredLeads: [] }
  ]);

  // Directorio Telefónico
  const [directory, setDirectory] = useState(INITIAL_DIRECTORY);
  const [directoryGroups, setDirectoryGroups] = useState(INITIAL_DIRECTORY_GROUPS);
  const [selectedPublicCat, setSelectedPublicCat] = useState('Todos');
  const [customTables, setCustomTables] = useState({});

  // Sucursales, Salas y Catálogo de Tienda (Habilitado dinámicamente)
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedStoreCat, setSelectedStoreCat] = useState('Todos');
  const [selectedProductForInfo, setSelectedProductForInfo] = useState(null);
  const [showStoreRequestModal, setShowStoreRequestModal] = useState(false);
  const [activeDetailImg, setActiveDetailImg] = useState('');
  const [expandedBranchId, setExpandedBranchId] = useState(null);

  // Estados de Base de Datos y Sincronización Remota
  const [dbLoading, setDbLoading] = useState(true);
  const [dbSaving, setDbSaving] = useState(false);
  const [dbError, setDbError] = useState(false);
  const [dbLoaded, setDbLoaded] = useState(false);
  const [showSavedBadge, setShowSavedBadge] = useState(false);

  // Global Dialog States
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [celebration, setCelebration] = useState({ show: false, leadName: '' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: '', onConfirm: null });
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Dialog Helper Functions
  const triggerNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };
  
  const triggerConfirm = (message, onConfirmCallback) => {
    setConfirmDialog({
      show: true,
      message,
      onConfirm: () => {
        onConfirmCallback();
        setConfirmDialog({ show: false, message: '', onConfirm: null });
      }
    });
  };

  const triggerDemoNotification = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowDemoModal(true);
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Scroll smoothly to branch rooms section when a branch is selected
  useEffect(() => {
    if (expandedBranchId) {
      setTimeout(() => {
        const element = document.getElementById('salas-sucursal');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [expandedBranchId]);

  // Syncs
  // Carga inicial desde la API del Servidor de la PC
  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Servidor offline');
        return res.json();
      })
      .then(data => {
        if (data.empty) {
          // La base de datos en la PC está vacía, guardamos los valores iniciales predeterminados de inmediato
          const initialData = {
            services: INITIAL_SERVICES,
            leads: INITIAL_LEADS,
            internalDocs: INITIAL_INTERNAL_DOCS,
            announcements: INITIAL_ANNOUNCEMENTS,
            tasks: [
              { id: 't1', title: 'Entregar Acta de Sofia Morales a Caja', completed: false, date: 'Hoy' },
              { id: 't2', title: 'Llamar al cliente de la cotización SDNI0001', completed: true, date: 'Hoy' },
              { id: 't3', title: 'Revisar pendientes del CRM con Gerente', completed: false, date: 'Mañana' }
            ],
            auditLogs: [
              { id: 'log1', tableName: 'users', recordId: 'admin', action: 'INSERT', oldValue: null, newValue: { name: 'Soporte JAE', role: 'ADMIN' }, userId: 'admin', createdAt: new Date().toISOString() }
            ],
            crmColumns: ['FRIO', 'CALIENTE', 'CIERRE'],
            customFormFields: ['Formulario Evento X'],
            activeUsers: [
              { id: 'admin', name: 'Soporte Grupo JAE', email: 'soporte@grupojae.mx', password: '12345#JAE', roleId: 'rol_admin', role: ROLES.ADMIN, avatar: '', isActive: true },
              { id: 'e1', name: 'Empleado Corporativo', email: 'empleado@grupojae.mx', password: '54321#JAE', roleId: 'rol_asesor', role: ROLES.EMPLEADO, avatar: '', isActive: true }
            ],
            crmForms: [
              {
                id: 'f1',
                title: 'Estudio de Previsión Funeraria',
                published: true,
                fields: [
                  { id: 'f_age', label: 'Edad del titular', type: 'number', required: true },
                  { id: 'f_budget', label: 'Presupuesto Estimado', type: 'number', required: false },
                  { id: 'f_package', label: 'Paquete de Interés', type: 'select', options: ['Cremación Express', 'Homenaje Tradicional', 'Premium JAE'], required: true },
                  { id: 'f_notes', label: 'Observaciones de Prospección', type: 'text', required: false }
                ]
              }
            ],
            crmFormSubmissions: [],
            events: [
              { id: 'e_1', title: 'Taller: Sanando el Duelo en Familia', date: '2026-05-24', time: '18:00', location: 'Capilla Principal JAE', description: 'Un espacio de apoyo guiado por expertos en tanatología.', registeredLeads: ['l2'] },
              { id: 'e_2', title: 'Conferencia: Recordar con Luz', date: '2026-06-05', time: '19:30', location: 'Transmisión Online JAE', description: 'Liturgia solemne y reflexión de resiliencia.', registeredLeads: [] }
            ],
            landingCards: [
              { id: 'c1', title: 'Duelo y Aceptación Grupal', desc: 'Sesión tanatológica grupal y presencial para brindar paz y apoyo emocional a las familias.', img: '/assets/recursos/Imagen13.jpg' },
              { id: 'c2', title: 'Plática: Recordar con Amor', desc: 'Conferencias virtuales dedicadas a honrar la memoria de nuestros seres queridos en un entorno seguro.', img: '/assets/recursos/IMG_6717.jpg' },
              { id: 'c3', title: 'Ceremonia de Homenaje de la Luz', desc: 'Celebración litúrgica solemne y encendido de velas por la paz eterna de las almas que amamos.', img: '/assets/recursos/IMG_6682.jpg' }
            ],
            roles: [
              { id: 'rol_admin', name: 'Administrador Supremo', permissions: { INTRANET: true, OPERATIONS: true, CRM: true, DOCS: true, ADMIN: true } },
              { id: 'rol_asesor', name: 'Asesor de Ventas', permissions: { INTRANET: true, OPERATIONS: false, CRM: true, DOCS: false, ADMIN: false } }
            ],
            directory: INITIAL_DIRECTORY,
            branches: INITIAL_BRANCHES,
            rooms: INITIAL_ROOMS,
            products: INITIAL_PRODUCTS
          };

          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialData)
          }).catch(e => console.error('Error al inicializar base de datos:', e));

          setDbLoaded(true);
        } else {
          // Cargar datos remotos en los estados locales y migrar folios viejos
          if (data.services) {
            const migratedServices = data.services.map(s => {
              if (s.folio && s.folio.includes('-')) {
                const newFol = s.folio.replace('-', '');
                const newDocs = s.documents ? s.documents.map(d => ({
                  ...d,
                  path: d.path ? d.path.replace(s.folio, newFol) : d.path
                })) : [];
                return { ...s, folio: newFol, documents: newDocs };
              }
              return s;
            });
            setServices(migratedServices);
          }
          if (data.leads) setLeads(data.leads);
          if (data.internalDocs) setInternalDocs(data.internalDocs);
          if (data.documentCategories) {
            if (data.documentCategories.length > 0 && typeof data.documentCategories[0] === 'string') {
              const migrated = data.documentCategories.map((name, idx) => ({
                id: 'cat_' + idx + '_' + Date.now(),
                name,
                parentId: null,
                order: idx
              }));
              setDocumentCategories(migrated);
            } else {
              setDocumentCategories(data.documentCategories);
            }
          } else {
            setDocumentCategories(INITIAL_DOCUMENT_CATEGORIES);
          }
          if (data.announcements) setAnnouncements(data.announcements);
          if (data.tasks) {
            const migratedTasks = data.tasks.map(t => {
              if (t.title && t.title.includes('SDNI-0001')) {
                return { ...t, title: t.title.replace('SDNI-0001', 'SDNI0001') };
              }
              return t;
            });
            setTasks(migratedTasks);
          }
          if (data.auditLogs) setAuditLogs(data.auditLogs);
          if (data.crmColumns) setCrmColumns(data.crmColumns);
          if (data.customFormFields) setCustomFormFields(data.customFormFields);
          if (data.contactMethods) setContactMethods(data.contactMethods);
          if (data.activeUsers) setActiveUsers(data.activeUsers);
          if (data.systemConfig) setSystemConfig(data.systemConfig);
          if (data.activeSessions) setActiveSessions(data.activeSessions);
          if (data.crmForms) setCrmForms(data.crmForms);
          if (data.crmFormSubmissions) setCrmFormSubmissions(data.crmFormSubmissions);
          if (data.events) setEvents(data.events);
          if (data.landingCards) setLandingCards(data.landingCards);
          if (data.roles) setRoles(data.roles);
          if (data.directory) {
            const migratedDir = data.directory.map(d => ({
              ...d,
              contactPerson: d.contactPerson || ''
            }));
            setDirectory(migratedDir);
          }
          if (data.directoryGroups) {
            setDirectoryGroups(data.directoryGroups);
          } else {
            setDirectoryGroups(INITIAL_DIRECTORY_GROUPS);
          }
          if (data.branches) setBranches(data.branches);
          if (data.rooms) setRooms(data.rooms);
          if (data.products) setProducts(data.products);

          // Cargar cualquier tabla personalizada externa (llaves no estándar)
          const standardKeys = [
            'services', 'leads', 'internalDocs', 'documentCategories', 'announcements', 'tasks', 'auditLogs',
            'crmColumns', 'customFormFields', 'contactMethods', 'activeUsers', 'crmForms',
            'crmFormSubmissions', 'events', 'landingCards', 'roles', 'directory', 'branches', 'rooms', 'products', 'directoryGroups', 'empty'
          ];
          const loadedCustomTables = {};
          Object.keys(data).forEach(key => {
            if (!standardKeys.includes(key)) {
              loadedCustomTables[key] = data[key];
            }
          });
          setCustomTables(loadedCustomTables);

          // Restore session from localStorage
          const storedAuth = localStorage.getItem('jae_auth');
          if (storedAuth) {
            try {
              const authData = JSON.parse(storedAuth);
              const authUser = (data.activeUsers || activeUsers).find(u => u.id === authData.userId && u.isActive);
              if (authUser) {
                const currentSessions = data.activeSessions || activeSessions || [];
                const sessionStillActive = currentSessions.find(s => s.sessionId === authData.sessionId);
                
                // Keep ADMIN always logged in even if session was lost from DB
                if (sessionStillActive || authUser.role === ROLES.ADMIN) {
                  setCurrentUser(authUser);
                  setCurrentModule(authData.currentModule || (authUser.role === ROLES.ADMIN ? 'INTRANET' : 'CLIENT_VIEW'));
                  localStorage.setItem('jae_last_activity', Date.now().toString());
                  
                  if (authUser.role !== ROLES.ADMIN && sessionStillActive) {
                    // Update last activity immediately on load
                    const updatedSessions = currentSessions.map(s => 
                      s.sessionId === authData.sessionId ? { ...s, lastActivity: Date.now() } : s
                    );
                    setActiveSessions(updatedSessions);
                  }
                } else {
                  localStorage.removeItem('jae_auth');
                }
              }
            } catch (e) {
              console.error(e);
            }
          }

          setDbLoaded(true);
        }
        setDbLoading(false);
        setDbError(false);
      })
      .catch(err => {
        console.error('Error al conectar con servidor de base de datos:', err);
        setDbLoading(false);
        setDbError(true);
      });
  }, []);

  // Guardado permanente automático en la base de datos de la PC host (debounced)
  useEffect(() => {
    if (!dbLoaded) return;

    const timer = setTimeout(() => {
      setDbSaving(true);
      const dataToSave = {
        services,
        leads,
        internalDocs,
        documentCategories,
        announcements,
        tasks,
        auditLogs,
        crmColumns,
        customFormFields,
        contactMethods,
        activeUsers,
        crmForms,
        crmFormSubmissions,
        events,
        landingCards,
        roles,
        directory,
        branches,
        rooms,
        products,
        directoryGroups,
        systemConfig,
        activeSessions,
        ...customTables
      };

      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      })
      .then(res => {
        if (!res.ok) throw new Error('Error de guardado');
        return res.json();
      })
      .then(() => {
        setDbSaving(false);
        setShowSavedBadge(true);
        setTimeout(() => setShowSavedBadge(false), 2500);
      })
      .catch(err => {
        console.error('Error al persistir cambios en la PC host:', err);
        setDbSaving(false);
        triggerNotification('Error de conexión: No se pudo guardar permanentemente en el servidor.', 'error');
      });
    }, 1000); // 1 segundo de retardo para agrupar cambios rápidos

    return () => clearTimeout(timer);
  }, [services, leads, internalDocs, documentCategories, announcements, tasks, auditLogs, crmColumns, customFormFields, contactMethods, activeUsers, crmForms, crmFormSubmissions, events, landingCards, roles, directory, branches, rooms, products, directoryGroups, customTables, dbLoaded]);

  // Registro de Auditoría
  const addAuditLog = (tableName, recordId, action, oldValue, newValue) => {
    const newLog = {
      id: 'log_' + Math.random().toString(36).substr(2, 9),
      tableName,
      recordId,
      action,
      oldValue,
      newValue,
      userId: currentUser.role === ROLES.CLIENTE ? 'cliente_anonimo' : currentUser.id || 'sistema',
      createdAt: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Manejo de Login Autorizado
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    const user = activeUsers.find(u => u.email === emailInput && u.password === passwordInput && u.isActive);
    if (user) {
      setCurrentUser(user);
      
      const userRole = roles.find(r => r.id === user.roleId);
      const userPerms = userRole ? userRole.permissions : {};
      
      let nextModule;
      if (user.role === ROLES.ADMIN) {
        nextModule = 'INTRANET';
      } else {
        const firstAllowed = Object.keys(userPerms).find(key => userPerms[key]);
        nextModule = firstAllowed || 'CLIENT_VIEW';
      }
      setCurrentModule(nextModule);
      
      // Create Session
      const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      const newSession = {
        sessionId,
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        loginTime: Date.now(),
        lastActivity: Date.now()
      };
      setActiveSessions(prev => [...prev, newSession]);
      
      // Save Auth Locally
      localStorage.setItem('jae_auth', JSON.stringify({
        sessionId,
        userId: user.id,
        currentModule: nextModule
      }));
      localStorage.setItem('jae_last_activity', Date.now().toString());
      
      setShowLoginModal(false);
      setEmailInput('');
      setPasswordInput('');
      addAuditLog('sessions', user.id, 'LOGIN', null, { email: user.email, role: user.role, sessionId });
    } else {
      setLoginError('Credenciales incorrectas. Verifique correo o contraseña.');
    }
  };

  const handleLogout = () => {
    addAuditLog('sessions', currentUser.id || 'anonimo', 'LOGOUT', { email: currentUser.email, role: currentUser.role }, null);
    
    const storedAuth = localStorage.getItem('jae_auth');
    if (storedAuth) {
      try {
        const { sessionId } = JSON.parse(storedAuth);
        setActiveSessions(prev => prev.filter(s => s.sessionId !== sessionId));
      } catch (e) {}
    }
    
    localStorage.removeItem('jae_auth');
    localStorage.removeItem('jae_last_activity');
    setCurrentUser({ role: ROLES.CLIENTE });
    setCurrentModule('CLIENT_VIEW');
  };

  // Activity Tracker
  useEffect(() => {
    if (currentUser.role === ROLES.CLIENTE) return;

    let timeout;
    const updateActivity = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const storedAuth = localStorage.getItem('jae_auth');
        if (storedAuth) {
          try {
            const { sessionId } = JSON.parse(storedAuth);
            localStorage.setItem('jae_last_activity', Date.now().toString());
            setActiveSessions(prev => prev.map(s => 
              s.sessionId === sessionId ? { ...s, lastActivity: Date.now() } : s
            ));
          } catch (e) {}
        }
      }, 5000);
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, [currentUser.role]);

  // Auto Logout Checker
  useEffect(() => {
    if (currentUser.role === ROLES.CLIENTE || currentUser.role === ROLES.ADMIN) return;

    const interval = setInterval(() => {
      const storedAuth = localStorage.getItem('jae_auth');
      if (!storedAuth) return;
      
      const lastAct = localStorage.getItem('jae_last_activity');
      if (lastAct) {
        const elapsedMinutes = (Date.now() - parseInt(lastAct, 10)) / 60000;
        const limit = systemConfig?.sessionTimeoutMinutes || 15;
        if (elapsedMinutes >= limit) {
          alert("Tu sesión ha expirado por inactividad.");
          handleLogout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentUser.role, systemConfig]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#1E3A8A]/30 selection:text-white relative">
      
      {/* Banner de Aviso de Demostración */}
      <div className="bg-[#081225] border-b border-indigo-900/50 text-indigo-100 px-6 py-2.5 text-xs font-semibold flex items-center justify-center z-[99999] shadow-sm text-center">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 max-w-7xl">
          <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <span>
            <strong>AVISO IMPORTANTE:</strong> Esta aplicación es una demostración en fase de pruebas, desarrollada de forma independiente con recursos propios. La empresa no tiene derechos sobre este código, ya que se encuentra sujeto a negociación y aprobación pendiente.
          </span>
        </div>
      </div>

      {/* Banner de Servidor Offline */}
      {dbError && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 px-6 py-2.5 text-xs font-semibold flex items-center justify-between z-[9999] shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>
              <strong>Base de Datos Offline:</strong> Los cambios que realices ahora son temporales y se perderán. Por favor abre <strong>JAE Intranet</strong> en tu escritorio para iniciar el servidor de base de datos.
            </span>
          </div>
          <button 
            onClick={() => {
              setDbLoading(true);
              fetch('/api/data')
                .then(res => {
                  if (!res.ok) throw new Error();
                  return res.json();
                })
                .then(data => {
                  if (!data.empty) {
                    if (data.services) setServices(data.services);
                    if (data.leads) setLeads(data.leads);
                    if (data.internalDocs) setInternalDocs(data.internalDocs);
                    if (data.announcements) setAnnouncements(data.announcements);
                    if (data.tasks) setTasks(data.tasks);
                    if (data.auditLogs) setAuditLogs(data.auditLogs);
                    if (data.crmColumns) setCrmColumns(data.crmColumns);
                    if (data.customFormFields) setCustomFormFields(data.customFormFields);
                    if (data.activeUsers) setActiveUsers(data.activeUsers);
                    if (data.crmForms) setCrmForms(data.crmForms);
                    if (data.crmFormSubmissions) setCrmFormSubmissions(data.crmFormSubmissions);
                    if (data.events) setEvents(data.events);
                    if (data.landingCards) setLandingCards(data.landingCards);
                    if (data.roles) setRoles(data.roles);
                  }
                  setDbLoaded(true);
                  setDbError(false);
                  setDbLoading(false);
                  triggerNotification('Conectado a la base de datos con éxito.', 'success');
                })
                .catch(() => {
                  setDbLoading(false);
                  setDbError(true);
                  triggerNotification('El servidor de base de datos sigue offline.', 'error');
                });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold transition-all shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            Reintentar Conexión
          </button>
        </div>
      )}
      
      {/* Full screen slideshow background when on Client View */}
      {currentModule === 'CLIENT_VIEW' && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          {SLIDE_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          {/* Subtle natural shading overlay to protect white text legibility, without blue tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
        </div>
      )}
      
      {/* ==========================================
          HEADER PRINCIPAL (ESTILO ELEGANTE EN BLANCO Y ORO)
          ========================================== */}
      <header className={`px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-all ${
        currentModule === 'CLIENT_VIEW'
          ? 'bg-[#0A1728]/40 backdrop-blur-md border-b border-white/10 text-white shadow-sm'
          : 'bg-white border-b border-slate-200/80 text-slate-800 shadow-sm'
      }`}>
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => { 
            if (currentModule === 'CLIENT_VIEW') {
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(true);
              } else {
                setClientSection('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } 
          }}
        >
          <img 
            src={currentModule === 'CLIENT_VIEW' ? "/assets/logo_jae_blanco.png" : "/assets/logo_jae_azul.png"} 
            alt="Grupo JAE" 
            className="h-12 md:h-15 w-auto object-contain transition-all duration-300"
          />
        </div>

        {/* Barra de Navegación Condicional por Vista y Roles */}
        {currentModule === 'CLIENT_VIEW' ? (
          <>
            <nav className="hidden md:flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[10.5px] font-bold tracking-widest uppercase text-white/80">
              {['inicio', 'nosotros', 'servicios', 'instalaciones', 'eventos', 'tienda', 'contacto'].map(sec => (
                <button 
                  key={sec}
                  onClick={() => {
                    setClientSection(sec);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-all uppercase ${clientSection === sec ? 'text-white border-b border-white pb-0.5' : 'hover:text-white/60'}`}
                >
                  {sec}
                </button>
              ))}
            </nav>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors ml-auto mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
          </>
        ) : currentUser.role !== ROLES.CLIENTE && (
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 p-1 rounded-full">
            {[
              { id: 'INTRANET', label: 'Intranet & Avisos', icon: LayoutGrid },
              { id: 'OPERATIONS', label: 'Operaciones', icon: Clipboard },
              { id: 'CRM', label: 'CRM Ventas', icon: BarChart2 },
              { id: 'DOCS', label: 'Documentos', icon: Folder },
              { id: 'ADMIN', label: 'Administración', icon: Shield, adminOnly: true }
            ].map(mod => {
              // 1. Validar restricción para Admin
              if (mod.adminOnly && currentUser.role !== ROLES.ADMIN) return null;
              
              // 2. Validar restricción dinámica habilitada para el empleado basada en su Rol
              const userRole = roles.find(r => r.id === currentUser.roleId);
              const userPerms = userRole ? userRole.permissions : {};
              if (currentUser.role === ROLES.EMPLEADO && !userPerms[mod.id]) return null;

              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => setCurrentModule(mod.id)}
                  className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full transition-all font-semibold ${
                    currentModule === mod.id
                      ? 'bg-white text-[#081225] shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {mod.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Acceso e Identidad (Login en Esquina Superior Derecha) */}
        <div className="flex items-center gap-4">
          
          {/* Indicador de Sincronización de Base de Datos */}
          {currentUser.role !== ROLES.CLIENTE && dbLoaded && !dbError && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold transition-all">
              {dbSaving ? (
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 border border-amber-200/50 px-2 py-1 rounded-full animate-pulse">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                  </span>
                  <span>Guardando...</span>
                </div>
              ) : showSavedBadge ? (
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-1 rounded-full transition-all animate-bounce">
                  <span>✓ Guardado</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-slate-400 bg-slate-50 border border-slate-200/40 px-2 py-1 rounded-full opacity-60 hover:opacity-100 transition-opacity">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span>BD Conectada</span>
                </div>
              )}
            </div>
          )}
          {currentUser.role === ROLES.CLIENTE ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className={`font-semibold text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all ${
                currentModule === 'CLIENT_VIEW'
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-white/5'
                  : 'bg-[#1E3A8A] hover:bg-[#1E40AF] text-white shadow-[#1E3A8A]/20'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Iniciar Sesión
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-xs text-slate-800">{currentUser.name}</p>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{currentUser.role}</span>
              </div>
              
              {/* Botón Volver a Cliente */}
              {currentModule !== 'CLIENT_VIEW' && (
                <button
                  onClick={() => setCurrentModule('CLIENT_VIEW')}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  title="Ver Vista Pública de Cliente"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleLogout}
                className="bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 p-2 rounded-full transition-all border border-slate-200/40"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Menú Móvil Overlay */}
      {isMobileMenuOpen && currentModule === 'CLIENT_VIEW' && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro translúcido */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Panel Lateral */}
          <div className="relative w-64 max-w-[80%] h-full bg-[#081225] text-white flex flex-col p-6 shadow-2xl animate-fade-in-right overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <img src="/assets/logo_jae_blanco.png" alt="Grupo JAE" className="h-10 w-auto" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4">
              {['inicio', 'nosotros', 'servicios', 'instalaciones', 'eventos', 'tienda', 'contacto'].map(sec => (
                <button 
                  key={sec}
                  onClick={() => {
                    setClientSection(sec);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-sm uppercase tracking-widest font-semibold py-3 border-b border-white/10 transition-all ${
                    clientSection === sec ? 'text-white border-white/40' : 'text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Navegación Móvil Rápida para Colaboradores */}
      {currentUser.role !== ROLES.CLIENTE && (
        <div className="bg-slate-50 md:hidden border-b border-slate-200 px-4 py-2.5 flex gap-2 overflow-x-auto">
          {[
            { id: 'INTRANET', label: 'Intranet', icon: LayoutGrid },
            { id: 'OPERATIONS', label: 'Operaciones', icon: Clipboard },
            { id: 'CRM', label: 'CRM', icon: BarChart2 },
            { id: 'DOCS', label: 'Documentos', icon: Folder },
            { id: 'ADMIN', label: 'Admin', icon: Shield, adminOnly: true }
          ].map(mod => {
            if (mod.adminOnly && currentUser.role !== ROLES.ADMIN) return null;
            const userRole = roles.find(r => r.id === currentUser.roleId);
            const userPerms = userRole ? userRole.permissions : {};
            if (currentUser.role === ROLES.EMPLEADO && !userPerms[mod.id]) return null;
            return (
              <button
                key={mod.id}
                onClick={() => setCurrentModule(mod.id)}
                className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap font-semibold ${
                  currentModule === mod.id
                    ? 'bg-white text-[#081225] border-slate-350 shadow-sm'
                    : 'text-slate-500 border-slate-200/50 bg-white/40'
                }`}
              >
                {mod.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ==========================================
          CONTENEDOR DE CONTENIDO PRINCIPAL
          ========================================== */}
      <main className={`flex-1 w-full mx-auto flex flex-col justify-start relative ${currentModule === 'CLIENT_VIEW' ? 'p-0 max-w-none' : 'p-6 max-w-7xl'}`}>
        
        {/* ==========================================
            MÓDULO A: LANDING PÚBLICA DEL CLIENTE (ESTILO AETERNUM CON FOTOS REALES)
            ========================================== */}
        {currentModule === 'CLIENT_VIEW' && (
          <div className="flex-1 flex flex-col w-full pb-16">
            
            {/* ================= INICIO ================= */}
            {clientSection === 'inicio' && (
              <section id="inicio" className="w-full flex flex-col items-center">
                
                {/* Carrusel Superior (Banda Horizontal 1) */}
                <HeroCarousel />

                {/* Tracking Service (Banda Horizontal 2) */}
                <div className="w-full bg-[#f8fafc] border-b border-slate-200/60 py-16 px-6">
                  <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                      <span className="text-[#081225] font-bold tracking-widest text-[10px] uppercase px-4 py-1.5 rounded-full bg-[#081225]/5 border border-[#081225]/20 font-serif">
                        Grupo JAE • Jardín de los Ángeles • Aeternum
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 leading-tight">
                        Acompañándole en cada paso con <span className="italic text-[#081225] font-semibold">respeto y dignidad</span>
                      </h2>
                      <p className="text-slate-500 text-sm max-w-lg leading-relaxed font-light">
                        Para su tranquilidad, consulte en tiempo real el progreso de los trámites y el homenaje logístico de su ser querido introduciendo su folio de servicio.
                      </p>
                    </div>
                    
                    <div className="w-full lg:w-[450px] bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent"></div>
                      <ClientTrackingWidget services={services} />
                    </div>
                  </div>
                </div>

                {/* ================= BANDA HORIZONTAL 2.5: FUSIÓN DE MARCAS CORPORATIVAS ================= */}
                <div className="w-full bg-[#f8fafc] border-b border-slate-200/60 py-20 px-6">
                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-stretch">
                    
                    {/* Tarjeta del Corporativo Principal: Grupo JAE */}
                    <div className="flex-1 bg-[#081225] text-white p-8 md:p-10 rounded-[36px] shadow-xl flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                      
                      <div className="relative z-10 space-y-6">
                        <img 
                          src="/assets/logo_jae_blanco.png" 
                          alt="Grupo JAE" 
                          className="h-20 w-auto object-contain mb-2"
                        />
                        <span className="inline-block text-[10px] tracking-[0.2em] font-serif uppercase font-bold text-amber-400 border border-amber-400/30 px-3.5 py-1 rounded-full backdrop-blur-sm">
                          Respaldo Corporativo
                        </span>
                        <h3 className="text-3xl font-serif font-light leading-tight text-white/95">
                          La unión de <span className="font-semibold text-white">respeto, calidez y excelencia</span>
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">
                          <strong>Grupo JAE</strong> es el holding corporativo que respalda y consolida la fusión estratégica de nuestras marcas comerciales. Integramos la vasta trayectoria histórica de <strong>Jardín de los Ángeles</strong> junto a la calidez e innovación de <strong>Eternum Servicios Funerarios</strong> bajo una sola misión: brindar paz absoluta a las familias en cada uno de sus homenajes.
                        </p>
                      </div>
                    </div>

                    {/* Lado Derecho: Las Dos Marcas Comerciales Fusionadas */}
                    <div className="flex-1 flex flex-col justify-between gap-6">
                      
                      {/* Marca 1: Jardín de los Ángeles */}
                      <div className="bg-white border border-slate-200/80 p-8 rounded-[30px] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
                        <div className="shrink-0 w-44 flex items-center justify-center">
                          <img 
                            src="/assets/logo_jardin_azul.png" 
                            alt="Jardín de los Ángeles" 
                            className="max-h-16 w-auto object-contain"
                          />
                        </div>
                        <div className="space-y-2 flex-1 text-center md:text-left">
                          <span className="text-[9px] font-bold tracking-widest text-[#1E3A8A] uppercase bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">Marca Especializada</span>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Nuestra firma líder con parques funerarios ecológicos, salas de velación de gran capacidad y los planes de previsión familiar a futuro más seguros de Querétaro.
                          </p>
                        </div>
                      </div>

                      {/* Marca 2: Eternum */}
                      <div className="bg-white border border-slate-200/80 p-8 rounded-[30px] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
                        <div className="shrink-0 w-44 flex items-center justify-center">
                          <img 
                            src="/assets/logo_eternum_azul.png" 
                            alt="Eternum" 
                            className="max-h-11 w-auto object-contain"
                          />
                        </div>
                        <div className="space-y-2 flex-1 text-center md:text-left">
                          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 rounded-full inline-block">Marca Especializada</span>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Nuestra firma de atención personalizada a detalle. Brinda modernas capillas funerarias, traslados nacionales e internacionales y asesoría humana compasiva disponible las 24 horas.
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
                {/* Directorio Rápido y Resumen (Banda Horizontal 3) */}
                <div className="w-full bg-white py-16 px-6">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Conmutador Principal */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E3A8A]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#081225]">Conmutador</h3>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Menú de Opciones</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5 flex-1">
                        <div className="text-center bg-white border border-slate-200 rounded-2xl py-4 shadow-sm">
                          <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Teléfono de la Funeraria</span>
                          <span className="text-2xl font-bold font-mono text-[#1E3A8A] tracking-tight">(442) 242 3230</span>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-xs text-slate-600 font-medium italic border-l-2 border-[#1E3A8A] pl-3">Presione la opción deseada para el conmutador general de la sucursal:</p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">1</span><span className="text-slate-700 font-medium">Necesidad Inmediata</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">2</span><span className="text-slate-700 font-medium">Sucursal Sol</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">3</span><span className="text-slate-700 font-medium">Sucursal Parque</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">4</span><span className="text-slate-700 font-medium">Sucursal Centro</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">5</span><span className="text-slate-700 font-medium">Sucursal Juriquilla</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">6</span><span className="text-slate-700 font-medium">Sucursal SJR</span></div>
                            <div className="flex items-center gap-2.5 col-span-2 mt-1 bg-amber-50 p-2 rounded-xl border border-amber-100"><span className="w-6 h-6 flex items-center justify-center bg-amber-200 text-amber-800 font-bold rounded-lg text-xs shadow-sm">7</span><span className="text-amber-900 font-semibold tracking-wide">Asesor en Previsión</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Extensiones Directas */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#081225]">Recepciones Directas</h3>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Líneas Específicas</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5 flex-1 flex flex-col">
                        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#1E3A8A] rounded-l-2xl"></div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-[#1E3A8A]">Atención Personalizada:</strong> Las opciones del conmutador son generales, pero si conoce su extensión (aquellas terminadas en <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-bold">01</span>), puede marcarla directamente para contactar una recepción específica.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-auto pt-4">
                          {['101', '201', '301', '401', '601', '701'].map(ext => (
                            <div key={ext} className="flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-xl py-4 shadow-sm hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:-translate-y-1 transition-all group/ext">
                              <span className="text-xl font-black font-mono tracking-tighter">{ext}</span>
                              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 group-hover/ext:text-blue-200 mt-1">Recepción</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nuestras Sucursales */}
                    <div className="bg-[#081225] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full relative overflow-hidden">
                      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                      
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2.5 bg-white/10 text-white rounded-xl backdrop-blur-sm">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-white">Nuestra Presencia</h3>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">En Querétaro</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10 space-y-6">
                        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Sol</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Parque</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Centro</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Juriquilla</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">San Juan del Río</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Medievo</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setClientSection('instalaciones');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full bg-white/10 hover:bg-white text-white hover:text-[#081225] border border-white/20 py-3.5 rounded-xl text-sm font-bold transition-all mt-auto relative z-10 backdrop-blur-sm"
                      >
                        Ver Catálogo de Instalaciones
                      </button>
                    </div>

                  </div>
                </div>

              </section>
            )}

            {/* APLICAR CONTENEDORES CENTRADOS A LAS DEMÁS SECCIONES */}

            {/* ================= NOSOTROS ================= */}
            {clientSection === 'nosotros' && (
              <section id="nosotros" className="w-full max-w-6xl mx-auto px-6 space-y-8 pt-4 pb-12">
                <div className="bg-white rounded-3xl py-6 px-8 shadow-sm border border-slate-200/60 text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                    <h3 className="font-serif text-sm font-bold text-[#1E3A8A] uppercase tracking-widest">Nosotros</h3>
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-[#081225]">Nuestra Historia y Filosofía</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Historia y Quienes Somos */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                        <Info className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#081225]">Quiénes Somos</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Somos pioneros en la rama funeraria en Querétaro con <strong>más de 30 años de experiencia</strong> en el mercado. Nos dedicamos a la previsión y necesidad inmediata, ofreciendo paquetes de previsión que se ajustan y pueden ser mejorados según las necesidades de cada familia.
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Contamos con <strong>5 funerarias</strong> estratégicamente ubicadas: Juriquilla, Plaza del Sol, Centro (a un lado de Constituyentes), San Juan del Río, y nuestro Parque Funerario. En nuestro Parque Funerario, que también funciona como una sucursal integral, disponemos de espacios, nichos, osarios, fosas y salas de velación propias.
                    </p>
                  </div>

                  {/* Misión */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                        <Star className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#081225]">Misión</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Proveer soluciones integrales de previsión y servicios funerarios con el más alto sentido de dignidad, solemnidad y respeto, garantizando la paz mental y la certidumbre de nuestros usuarios mediante una infraestructura de vanguardia y un acompañamiento humano de excelencia.
                    </p>
                  </div>

                  {/* Visión */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                        <Eye className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#081225]">Visión</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Consolidarse como el grupo corporativo referente y de mayor confianza en el sector funerario regional, reconocido por su innovación en modelos de previsión y la excelencia arquitectónica de sus complejos y parques funerarios.
                    </p>
                  </div>

                  {/* Valores Nucleares */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#081225]">Valores Nucleares</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Nuestra forma de trabajar está cimentada en principios inquebrantables:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {['Dignidad', 'Trascendencia', 'Profesionalismo', 'Integridad', 'Transparencia', 'Innovación Operativa'].map((val, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                          <CheckCircle className="w-4 h-4 text-[#1E3A8A]" />
                          {val}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Logística Integral */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#081225]">Logística Integral</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Nos enorgullece ofrecer un servicio que abarca todo el proceso. Contamos con <strong>salas de velación, crematorio y carrozas propias</strong>. Nos encargamos de recoger a tu familiar, realizar el homenaje, el traslado a la misa, la cremación y el destino final.
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Lo único que, por decreto del Gobierno de Querétaro, no podemos realizar directamente son los trámites gubernamentales (debe hacerlos un familiar directo). Sin embargo, <strong>brindamos toda la asesoría necesaria</strong> para acompañarte.
                    </p>
                  </div>

                  {/* Convenios y Filosofía */}
                  <div className="flex flex-col gap-6">
                    {/* Convenios Empresariales */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-xl text-[#1E3A8A]">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#081225]">Convenios Empresariales</h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Si trabajas para una empresa, podemos facilitarte el contacto con tus jefes para establecer un convenio. Estos convenios otorgan <strong>descuentos vía nómina, precios preferenciales, aumento de coberturas</strong> en pólizas y promociones especiales (como 2x1 a previsores).
                      </p>
                    </div>

                    {/* Marco Filosófico Corporativo */}
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-800 flex flex-col gap-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                      <h4 className="font-serif text-lg font-bold text-white relative z-10">Marco Filosófico Corporativo</h4>
                      <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                        <strong>Grupo JAE</strong> opera bajo un enfoque endosado híbrido, actuando como la marca matriz de respaldo institucional. Subordinadas a esta estructura coexisten:
                      </p>
                      <ul className="text-sm text-slate-300 space-y-2 relative z-10">
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span> <strong>Aeternum:</strong> Especializada en la captación comercial anticipada (Previsión y Pólizas).</li>
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span> <strong>Jardín de los Ángeles:</strong> Volcada en la ejecución logística, atención monumental e infraestructura resolutiva (Necesidad Inmediata).</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </section>
            )}

            {/* ================= SERVICIOS ================= */}
            {clientSection === 'servicios' && (
              <section id="servicios" className="w-full max-w-5xl mx-auto px-6 space-y-8 pt-8">
                <div className="bg-white rounded-3xl py-6 px-8 shadow-sm border border-slate-200/60 text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                    <h3 className="font-serif text-sm font-bold text-[#1E3A8A] uppercase tracking-widest">Servicios</h3>
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-[#081225]">Nuestros Servicios</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  {[
                    "Servicios y espacios a previsión con planes de financiamiento",
                    "Preparación estética y amortajamiento del cuerpo",
                    "Espacios a perpetuidad",
                    "Contamos con diferentes formas de pago",
                    "Renta y venta de ataúd para velación",
                    "Necesidad inmediata",
                    "Renta de sala para velación",
                    "Servicio de carroza",
                    "Servicio de cremación",
                    "Venta de urnas",
                    "Servicio de cafetería",
                    "Ludoteca",
                    "Aromaterapia y música"
                  ].map((srv, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#081225] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-slate-700 leading-snug">{srv}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ================= INSTALACIONES ================= */}
            {clientSection === 'instalaciones' && (
              <section id="instalaciones" className="w-full max-w-5xl mx-auto px-6 space-y-8 pt-8">
                <div className="bg-white rounded-3xl py-6 px-8 shadow-sm border border-slate-200/60 text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                    <h3 className="font-serif text-sm font-bold text-[#1E3A8A] uppercase tracking-widest">Instalaciones</h3>
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-[#081225]">Nuestras Instalaciones y Sucursales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {branches.map((branch, idx) => {
                    const branchRooms = rooms.filter(r => r.branchId === branch.id);
                    const isExpanded = expandedBranchId === branch.id;

                    return (
                      <div key={branch.id || idx} className="h-full">
                        {/* Tarjeta Principal de la Sucursal */}
                        <div 
                          onClick={() => setExpandedBranchId(isExpanded ? null : branch.id)}
                          className={`bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full relative ${isExpanded ? 'ring-2 ring-[#1E3A8A]' : ''}`}
                        >
                          <div className="relative overflow-hidden h-48 bg-slate-200 transition-all duration-500">
                            {branch.img ? (
                              <img src={branch.img} alt={branch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-sm">Vista General</div>
                            )}
                            
                            <div className="absolute top-4 left-4 bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                              {branch.name}
                            </div>
                          </div>
                          
                          <div className="p-5 flex justify-between items-center bg-white z-10 flex-1">
                            <div>
                              <h4 className="font-bold text-[#081225] text-base">{branch.name}</h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{branch.address}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1">
                              {branch.ext && <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap">Ext. {branch.ext}</span>}
                              <span className="text-[10px] text-[#1E3A8A] font-bold uppercase whitespace-nowrap">{branchRooms.length} Salas</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mostrar las salas de la sucursal seleccionada (fuera del grid de sucursales) */}
                {expandedBranchId && (
                  <div id="salas-sucursal" className="scroll-mt-24 mt-8 pt-8 border-t border-slate-200 animate-fade-in bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
                    {(() => {
                      const branch = branches.find(b => b.id === expandedBranchId);
                      const branchRooms = rooms.filter(r => r.branchId === expandedBranchId);
                      
                      return (
                        <>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                              <h3 className="font-serif font-bold text-2xl text-[#081225]">Salas en {branch?.name}</h3>
                              {branch?.description && (
                                <p className="text-sm text-slate-600 mt-3 max-w-4xl leading-relaxed font-medium">{branch.description}</p>
                              )}
                            </div>
                            <button 
                              onClick={() => setExpandedBranchId(null)}
                              className="self-start md:self-center bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                            >
                              ✕ Ocultar Salas
                            </button>
                          </div>
                          
                          {branchRooms.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Salas */}
                              {branchRooms.map(room => (
                                <div key={room.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full group/room">
                                  <div className="relative overflow-hidden h-40 bg-slate-200">
                                    {room.img ? <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover/room:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-xs">Sin Foto</div>}
                                    {room.capacity > 0 && (
                                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#081225] text-[10px] font-bold px-2.5 py-1 rounded shadow-sm border border-slate-200/50">
                                        Aforo: {room.capacity}
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                                    <div>
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-[#1E3A8A] text-base">{room.name}</h4>
                                        {room.type && <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">{room.type}</span>}
                                      </div>
                                      <p className="text-xs text-slate-500 leading-relaxed font-medium italic">{room.observations || 'Sala de velación estándar'}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                              <p className="text-sm text-slate-500 italic">No hay salas configuradas para esta sucursal.</p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </section>
            )}

            {/* ================= EVENTOS ================= */}
            {clientSection === 'eventos' && (
              <section id="eventos" className="w-full max-w-5xl mx-auto px-6 space-y-8 pt-8">
                <div className="inline-flex items-center gap-3 bg-white/85 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg border border-white/60 mx-auto">
                  <div className="w-6 h-[2px] bg-[#081225]"></div>
                  <h3 className="font-serif text-xs font-bold text-[#081225] uppercase tracking-widest">Homenajes & Eventos</h3>
                  <div className="w-6 h-[2px] bg-[#081225]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {landingCards
                    .filter(card => card.title?.trim() && card.desc?.trim() && card.img?.trim())
                    .map((card) => (
                      <div key={card.id} className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="relative overflow-hidden h-48 bg-slate-50">
                          <img 
                            src={card.img} 
                            alt={card.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 to-transparent"></div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-1 bg-white">
                          <div>
                            <h4 className="font-serif font-bold text-[#081225] text-sm leading-snug group-hover:text-[#0c1b35] transition-colors">{card.title}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-1.5">{card.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* ================= TIENDA ================= */}
            {clientSection === 'tienda' && (
              <section id="tienda" className="w-full max-w-5xl mx-auto px-6 space-y-8 pt-8 pb-16">
                <div className="bg-white rounded-3xl py-6 px-8 shadow-sm border border-slate-200/60 text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                    <h3 className="font-serif text-sm font-bold text-[#1E3A8A] uppercase tracking-widest">Tienda JAE</h3>
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-[#081225]">Catálogo de Productos y Servicios</h2>
                  <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
                    Explore nuestro selecto catálogo de ataúdes artesanales, urnas conmemorativas, planes de previsión a futuro y servicios complementarios diseñados con total distinción.
                  </p>
                </div>

                {/* Filtro de Categorías */}
                <div className="flex gap-2 overflow-x-auto pb-3 justify-center scrollbar-none">
                  {['Todos', 'Pólizas', 'Paquetes', 'Espacios', 'Mejoras'].map(cat => {
                    const count = products.filter(p => cat === 'Todos' || p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedStoreCat(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                          selectedStoreCat === cat
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-lg shadow-[#1E3A8A]/25 scale-[1.03]'
                            : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                        }`}
                      >
                        {cat === 'Mejoras' ? 'Mejoras / Otros' : cat}
                        <span className={`ml-1.5 text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                          selectedStoreCat === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Grid de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter(p => selectedStoreCat === 'Todos' || p.category === selectedStoreCat)
                    .map((prod) => {
                      const promo = getActivePromo(prod);
                      return (
                        <div 
                          key={prod.id} 
                          onClick={() => {
                            setSelectedProductForInfo(prod);
                            setActiveDetailImg(prod.img);
                            setShowStoreRequestModal(true);
                          }}
                          className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between cursor-pointer"
                        >
                          <div className="relative overflow-hidden h-52 bg-slate-50 border-b border-slate-100">
                            {prod.img ? (
                              <img 
                                src={prod.img} 
                                alt={prod.name} 
                                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-xs">
                                Imagen de Producto
                              </div>
                            )}
                            
                            {/* Listón de Categoría */}
                            <span className="absolute top-3 left-3 bg-[#081225]/85 backdrop-blur-sm text-white text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10">
                              {prod.category}
                            </span>

                            {/* Listón de Descuento Activo */}
                            {promo && (
                              <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-550 to-yellow-500 text-white text-[9px] font-bold tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-md animate-pulse">
                                {promo.discount}% OFF • {promo.label}
                              </span>
                            )}
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                            <div className="space-y-1.5">
                              <h4 className="font-serif font-bold text-[#081225] text-sm leading-snug group-hover:text-[#1E3A8A] transition-colors">{prod.name}</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed font-light line-clamp-3">{prod.desc}</p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <div className="flex flex-col">
                                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Inversión</span>
                                {promo ? (
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-450 line-through font-mono leading-tight">${prod.price?.toLocaleString()} MXN</span>
                                    <span className="text-base font-bold font-mono text-[#1E3A8A] leading-tight">${promo.discountedPrice?.toLocaleString()} MXN</span>
                                  </div>
                                ) : (
                                  <span className="text-base font-bold font-mono text-[#1E3A8A]">${prod.price?.toLocaleString()} MXN</span>
                                )}
                              </div>
                              <button
                                type="button"
                                className="bg-[#081225] hover:bg-[#1E3A8A] text-white px-3.5 py-2 rounded-xl text-[10.5px] font-bold transition-all flex items-center gap-1 shadow-sm group-hover:shadow-md"
                              >
                                <HelpCircle className="w-3.5 h-3.5" /> Ver Detalles
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {products.filter(p => selectedStoreCat === 'Todos' || p.category === selectedStoreCat).length === 0 && (
                  <p className="text-xs text-slate-450 italic text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">No hay productos disponibles en esta categoría.</p>
                )}
              </section>
            )}

            {/* ================= CONTACTO ================= */}
            {clientSection === 'contacto' && (
              <section id="contacto" className="w-full max-w-5xl mx-auto px-6 space-y-8 pt-8 pb-16">
                <div className="bg-white rounded-3xl py-6 px-8 shadow-sm border border-slate-200/60 text-center space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                    <h3 className="font-serif text-sm font-bold text-[#1E3A8A] uppercase tracking-widest">Contacto</h3>
                    <div className="w-8 h-[2px] bg-[#1E3A8A]"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-[#081225]">Contacto y Directorio</h2>
                  <p className="text-slate-500 text-sm mt-2">Línea directa: (442) 242-32-30 | Adicional: (442) 212 3377</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 w-full text-left">
                  <div className="flex-1 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm mb-6">Envíanos un mensaje</h4>
                    <form className="space-y-4" onSubmit={triggerDemoNotification}>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre*</label>
                        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E3A8A]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Email*</label>
                        <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E3A8A]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono*</label>
                        <input type="tel" className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E3A8A]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Mensaje*</label>
                        <textarea rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1E3A8A]"></textarea>
                      </div>
                      <button type="submit" className="bg-[#081225] hover:bg-[#1E3A8A] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors w-full sm:w-auto">
                        Enviar Mensaje
                      </button>
                    </form>
                  </div>
                  
                  <div className="flex-1 bg-slate-100 border border-slate-200/80 rounded-3xl overflow-hidden relative min-h-[300px]">
                    <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400 bg-slate-200/30">
                      <MapPin className="w-8 h-8 mb-2 text-slate-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mapa Interactivo de Sucursales</span>
                    </div>
                  </div>
                </div>

                {/* Directorio Público */}
                {directory && directory.filter(d => d.showToClients).length > 0 && (
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
                    <div className="text-center">
                      <h4 className="font-bold text-slate-800 text-base">Directorio de Contacto</h4>
                      <p className="text-xs text-slate-550 mt-1">Selecciona una sucursal o área para filtrar el directorio telefónico</p>
                    </div>
                       {/* Categorías (Scroll Horizontal Premium) */}
                    <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent justify-start md:justify-center">
                      {['Todos', ...([...directoryGroups].sort((a, b) => (a.order || 0) - (b.order || 0)).map(g => g.name))].map(cat => {
                        const count = directory.filter(d => d.showToClients && (cat === 'Todos' || getDirectoryGroup(d, directoryGroups).name === cat)).length;
                        if (count === 0 && cat !== 'Todos') return null; // Omitir categorías vacías para el público
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedPublicCat(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                              selectedPublicCat === cat
                                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-[#1E3A8A]/20 scale-[1.02]'
                                : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            <span>{cat}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                              selectedPublicCat === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-8">
                      {(() => {
                        const activeGroups = [...directoryGroups].sort((a, b) => (a.order || 0) - (b.order || 0));
                        const groupsToRender = selectedPublicCat === 'Todos'
                          ? activeGroups
                          : activeGroups.filter(g => g.name === selectedPublicCat);

                        const sortedClientsDir = [...directory]
                          .filter(d => d.showToClients)
                          .sort((a, b) => {
                            const numA = Number(a.extension);
                            const numB = Number(b.extension);
                            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                            return String(a.extension).localeCompare(String(b.extension));
                          });

                        let renderedAny = false;

                        const content = groupsToRender.map(g => {
                          const groupItems = sortedClientsDir.filter(d => getDirectoryGroup(d, directoryGroups).id === g.id);
                          if (groupItems.length === 0) return null;
                          renderedAny = true;

                          return (
                            <div key={g.id} className="space-y-4 pt-4 first:pt-0">
                              <div className="flex items-center gap-4 pb-2 border-b border-slate-150">
                                <h5 className="font-serif font-bold text-slate-800 text-sm flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] inline-block"></span>
                                  {g.name}
                                </h5>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent"></div>
                                <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-full">
                                  {groupItems.length} {groupItems.length === 1 ? 'extensión' : 'extensiones'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {groupItems.map(dir => (
                                  <div key={dir.id} className="bg-slate-50/50 border border-slate-200/80 rounded-3xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] opacity-75"></div>

                                    <div className="flex flex-col gap-4">
                                      {/* Giant Extension Number in Center */}
                                      <div className="flex flex-col items-center justify-center py-4 px-2 bg-gradient-to-b from-[#1E3A8A]/5 to-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 group-hover:from-[#1E3A8A]/10 group-hover:to-[#1E3A8A]/15 transition-all">
                                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#1E3A8A]/60 mb-0.5">Extensión</span>
                                        <span className="text-3xl font-black font-mono text-[#081225] leading-none tracking-tight">{dir.extension}</span>
                                      </div>

                                      {/* Contact Details */}
                                      <div className="text-center space-y-1.5">
                                        <h6 className="font-bold text-slate-800 text-xs uppercase tracking-wider truncate" title={dir.contactPerson ? dir.contactPerson : dir.name}>
                                          {dir.contactPerson ? dir.contactPerson : dir.name}
                                        </h6>
                                        <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wide truncate">
                                          {dir.contactPerson ? dir.name : 'Área / Puesto'}
                                        </p>
                                      </div>
                                    </div>

                                    {dir.contactPerson && (
                                      <div className="mt-3 text-center border-t border-slate-200/60 pt-2.5">
                                        <span className="inline-block text-[9px] font-bold text-[#1E3A8A] bg-[#1E3A8A]/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                          Contacto Directo
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        });

                        return renderedAny ? content : (
                          <p className="text-xs text-slate-400 italic text-center py-12">No se encontraron extensiones en esta sección.</p>
                        );
                      })()}
                    </div>
                  </div>
                )}

              </section>
            )}
            
          </div>
        )}

        {/* ==========================================
            MÓDULO B: INTRANET & DASHBOARD (EMPLEADOS)
            ========================================== */}
        {currentModule === 'INTRANET' && (
          <IntranetModule 
            announcements={announcements} 
            setAnnouncements={setAnnouncements} 
            currentUser={currentUser} 
            services={services}
            leads={leads}
            tasks={tasks}
            setTasks={setTasks}
            directory={directory}
            directoryGroups={directoryGroups}
          />
        )}

        {/* ==========================================
            MÓDULO C: OPERACIONES (ÓRDENES DE SERVICIO)
            ========================================== */}
        {currentModule === 'OPERATIONS' && (
          <OperationsModule 
            services={services} 
            setServices={setServices} 
            currentUser={currentUser} 
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

        {/* ==========================================
            MÓDULO D: CRM (VENTAS Y PROSPECTOS KANBAN)
            ========================================== */}
        {currentModule === 'CRM' && (
          <CRMModule 
            leads={leads} 
            setLeads={setLeads} 
            currentUser={currentUser} 
            addAuditLog={addAuditLog} 
            crmColumns={crmColumns}
            customFormFields={customFormFields}
            contactMethods={contactMethods}
            activeUsers={activeUsers}
            crmForms={crmForms}
            setCrmForms={setCrmForms}
            crmFormSubmissions={crmFormSubmissions}
            setCrmFormSubmissions={setCrmFormSubmissions}
            events={events}
            setEvents={setEvents}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
            setCelebration={setCelebration}
          />
        )}

        {/* ==========================================
            MÓDULO E: GESTOR DOCUMENTAL INTERNO
            ========================================== */}
        {currentModule === 'DOCS' && (
          <DocsModule 
            internalDocs={internalDocs} 
            setInternalDocs={setInternalDocs}
            documentCategories={documentCategories}
            setDocumentCategories={setDocumentCategories}
            currentUser={currentUser} 
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

        {/* ==========================================
            MÓDULO F: PANEL DE ADMINISTRACIÓN (HABILITACIÓN DE MENÚS Y AUDITORÍA)
            ========================================== */}
        {currentModule === 'ADMIN' && currentUser.role === ROLES.ADMIN && (
          <SuperAdminModule 
            auditLogs={auditLogs} 
            setAuditLogs={setAuditLogs}
            services={services}
            setServices={setServices}
            leads={leads}
            setLeads={setLeads}
            crmColumns={crmColumns}
            setCrmColumns={setCrmColumns}
            customFormFields={customFormFields}
            setCustomFormFields={setCustomFormFields}
            contactMethods={contactMethods}
            setContactMethods={setContactMethods}
            activeUsers={activeUsers}
            setActiveUsers={setActiveUsers}
            addAuditLog={addAuditLog}
            roles={roles}
            setRoles={setRoles}
            landingCards={landingCards}
            setLandingCards={setLandingCards}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            crmForms={crmForms}
            setCrmForms={setCrmForms}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
            directory={directory}
            setDirectory={setDirectory}
            customTables={customTables}
            setCustomTables={setCustomTables}
            internalDocs={internalDocs}
            setInternalDocs={setInternalDocs}
            tasks={tasks}
            setTasks={setTasks}
            crmFormSubmissions={crmFormSubmissions}
            setCrmFormSubmissions={setCrmFormSubmissions}
            events={events}
            setEvents={setEvents}
            branches={branches}
            setBranches={setBranches}
            products={products}
            setProducts={setProducts}
            rooms={rooms}
            setRooms={setRooms}
            directoryGroups={directoryGroups}
            activeSessions={activeSessions}
            setActiveSessions={setActiveSessions}
            systemConfig={systemConfig}
            setSystemConfig={setSystemConfig}
          />
        )}

      </main>

      {/* MODAL SOLICITUD E INFORMACIÓN DETALLADA DE TIENDA (VISTA EXPANDIDA PREMIUM) */}
      {showStoreRequestModal && selectedProductForInfo && (() => {
        const promo = getActivePromo(selectedProductForInfo);
        const finalPrice = promo ? promo.discountedPrice : selectedProductForInfo.price;
        const currentMainImg = activeDetailImg || selectedProductForInfo.img;
        const galleryList = [selectedProductForInfo.img, ...(selectedProductForInfo.gallery || [])].filter(Boolean);

        return (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-6 overflow-y-auto">
            <div className="bg-white border border-slate-200/80 rounded-3xl max-w-4xl w-full shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
              {/* Header del Modal */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                {/* Breadcrumbs en Gris */}
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:flex items-center gap-1.5">
                  <span>Inicio</span>
                  <span>/</span>
                  <span>Tienda</span>
                  <span>/</span>
                  <span className="text-slate-500">{selectedProductForInfo.category}</span>
                  <span>/</span>
                  <span className="text-[#1E3A8A] normal-case">{selectedProductForInfo.name}</span>
                </div>
                <div className="text-xs font-bold text-slate-700 sm:hidden">Detalle de Producto</div>
                
                <button 
                  onClick={() => {
                    setShowStoreRequestModal(false);
                    setSelectedProductForInfo(null);
                    setActiveDetailImg('');
                  }}
                  className="bg-slate-150 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all border border-slate-200/40"
                  title="Cerrar detalles"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido en Scroll */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* COLUMNA IZQUIERDA: GALERÍA MULTIMEDIA (7 cols en md) */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    {/* Contenedor Principal de la Imagen */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-100 shadow-inner group">
                      <img 
                        src={currentMainImg} 
                        alt={selectedProductForInfo.name} 
                        className="w-full h-full object-cover transition-all duration-350 ease-out group-hover:scale-[1.02]"
                      />
                      {promo && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-550 to-yellow-500 text-white text-[9.5px] font-bold tracking-wider px-3.5 py-1 rounded-full border border-white/20 shadow-md">
                          {promo.discount}% OFF • {promo.label}
                        </div>
                      )}
                      <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full">
                        Vista Previa Real
                      </span>
                    </div>

                    {/* Strip de Miniaturas */}
                    {galleryList.length > 1 && (
                      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {galleryList.map((photo, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveDetailImg(photo)}
                            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                              currentMainImg === photo 
                                ? 'border-[#1E3A8A] scale-[1.02] shadow-md shadow-[#1E3A8A]/10' 
                                : 'border-slate-200/60 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={photo} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* COLUMNA DERECHA: FICHA TÉCNICA Y ADQUISICIÓN (5 cols en md) */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Badge y Nombre */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold tracking-widest text-[#1E3A8A] bg-[#1E3A8A]/5 px-2.5 py-1 rounded-full uppercase border border-[#1E3A8A]/10">
                          {selectedProductForInfo.category}
                        </span>
                        <h3 className="font-serif font-bold text-[#081225] text-xl leading-tight sm:text-2xl pt-2">
                          {selectedProductForInfo.name}
                        </h3>
                      </div>

                      {/* Caja de Inversión y Promoción */}
                      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-center">
                        <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">Inversión Requerida</span>
                        {promo ? (
                          <div className="space-y-1 mt-1">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl sm:text-2xl font-bold font-mono text-[#1E3A8A]">
                                ${promo.discountedPrice?.toLocaleString()} MXN
                              </span>
                              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-bold">
                                -{promo.discount}%
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-400 font-mono">
                              Antes: <span className="line-through">${selectedProductForInfo.price?.toLocaleString()} MXN</span>
                            </p>
                            <div className="text-[9.5px] bg-[#1E3A8A]/5 text-[#1E3A8A] p-2 rounded-xl border border-[#1E3A8A]/10 font-medium mt-2 flex items-center gap-1.5">
                              <span>⏰</span>
                              <span><strong>Vigencia:</strong> Promoción válida del {promo.startDate} al {promo.endDate}.</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xl sm:text-2xl font-bold font-mono text-[#1E3A8A] mt-0.5">
                            ${selectedProductForInfo.price?.toLocaleString()} MXN
                          </span>
                        )}
                        <p className="text-[9px] text-slate-450 italic mt-1.5">* El precio de previsión varía o incluye coberturas extras según sucursal y convenios corporativos.</p>
                      </div>

                      {/* Descripción */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">Detalles de Cobertura</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">
                          {selectedProductForInfo.desc}
                        </p>
                      </div>

                      {/* Especificaciones Premium */}
                      <div className="pt-2">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-500 font-semibold">
                          <li className="flex items-center gap-2">
                            <span className="text-[#1E3A8A]">✓</span> Cobertura de Traslado JAE
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#1E3A8A]">✓</span> Asesoría Tanatológica
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#1E3A8A]">✓</span> Trámites y Gestoría JAE
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#1E3A8A]">✓</span> Instalaciones Propias JAE
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* FORMULARIO INTEGRADO AL CRM */}
                    <div className="border-t border-slate-100 pt-5">
                      <h4 className="text-[11px] text-slate-800 font-bold uppercase tracking-wider mb-3">Solicitar Adquisición o Asesoría</h4>
                      
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const nameVal = e.target.clientName.value.trim();
                          const phoneVal = e.target.clientPhone.value.trim();
                          const notesVal = e.target.clientNotes.value.trim();
                          if (!nameVal || !phoneVal) return;

                          const newLead = {
                            id: 'lead_' + Date.now(),
                            name: nameVal,
                            phone: phoneVal,
                            email: '',
                            stage: crmColumns[0] || 'FRIO',
                            assignedTo: 'admin',
                            createdBy: 'cliente_anonimo',
                            contactMethod: 'Tienda en Línea',
                            firstNote: `Interesado en adquirir: ${selectedProductForInfo.name} (Inversión: $${finalPrice}). Notas: ${notesVal}`,
                            nextActivityDate: new Date().toISOString().split('T')[0],
                            serviceOffered: selectedProductForInfo.name,
                            quoteAmount: Number(finalPrice) || 0,
                            customFields: {},
                            notes: [
                              {
                                id: 'ln_' + Date.now(),
                                author: 'Sistema Tienda JAE',
                                text: `Prospecto interesado en el producto del catálogo: ${selectedProductForInfo.name} (Precio regular: $${selectedProductForInfo.price}${promo ? `, Promocionado: $${promo.discountedPrice} con -${promo.discount}%` : ''}). Notas de cliente: ${notesVal}. Registrado desde la Tienda en Línea JAE.`,
                                timestamp: new Date().toISOString()
                              }
                            ],
                            documents: [],
                            isDiscarded: false,
                            isHot: promo ? true : false
                          };

                          const updatedLeads = [...leads, newLead];
                          setLeads(updatedLeads);
                          addAuditLog('leads', newLead.id, 'INSERT', null, newLead);

                          // Celebración y notificaciones
                          setShowStoreRequestModal(false);
                          setSelectedProductForInfo(null);
                          setActiveDetailImg('');
                          triggerNotification('¡Solicitud enviada con éxito! Un asesor de Grupo JAE te contactará.');
                          setCelebration({ show: true, leadName: nameVal });
                        }} 
                        className="space-y-3.5"
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold block">Tu Nombre Completo *</label>
                          <input
                            name="clientName"
                            type="text"
                            required
                            placeholder="Ej. Juan Pérez Garza"
                            className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold block">Tu Teléfono de Contacto *</label>
                          <input
                            name="clientPhone"
                            type="tel"
                            required
                            placeholder="Ej. (442) 123-4567"
                            className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-bold block">Mensaje o Sucursal de Interés</label>
                          <textarea
                            name="clientNotes"
                            rows={2}
                            placeholder="Ej. Deseo cotizar mensualidades a previsión o solicitar visita de asesor..."
                            className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] resize-none focus:bg-white"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowStoreRequestModal(false);
                              setSelectedProductForInfo(null);
                              setActiveDetailImg('');
                            }}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                          >
                            Volver al Catálogo
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg shadow-[#1E3A8A]/10 flex items-center justify-center gap-1.5"
                          >
                            <span>🛒 Adquirir / Info</span>
                          </button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ==========================================
          MODAL DE INICIAR SESIÓN (DISEÑO ELEGANTE EN BLANCO)
          ========================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="text-center">
              <img 
                src="/assets/logo_jae_azul.png" 
                alt="Grupo JAE" 
                className="h-20 mx-auto object-contain mb-4"
              />
              <h3 className="font-serif font-bold text-slate-900 text-lg">Acceso Colaborador JAE</h3>
              <p className="text-xs text-slate-400 mt-1">Ingrese sus credenciales de administración o ventas.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Correo Institucional</label>
                <input
                  type="email"
                  required
                  placeholder="usuario@grupojae.mx"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-500 border border-red-155 px-3 py-2 rounded-xl text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Ayudas de Credenciales para la Demo */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1 text-[11px] text-[#081225]">
                <p className="font-semibold text-center mb-1 text-slate-800">💡 Credenciales para la demo:</p>
                <p>👤 <span className="font-semibold">Administrador:</span> soporte@grupojae.mx / 12345#JAE</p>
                <p>👤 <span className="font-semibold">Empleado:</span> empleado@grupojae.mx / 54321#JAE</p>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginError('');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          PIE DE PÁGINA PREMIUM (FONDO BLANCO Y LOGOS A COLOR)
          ========================================== */}
      <footer className="bg-white border-t border-slate-200 py-16 px-6 md:px-12 text-slate-500 mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10">
          
          {/* Fila de Logotipos a Color */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
            {/* Jardín de los Ángeles (Marca Comercial 1) */}
            <div className="flex flex-col items-center md:items-start gap-1 shrink-0">
              <img 
                src="/assets/logo_jardin_color.png" 
                alt="Jardín de los Ángeles" 
                className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Grupo JAE (Logotipo Principal) */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <img 
                src="/assets/logo_jae_color.png" 
                alt="Grupo JAE" 
                className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Eternum (Marca Comercial 2) */}
            <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
              <img 
                src="/assets/logo_eternum_color.png" 
                alt="Eternum Servicios Funerarios" 
                className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          {/* Fila de Enlaces y Derechos de Autor */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-slate-550">
            <div className="text-center md:text-left space-y-1.5">
              <p className="font-semibold text-slate-800">
                © 2026 Grupo JAE. Todos los derechos reservados.
              </p>
              <p className="text-[9.5px] text-slate-400 max-w-xl leading-relaxed">
                Jardín de los Ángeles y Eternum Servicios Funerarios son marcas comerciales de servicios funerarios y de previsión debidamente registradas y respaldadas bajo la licencia de Grupo JAE.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-semibold">
              <button onClick={triggerDemoNotification} className="hover:text-[#1E3A8A] text-slate-650 transition-colors cursor-pointer">Aviso de Privacidad</button>
              <button onClick={triggerDemoNotification} className="hover:text-[#1E3A8A] text-slate-650 transition-colors cursor-pointer">Términos de Servicio</button>
              <button onClick={triggerDemoNotification} className="hover:text-[#1E3A8A] text-slate-650 transition-colors cursor-pointer">Soporte Técnico</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Dynamic Toast System */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-toast-in">
          <div className={`glassmorphism border px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg ${
            toast.type === 'error'
              ? 'bg-rose-50/90 border-rose-250 text-rose-800'
              : 'bg-emerald-50/90 border-emerald-250 text-emerald-800'
          }`}>
            <span className="text-base">{toast.type === 'error' ? '❌' : '✨'}</span>
            <p className="text-xs font-semibold flex-1 leading-normal">{toast.message}</p>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="text-slate-450 hover:text-slate-655 font-bold text-sm ml-1"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Centered Dedicated Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-[#081225]/75 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="bg-white border border-slate-200/80 rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl relative overflow-hidden animate-scale-up">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
            
            <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-200/60 shadow-sm animate-pulse">
              <Info className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-slate-900">Versión Demo</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Esta es una versión demo, esta opción aún no se encuentra disponible.
              </p>
            </div>

            <button
              onClick={() => setShowDemoModal(false)}
              className="w-full bg-[#081225] hover:bg-[#1E3A8A] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Custom Confirm Dialog Flow */}
      {confirmDialog.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full text-center space-y-6 shadow-2xl animate-scale-up relative">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-xl mx-auto border border-amber-100 shadow-sm">
              ⚠️
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-slate-900 text-lg">¿Confirmar Acción?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {confirmDialog.message}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog({ show: false, message: '', onConfirm: null })}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-655 font-bold text-xs py-2.5 rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Closing Celebration */}
      {celebration.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md overflow-hidden animate-fade-in">
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 90 }).map((_, i) => {
              const colors = ['bg-rose-500', 'bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-fuchsia-500', 'bg-violet-500'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              const size = Math.random() * 8 + 6;
              const delay = Math.random() * 4;
              const duration = Math.random() * 3 + 2;
              const left = Math.random() * 100;
              
              return (
                <div
                  key={i}
                  className={`absolute animate-confetti-fall ${randomColor} rounded-full`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity: Math.random() * 0.7 + 0.3
                  }}
                />
              );
            })}
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-scale-up relative m-4">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto border border-emerald-100 shadow-md">
              🏆
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 border border-emerald-200/50 px-2.5 py-0.5 rounded-full">
                ¡Venta Cerrada!
              </span>
              <h3 className="font-serif font-bold text-slate-900 text-2xl">¡Gran Trabajo!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Has logrado avanzar exitosamente a la <span className="font-bold text-slate-700">{celebration.leadName}</span> a la etapa final de Cierre. ¡Sigue así!
              </p>
            </div>
            
            <button
              onClick={() => setCelebration({ show: false, leadName: '' })}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 transition-all w-full"
            >
              ¡Excelente! Continuar
            </button>
          </div>
        </div>
      )}

      {/* Burbuja de Contacto (WhatsApp/CRM) */}
      {currentModule === 'CLIENT_VIEW' && (
        <ContactBubble setLeads={setLeads} triggerNotification={triggerNotification} />
      )}
    </div>
  );
}

// ====================================================================================
// WIDGET BURBUJA DE CONTACTO (CRM)
// ====================================================================================
function ContactBubble({ setLeads, triggerNotification }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('menu'); // 'menu', 'necesidad', 'prevision', 'dudas'
  const [formData, setFormData] = useState({ name: '', phone: '', serviceType: '', doubt: '' });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('menu');
      setFormData({ name: '', phone: '', serviceType: '', doubt: '' });
    }, 300);
  };

  const handlePrevisionSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    const newLead = {
      id: 'l_' + Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: '',
      stage: 'FRIO',
      assignedTo: 'admin',
      createdBy: 'widget',
      contactMethod: 'Sitio Web (Previsión)',
      firstNote: `Interesado en Previsión. Tipo de servicio: ${formData.serviceType || 'No especificado'}`,
      nextActivityDate: new Date().toISOString().split('T')[0],
      serviceOffered: formData.serviceType || 'Previsión',
      quoteAmount: 0,
      customFields: {},
      notes: [{ id: 'n_' + Date.now(), author: 'Sistema', text: `Lead generado desde Widget. Interés: ${formData.serviceType}`, timestamp: new Date().toISOString() }],
      documents: [],
      isDiscarded: false,
      isHot: true,
      nextContactDate: new Date().toISOString().split('T')[0],
      nextContactTask: 'Llamar al número vital brindado por el cliente.'
    };
    
    setLeads(prev => [...prev, newLead]);
    triggerNotification('¡Gracias! Un asesor de previsión se pondrá en contacto contigo muy pronto.', 'success');
    handleClose();
  };

  const handleDudaSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.doubt) return;
    
    const newLead = {
      id: 'l_' + Date.now(),
      name: formData.name,
      phone: formData.phone || '',
      email: '',
      stage: 'FRIO',
      assignedTo: 'admin',
      createdBy: 'widget',
      contactMethod: 'Sitio Web (Duda)',
      firstNote: `Duda del cliente: ${formData.doubt}`,
      nextActivityDate: new Date().toISOString().split('T')[0],
      serviceOffered: 'General',
      quoteAmount: 0,
      customFields: {},
      notes: [{ id: 'n_' + Date.now(), author: 'Sistema', text: `Duda del cliente: ${formData.doubt}`, timestamp: new Date().toISOString() }],
      documents: [],
      isDiscarded: false,
      isHot: false,
      nextContactDate: new Date().toISOString().split('T')[0],
      nextContactTask: 'Contactar para resolver su duda.'
    };
    
    setLeads(prev => [...prev, newLead]);
    triggerNotification('¡Tu duda ha sido enviada! Te responderemos a la brevedad.', 'success');
    handleClose();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
      {/* Botón Flotante */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 animate-pulse-slow border border-blue-400/30"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border border-white"></span>
            </span>
          </div>
        </button>
      )}

      {/* Panel del Chat */}
      {isOpen && (
        <div className="bg-white w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scale-up origin-bottom-right mb-2">
          
          {/* Cabecera */}
          <div className="bg-[#081225] p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center gap-3 relative z-10">
              <img 
                src="/assets/logo_jae_blanco.png" 
                alt="Grupo JAE" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h4 className="text-white font-bold text-sm">Soporte JAE</h4>
                <p className="text-green-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En línea
                </p>
              </div>
            </div>
            <button onClick={handleClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors relative z-10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="p-5 flex-1 max-h-[400px] overflow-y-auto bg-slate-50/50">
            
            {step === 'menu' && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed max-w-[90%]">
                  Hola, bienvenido a Grupo JAE. ¿En qué le podemos apoyar el día de hoy?
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="relative group cursor-pointer" onClick={() => setStep('necesidad')}>
                    <div className="absolute inset-0 bg-rose-500/5 rounded-xl transition-colors group-hover:bg-rose-500/10"></div>
                    <div className="border border-rose-200 bg-white p-3 rounded-xl flex items-center gap-3 relative">
                      <div className="bg-rose-100 text-rose-600 p-2 rounded-lg"><Phone className="w-4 h-4" /></div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Tengo una Necesidad Inmediata</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Reportar un fallecimiento</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-rose-500 transition-colors" />
                    </div>
                  </div>

                  <div className="relative group cursor-pointer" onClick={() => setStep('prevision')}>
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl transition-colors group-hover:bg-blue-500/10"></div>
                    <div className="border border-blue-200 bg-white p-3 rounded-xl flex items-center gap-3 relative">
                      <div className="bg-blue-100 text-[#1E3A8A] p-2 rounded-lg"><Shield className="w-4 h-4" /></div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Servicio de Previsión</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Planes a futuro y cotizaciones</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-[#1E3A8A] transition-colors" />
                    </div>
                  </div>

                  <div className="relative group cursor-pointer" onClick={() => setStep('dudas')}>
                    <div className="absolute inset-0 bg-slate-500/5 rounded-xl transition-colors group-hover:bg-slate-500/10"></div>
                    <div className="border border-slate-200 bg-white p-3 rounded-xl flex items-center gap-3 relative">
                      <div className="bg-slate-100 text-slate-600 p-2 rounded-lg"><HelpCircle className="w-4 h-4" /></div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Resolver Dudas</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Otra consulta general</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'necesidad' && (
              <div className="space-y-4 animate-fade-in">
                <button onClick={() => setStep('menu')} className="text-[10px] font-bold text-slate-400 hover:text-[#1E3A8A] flex items-center gap-1 mb-2">
                  <ChevronLeft className="w-3 h-3" /> Volver
                </button>
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-rose-500">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-rose-900 text-sm">Línea de Emergencia</h4>
                  <p className="text-xs text-rose-800/80 leading-relaxed">
                    Por favor, llama a la funeraria en este momento y <strong className="font-bold">presiona la opción 1</strong> para atención prioritaria inmediata.
                  </p>
                  <a href="tel:4422423230" className="block w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md shadow-rose-600/20 mt-2">
                    Llamar al (442) 242 3230
                  </a>
                </div>
              </div>
            )}

            {step === 'prevision' && (
              <div className="space-y-4 animate-fade-in">
                <button onClick={() => setStep('menu')} className="text-[10px] font-bold text-slate-400 hover:text-[#1E3A8A] flex items-center gap-1 mb-2">
                  <ChevronLeft className="w-3 h-3" /> Volver
                </button>
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed max-w-[95%]">
                  Excelente decisión. Por favor, déjanos tus datos y un asesor se comunicará contigo rápidamente para darte información detallada.
                </div>
                <form onSubmit={handlePrevisionSubmit} className="space-y-3 pt-2">
                  <div>
                    <input type="text" required placeholder="Tu Nombre Completo" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <input type="tel" required placeholder="Teléfono de Contacto (Vital)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <select required className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-[#1E3A8A]" value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                      <option value="">¿Qué servicio te interesa?</option>
                      <option value="Paquete Básico/Cremación">Paquete Básico / Cremación</option>
                      <option value="Paquete Tradicional/Homenaje">Paquete Tradicional / Homenaje</option>
                      <option value="Espacio en Parque (Lote/Nicho)">Espacio en Parque (Lote/Nicho)</option>
                      <option value="Aún no lo sé, busco asesoría">Aún no lo sé, busco asesoría</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md mt-2">
                    Contactar a un Asesor
                  </button>
                </form>
              </div>
            )}

            {step === 'dudas' && (
              <div className="space-y-4 animate-fade-in">
                <button onClick={() => setStep('menu')} className="text-[10px] font-bold text-slate-400 hover:text-[#1E3A8A] flex items-center gap-1 mb-2">
                  <ChevronLeft className="w-3 h-3" /> Volver
                </button>
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-700 leading-relaxed max-w-[95%]">
                  Escribe tu duda y te contactaremos a la brevedad para resolverla.
                </div>
                <form onSubmit={handleDudaSubmit} className="space-y-3 pt-2">
                  <div>
                    <input type="text" required placeholder="Tu Nombre" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <input type="text" placeholder="Teléfono o Email de contacto" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <textarea required placeholder="Escribe tu duda aquí..." rows={3} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A] resize-none" value={formData.doubt} onChange={e => setFormData({...formData, doubt: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-md mt-2">
                    Enviar Duda
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// WIDGET EXTERNO DE BÚSQUEDA DE SERVICIOS
// ====================================================================================
function ClientTrackingWidget({ services, isDarkBg }) {
  const [folio, setFolio] = useState('');
  const [searchedService, setSearchedService] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!folio.trim()) return;
    const found = services.find(s => s.folio.toUpperCase() === folio.trim().toUpperCase());
    if (found) {
      setSearchedService(found);
      setErrorMsg('');
    } else {
      setSearchedService(null);
      setErrorMsg('No se encontró ningún servicio activo o concluido con ese Folio.');
    }
  };

  const getStageIndex = (currentStatus) => {
    if (currentStatus === 'CONCLUIDO') return STAGES.length;
    return STAGES.findIndex((stage) => stage.id === currentStatus);
  };

  const currentIndex = searchedService ? getStageIndex(searchedService.status) : -1;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-450 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ingrese Folio (Ej. SDNI-0001)"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className={`w-full rounded-full pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-2 transition-all font-semibold uppercase tracking-wider ${
              isDarkBg
                ? 'bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:border-sky-400 focus:ring-sky-500/20'
                : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#1E3A8A] focus:ring-[#1E3A8A]/15'
            }`}
          />
        </div>
        <button
          type="submit"
          className={`font-semibold text-xs px-6 rounded-full shadow-md transition-all whitespace-nowrap ${
            isDarkBg
              ? 'bg-white hover:bg-slate-100 text-[#0A1728] shadow-white/5 hover:shadow-lg'
              : 'bg-[#1E3A8A] hover:bg-[#1E40AF] text-white'
          }`}
        >
          Rastrear
        </button>
      </form>

      {errorMsg && (
        <div className={`px-4 py-2.5 rounded-full text-xs max-w-sm mx-auto text-center flex items-center justify-center gap-2 ${
          isDarkBg 
            ? 'bg-red-500/20 border border-red-500/30 text-red-200' 
            : 'bg-red-55 border border-red-100 text-red-500'
        }`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {searchedService && (
        <div className={`rounded-2xl p-6 md:p-8 space-y-8 text-left shadow-2xl transition-all duration-500 border ${
          isDarkBg
            ? 'bg-[#0A1728]/70 backdrop-blur-xl border-white/15 text-white'
            : 'bg-[#FAFAFA] border border-slate-200/80 text-slate-800 shadow-sm'
        }`}>
          {/* Header del expediente */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Folio Consultando</span>
              <span className="text-lg font-serif font-semibold text-slate-900 tracking-wide">{searchedService.folio}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Titular del Contrato</span>
              <span className="text-xs font-semibold text-slate-700">{searchedService.clientName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Homenajeado</span>
              <span className="text-xs font-semibold text-slate-700">{searchedService.deceasedName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estatus de Logística</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold mt-1 ${
                searchedService.status === 'CONCLUIDO' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                  : 'bg-[#1E3A8A]/10 text-[#081225] border border-[#1E3A8A]/20'
              }`}>
                {searchedService.status === 'CONCLUIDO' ? 'Servicio Concluido' : STAGES.find(s => s.id === searchedService.status)?.label.split('. ')[1] || searchedService.status}
              </span>
            </div>
          </div>

          {/* Timeline interactivo con heartbeat en etapa activa */}
          <div className="relative py-4">
            {/* Barra de progreso de fondo */}
            <div className={`absolute top-[1.6rem] left-[1.5rem] right-[1.5rem] h-[3px] rounded-full ${
              isDarkBg ? 'bg-white/10' : 'bg-slate-200'
            }`}></div>
            
            {/* Barra activa con glow */}
            <div 
              className={`absolute top-[1.6rem] left-[1.5rem] h-[3px] rounded-full transition-all duration-1000 ease-out animate-progress-glow ${
                isDarkBg ? 'bg-sky-400' : 'bg-[#1E3A8A]'
              }`}
              style={{ width: `${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 92 + 2}%` }}
            ></div>

            <div className="flex justify-between relative">
              {STAGES.map((stage, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex && searchedService.status !== 'CONCLUIDO';

                return (
                  <div key={stage.id} className="flex flex-col items-center w-1/5 relative">
                    {/* Círculo indicador con heartbeat en etapa actual */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-500 z-10 ${
                      isCompleted 
                        ? (isDarkBg ? 'bg-[#0A1728] border-sky-400 text-sky-300 shadow-md' : 'bg-white border-[#1E3A8A] text-[#1E3A8A] shadow-sm') 
                        : (isDarkBg ? 'bg-[#0A1728]/80 border-white/10 text-slate-500' : 'bg-white border-slate-200 text-slate-350')
                    } ${isCurrent ? (isDarkBg ? 'animate-pulse-beat-dark border-sky-300 text-white' : 'animate-pulse-beat border-[#081225] text-[#081225]') : ''}`}>
                      {isCompleted && index < currentIndex ? (
                        <CheckCircle className={`w-4 h-4 ${isDarkBg ? 'text-sky-400' : 'text-[#1E3A8A]'}`} />
                      ) : isCurrent ? (
                        <span className="relative flex h-3 w-3">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            isDarkBg ? 'bg-sky-300' : 'bg-[#1E3A8A]'
                          }`}></span>
                          <span className={`relative inline-flex rounded-full h-3 w-3 ${
                            isDarkBg ? 'bg-sky-400' : 'bg-[#1E3A8A]'
                          }`}></span>
                        </span>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Etiqueta de etapa activa */}
                    {isCurrent && (
                      <span className={`absolute -top-6 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap ${
                        isDarkBg ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30' : 'bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20'
                      }`}>EN CURSO</span>
                    )}

                    {/* Texto debajo */}
                    <div className="mt-3 text-center">
                      <p className={`text-[10px] font-semibold tracking-wide ${
                        isCompleted 
                          ? (isDarkBg ? 'text-slate-100 font-bold' : 'text-slate-800 font-bold') 
                          : (isDarkBg ? 'text-slate-500' : 'text-slate-450')
                      } ${isCurrent ? (isDarkBg ? 'text-sky-300' : 'text-[#1E3A8A]') : ''}`}>
                        {stage.label.split('. ')[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Última nota del equipo JAE */}
          {searchedService.notes && searchedService.notes.length > 0 && searchedService.status !== 'CONCLUIDO' && (() => {
            const lastNote = searchedService.notes[searchedService.notes.length - 1];
            return (
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDarkBg
                  ? 'bg-sky-500/10 border-sky-500/20'
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  isDarkBg ? 'bg-sky-500/20' : 'bg-[#1E3A8A]/10'
                }`}>
                  <Bell className={`w-4 h-4 ${isDarkBg ? 'text-sky-300' : 'text-[#1E3A8A]'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isDarkBg ? 'text-sky-300' : 'text-[#1E3A8A]'
                    }`}>Última actualización del equipo</span>
                    <span className="text-[9px] text-slate-400">
                      {new Date(lastNote.timestamp).toLocaleString('es-MX', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    isDarkBg ? 'text-slate-200' : 'text-slate-700'
                  }`}>{lastNote.text}</p>
                  <span className={`text-[9px] mt-1 block ${
                    isDarkBg ? 'text-slate-400' : 'text-slate-400'
                  }`}>— {lastNote.author}</span>
                </div>
              </div>
            );
          })()}

          {/* Información pública del homenaje */}
          {(searchedService.wakeRoom || searchedService.cremationTime) && (
            <div className={`p-5 rounded-2xl border backdrop-blur-md shadow-lg space-y-4 ${
              isDarkBg
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-[#FAFAFA] border-slate-200 text-slate-800'
            }`}>
              <h4 className="font-serif font-bold text-xs border-b border-slate-200/20 pb-2 flex items-center gap-2 tracking-wider uppercase text-[#1E3A8A] dark:text-sky-300">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Información Pública del Homenaje
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchedService.wakeRoom && (
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDarkBg ? 'bg-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <Info className={`w-4.5 h-4.5 ${isDarkBg ? 'text-sky-350' : 'text-[#1E3A8A]'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Sala de Velación</span>
                      <span className={`text-xs font-semibold ${isDarkBg ? 'text-white' : 'text-slate-800'}`}>{searchedService.wakeRoom}</span>
                    </div>
                  </div>
                )}
                {searchedService.cremationTime && (
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDarkBg ? 'bg-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <Calendar className={`w-4.5 h-4.5 ${isDarkBg ? 'text-sky-350' : 'text-[#1E3A8A]'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Hora de Cremación / Sepelio</span>
                      <span className={`text-xs font-semibold ${isDarkBg ? 'text-white' : 'text-slate-800'}`}>
                        {new Date(searchedService.cremationTime).toLocaleString('es-MX', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Campos extra visibles al cliente */}
          {searchedService.extraFields && searchedService.extraFields.some(ef => ef.showToClient && ef.title && ef.value) && (
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDarkBg
                ? 'bg-white/5 border-white/10'
                : 'bg-amber-50/50 border-amber-100'
            }`}>
              <h4 className={`font-serif font-bold text-xs flex items-center gap-2 tracking-wider uppercase ${
                isDarkBg ? 'text-amber-300' : 'text-amber-700'
              }`}>
                <Star className="w-3.5 h-3.5" />
                Información Adicional de su Servicio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchedService.extraFields
                  .filter(ef => ef.showToClient && ef.title?.trim() && ef.value?.trim())
                  .map((ef, i) => (
                    <div key={i} className={`rounded-xl p-3 border ${
                      isDarkBg ? 'bg-white/5 border-white/10' : 'bg-white border-amber-100'
                    }`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                        isDarkBg ? 'text-amber-300' : 'text-amber-600'
                      }`}>{ef.title}</span>
                      <span className={`text-xs font-semibold ${
                        isDarkBg ? 'text-white' : 'text-slate-800'
                      }`}>{ef.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Estado de conclusión */}
          {searchedService.status === 'CONCLUIDO' && (
            <div className={`p-5 rounded-2xl text-center space-y-1 border ${
              isDarkBg 
                ? 'bg-emerald-500/10 border-emerald-500/25' 
                : 'bg-emerald-50/50 border-emerald-100/80'
            }`}>
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className={`font-serif font-bold text-sm ${isDarkBg ? 'text-emerald-300' : 'text-slate-850'}`}>El Homenaje ha Concluido</h4>
              <p className={`text-xs max-w-sm mx-auto ${isDarkBg ? 'text-slate-350' : 'text-slate-500'}`}>
                Hemos culminado todas las etapas de atención acordadas para con su familia.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
function IntranetModule({ announcements, setAnnouncements, currentUser, services, leads, tasks, setTasks, directory, directoryGroups }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [selectedIntranetCat, setSelectedIntranetCat] = useState('Todos');

  // Obtener la duración de rotación del primer anuncio (o default 6s)
  const slideDuration = (announcements[0]?.duration || 6) * 1000;

  // Auto-rotar el carrusel con duración configurable
  useEffect(() => {
    if (announcements.length <= 1) return;
    const duration = (announcements[activeSlide]?.duration || 6) * 1000;
    const timer = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % announcements.length;
        setSlideKey(k => k + 1);
        return next;
      });
    }, duration);
    return () => clearInterval(timer);
  }, [announcements, activeSlide]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 'task_' + Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      date: 'Hoy'
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  // Ordenar tareas: No completadas primero, completadas al final
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const nextSlide = () => {
    setSlideKey(k => k + 1);
    setActiveSlide((activeSlide + 1) % announcements.length);
  };

  const prevSlide = () => {
    setSlideKey(k => k + 1);
    setActiveSlide((activeSlide - 1 + announcements.length) % announcements.length);
  };

  const currentAnnouncement = announcements[activeSlide];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Columna Anuncios (Carrusel Dinámico Premium - 2 columnas) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Cartelera de Avisos y Anuncios</h3>
              <p className="text-xs text-slate-500">Noticias y promociones de Aeternum.</p>
            </div>
            <span className="bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 text-[#081225] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Corporativo
            </span>
          </div>

          {/* Carrusel 2 Columnas */}
          {announcements.length > 0 ? (
            <div key={slideKey} className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-in-right">
              {/* Columna Izquierda: Texto */}
              <div className="flex flex-col justify-between bg-gradient-to-br from-[#081225] to-[#1E3A8A] rounded-2xl p-5 text-white space-y-4 min-h-[200px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 border border-white/15 text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide backdrop-blur-sm">
                      {currentAnnouncement.tag}
                    </span>
                    <span className="text-[9px] text-slate-300 font-medium">
                      {currentAnnouncement.startDate} al {currentAnnouncement.endDate}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base md:text-lg tracking-wide leading-snug">
                    {currentAnnouncement.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    {currentAnnouncement.content}
                  </p>
                </div>
                {/* Navegación dentro de la columna de texto */}
                {announcements.length > 1 && (
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex gap-1.5">
                      {announcements.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setSlideKey(k => k + 1); setActiveSlide(idx); }}
                          className={`rounded-full transition-all duration-300 ${
                            idx === activeSlide ? 'bg-white w-5 h-1.5' : 'bg-white/35 w-1.5 h-1.5'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={prevSlide} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={nextSlide} className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Columna Derecha: Imagen */}
              <div className="relative rounded-2xl overflow-hidden min-h-[200px] bg-slate-100 group">
                <img
                  src={currentAnnouncement.img || '/assets/recursos/Imagen13.jpg'}
                  alt={currentAnnouncement.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ minHeight: '200px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-12">
              <Plus className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs">No hay avisos registrados en cartelera.</p>
            </div>
          )}
        </div>

        {/* Resumen Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Servicios Activos</span>
              <span className="text-2xl font-bold text-slate-800 mt-1">{services.filter(s => !s.isLocked).length}</span>
            </div>
            <Clipboard className="w-8 h-8 text-[#1E3A8A]" />
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Prospectos CRM</span>
              <span className="text-2xl font-bold text-slate-800 mt-1">{leads.filter(l => !l.isDiscarded).length}</span>
            </div>
            <BarChart2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Servicios Concluidos</span>
              <span className="text-2xl font-bold text-slate-800 mt-1">{services.filter(s => s.isLocked).length}</span>
            </div>
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Tareas del Día (Hoisted & Persistentes) */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col h-full shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#1E3A8A]" />
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Mis Pendientes</h3>
            </div>
            {tasks.some(t => t.completed) && (
              <button 
                onClick={handleClearCompleted}
                className="text-red-500 hover:text-red-600 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 bg-red-50 hover:bg-red-100/80 px-2.5 py-1 rounded-lg border border-red-100/55 shadow-sm"
              >
                <Trash className="w-3 h-3" />
                Limpiar Hechas
              </button>
            )}
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nueva tarea de hoy..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] transition-colors"
            />
            <button type="submit" className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-xl px-3.5 py-2 text-xs flex items-center justify-center shadow-sm">
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2 flex-1 max-h-[290px] overflow-y-auto pr-1">
            {sortedTasks.map(t => (
              <div 
                key={t.id} 
                onClick={() => toggleTask(t.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  t.completed 
                    ? 'bg-slate-50/50 border-slate-100 opacity-60' 
                    : 'bg-slate-50/50 border-slate-200 hover:border-slate-350'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-colors ${t.completed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-350 bg-white'}`}>
                  {t.completed && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-semibold text-slate-700 ${t.completed ? 'line-through text-slate-400' : ''}`}>{t.title}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{t.date}</span>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-xs text-slate-450 italic text-center py-12">No tienes tareas asignadas para hoy.</p>
            )}
          </div>

          <div className="border-t border-slate-100 mt-6 pt-4 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Rol en uso: {currentUser.role}</span>
          </div>
        </div>
      </div>

      {/* Directorio Interno (Full Width) */}
      {directory && directory.filter(d => d.showToEmployees).length > 0 && (
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#1E3A8A]" />
                Directorio Interno
              </h3>
              <p className="text-xs text-slate-400">Extensiones agrupadas por sucursal / departamento</p>
            </div>

            {/* Categorías (Scroll Horizontal Premium) */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {['Todos', ...([...directoryGroups].sort((a, b) => (a.order || 0) - (b.order || 0)).map(g => g.name))].map(cat => {
                const count = directory.filter(d => d.showToEmployees && (cat === 'Todos' || getDirectoryGroup(d, directoryGroups).name === cat)).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedIntranetCat(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                      selectedIntranetCat === cat
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-[#1E3A8A]/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      selectedIntranetCat === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {(() => {
                const sortedEmployeeDir = [...directory]
                  .filter(d => d.showToEmployees)
                  .sort((a, b) => {
                    const numA = Number(a.extension);
                    const numB = Number(b.extension);
                    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                    return String(a.extension).localeCompare(String(b.extension));
                  });

                const activeGroups = [...directoryGroups].sort((a, b) => (a.order || 0) - (b.order || 0));
                const groupsToRender = selectedIntranetCat === 'Todos'
                  ? activeGroups
                  : activeGroups.filter(g => g.name === selectedIntranetCat);

                let renderedAny = false;

                const content = groupsToRender.map(g => {
                  const groupItems = sortedEmployeeDir.filter(d => getDirectoryGroup(d, directoryGroups).id === g.id);
                  if (groupItems.length === 0) return null;
                  renderedAny = true;

                  return (
                    <div key={g.id} className="space-y-4 pt-4 first:pt-0">
                      <div className="flex items-center gap-4 pb-2 border-b border-slate-150">
                        <h5 className="font-serif font-bold text-slate-800 text-xs flex items-center gap-2 uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-[#1E3A8A] inline-block"></span>
                          {g.name}
                        </h5>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-200 to-transparent"></div>
                        <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-full">
                          {groupItems.length} {groupItems.length === 1 ? 'extensión' : 'extensiones'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                        {groupItems.map(dir => (
                          <div key={dir.id} className="bg-slate-50 border border-slate-200 rounded-3xl p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#1E3A8A] opacity-75"></div>

                            <div className="flex flex-col gap-3">
                              {/* Giant Extension Number in Center */}
                              <div className="flex flex-col items-center justify-center py-3 px-2 bg-gradient-to-b from-[#1E3A8A]/5 to-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 group-hover:from-[#1E3A8A]/10 group-hover:to-[#1E3A8A]/15 transition-all">
                                <span className="text-[8px] uppercase font-bold tracking-widest text-[#1E3A8A]/60 mb-0.5">Extensión</span>
                                <span className="text-2xl font-black font-mono text-[#081225] leading-none tracking-tight">{dir.extension}</span>
                              </div>

                              {/* Contact Details */}
                              <div className="text-center space-y-1">
                                <h6 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide truncate" title={dir.contactPerson ? dir.contactPerson : dir.name}>
                                  {dir.contactPerson ? dir.contactPerson : dir.name}
                                </h6>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider truncate">
                                  {dir.contactPerson ? dir.name : 'Área / Puesto'}
                                </p>
                              </div>
                            </div>

                            {dir.contactPerson && (
                              <div className="mt-2.5 text-center border-t border-slate-200/60 pt-2">
                                <span className="inline-block text-[8px] font-bold text-[#1E3A8A] bg-[#1E3A8A]/5 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  Interno
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });

                return renderedAny ? content : (
                  <p className="text-xs text-slate-400 italic text-center py-6">No hay extensiones en esta sucursal.</p>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OperationsModule({ services, setServices, currentUser, addAuditLog, triggerNotification, triggerConfirm }) {
  const [selectedService, setSelectedService] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [hideConcluded, setHideConcluded] = useState(true);
  const [activeTab, setActiveTab] = useState('logistica'); // logistica or expediente

  // Form states for creation
  const [clientName, setClientName] = useState('');
  const [deceasedName, setDeceasedName] = useState('');
  const [orderService, setOrderService] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [initialNotes, setInitialNotes] = useState('');

  // Local edit states for Tab 2
  const [editPackage, setEditPackage] = useState('');
  const [editCost, setEditCost] = useState(0);
  const [editPaymentStatus, setEditPaymentStatus] = useState('PENDIENTE');
  const [editPaymentMethod, setEditPaymentMethod] = useState('');
  const [editWakeLocation, setEditWakeLocation] = useState('');
  const [editExtras, setEditExtras] = useState('');
  const [editWakeRoom, setEditWakeRoom] = useState('');
  const [editCremationTime, setEditCremationTime] = useState('');
  const [editExtraFields, setEditExtraFields] = useState([...EMPTY_EXTRA_FIELDS]);

  // Comment posting state
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (selectedService) {
      setEditPackage(selectedService.contractedPackage || '');
      setEditCost(selectedService.totalCost || 0);
      setEditPaymentStatus(selectedService.paymentStatus || 'PENDIENTE');
      setEditPaymentMethod(selectedService.paymentMethod || '');
      setEditWakeLocation(selectedService.wakeLocation || '');
      setEditExtras(selectedService.extras || '');
      setEditWakeRoom(selectedService.wakeRoom || '');
      setEditCremationTime(selectedService.cremationTime || '');
      setEditExtraFields(selectedService.extraFields?.length === 5 ? [...selectedService.extraFields] : [...EMPTY_EXTRA_FIELDS]);
    }
  }, [selectedService]);

  const handleRealUpload = (e, docType) => {
    const file = e.target.files[0];
    if (!file || !selectedService) return;
    if (selectedService.isLocked && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No autorizado: Este servicio se encuentra finalizado y bloqueado.", "error");
      return;
    }

    const fileExt = file.name.split('.').pop() || 'pdf';
    const cleanDocType = docType.toLowerCase().replace(/\s+/g, '_');
    const filename = `${selectedService.folio}_${cleanDocType}_${Date.now()}.${fileExt}`;

    fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      body: file
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al subir archivo');
      return res.json();
    })
    .then(data => {
      const docPath = data.path;
      const updatedDocuments = [...(selectedService.documents || []), { name: file.name, type: docType, path: docPath }];
      const updatedServices = services.map(s => {
        if (s.id === selectedService.id) {
          return { ...s, documents: updatedDocuments };
        }
        return s;
      });
      setServices(updatedServices);
      setSelectedService({ ...selectedService, documents: updatedDocuments });
      addAuditLog('service_documents', selectedService.id, 'INSERT', null, { name: file.name, type: docType, path: docPath });
      triggerNotification(`Documento "${file.name}" cargado con éxito.`);
    })
    .catch(err => {
      console.warn('Backend upload offline, falling back to local base64 storage:', err);
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        const updatedDocuments = [...(selectedService.documents || []), { name: file.name, type: docType, path: base64Data }];
        const updatedServices = services.map(s => {
          if (s.id === selectedService.id) {
            return { ...s, documents: updatedDocuments };
          }
          return s;
        });
        setServices(updatedServices);
        setSelectedService({ ...selectedService, documents: updatedDocuments });
        addAuditLog('service_documents', selectedService.id, 'INSERT', null, { name: file.name, type: docType, path: base64Data });
        triggerNotification(`Documento "${file.name}" cargado con éxito.`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !deceasedName.trim() || !orderService.trim()) {
      triggerNotification("Por favor complete los campos obligatorios.", "error");
      return;
    }

    const lastFolioNum = services.length > 0
      ? parseInt(services[services.length - 1].folio.replace(/[^0-9]/g, ''))
      : 0;
    const newFolio = `SDNI${String(lastFolioNum + 1).padStart(4, '0')}`;

    // Collect phones array (max 3, filter out empty)
    const phonesCollected = [phone1, phone2, phone3].map(p => p.trim()).filter(Boolean);

    const newService = {
      id: 's_' + Date.now(),
      folio: newFolio,
      clientName: clientName.trim(),
      deceasedName: deceasedName.trim(),
      orderService: orderService.trim(),
      phones: phonesCollected,
      initialNotes: initialNotes.trim(),
      status: 'COTIZACION',
      isLocked: false,
      createdAt: new Date().toISOString(),
      subtasks: [
        { id: 'st1', text: 'Obtención de Certificado Médico', completed: false },
        { id: 'st2', text: 'Verificación de Plan / Pago', completed: false },
        { id: 'st3', text: 'Preparación y embalsamado', completed: false }
      ],
      notes: [],
      documents: [],
      contractedPackage: orderService.trim(),
      totalCost: 0,
      paymentStatus: 'PENDIENTE',
      paymentMethod: '',
      wakeLocation: '',
      extras: '',
      wakeRoom: '',
      cremationTime: '',
      extraFields: [...EMPTY_EXTRA_FIELDS]
    };

    setServices([...services, newService]);
    addAuditLog('services', newService.id, 'INSERT', null, newService);
    setShowCreateModal(false);
    
    // Clear inputs
    setClientName('');
    setDeceasedName('');
    setOrderService('');
    setPhone1('');
    setPhone2('');
    setPhone3('');
    setInitialNotes('');

    triggerNotification(`Orden de Servicio creada con Folio: ${newFolio}`);
  };

  const handleStatusChange = (status) => {
    if (!selectedService) return;
    if (selectedService.isLocked && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No autorizado: Este servicio se encuentra finalizado y bloqueado.", "error");
      return;
    }

    const stagesOrder = [...STAGES.map(s => s.id), 'CONCLUIDO'];
    const oldIndex = stagesOrder.indexOf(selectedService.status);
    const newIndex = stagesOrder.indexOf(status);

    // Block regression for non-admins
    if (currentUser.role !== ROLES.ADMIN && newIndex < oldIndex) {
      triggerNotification("Acceso Restringido: Los empleados no pueden retroceder las etapas del homenaje. Solo un Administrador puede realizar esta acción.", "error");
      return;
    }

    const isLocked = status === 'CONCLUIDO';
    const oldVal = { ...selectedService };
    const newVal = { ...selectedService, status, isLocked };

    const updated = services.map(s => {
      if (s.id === selectedService.id) {
        return newVal;
      }
      return s;
    });

    setServices(updated);
    setSelectedService(newVal);
    addAuditLog('services', selectedService.id, 'UPDATE', oldVal, newVal);
  };

  const handleToggleSubtask = (taskId) => {
    if (!selectedService) return;
    if (selectedService.isLocked && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No autorizado: Este servicio se encuentra finalizado y bloqueado.", "error");
      return;
    }

    const targetTask = selectedService.subtasks.find(st => st.id === taskId);

    // Block unchecking completed items for non-admins
    if (targetTask && targetTask.completed && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("Acceso Restringido: No se pueden desmarcar tareas ya completadas. Solo un Administrador puede reabrir tareas finalizadas.", "error");
      return;
    }

    const oldVal = { ...selectedService };
    const updatedSubtasks = selectedService.subtasks.map(st => 
      st.id === taskId ? { ...st, completed: !st.completed } : st
    );

    const newVal = { ...selectedService, subtasks: updatedSubtasks };

    const updated = services.map(s => {
      if (s.id === selectedService.id) {
        return newVal;
      }
      return s;
    });

    setServices(updated);
    setSelectedService(newVal);
    addAuditLog('services', selectedService.id, 'UPDATE', oldVal, newVal);
  };

  const handleSaveExpediente = (e) => {
    e.preventDefault();
    if (!selectedService) return;
    if (selectedService.isLocked && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No autorizado: Este servicio se encuentra finalizado y bloqueado.", "error");
      return;
    }

    const oldVal = { ...selectedService };
    const newVal = {
      ...selectedService,
      contractedPackage: editPackage,
      totalCost: Number(editCost),
      paymentStatus: editPaymentStatus,
      paymentMethod: editPaymentMethod,
      wakeLocation: editWakeLocation,
      extras: editExtras,
      wakeRoom: editWakeRoom,
      cremationTime: editCremationTime,
      extraFields: editExtraFields
    };

    const updated = services.map(s => {
      if (s.id === selectedService.id) {
        return newVal;
      }
      return s;
    });

    setServices(updated);
    setSelectedService(newVal);
    addAuditLog('services', selectedService.id, 'UPDATE_EXPEDIENTE', oldVal, newVal);
    triggerNotification("Información del expediente y pagos guardada con éxito.");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedService) return;
    if (selectedService.isLocked && currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No autorizado: Este servicio se encuentra finalizado y bloqueado.", "error");
      return;
    }

    const newNote = {
      id: 'n_' + Date.now(),
      author: currentUser.name,
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };

    const oldVal = { ...selectedService };
    const updatedNotes = [...(selectedService.notes || []), newNote];
    const newVal = { ...selectedService, notes: updatedNotes };

    const updated = services.map(s => {
      if (s.id === selectedService.id) {
        return newVal;
      }
      return s;
    });

    setServices(updated);
    setSelectedService(newVal);
    setNewComment('');
    addAuditLog('services_comments', selectedService.id, 'INSERT', oldVal, newNote);
  };

  // Filter services by default
  const displayedServices = services.filter(s => !hideConcluded || s.status !== 'CONCLUIDO');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Listado de Órdenes */}
      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-sm">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Folios Registrados</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-[#1E3A8A]/10"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo Folio
            </button>
          </div>
          
          {/* Switch Filter for Concluded Services */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
              {hideConcluded ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-[#1E3A8A]" />}
              Ocultar Concluidos
            </span>
            <button
              onClick={() => setHideConcluded(!hideConcluded)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors relative flex items-center ${hideConcluded ? 'bg-[#1E3A8A]' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${hideConcluded ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="space-y-3 flex-1 max-h-[500px] overflow-y-auto pr-1">
          {displayedServices.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedService(s)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedService?.id === s.id
                  ? 'bg-slate-50 border-[#1E3A8A] text-slate-800 shadow-sm'
                  : 'bg-white border-slate-100 hover:border-slate-200 text-slate-650'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-xs block text-[#1E3A8A]">
                  {s.folio}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                  s.status === 'CONCLUIDO' 
                    ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' 
                    : 'bg-[#1E3A8A]/10 border border-[#1E3A8A]/20 text-[#081225]'
                }`}>
                  {s.status}
                </span>
              </div>
              <h4 className="font-semibold text-xs mt-2.5 text-slate-800">{s.deceasedName}</h4>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                <span>Docs: {s.documents?.length || 0}</span>
                {s.isLocked && <Lock className="w-3 h-3 text-red-500" />}
              </div>
            </div>
          ))}
          {displayedServices.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-12">No hay folios en esta categoría.</p>
          )}
        </div>
      </div>

      {/* Detalle de la Orden */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        {selectedService ? (
          <div className="space-y-6">
            
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-150">
              <div>
                <span className="font-mono text-xs text-[#1E3A8A] font-bold">{selectedService.folio}</span>
                <h3 className="font-serif font-bold text-slate-900 text-lg mt-1">{selectedService.deceasedName}</h3>
                <p className="text-xs text-slate-400">Cliente Responsable: {selectedService.clientName}</p>
                {selectedService.phones && selectedService.phones.length > 0 && (
                  <p className="text-[10px] text-slate-500 mt-1 font-semibold">📞 Teléfonos: {selectedService.phones.join(' | ')}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {selectedService.isLocked && (
                  <span className="bg-red-50 border border-red-100 text-red-500 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Expediente Bloqueado
                  </span>
                )}
                
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cambiar Fase Logística</span>
                  <select
                    value={selectedService.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                    className="bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#1E3A8A] mt-1 cursor-pointer font-medium"
                  >
                    {STAGES.map(st => (
                      <option key={st.id} value={st.id}>{st.label}</option>
                    ))}
                    <option value="CONCLUIDO">Concluir Servicio (Bloquear)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pestañas de la Ficha Detallada */}
            <div className="flex border-b border-slate-200 gap-4">
              <button
                onClick={() => setActiveTab('logistica')}
                className={`text-xs px-4 py-2 font-bold border-b-2 transition-all ${
                  activeTab === 'logistica' 
                    ? 'border-[#1E3A8A] text-[#1E3A8A]' 
                    : 'border-transparent text-slate-400 hover:text-slate-650'
                }`}
              >
                Logística y Checklist
              </button>
              <button
                onClick={() => setActiveTab('expediente')}
                className={`text-xs px-4 py-2 font-bold border-b-2 transition-all ${
                  activeTab === 'expediente' 
                    ? 'border-[#1E3A8A] text-[#1E3A8A]' 
                    : 'border-transparent text-slate-400 hover:text-slate-650'
                }`}
              >
                Expediente, Precios y Rastro Público
              </button>
            </div>

            {/* Contenido Pestaña 1: Logística y Comentarios */}
            {activeTab === 'logistica' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Checklist & Documentos */}
                <div className="space-y-6">
                  {/* Checklist */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                      <CheckSquare className="w-4 h-4 text-emerald-500" />
                      Pasos Operativos
                    </h4>

                    <div className="space-y-2 bg-[#FAFAFA]/50 p-2 rounded-2xl border border-slate-200/60 max-h-[220px] overflow-y-auto">
                      {selectedService.subtasks?.map(st => (
                        <div
                          key={st.id}
                          onClick={() => handleToggleSubtask(st.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all bg-white ${
                            st.completed 
                              ? 'border-slate-100 opacity-60' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center ${st.completed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-350'}`}>
                            {st.completed && <CheckCircle className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-xs font-semibold ${st.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{st.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                      <Upload className="w-4 h-4 text-[#1E3A8A]" />
                      Expediente Digital
                    </h4>
                    
                    <div className="space-y-2 bg-[#FAFAFA] p-3 rounded-2xl border border-slate-200/60">
                      {['Cotización', 'Certificado Médico', 'Documento de Titularidad'].map(docType => {
                        const foundDoc = selectedService.documents?.find(d => d.type === docType);
                        return (
                          <div key={docType} className="flex items-center justify-between bg-white border border-slate-100 p-2.5 rounded-xl text-xs">
                            <span className="font-semibold text-slate-700">{docType}</span>
                            {foundDoc ? (
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-500 font-bold flex items-center gap-1 text-[10px]">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Listo
                                </span>
                                <a 
                                  href={foundDoc.path} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors font-bold text-[9px] flex items-center gap-0.5"
                                >
                                  <Eye className="w-3 h-3" /> Ver
                                </a>
                              </div>
                            ) : (
                              <label className={`bg-slate-50 hover:bg-slate-100 text-[#1E3A8A] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] transition-all cursor-pointer flex items-center gap-1 ${(selectedService.isLocked && currentUser.role !== ROLES.ADMIN) ? 'opacity-40 pointer-events-none' : ''}`}>
                                <Upload className="w-3 h-3" />
                                Subir PDF
                                <input 
                                  type="file" 
                                  accept=".pdf,.png,.jpg,.jpeg"
                                  className="hidden" 
                                  onChange={(e) => handleRealUpload(e, docType)} 
                                  disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                                />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Comentarios libres y notas internas (Bitácora) */}
                <div className="space-y-4 flex flex-col justify-between min-h-[350px]">
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                      <FileText className="w-4 h-4 text-[#1E3A8A]" />
                      Notas Internas de Seguimiento
                    </h4>

                    {/* Timeline box */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 max-h-[260px] overflow-y-auto">
                      {selectedService.notes && selectedService.notes.length > 0 ? (
                        selectedService.notes.map(note => (
                          <div key={note.id} className="bg-white border border-slate-150 p-3 rounded-xl space-y-1 shadow-sm">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-slate-800">{note.author}</span>
                              <span className="text-slate-400 font-medium">{new Date(note.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-650 leading-relaxed font-light">{note.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-8">No hay comentarios en este folio.</p>
                      )}
                    </div>
                  </div>

                  {/* Add comment form */}
                  <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                    <textarea
                      placeholder="Escriba un comentario o actualización libre..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] resize-none h-14"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim() || (selectedService.isLocked && currentUser.role !== ROLES.ADMIN)}
                      className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-xl px-3 py-2 text-xs font-bold shadow transition-colors flex items-center justify-center disabled:opacity-40 self-end"
                    >
                      Añadir
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* Contenido Pestaña 2: Expediente y Información Pública de Rastro */}
            {activeTab === 'expediente' && (
              <form onSubmit={handleSaveExpediente} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Seccion 1: Finanzas y lo Contratado */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-850 border-b pb-2 uppercase tracking-wider flex items-center gap-1.5">
                      💵 Finanzas y Contrato JAE
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Paquete / Servicio Contratado</label>
                        <input
                          type="text"
                          value={editPackage}
                          onChange={(e) => setEditPackage(e.target.value)}
                          disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Costo Total ($)</label>
                          <input
                            type="number"
                            value={editCost}
                            onChange={(e) => setEditCost(e.target.value)}
                            disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Estatus de Pago</label>
                          <select
                            value={editPaymentStatus}
                            onChange={(e) => setEditPaymentStatus(e.target.value)}
                            disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                          >
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="PAGADO">PAGADO</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Método de Pago</label>
                        <input
                          type="text"
                          placeholder="Ej. Tarjeta de Crédito, Transferencia"
                          value={editPaymentMethod}
                          onChange={(e) => setEditPaymentMethod(e.target.value)}
                          disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seccion 2: Datos Logísticos y Rastro de Homenaje Público */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-850 border-b pb-2 uppercase tracking-wider flex items-center gap-1.5 text-[#1E3A8A]">
                      ✨ Rastro Público & Velación
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Ubicación General de Velación</label>
                        <input
                          type="text"
                          placeholder="Ej. Capilla San Gabriel, Gomez Morin"
                          value={editWakeLocation}
                          onChange={(e) => setEditWakeLocation(e.target.value)}
                          disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Sala de Velación (Público)</label>
                          <input
                            type="text"
                            placeholder="Ej. Sala Cruz Mayor"
                            value={editWakeRoom}
                            onChange={(e) => setEditWakeRoom(e.target.value)}
                            disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Hora Cremación/Sepelio (Público)</label>
                          <input
                            type="datetime-local"
                            value={editCremationTime}
                            onChange={(e) => setEditCremationTime(e.target.value)}
                            disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Cosas Extras Solicitadas (Notas)</label>
                        <textarea
                          rows={2}
                          placeholder="Ej. Catering premium, flores adicionales, violinista..."
                          value={editExtras}
                          onChange={(e) => setEditExtras(e.target.value)}
                          disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                {/* Sección 3: Campos Extra (visibles o no al cliente) */}
                <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200 col-span-full">
                  <h4 className="font-bold text-xs text-slate-850 border-b pb-2 uppercase tracking-wider flex items-center gap-1.5 text-amber-700">
                    ✨ Campos Extra de Información (Del 1 al 5)
                  </h4>
                  <p className="text-[10px] text-slate-400 -mt-2">Cada campo tiene un título personalizable, su valor, y una casilla para decidir si el cliente puede verlo en la consulta de seguimiento.</p>

                  <div className="grid grid-cols-1 gap-4">
                    {editExtraFields.map((field, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Extra {i + 1}</span>
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={field.showToClient}
                              onChange={e => {
                                const updated = [...editExtraFields];
                                updated[i] = { ...updated[i], showToClient: e.target.checked };
                                setEditExtraFields(updated);
                              }}
                              disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                              className="w-3.5 h-3.5 rounded accent-[#1E3A8A]"
                            />
                            <span className={`text-[10px] font-semibold ${
                              field.showToClient ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {field.showToClient ? 'Visible al cliente' : 'Oculto al cliente'}
                            </span>
                          </label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] text-slate-400 font-bold block mb-1 uppercase">Título (etiqueta para el cliente)</label>
                            <input
                              type="text"
                              placeholder={`Ej. Sala asignada, Hora de flores...`}
                              value={field.title}
                              onChange={e => {
                                const updated = [...editExtraFields];
                                updated[i] = { ...updated[i], title: e.target.value };
                                setEditExtraFields(updated);
                              }}
                              disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 font-bold block mb-1 uppercase">Información / Valor</label>
                            <input
                              type="text"
                              placeholder={`Ej. Sala Norte B, 14:00 hrs...`}
                              value={field.value}
                              onChange={e => {
                                const updated = [...editExtraFields];
                                updated[i] = { ...updated[i], value: e.target.value };
                                setEditExtraFields(updated);
                              }}
                              disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

                <div className="flex justify-end gap-3 border-t pt-4">
                  <button
                    type="submit"
                    disabled={selectedService.isLocked && currentUser.role !== ROLES.ADMIN}
                    className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-40"
                  >
                    Guardar Cambios de Expediente
                  </button>
                </div>

              </form>
            )}

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-24 space-y-3">
            <Clipboard className="w-12 h-12 text-slate-200" />
            <p className="text-xs">Selecciona un folio a la izquierda para administrar el expediente logístico.</p>
          </div>
        )}
      </div>

      {/* Modal Crear Folio Ampliado */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-serif font-bold text-slate-900 text-xl border-b pb-3">Generar Ficha de Servicio</h3>
            
            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Cliente Contratista *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Sánchez"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Homenajeado / Finado *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Rosa Sánchez"
                    value={deceasedName}
                    onChange={(e) => setDeceasedName(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Orden de Servicio / Paquete Adquirido *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Aeternum Memorial Premium / Cremación Express"
                  value={orderService}
                  onChange={(e) => setOrderService(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              {/* Teléfonos de contacto (Máx 3) */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-150">
                <label className="text-xs text-slate-650 font-bold block mb-1">Teléfonos de Contacto (Máx. 3)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Teléfono 1 *"
                    required
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Teléfono 2"
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Teléfono 3"
                    value={phone3}
                    onChange={(e) => setPhone3(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Notas Iniciales</label>
                <textarea
                  rows={3}
                  placeholder="Ej. Se solicita preparar capilla San Gabriel para el viernes por la mañana..."
                  value={initialNotes}
                  onChange={(e) => setInitialNotes(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
                >
                  Generar Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CRMModule({ leads, setLeads, currentUser, addAuditLog, crmColumns, customFormFields, contactMethods, activeUsers, crmForms, setCrmForms, crmFormSubmissions, setCrmFormSubmissions, events, setEvents, triggerNotification, triggerConfirm, setCelebration }) {
  const [draggedLead, setDraggedLead] = useState(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadContactMethod, setNewLeadContactMethod] = useState('');
  const [newLeadFirstNote, setNewLeadFirstNote] = useState('');
  const [newLeadNextActivity, setNewLeadNextActivity] = useState('');
  const [newLeadStage, setNewLeadStage] = useState('');
  const [newLeadServiceOffered, setNewLeadServiceOffered] = useState('');
  const [newLeadQuoteAmount, setNewLeadQuoteAmount] = useState('');
  const [fieldValues, setFieldValues] = useState({});

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('ALL');

  // Papelera
  const [showTrashModal, setShowTrashModal] = useState(false);

  // Detalle de Lead
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('notes'); // 'notes', 'docs'
  const [newNoteText, setNewNoteText] = useState('');
  const [newDocTitle, setNewDocTitle] = useState('');

  // Edición del Lead en Detalle
  const [editingLeadName, setEditingLeadName] = useState('');
  const [editingLeadPhone, setEditingLeadPhone] = useState('');
  const [editingLeadEmail, setEditingLeadEmail] = useState('');
  const [editingLeadStage, setEditingLeadStage] = useState('');
  const [editingLeadContactMethod, setEditingLeadContactMethod] = useState('');
  const [editingLeadNextActivity, setEditingLeadNextActivity] = useState('');
  const [editingLeadServiceOffered, setEditingLeadServiceOffered] = useState('');
  const [editingLeadQuoteAmount, setEditingLeadQuoteAmount] = useState('');
  const [editingCustomFields, setEditingCustomFields] = useState({});
  const [editingLeadAssignedTo, setEditingLeadAssignedTo] = useState('');
  const [newNoteType, setNewNoteType] = useState('general');
  const [selectedLeadFile, setSelectedLeadFile] = useState(null);
  const [uploadingLeadDoc, setUploadingLeadDoc] = useState(false);

  const getActivityAlert = (dateStr) => {
    if (!dateStr) return { label: 'Sin Actividad', colorClass: 'text-slate-400', badgeClass: 'bg-slate-50 text-slate-400 border border-slate-200' };
    try {
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const [year, month, day] = dateStr.split('-').map(Number);
      const activityDate = new Date(year, month - 1, day);
      activityDate.setHours(0,0,0,0);
      
      const diffTime = activityDate.getTime() - today.getTime();
      
      if (diffTime < 0) {
        return { 
          label: 'Vencido', 
          colorClass: 'text-red-500 font-semibold', 
          badgeClass: 'bg-red-50 text-red-650 border border-red-200 font-bold text-[9px] px-1.5 py-0.5 rounded',
          desc: 'Seguimiento atrasado'
        };
      } else if (diffTime === 0) {
        return { 
          label: 'Hoy', 
          colorClass: 'text-amber-600 font-semibold', 
          badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[9px] px-1.5 py-0.5 rounded',
          desc: 'Atención hoy'
        };
      } else {
        return { 
          label: 'Pendiente', 
          colorClass: 'text-emerald-500 font-semibold', 
          badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[9px] px-1.5 py-0.5 rounded',
          desc: 'Programada'
        };
      }
    } catch (err) {
      return { label: 'Sin Actividad', colorClass: 'text-slate-400', badgeClass: 'bg-slate-50 text-slate-400 border border-slate-200' };
    }
  };

  const handleDragStart = (lead) => {
    if (currentUser.role === ROLES.EMPLEADO && lead.createdBy !== currentUser.id) {
      triggerNotification("No permitido: Los empleados solo pueden arrastrar y gestionar sus prospectos.", "error");
      return;
    }
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetStage) => {
    if (!draggedLead) return;
    
    const oldVal = { ...draggedLead };
    const newVal = { ...draggedLead, stage: targetStage };

    const updated = leads.map(l => {
      if (l.id === draggedLead.id) {
        return newVal;
      }
      return l;
    });

    setLeads(updated);
    addAuditLog('leads', draggedLead.id, 'UPDATE', oldVal, newVal);
    setDraggedLead(null);
    
    if (targetStage === 'CIERRE') {
      setCelebration({ show: true, leadName: newVal.name });
    }
  };

  const handleToggleLeadPriority = (leadId, e) => {
    if (e) e.stopPropagation();
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;
    
    if (currentUser.role === ROLES.EMPLEADO && targetLead.createdBy !== currentUser.id) {
      triggerNotification("No permitido: Los empleados solo pueden gestionar sus propios prospectos.", "error");
      return;
    }

    const oldVal = { ...targetLead };
    const newVal = { ...targetLead, isHot: !targetLead.isHot };
    
    const updated = leads.map(l => l.id === leadId ? newVal : l);
    setLeads(updated);
    addAuditLog('leads', leadId, 'UPDATE', oldVal, newVal);
    triggerNotification(`Prospecto "${targetLead.name}" ${newVal.isHot ? 'marcado como Prioritario 🔥' : 'removido de prioridades'}.`);
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;

    const initialStage = newLeadStage || crmColumns[0] || 'FRIO';
    const firstNoteText = newLeadFirstNote.trim();

    const newLead = {
      id: 'lead_' + Date.now(),
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: newLeadEmail.trim(),
      stage: initialStage,
      assignedTo: currentUser.id,
      createdBy: currentUser.id,
      contactMethod: newLeadContactMethod || (contactMethods && contactMethods[0]) || '',
      firstNote: firstNoteText,
      nextActivityDate: newLeadNextActivity,
      serviceOffered: newLeadServiceOffered.trim(),
      quoteAmount: newLeadQuoteAmount ? parseFloat(newLeadQuoteAmount) : 0,
      customFields: fieldValues,
      notes: firstNoteText ? [{
        id: 'ln_' + Date.now(),
        author: currentUser.name || 'Usuario',
        text: firstNoteText,
        timestamp: new Date().toISOString()
      }] : [],
      documents: [],
      isDiscarded: false
    };

    setLeads([...leads, newLead]);
    addAuditLog('leads', newLead.id, 'INSERT', null, newLead);
    setShowAddLeadModal(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadContactMethod('');
    setNewLeadFirstNote('');
    setNewLeadNextActivity('');
    setNewLeadStage('');
    setNewLeadServiceOffered('');
    setNewLeadQuoteAmount('');
    setFieldValues({});
    triggerNotification(`Prospecto "${newLead.name}" añadido.`);
  };

  // Restaurar Lead (Restringido a ADMIN)
  const handleRestoreLead = (leadId) => {
    if (currentUser.role !== ROLES.ADMIN) {
      triggerNotification("Acceso denegado: Solo los administradores pueden restaurar prospectos.", "error");
      return;
    }
    const leadToRestore = leads.find(l => l.id === leadId);
    const oldVal = { ...leadToRestore };
    const newVal = { ...leadToRestore, isDiscarded: false };
    const updated = leads.map(l => l.id === leadId ? newVal : l);
    setLeads(updated);
    addAuditLog('leads', leadId, 'UPDATE', oldVal, newVal);
    triggerNotification("Prospecto restaurado al embudo de ventas.");
  };

  // Eliminar Permanente (Restringido a ADMIN)
  const handlePermanentDeleteLead = (leadId) => {
    if (currentUser.role !== ROLES.ADMIN) {
      triggerNotification("Acceso denegado: Solo los administradores pueden eliminar prospectos permanentemente.", "error");
      return;
    }
    triggerConfirm("¿Está seguro de eliminar permanentemente este prospecto? Esta acción no se puede deshacer.", () => {
      const leadToDelete = leads.find(l => l.id === leadId);
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      addAuditLog('leads', leadId, 'DELETE', leadToDelete, null);
      triggerNotification("Prospecto eliminado de forma permanente.");
    });
  };

  // Guardar Cambios Generales
  const handleSaveLeadGeneral = (e) => {
    e.preventDefault();
    if (!editingLeadName.trim()) return;
    const oldVal = { ...selectedLead };
    const newStage = editingLeadStage || selectedLead.stage;
    const isReassigned = currentUser.role === ROLES.ADMIN && editingLeadAssignedTo && editingLeadAssignedTo !== selectedLead.assignedTo;
    const newVal = {
      ...selectedLead,
      name: editingLeadName.trim(),
      phone: editingLeadPhone.trim(),
      email: editingLeadEmail.trim(),
      stage: newStage,
      contactMethod: editingLeadContactMethod,
      nextActivityDate: editingLeadNextActivity,
      serviceOffered: editingLeadServiceOffered.trim(),
      quoteAmount: editingLeadQuoteAmount !== '' ? parseFloat(editingLeadQuoteAmount) : selectedLead.quoteAmount,
      customFields: editingCustomFields,
      assignedTo: currentUser.role === ROLES.ADMIN ? (editingLeadAssignedTo || selectedLead.assignedTo) : selectedLead.assignedTo
    };
    const updated = leads.map(l => l.id === selectedLead.id ? newVal : l);
    setLeads(updated);
    setSelectedLead(newVal);
    addAuditLog('leads', selectedLead.id, 'UPDATE', oldVal, newVal);
    
    if (isReassigned) {
      const newAgentName = activeUsers.find(u => u.id === editingLeadAssignedTo)?.name || editingLeadAssignedTo;
      triggerNotification(`Prospecto reasignado con éxito a ${newAgentName}.`);
    } else {
      triggerNotification("Cambios de información general guardados.");
    }
  };

  // Descartar Prospecto (mover a papelera)
  const handleDiscardLead = () => {
    const oldVal = { ...selectedLead };
    const newVal = { ...selectedLead, isDiscarded: true };
    const updated = leads.map(l => l.id === selectedLead.id ? newVal : l);
    setLeads(updated);
    addAuditLog('leads', selectedLead.id, 'UPDATE', oldVal, newVal);
    setSelectedLead(null);
    triggerNotification("Prospecto enviado a la papelera.");
  };

  // Agregar Nota / Historial
  const handleAddLeadNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      id: 'ln_' + Date.now(),
      author: currentUser.name || 'Usuario',
      text: newNoteText.trim(),
      type: newNoteType || 'general',
      timestamp: new Date().toISOString()
    };

    const oldVal = { ...selectedLead };
    const currentNotes = selectedLead.notes || [];
    const newVal = {
      ...selectedLead,
      notes: [...currentNotes, newNote]
    };

    const updated = leads.map(l => l.id === selectedLead.id ? newVal : l);
    setLeads(updated);
    setSelectedLead(newVal);
    addAuditLog('leads', selectedLead.id, 'UPDATE', oldVal, newVal);
    setNewNoteText('');
    setNewNoteType('general');
  };

  // Carga Real de Documento de Cliente en Base64
  const handleLeadFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2097152) {
      triggerNotification("Error: El archivo excede el límite de peso de 2MB.", "error");
      return;
    }

    setUploadingLeadDoc(true);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;

      const newDoc = {
        id: 'ldoc_' + Date.now(),
        title: file.name,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB',
        fileType: file.type,
        timestamp: new Date().toISOString(),
        fileData: base64Data,
        path: `/expedientes/leads/${selectedLead.id}/${file.name.toLowerCase().replace(/\s+/g, '_')}`
      };

      const oldVal = { ...selectedLead };
      const currentDocs = selectedLead.documents || [];
      const newVal = {
        ...selectedLead,
        documents: [...currentDocs, newDoc]
      };

      const updated = leads.map(l => l.id === selectedLead.id ? newVal : l);
      setLeads(updated);
      setSelectedLead(newVal);
      addAuditLog('leads', selectedLead.id, 'UPDATE', oldVal, newVal);
      setUploadingLeadDoc(false);
      triggerNotification(`Archivo "${file.name}" cargado con éxito.`);
    };
    reader.onerror = () => {
      setUploadingLeadDoc(false);
      triggerNotification("Error al leer el archivo físico.", "error");
    };
    reader.readAsDataURL(file);
  };

  // Eliminar Documento del Expediente del Lead
  const handleDeleteLeadDoc = (docId) => {
    triggerConfirm("¿Está seguro de eliminar este documento del expediente del cliente?", () => {
      const oldVal = { ...selectedLead };
      const currentDocs = selectedLead.documents || [];
      const targetDoc = currentDocs.find(d => d.id === docId);
      const newVal = {
        ...selectedLead,
        documents: currentDocs.filter(d => d.id !== docId)
      };

      const updated = leads.map(l => l.id === selectedLead.id ? newVal : l);
      setLeads(updated);
      setSelectedLead(newVal);
      addAuditLog('leads', selectedLead.id, 'UPDATE', oldVal, newVal);
      triggerNotification(`Documento "${targetDoc ? targetDoc.title : 'documento'}" eliminado.`);
    });
  };

  return (
    <div className="space-y-6 flex-1">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900">Prospectos y Ventas (CRM)</h3>
          <p className="text-xs text-slate-500">
            {currentUser.role === ROLES.ADMIN
              ? 'Vista de administrador · Todos los prospectos del equipo'
              : 'Vista personal · Solo tus prospectos y métricas'}
          </p>
        </div>
        <button
          onClick={() => {
            setNewLeadStage(crmColumns[0] || '');
            setNewLeadContactMethod((contactMethods && contactMethods[0]) || '');
            setShowAddLeadModal(true);
          }}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Oportunidad
        </button>
      </div>

      {/* Panel de Métricas Acumuladas por Rol */}
      {(() => {
        const myLeads = leads.filter(l =>
          !l.isDiscarded && (currentUser.role === ROLES.ADMIN || l.createdBy === currentUser.id)
        );
        const totalCotizado = myLeads.reduce((sum, l) => sum + (parseFloat(l.quoteAmount) || 0), 0);
        const hotLeads = myLeads.filter(l => l.isHot).length;
        const closingLeads = myLeads.filter(l => l.stage === crmColumns[crmColumns.length - 1]).length;
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] text-white p-4 rounded-2xl shadow-md flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-75">
                {currentUser.role === ROLES.ADMIN ? 'Total Prospectos' : 'Mis Prospectos'}
              </span>
              <span className="text-3xl font-bold mt-2">{myLeads.length}</span>
              <span className="text-[9px] opacity-60 mt-1">activos en embudo</span>
            </div>
            <div className="bg-white border border-emerald-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Pipeline Cotizado</span>
              <span className="text-2xl font-bold mt-2 text-emerald-700">
                ${totalCotizado.toLocaleString('es-MX')}
              </span>
              <span className="text-[9px] text-slate-400 mt-1">suma de cotizaciones</span>
            </div>
            <div className="bg-white border border-amber-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Prospectos Calientes</span>
              <span className="text-2xl font-bold mt-2 text-amber-600">{hotLeads}</span>
              <span className="text-[9px] text-slate-400 mt-1">marcados como prioritarios</span>
            </div>
            <div className="bg-white border border-purple-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">En Etapa de Cierre</span>
              <span className="text-2xl font-bold mt-2 text-purple-600">{closingLeads}</span>
              <span className="text-[9px] text-slate-400 mt-1">{crmColumns[crmColumns.length - 1] || '—'}</span>
            </div>
          </div>
        );
      })()}

      {/* Barra de Filtros y Papelera */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar prospecto por nombre, tel o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-450 font-bold uppercase tracking-wider">Asesor Asignado:</span>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-[#FAFAFA] border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-750 font-semibold focus:outline-none focus:border-[#1E3A8A] transition-all"
            >
              <option value="ALL">Todos los Asesores</option>
              {activeUsers && activeUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowTrashModal(true)}
          className="bg-slate-50 hover:bg-slate-105 border border-slate-205 text-slate-650 font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-sm"
        >
          <Trash className="w-3.5 h-3.5 text-red-500" />
          Ver Papelera ({leads.filter(l => l.isDiscarded && (currentUser.role === ROLES.ADMIN || l.createdBy === currentUser.id)).length})
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {crmColumns.map(col => {
          const columnLeads = leads.filter(l => {
            if (l.stage !== col) return false;
            if (l.isDiscarded) return false;
            
            // Un empleado corporativo regular solo puede ver lo que él mismo creó
            if (currentUser.role === ROLES.EMPLEADO && l.createdBy !== currentUser.id) return false;

            // Filtro de búsqueda
            if (searchTerm.trim() !== '') {
              const q = searchTerm.toLowerCase();
              const nameMatch = l.name && l.name.toLowerCase().includes(q);
              const phoneMatch = l.phone && l.phone.toLowerCase().includes(q);
              const emailMatch = l.email && l.email.toLowerCase().includes(q);
              if (!nameMatch && !phoneMatch && !emailMatch) return false;
            }

            // Filtro de agente
            if (selectedAgent !== 'ALL' && l.assignedTo !== selectedAgent) return false;

            return true;
          });

          return (
            <div
              key={col}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col)}
              className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col min-h-[460px] shadow-sm"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-700 tracking-wider uppercase">{col}</span>
                <span className="bg-slate-100 px-2.5 py-0.5 rounded-full text-[10px] text-slate-500 font-bold">
                  {columnLeads.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1">
                {columnLeads.map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    onClick={() => {
                      setSelectedLead(lead);
                      setEditingLeadName(lead.name || '');
                      setEditingLeadPhone(lead.phone || '');
                      setEditingLeadEmail(lead.email || '');
                      setEditingLeadStage(lead.stage || crmColumns[0] || '');
                      setEditingLeadContactMethod(lead.contactMethod || '');
                      setEditingLeadNextActivity(lead.nextActivityDate || '');
                      setEditingLeadServiceOffered(lead.serviceOffered || '');
                      setEditingLeadQuoteAmount(lead.quoteAmount != null ? String(lead.quoteAmount) : '');
                      setEditingCustomFields(lead.customFields || {});
                      setEditingLeadAssignedTo(lead.assignedTo || '');
                      setActiveDetailTab('notes');
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all select-none space-y-2.5 group shadow-sm hover:shadow-md relative overflow-hidden ${
                      lead.isHot 
                        ? 'border border-amber-300 bg-gradient-to-br from-amber-50/10 via-[#FAFAFA] to-white shadow-[0_0_10px_rgba(245,158,11,0.1)] hover:border-amber-400' 
                        : 'border border-slate-200/80 bg-[#FAFAFA] hover:border-[#1E3A8A]'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <div className="flex items-center gap-1.5 max-w-[70%]">
                        {lead.isHot && <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce shrink-0" />}
                        <h4 className="font-semibold text-xs text-slate-800 group-hover:text-[#1E3A8A] transition-colors truncate">{lead.name}</h4>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => handleToggleLeadPriority(lead.id, e)}
                          className={`p-1 rounded-lg transition-colors hover:bg-slate-100 ${lead.isHot ? 'text-amber-500' : 'text-slate-350 hover:text-amber-400'}`}
                          title={lead.isHot ? "Marcado como Prioritario" : "Marcar como Prioritario"}
                        >
                          <Star className={`w-3.5 h-3.5 ${lead.isHot ? 'fill-amber-400 text-amber-500' : ''}`} />
                        </button>
                        <span className="text-[8px] bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-400 font-mono">
                          {lead.id.replace('lead_', '')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-[10px] text-slate-400 font-medium">
                      {lead.phone && <p>📞 {lead.phone}</p>}
                      {lead.email && <p>✉️ {lead.email}</p>}
                    </div>

                    {(lead.serviceOffered || lead.quoteAmount != null) && (
                      <div className="flex justify-between items-center text-[10px] border-t border-slate-200/50 pt-2 text-slate-500 font-medium">
                        <span className="truncate max-w-[65%] text-slate-600 font-semibold">{lead.serviceOffered || 'Sin servicio'}</span>
                        <span className="text-emerald-600 font-bold font-mono shrink-0">${(lead.quoteAmount || 0).toLocaleString('es-MX')}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-2 text-[9px]">
                      <span className="text-slate-450 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        {lead.nextActivityDate ? lead.nextActivityDate : 'Sin actividad'}
                      </span>
                      {(() => {
                        const alert = getActivityAlert(lead.nextActivityDate);
                        return (
                          <span className={alert.badgeClass} title={alert.desc}>
                            {alert.label}
                          </span>
                        );
                      })()}
                    </div>

                    {Object.keys(lead.customFields || {}).length > 0 && (
                      <div className="border-t border-slate-200/40 pt-2 space-y-1.5">
                        {Object.entries(lead.customFields).map(([k, v]) => (
                          <div key={k} className="text-[9px] bg-white px-2 py-1 rounded-lg border border-slate-100 text-slate-550 flex justify-between items-center">
                            <span className="font-bold text-slate-700">{k}:</span> 
                            <span className="truncate max-w-[120px]">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {columnLeads.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic py-16 border border-dashed border-slate-200 rounded-2xl">
                    Arrastra aquí
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Añadir Lead */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-xl">Registrar Nuevo Prospecto</h3>
                <p className="text-xs text-slate-400 mt-0.5">Completa la ficha básica del prospecto para iniciar su seguimiento en el CRM.</p>
              </div>
              <button onClick={() => setShowAddLeadModal(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-semibold">Cancelar</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              {/* Datos de Contacto */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Datos de Contacto</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-semibold block">Nombre / Familia *</label>
                    <input type="text" required placeholder="Ej. Familia Garza Morales"
                      value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold block">Teléfono</label>
                    <input type="text" placeholder="Ej. 81-1234-5678"
                      value={newLeadPhone} onChange={(e) => setNewLeadPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold block">Correo Electrónico</label>
                    <input type="email" placeholder="Ej. garza@prevision.com"
                      value={newLeadEmail} onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold block">Método de Contacto *</label>
                    <select required value={newLeadContactMethod} onChange={(e) => setNewLeadContactMethod(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#1E3A8A]">
                      {(contactMethods || []).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-semibold block">Fecha Siguiente Actividad *</label>
                    <input type="date" required value={newLeadNextActivity} onChange={(e) => setNewLeadNextActivity(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>
                </div>
              </div>

              {/* Cotización */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/70 space-y-3">
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest block">Cotización / Oportunidad de Venta</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-semibold block">Servicio / Producto Ofertado *</label>
                    <input type="text" required placeholder="Ej. Plan Aeternum Premium, Cremación Express"
                      value={newLeadServiceOffered} onChange={(e) => setNewLeadServiceOffered(e.target.value)}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-500 font-semibold block">Monto Cotizado (MXN) *</label>
                    <input type="number" required min="0" placeholder="Ej. 45000"
                      value={newLeadQuoteAmount} onChange={(e) => setNewLeadQuoteAmount(e.target.value)}
                      className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Embudo y Nota Inicial */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Seguimiento Inicial</span>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-semibold block">Etapa Inicial en el Embudo</label>
                  <select value={newLeadStage} onChange={(e) => setNewLeadStage(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-[#1E3A8A]">
                    {crmColumns.map(col => <option key={col} value={col}>{col}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-semibold block">Primera Nota / Intento de Venta *</label>
                  <textarea required rows={3} placeholder="Describe el contexto del prospecto: qué busca, cómo se contactó, qué le interesa..."
                    value={newLeadFirstNote} onChange={(e) => setNewLeadFirstNote(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] resize-none" />
                </div>
              </div>

              {customFormFields.length > 0 && (
                <div className="space-y-3 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Campos Adicionales</span>
                  {customFormFields.map(fieldName => (
                    <div key={fieldName} className="space-y-1.5 bg-[#FAFAFA] p-3 rounded-xl border border-slate-200/60">
                      <label className="text-xs text-[#081225] font-bold block">{fieldName}</label>
                      <input type="text" placeholder={`Completar ${fieldName}`}
                        onChange={(e) => setFieldValues({ ...fieldValues, [fieldName]: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowAddLeadModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  Cancelar
                </button>
                <button type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md">
                  Registrar Prospecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Papelera (Prospectos Descartados) */}
      {showTrashModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full space-y-6 flex flex-col max-h-[85vh] shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Trash className="w-5 h-5 text-red-500" />
                  Bote de Basura (Prospectos Descartados)
                </h3>
                <p className="text-xs text-slate-450 mt-0.5">Listado de oportunidades archivadas. Los filtros del Kanban no aplican aquí.</p>
              </div>
              <button
                onClick={() => setShowTrashModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {leads.filter(l => l.isDiscarded && (currentUser.role === ROLES.ADMIN || l.createdBy === currentUser.id)).map(lead => (
                <div key={lead.id} className="bg-[#FAFAFA] border border-slate-200 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-800">{lead.name}</h4>
                      <span className="text-[9px] bg-slate-200 text-slate-550 font-bold px-1.5 py-0.5 rounded uppercase">{lead.stage}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">📞 {lead.phone || 'Sin tel'} | ✉️ {lead.email || 'Sin correo'}</p>
                    <span className="text-[9px] text-slate-400 block">Asesor asignado: {activeUsers.find(u => u.id === lead.assignedTo)?.name || lead.assignedTo}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestoreLead(lead.id)}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${
                        currentUser.role === ROLES.ADMIN
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
                          : 'bg-slate-100 text-slate-350 cursor-not-allowed border border-slate-200'
                      }`}
                      title={currentUser.role === ROLES.ADMIN ? "Restaurar" : "Solo Administradores"}
                    >
                      Restaurar
                    </button>
                    <button
                      onClick={() => handlePermanentDeleteLead(lead.id)}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${
                        currentUser.role === ROLES.ADMIN
                          ? 'bg-red-50 hover:bg-red-100 text-red-500 border border-red-200'
                          : 'bg-slate-100 text-slate-350 cursor-not-allowed border border-slate-200'
                      }`}
                      title={currentUser.role === ROLES.ADMIN ? "Eliminar Permanente" : "Solo Administradores"}
                    >
                      <Trash className="w-3.5 h-3.5" />
                      Eliminar Permanente
                    </button>
                  </div>
                </div>
              ))}

              {leads.filter(l => l.isDiscarded && (currentUser.role === ROLES.ADMIN || l.createdBy === currentUser.id)).length === 0 && (
                <div className="py-16 text-center text-slate-400 text-xs italic">
                  Papelera vacía. No hay prospectos descartados.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Ficha Detallada / Perfil del Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-4xl w-full space-y-6 flex flex-col max-h-[90vh] shadow-2xl relative">
            
            {/* Header del Perfil */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-slate-900 text-xl">{selectedLead.name}</h3>
                  <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedLead.stage}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-mono">Expediente ID: {selectedLead.id}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-3.5 py-2 rounded-xl text-xs font-semibold"
              >
                Cerrar Ficha
              </button>
            </div>

            {/* Cuerpo en Dos Columnas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 overflow-y-auto pr-1">
              
              {/* Columna Izquierda: Edición de Datos */}
              <form onSubmit={handleSaveLeadGeneral} className="md:col-span-5 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-155 flex flex-col justify-between overflow-y-auto max-h-[600px]">
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Información del Prospecto</span>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Nombre / Familia</label>
                    <input type="text" required value={editingLeadName}
                      onChange={(e) => setEditingLeadName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Teléfono</label>
                    <input type="text" value={editingLeadPhone}
                      onChange={(e) => setEditingLeadPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Correo Electrónico</label>
                    <input type="email" value={editingLeadEmail}
                      onChange={(e) => setEditingLeadEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Método de Contacto</label>
                    <select value={editingLeadContactMethod}
                      onChange={(e) => setEditingLeadContactMethod(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#1E3A8A]">
                      {(contactMethods || []).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Fecha Siguiente Actividad</label>
                    <input type="date" value={editingLeadNextActivity}
                      onChange={(e) => setEditingLeadNextActivity(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#1E3A8A]" />
                  </div>

                  {/* Asesor Asignado */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Asesor Asignado</label>
                    {currentUser.role === ROLES.ADMIN ? (
                      <select 
                        value={editingLeadAssignedTo}
                        onChange={(e) => setEditingLeadAssignedTo(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#1E3A8A]"
                      >
                        {activeUsers && activeUsers.map(u => (
                          <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="bg-slate-100 text-slate-600 text-xs px-3 py-2.5 rounded-xl border border-slate-200/40 font-semibold">
                        👤 {activeUsers.find(u => u.id === editingLeadAssignedTo)?.name || editingLeadAssignedTo || 'Sin asignar'}
                      </div>
                    )}
                  </div>

                  {/* Cambio de Etapa Manual (para móvil) */}
                  <div className="space-y-1 pt-2 border-t border-slate-200/60">
                    <label className="text-[10px] text-[#1E3A8A] font-bold uppercase tracking-wide">Etapa en el Embudo</label>
                    <select value={editingLeadStage}
                      onChange={(e) => setEditingLeadStage(e.target.value)}
                      className="w-full bg-[#1E3A8A]/5 border border-[#1E3A8A]/20 rounded-xl px-3 py-2 text-xs text-[#1E3A8A] font-bold focus:outline-none focus:border-[#1E3A8A]">
                      {crmColumns.map(col => <option key={col} value={col}>{col}</option>)}
                    </select>
                    <p className="text-[9px] text-slate-400 italic">Arrastra la tarjeta en escritorio o selecciona aquí para cambiar la etapa.</p>
                  </div>

                  {/* Sección Cotización */}
                  <div className="space-y-2 pt-2 border-t border-emerald-200/60">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Cotización</span>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Servicio / Producto Ofertado</label>
                      <input type="text" placeholder="Ej. Plan Aeternum Premium" value={editingLeadServiceOffered}
                        onChange={(e) => setEditingLeadServiceOffered(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Monto Cotizado ($MXN)</label>
                      <input type="number" min="0" placeholder="Ej. 45000" value={editingLeadQuoteAmount}
                        onChange={(e) => setEditingLeadQuoteAmount(e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>

                  {/* Campos dinámicos del Form Builder */}
                  {customFormFields && customFormFields.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-3">
                      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Datos Personalizados</span>
                      {customFormFields.map(f => (
                        <div key={f} className="space-y-1">
                          <label className="text-[10px] text-[#081225] font-bold block">{f}</label>
                          <input type="text" value={editingCustomFields[f] || ''}
                            onChange={(e) => setEditingCustomFields({ ...editingCustomFields, [f]: e.target.value })}
                            placeholder={`Completar ${f}`}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1E3A8A]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-2.5">
                  <button type="submit"
                    className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md">
                    Guardar Cambios
                  </button>

                  <button type="button" onClick={handleDiscardLead}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-550 border border-red-200 font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm">
                    Descartar Prospecto (Papelera)
                  </button>
                </div>
              </form>

              {/* Columna Derecha: Bitácora de Seguimiento & Archivero */}
              <div className="md:col-span-7 flex flex-col h-full border border-slate-200 rounded-2xl overflow-hidden bg-white">
                
                {/* Tabs de la Ficha */}
                <div className="flex border-b border-slate-150 bg-slate-50">
                  <button
                    onClick={() => setActiveDetailTab('notes')}
                    className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                      activeDetailTab === 'notes'
                        ? 'border-[#1E3A8A] text-[#1E3A8A] bg-white'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    📜 Bitácora de Seguimiento
                  </button>
                  <button
                    onClick={() => setActiveDetailTab('docs')}
                    className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                      activeDetailTab === 'docs'
                        ? 'border-[#1E3A8A] text-[#1E3A8A] bg-white'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    📂 Archivero del Cliente
                  </button>
                </div>

                {/* Contenido Pestañas */}
                <div className="p-4 flex-1 flex flex-col justify-between min-h-[360px] max-h-[480px]">
                  
                  {activeDetailTab === 'notes' && (
                    <div className="flex flex-col h-full justify-between">
                      {/* Timeline/Chat notes scrollable list */}
                      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 max-h-[300px]">
                        {selectedLead.notes && selectedLead.notes.map(note => {
                          const getNoteTypeDetails = (type) => {
                            switch(type) {
                              case 'llamada':
                                return { icon: <Phone className="w-3 h-3 text-blue-500" />, label: 'Llamada', bgClass: 'bg-blue-50/70 border-blue-200' };
                              case 'whatsapp':
                                return { icon: <MessageSquare className="w-3 h-3 text-emerald-500" />, label: 'WhatsApp', bgClass: 'bg-emerald-50/70 border-emerald-200' };
                              case 'correo':
                                return { icon: <Mail className="w-3 h-3 text-indigo-500" />, label: 'Correo', bgClass: 'bg-indigo-50/70 border-indigo-200' };
                              case 'reunion':
                                return { icon: <Users className="w-3 h-3 text-purple-500" />, label: 'Reunión', bgClass: 'bg-purple-50/70 border-purple-200' };
                              case 'cotizacion':
                                return { icon: <FileText className="w-3 h-3 text-amber-500" />, label: 'Cotización', bgClass: 'bg-amber-50/70 border-amber-200' };
                              default:
                                return { icon: <Clipboard className="w-3 h-3 text-slate-500" />, label: 'Nota', bgClass: 'bg-slate-50/80 border-slate-200' };
                            }
                          };
                          
                          const details = getNoteTypeDetails(note.type);
                          const isSelf = note.author === currentUser.name;
                          
                          return (
                            <div
                              key={note.id}
                              className={`p-3.5 rounded-2xl max-w-[85%] border shadow-sm ${
                                isSelf
                                  ? `${details.bgClass} ml-auto text-right`
                                  : 'bg-[#FAFAFA] border-slate-200 mr-auto text-left'
                              }`}
                            >
                              <div className="flex justify-between items-center gap-4 mb-1.5 pb-1 border-b border-slate-200/40">
                                <div className="flex items-center gap-1.5">
                                  {details.icon}
                                  <span className="font-bold text-[10px] text-slate-700">{note.author}</span>
                                  <span className="text-[8px] bg-white border px-1 rounded font-semibold text-slate-400 font-mono uppercase shrink-0">{details.label}</span>
                                </div>
                                <span className="text-[8px] text-slate-400 font-mono shrink-0">{new Date(note.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">{note.text}</p>
                            </div>
                          );
                        })}

                        {(!selectedLead.notes || selectedLead.notes.length === 0) && (
                          <div className="py-12 text-center text-slate-400 text-xs italic">
                            No hay notas de seguimiento registradas. Agrega una abajo para iniciar la bitácora.
                          </div>
                        )}
                      </div>

                      {/* Note Input Form */}
                      <form onSubmit={handleAddLeadNote} className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Tipo de Interacción:</span>
                          <select 
                            value={newNoteType}
                            onChange={(e) => setNewNoteType(e.target.value)}
                            className="bg-[#FAFAFA] border border-slate-200 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 font-semibold focus:outline-none focus:border-[#1E3A8A]"
                          >
                            <option value="general">📝 Nota General</option>
                            <option value="llamada">📞 Llamada Telefónica</option>
                            <option value="whatsapp">💬 WhatsApp / Chat</option>
                            <option value="correo">✉️ Correo Electrónico</option>
                            <option value="reunion">🤝 Reunión / Visita</option>
                            <option value="cotizacion">📄 Cotización Entregada</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Escriba un comentario o actualización de seguimiento..."
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            className="flex-1 bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                          />
                          <button
                            type="submit"
                            className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold text-xs px-4 rounded-xl shadow-md transition-all flex items-center"
                          >
                            Añadir Nota
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeDetailTab === 'docs' && (
                    <div className="flex flex-col h-full justify-between">
                      {/* Document Scrollable cabinet list */}
                      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 max-h-[300px]">
                        {selectedLead.documents && selectedLead.documents.map(doc => (
                          <div key={doc.id} className="bg-[#FAFAFA] border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between hover:border-slate-350 transition-colors shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-100 text-sky-500 shrink-0">
                                <FileText className="w-6 h-6" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs text-slate-800 truncate max-w-[200px]" title={doc.title}>{doc.title}</h5>
                                <p className="text-[9px] text-slate-450 font-mono mt-0.5">
                                  {doc.fileSize || '---'} · {doc.fileType ? doc.fileType.split('/')[1]?.toUpperCase() : 'PDF'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1 shrink-0">
                              <span className="text-[8px] text-slate-400 font-mono">{new Date(doc.timestamp).toLocaleString()}</span>
                              <div className="flex items-center gap-2 mt-1">
                                {doc.fileData ? (
                                  <a
                                    href={doc.fileData}
                                    download={doc.title}
                                    className="text-[#1E3A8A] hover:underline text-[10px] font-bold flex items-center gap-0.5"
                                  >
                                    <Download className="w-3 h-3" />
                                    Descargar
                                  </a>
                                ) : (
                                  <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); triggerNotification(`Simulación de descarga para: ${doc.title}`); }}
                                    className="text-[#1E3A8A] hover:underline text-[10px] font-bold"
                                  >
                                    Descargar (Simulado)
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLeadDoc(doc.id)}
                                  className="text-red-500 hover:text-red-700 p-0.5 transition-colors"
                                  title="Eliminar archivo"
                                >
                                  <Trash className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {(!selectedLead.documents || selectedLead.documents.length === 0) && (
                          <div className="py-12 text-center text-slate-400 text-xs italic">
                            No hay archivos adjuntos para este prospecto. Use el formulario inferior para cargar documentos.
                          </div>
                        )}
                      </div>

                      {/* File upload input real */}
                      <div className="pt-2 border-t border-slate-100">
                        {uploadingLeadDoc ? (
                          <div className="flex items-center justify-center py-3 text-xs text-slate-500 font-medium gap-2">
                            <span className="animate-spin text-slate-400">⏳</span>
                            Procesando y codificando archivo...
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block">Cargar nuevo archivo (PDF, Imagen, Contratos - Máx. 2MB)</label>
                            <input
                              type="file"
                              onChange={handleLeadFileUpload}
                              accept=".pdf,image/*,.doc,.docx,.xls,.xlsx"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1E3A8A]/10 file:text-[#1E3A8A] hover:file:bg-[#1E3A8A]/20"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// SUB-MÓDULO E: GESTOR DOCUMENTAL INTERNO
// ====================================================================================
function DocsModule({ 
  internalDocs, 
  setInternalDocs, 
  documentCategories, 
  setDocumentCategories, 
  currentUser, 
  addAuditLog, 
  triggerNotification, 
  triggerConfirm 
}) {
  const [activeFolder, setActiveFolder] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState((documentCategories && documentCategories[0]) ? (documentCategories[0].id || documentCategories[0].name) : 'cat_manuales');
  const [docRequiredRole, setDocRequiredRole] = useState('OPERACIONES');

  // Estados para nueva categoría y subida real de archivo
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newSubFolderParent, setNewSubFolderParent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Estados para renombrar categoría
  const [editingCat, setEditingCat] = useState(null);
  const [editCatNameText, setEditCatNameText] = useState('');

  // Estados para desplegar/contraer carpetas
  const [expandedFolders, setExpandedFolders] = useState({});

  // Estados para editar/mover documento
  const [editingDoc, setEditingDoc] = useState(null);
  const [editDocId, setEditDocId] = useState('');
  const [editDocTitle, setEditDocTitle] = useState('');
  const [editDocCategory, setEditDocCategory] = useState('');
  const [editDocFile, setEditDocFile] = useState(null);
  const [editDocUploading, setEditDocUploading] = useState(false);
  const [showEditDocModal, setShowEditDocModal] = useState(false);

  // Estados para drag & drop
  const [draggedCatId, setDraggedCatId] = useState(null);
  const [draggedDocId, setDraggedDocId] = useState(null);

  // Recorrido recursivo para obtener IDs de subcategorías
  const getSubCategoryIds = (catId) => {
    let ids = [];
    const children = (documentCategories || []).filter(c => c.parentId === catId);
    for (const child of children) {
      ids.push(child.id);
      ids = ids.concat(getSubCategoryIds(child.id));
    }
    return ids;
  };

  // Conteo dinámico de documentos por carpeta
  const getDocCount = (catId) => {
    if (catId === 'Todos') {
      return internalDocs.filter(doc => {
        if (currentUser.role === ROLES.EMPLEADO && doc.requiredRole && doc.requiredRole !== 'VENTAS' && doc.requiredRole !== 'OPERACIONES') {
          return false;
        }
        return true;
      }).length;
    }
    if (catId === 'Favoritos') {
      return internalDocs.filter(doc => {
        if (currentUser.role === ROLES.EMPLEADO && doc.requiredRole && doc.requiredRole !== 'VENTAS' && doc.requiredRole !== 'OPERACIONES') {
          return false;
        }
        return doc.isFavorite;
      }).length;
    }

    const targetCat = (documentCategories || []).find(c => c.id === catId || c.name === catId);
    if (!targetCat) return 0;

    const allCatIds = [targetCat.id, ...getSubCategoryIds(targetCat.id)];
    
    return internalDocs.filter(doc => {
      if (currentUser.role === ROLES.EMPLEADO && doc.requiredRole && doc.requiredRole !== 'VENTAS' && doc.requiredRole !== 'OPERACIONES') {
        return false;
      }
      return allCatIds.some(cid => {
        const c = (documentCategories || []).find(x => x.id === cid);
        return doc.category === cid || (c && doc.category === c.name);
      });
    }).length;
  };

  // Nombre de carpeta activa para mostrar en el header
  const getActiveFolderName = () => {
    if (activeFolder === 'Todos') return 'Todos los Documentos';
    if (activeFolder === 'Favoritos') return 'Favoritos';
    const cat = (documentCategories || []).find(c => c.id === activeFolder || c.name === activeFolder);
    return cat ? cat.name : activeFolder;
  };

  // Ruta completa de una categoría
  const getFullCategoryPath = (catId) => {
    const path = [];
    let current = (documentCategories || []).find(c => c.id === catId);
    while (current) {
      path.unshift(current.name);
      current = (documentCategories || []).find(c => c.id === current.parentId);
    }
    return path.join(' ❯ ');
  };

  // Toggle para expandir/contraer carpetas
  const toggleFolderExpand = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  // Manejadores de Drag & Drop para Carpetas
  const handleDragStartCat = (e, catId) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    setDraggedCatId(catId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverCat = (e) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    e.preventDefault();
  };

  const handleDropCat = (e, targetCatId) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    e.preventDefault();
    if (!draggedCatId || draggedCatId === targetCatId) return;

    const draggedCat = (documentCategories || []).find(c => c.id === draggedCatId);
    const targetCat = (documentCategories || []).find(c => c.id === targetCatId);

    if (!draggedCat || !targetCat) return;

    // Solo permitir reordenar dentro del mismo nivel jerárquico
    if (draggedCat.parentId !== targetCat.parentId) {
      triggerNotification("Solo puedes reordenar carpetas dentro del mismo nivel jerárquico.", "warning");
      return;
    }

    const siblingCats = (documentCategories || [])
      .filter(c => c.parentId === draggedCat.parentId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const draggedIdx = siblingCats.findIndex(c => c.id === draggedCatId);
    const targetIdx = siblingCats.findIndex(c => c.id === targetCatId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const reorderedSiblings = [...siblingCats];
    const [removed] = reorderedSiblings.splice(draggedIdx, 1);
    reorderedSiblings.splice(targetIdx, 0, removed);

    const updatedSiblings = reorderedSiblings.map((cat, index) => ({
      ...cat,
      order: index
    }));

    const updatedCategories = (documentCategories || []).map(cat => {
      const match = updatedSiblings.find(s => s.id === cat.id);
      return match ? match : cat;
    });

    setDocumentCategories(updatedCategories);
    addAuditLog('document_categories', draggedCatId, 'UPDATE', draggedCat, updatedCategories.find(c => c.id === draggedCatId));
    triggerNotification("Orden de carpetas actualizado.");
    setDraggedCatId(null);
  };

  // Manejadores de Drag & Drop para Documentos
  const handleDragStartDoc = (e, docId) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    setDraggedDocId(docId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverDoc = (e) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    e.preventDefault();
  };

  const handleDropDoc = (e, targetDocId) => {
    if (currentUser.role !== ROLES.ADMIN) return;
    e.preventDefault();
    if (!draggedDocId || draggedDocId === targetDocId) return;

    const draggedIdx = internalDocs.findIndex(d => d.id === draggedDocId);
    const targetIdx = internalDocs.findIndex(d => d.id === targetDocId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const reorderedDocs = [...internalDocs];
    const [removed] = reorderedDocs.splice(draggedIdx, 1);
    reorderedDocs.splice(targetIdx, 0, removed);

    setInternalDocs(reorderedDocs);
    addAuditLog('internal_documents', draggedDocId, 'REORDER', null, null);
    triggerNotification("Orden de documentos actualizado.");
    setDraggedDocId(null);
  };

  const handleDeleteCategory = (catId) => {
    const allToDelete = [catId, ...getSubCategoryIds(catId)];
    const updatedCategories = (documentCategories || []).filter(c => !allToDelete.includes(c.id));
    setDocumentCategories(updatedCategories);

    if (allToDelete.includes(activeFolder)) {
      setActiveFolder('Todos');
    }

    addAuditLog('document_categories', catId, 'DELETE', { id: catId }, null);
    triggerNotification("Carpeta eliminada con éxito.");
  };

  const toggleFavorite = (docId) => {
    const updated = internalDocs.map(d => d.id === docId ? { ...d, isFavorite: !d.isFavorite } : d);
    setInternalDocs(updated);
  };

  const handleUploadDoc = (e) => {
    e.preventDefault();
    if (!docTitle.trim() || !selectedFile) return;

    if (currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No permitido: Solo los administradores pueden subir documentos institucionales.", "error");
      return;
    }

    setUploading(true);
    const fileExt = selectedFile.name.split('.').pop() || 'pdf';
    const cleanDocTitle = docTitle.toLowerCase().replace(/\s+/g, '_');
    const filename = `doc_inst_${cleanDocTitle}_${Date.now()}.${fileExt}`;

    fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      body: selectedFile
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al subir archivo');
      return res.json();
    })
    .then(data => {
      const docPath = data.path;
      const newDoc = {
        id: 'doc_' + Date.now(),
        title: docTitle.trim(),
        category: docCategory,
        requiredRole: docRequiredRole,
        isFavorite: false,
        path: docPath
      };

      setInternalDocs([...internalDocs, newDoc]);
      addAuditLog('internal_documents', newDoc.id, 'INSERT', null, newDoc);
      setShowUploadModal(false);
      setDocTitle('');
      setSelectedFile(null);
      setUploading(false);
      triggerNotification(`Documento "${newDoc.title}" cargado institucionalmente.`);
    })
    .catch(err => {
      console.warn('Backend upload offline, falling back to local base64 storage:', err);
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        const newDoc = {
          id: 'doc_' + Date.now(),
          title: docTitle.trim(),
          category: docCategory,
          requiredRole: docRequiredRole,
          isFavorite: false,
          path: base64Data
        };

        setInternalDocs([...internalDocs, newDoc]);
        addAuditLog('internal_documents', newDoc.id, 'INSERT', null, newDoc);
        setShowUploadModal(false);
        setDocTitle('');
        setSelectedFile(null);
        setUploading(false);
        triggerNotification(`Documento "${newDoc.title}" cargado institucionalmente.`);
      };
      reader.readAsDataURL(selectedFile);
    });
  };

  const handleEditDocSubmit = (e) => {
    e.preventDefault();
    if (!editDocTitle.trim()) return;

    if (currentUser.role !== ROLES.ADMIN) {
      triggerNotification("No permitido: Solo los administradores pueden editar documentos.", "error");
      return;
    }

    const docIndex = internalDocs.findIndex(d => d.id === editDocId);
    if (docIndex === -1) return;

    const originalDoc = internalDocs[docIndex];

    const saveChanges = (newPath) => {
      const updatedDoc = {
        ...originalDoc,
        title: editDocTitle.trim(),
        category: editDocCategory,
        path: newPath || originalDoc.path
      };

      const updatedDocs = [...internalDocs];
      updatedDocs[docIndex] = updatedDoc;

      setInternalDocs(updatedDocs);
      addAuditLog('internal_documents', editDocId, 'UPDATE', originalDoc, updatedDoc);
      setShowEditDocModal(false);
      setEditDocUploading(false);
      setEditDocFile(null);
      triggerNotification(`Documento "${updatedDoc.title}" actualizado con éxito.`);
    };

    if (editDocFile) {
      setEditDocUploading(true);
      const fileExt = editDocFile.name.split('.').pop() || 'pdf';
      const cleanDocTitle = editDocTitle.toLowerCase().replace(/\s+/g, '_');
      const filename = `doc_inst_${cleanDocTitle}_${Date.now()}.${fileExt}`;

      fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: editDocFile
      })
      .then(res => {
        if (!res.ok) throw new Error('Error al subir archivo');
        return res.json();
      })
      .then(data => {
        saveChanges(data.path);
      })
      .catch(err => {
        console.warn('Backend upload offline during update, falling back to local base64:', err);
        const reader = new FileReader();
        reader.onload = () => {
          saveChanges(reader.result);
        };
        reader.readAsDataURL(editDocFile);
      });
    } else {
      saveChanges(null);
    }
  };

  const filteredDocs = internalDocs.filter(doc => {
    if (currentUser.role === ROLES.EMPLEADO && doc.requiredRole && doc.requiredRole !== 'VENTAS' && doc.requiredRole !== 'OPERACIONES') {
      return false;
    }

    if (activeFolder === 'Favoritos') {
      if (!doc.isFavorite) return false;
    } else if (activeFolder !== 'Todos') {
      const cat = (documentCategories || []).find(c => c.id === activeFolder || c.name === activeFolder);
      if (cat) {
        if (doc.category !== cat.id && doc.category !== cat.name) return false;
      } else {
        if (doc.category !== activeFolder) return false;
      }
    }

    if (searchQuery.trim()) {
      return doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  // Renderizador recursivo para el árbol de carpetas en el sidebar
  const renderCategoryTree = (parentId = null, level = 0) => {
    const catsAtLevel = (documentCategories || [])
      .filter(c => c.parentId === parentId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return catsAtLevel.map(cat => {
      const isSelected = activeFolder === cat.id || activeFolder === cat.name;
      const isExpanded = !!expandedFolders[cat.id];
      const children = (documentCategories || []).filter(c => c.parentId === cat.id);
      const hasChildren = children.length > 0;
      const docCount = getDocCount(cat.id);

      return (
        <div 
          key={cat.id} 
          style={{ paddingLeft: `${level * 10}px` }} 
          className="space-y-1 mt-1"
          draggable={currentUser.role === ROLES.ADMIN}
          onDragStart={(e) => handleDragStartCat(e, cat.id)}
          onDragOver={(e) => handleDragOverCat(e)}
          onDrop={(e) => handleDropCat(e, cat.id)}
        >
          <div
            className={`group/item relative flex items-center justify-between text-xs px-2.5 py-2 rounded-xl transition-all font-semibold border ${
              isSelected
                ? 'bg-slate-50 text-[#081225] border-slate-200 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900 border-transparent'
            }`}
          >
            {editingCat === cat.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const cleanName = editCatNameText.trim();
                  if (!cleanName) return;
                  const updated = (documentCategories || []).map(c => c.id === cat.id ? { ...c, name: cleanName } : c);
                  setDocumentCategories(updated);
                  addAuditLog('document_categories', cat.id, 'UPDATE', cat, { ...cat, name: cleanName });
                  setEditingCat(null);
                  triggerNotification(`Carpeta renombrada a "${cleanName}".`);
                }}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 flex-1 min-w-0"
              >
                <input
                  type="text"
                  value={editCatNameText}
                  onChange={(e) => setEditCatNameText(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setEditingCat(null);
                  }}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded p-0.5 shrink-0"
                  title="Guardar nombre"
                >
                  <Save className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <>
                <div 
                  className="flex items-center gap-1.5 cursor-pointer flex-1 min-w-0"
                  onClick={() => setActiveFolder(cat.id)}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFolderExpand(cat.id);
                      }}
                      className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="w-4.5 shrink-0" />
                  )}
                  
                  <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#1E3A8A]' : 'text-slate-400'}`} />
                  <span className="truncate" title={cat.name}>{cat.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-md">
                    {docCount}
                  </span>

                  {currentUser.role === ROLES.ADMIN && (
                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-0.5 bg-white/95 rounded-lg border border-slate-150 p-0.5 shadow-sm absolute right-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewSubFolderParent(cat.id);
                          setNewCatName('');
                          setShowNewCatModal(true);
                        }}
                        className="p-0.5 hover:bg-slate-100 text-blue-600 rounded"
                        title="Añadir Subcarpeta"
                      >
                        <FolderPlus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCat(cat.id);
                          setEditCatNameText(cat.name);
                        }}
                        className="p-0.5 hover:bg-slate-100 text-amber-600 rounded"
                        title="Renombrar Carpeta"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerConfirm(`¿Eliminar la carpeta "${cat.name}"? Se eliminarán todas sus subcarpetas y los documentos quedarán huérfanos.`, () => {
                            handleDeleteCategory(cat.id);
                          });
                        }}
                        className="p-0.5 hover:bg-slate-100 text-red-600 rounded"
                        title="Eliminar Carpeta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {hasChildren && isExpanded && (
            <div className="border-l border-slate-150 ml-3">
              {renderCategoryTree(cat.id, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col flex-1 space-y-4">
      {/* Banner Superior de Indicador de Estatus de Administrador / Colaborador */}
      {currentUser.role === ROLES.ADMIN ? (
        <div className="bg-gradient-to-r from-blue-900 via-[#1E3A8A] to-blue-950 text-white rounded-2xl px-6 py-3.5 flex items-center justify-between border border-blue-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl flex items-center justify-center border border-white/10 animate-pulse">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400">Panel de Control Activo</h4>
              <p className="text-[11px] text-slate-200 font-semibold">🛡️ MODO ADMINISTRADOR - Permisos de escritura, edición y reordenación activados</p>
            </div>
          </div>
          <div className="bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold px-3 py-1 rounded-xl text-[10px] uppercase tracking-wider">
            SuperAdmin
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 text-slate-700 rounded-2xl px-6 py-3.5 flex items-center justify-between border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-xl flex items-center justify-center border border-slate-200">
              <Eye className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Vista del Colaborador</h4>
              <p className="text-[11px] text-slate-400">👁️ VISTA COLABORADOR - Acceso de solo lectura</p>
            </div>
          </div>
          <div className="bg-slate-200 text-slate-500 font-bold px-3 py-1 rounded-xl text-[10px] uppercase tracking-wider">
            Solo Lectura
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar carpetas */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 space-y-4 shadow-sm h-fit">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Archivero Interno</span>
            {currentUser.role === ROLES.ADMIN && (
              <button
                onClick={() => {
                  setNewSubFolderParent(null);
                  setNewCatName('');
                  setShowNewCatModal(true);
                }}
                className="bg-[#1E3A8A] text-white rounded-lg p-1 hover:bg-[#1E40AF] transition-colors flex items-center justify-center"
                title="Nueva Carpeta Raíz"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-1">
            {/* Todos los Documentos */}
            <button
              onClick={() => setActiveFolder('Todos')}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all font-semibold flex items-center justify-between ${
                activeFolder === 'Todos'
                  ? 'bg-slate-50 text-[#081225] border border-slate-150 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#1E3A8A]/80" />
                Todos los Documentos
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-md">
                {getDocCount('Todos')}
              </span>
            </button>

            {/* Favoritos */}
            <button
              onClick={() => setActiveFolder('Favoritos')}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all font-semibold flex items-center justify-between ${
                activeFolder === 'Favoritos'
                  ? 'bg-slate-50 text-[#081225] border border-slate-150 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-sky-500 fill-sky-500" />
                Favoritos
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-md">
                {getDocCount('Favoritos')}
              </span>
            </button>

            <div className="border-t border-slate-100 my-2 pt-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2.5 block mb-2">Directorio de Carpetas</span>
              
              <div className="space-y-1">
                {renderCategoryTree(null, 0)}
                {(!documentCategories || documentCategories.length === 0) && (
                  <p className="text-[11px] text-slate-400 italic px-2.5">No hay carpetas creadas.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Listado de archivos */}
        <div className="md:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Formatos e Instructivos: {getActiveFolderName()}</h3>
              <p className="text-xs text-slate-400">Documentación de consulta para procesos internos.</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar formato corporativo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none"
                />
              </div>
              {currentUser.role === ROLES.ADMIN && (
                <button
                  onClick={() => {
                    const exists = (documentCategories || []).some(c => c.id === activeFolder || c.name === activeFolder);
                    if (activeFolder !== 'Todos' && activeFolder !== 'Favoritos' && exists) {
                      setDocCategory(activeFolder);
                    } else {
                      setDocCategory((documentCategories && documentCategories[0]) ? (documentCategories[0].id || documentCategories[0].name) : 'cat_manuales');
                    }
                    setSelectedFile(null);
                    setShowUploadModal(true);
                  }}
                  className="bg-[#081225] hover:bg-[#1E3A8A] text-white p-2 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0"
                  title="Subir Archivo Institucional"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map(doc => (
              <div 
                key={doc.id}
                draggable={currentUser.role === ROLES.ADMIN}
                onDragStart={(e) => handleDragStartDoc(e, doc.id)}
                onDragOver={(e) => handleDragOverDoc(e)}
                onDrop={(e) => handleDropDoc(e, doc.id)}
                className={`bg-[#FAFAFA] border border-slate-200 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-350 transition-all relative group shadow-sm ${
                  currentUser.role === ROLES.ADMIN ? 'cursor-move' : ''
                }`}
              >
                <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => toggleFavorite(doc.id)}
                    className="text-slate-400 hover:text-[#1E3A8A] transition-colors p-1 bg-white rounded-lg border border-slate-200/50 shadow-sm"
                    title={doc.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Star className={`w-3.5 h-3.5 ${doc.isFavorite ? 'text-sky-500 fill-sky-500' : ''}`} />
                  </button>
                  {currentUser.role === ROLES.ADMIN && (
                    <>
                      <button 
                        onClick={() => {
                          setEditDocId(doc.id);
                          setEditDocTitle(doc.title);
                          setEditDocCategory(doc.category);
                          setEditDocFile(null);
                          setEditDocUploading(false);
                          setShowEditDocModal(true);
                        }}
                        className="text-slate-400 hover:text-amber-500 transition-colors p-1 bg-white rounded-lg border border-slate-200/50 shadow-sm"
                        title="Editar / Mover Documento"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => {
                          triggerConfirm(`¿Eliminar el documento "${doc.title}"?`, () => {
                            const updated = internalDocs.filter(d => d.id !== doc.id);
                            setInternalDocs(updated);
                            addAuditLog('internal_documents', doc.id, 'DELETE', doc, null);
                            triggerNotification(`Documento "${doc.title}" eliminado.`);
                          });
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 bg-white rounded-lg border border-slate-200/50 shadow-sm"
                        title="Eliminar Documento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-red-400" />
                  <h4 className="font-semibold text-xs text-slate-800 leading-snug group-hover:text-[#081225] pt-2 pr-6">{doc.title}</h4>
                  <span className="inline-block text-[9px] bg-white border border-slate-200/50 px-2 py-0.5 rounded text-slate-500 font-bold uppercase shadow-sm truncate max-w-full">
                    {getFullCategoryPath(doc.category) || doc.category}
                  </span>
                </div>

                <div className="border-t border-slate-200/40 mt-4 pt-3 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span className="truncate max-w-[130px]" title={doc.path}>{doc.path}</span>
                  <a 
                    href={doc.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200 text-[9px] transition-colors flex items-center gap-0.5"
                  >
                    <Eye className="w-3 h-3" /> Ver
                  </a>
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <Folder className="w-10 h-10 text-slate-200" />
                <p className="text-xs">No se encontraron archivos en este directorio.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Subida */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-xl">Subir Documento Corporativo</h3>

            <form onSubmit={handleUploadDoc} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Título del Documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instructivo Cajas 2026"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Categoría / Carpeta</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-650 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 font-medium"
                >
                  {(documentCategories || []).map(cat => (
                    <option key={cat.id} value={cat.id}>{getFullCategoryPath(cat.id)}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Archivo del Documento (PDF, Imagen, etc.)</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 bg-slate-50 hover:bg-slate-100 text-[#1E3A8A] font-bold px-4 py-3 rounded-xl border border-slate-200 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span className="truncate max-w-[250px]">
                      {selectedFile ? selectedFile.name : 'Seleccionar Archivo...'}
                    </span>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      className="hidden" 
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <span>Subir Documento</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar / Mover Documento */}
      {showEditDocModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-xl">Editar / Mover Documento</h3>

            <form onSubmit={handleEditDocSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Título del Documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instructivo Cajas 2026"
                  value={editDocTitle}
                  onChange={(e) => setEditDocTitle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Nueva Categoría / Carpeta</label>
                <select
                  value={editDocCategory}
                  onChange={(e) => setEditDocCategory(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-650 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 font-medium"
                >
                  {(documentCategories || []).map(cat => (
                    <option key={cat.id} value={cat.id}>{getFullCategoryPath(cat.id)}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Actualizar Archivo (Opcional - Reemplaza el actual)</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 bg-slate-50 hover:bg-slate-100 text-[#1E3A8A] font-bold px-4 py-3 rounded-xl border border-slate-200 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span className="truncate max-w-[250px]">
                      {editDocFile ? editDocFile.name : 'Mantener archivo actual...'}
                    </span>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                      className="hidden" 
                      onChange={(e) => setEditDocFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditDocModal(false);
                    setEditDocFile(null);
                  }}
                  disabled={editDocUploading}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editDocUploading}
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  {editDocUploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Actualizando...</span>
                    </>
                  ) : (
                    <span>Guardar Cambios</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nueva Categoría / Subcategoría */}
      {showNewCatModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm">
            <h3 className="font-serif font-bold text-slate-950 text-xl mb-4">
              Nueva Carpeta o Subcarpeta
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const cleanName = newCatName.trim();
              if (!cleanName) return;
              
              const exists = (documentCategories || []).some(
                c => c.name.toLowerCase() === cleanName.toLowerCase() && c.parentId === newSubFolderParent
              );
              if (exists) {
                triggerNotification(`Una carpeta con el nombre "${cleanName}" ya existe en este nivel.`, "error");
                return;
              }

              const newId = 'cat_' + Date.now();
              const siblingCount = (documentCategories || []).filter(c => c.parentId === newSubFolderParent).length;
              const newCategory = {
                id: newId,
                name: cleanName,
                parentId: newSubFolderParent,
                order: siblingCount
              };

              const updated = [...(documentCategories || []), newCategory];
              setDocumentCategories(updated);
              addAuditLog('document_categories', newId, 'INSERT', null, newCategory);
              setShowNewCatModal(false);
              setNewCatName('');
              setNewSubFolderParent(null);
              triggerNotification(`Carpeta "${cleanName}" creada con éxito.`);
            }} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Carpeta Contenedora (Padre)</label>
                <select
                  value={newSubFolderParent || ''}
                  onChange={e => {
                    const val = e.target.value;
                    setNewSubFolderParent(val === '' ? null : val);
                  }}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="">Ninguna (Carpeta Raíz)</option>
                  {(documentCategories || []).map(cat => (
                    <option key={cat.id} value={cat.id}>{getFullCategoryPath(cat.id)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Nombre de la Carpeta</label>
                <input 
                  type="text" 
                  required
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 font-medium"
                  placeholder="Ej. Contratos, Expedientes"
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowNewCatModal(false);
                    setNewSubFolderParent(null);
                  }} 
                  className="flex-1 py-3 px-4 bg-slate-100 text-slate-650 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3 px-4 bg-[#081225] text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors">Crear Carpeta</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// SUB-MÓDULO F: PANEL DE ADMINISTRACIÓN (HABILITACIÓN DE MENÚS Y AUDITORÍA)
// ====================================================================================
function SuperAdminModule({ 
  auditLogs, setAuditLogs,
  services, setServices,
  leads, setLeads,
  crmColumns, setCrmColumns,
  customFormFields, setCustomFormFields,
  contactMethods, setContactMethods,
  activeUsers, setActiveUsers,
  addAuditLog,
  roles,
  setRoles,
  landingCards,
  setLandingCards,
  announcements,
  setAnnouncements,
  crmForms,
  setCrmForms,
  triggerNotification,
  triggerConfirm,
  directory,
  setDirectory,
  customTables,
  setCustomTables,
  internalDocs,
  setInternalDocs,
  tasks,
  setTasks,
  crmFormSubmissions,
  setCrmFormSubmissions,
  events,
  setEvents,
  branches,
  setBranches,
  products,
  setProducts,
  rooms,
  setRooms,
  directoryGroups,
  setDirectoryGroups,
  activeSessions,
  setActiveSessions,
  systemConfig,
  setSystemConfig
}) {
  const [activeSubTab, setActiveSubTab] = useState('BRANCHES_ADMIN');
  const [selectedLog, setSelectedLog] = useState(null);

  // Estados de la Base de Datos
  const [selectedTableName, setSelectedTableName] = useState('');
  const [editingRecordIndex, setEditingRecordIndex] = useState(-1);
  const [editingRecordData, setEditingRecordData] = useState(null);
  const [isCreatingNewRecord, setIsCreatingNewRecord] = useState(false);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  const [newTableNameInput, setNewTableNameInput] = useState('');
  const [rawJsonMode, setRawJsonMode] = useState(false);
  const [rawJsonText, setRawJsonText] = useState('');

  // Map of all standard tables
  const tablesMap = {
    services: { name: 'services', label: 'Servicios Funerarios', data: services, setter: setServices, icon: '📋' },
    leads: { name: 'leads', label: 'Prospectos CRM', data: leads, setter: setLeads, icon: '👥' },
    internalDocs: { name: 'internalDocs', label: 'Documentos Internos', data: internalDocs, setter: setInternalDocs, icon: '📁' },
    announcements: { name: 'announcements', label: 'Anuncios e Intranet', data: announcements, setter: setAnnouncements, icon: '📢' },
    tasks: { name: 'tasks', label: 'Tareas Empleados', data: tasks, setter: setTasks, icon: '✅' },
    auditLogs: { name: 'auditLogs', label: 'Auditoría JAE', data: auditLogs, setter: setAuditLogs, icon: '🔍' },
    crmColumns: { name: 'crmColumns', label: 'Columnas CRM (Etapas)', data: crmColumns, setter: setCrmColumns, icon: '📊' },
    customFormFields: { name: 'customFormFields', label: 'Campos Formulario CRM', data: customFormFields, setter: setCustomFormFields, icon: '⚙️' },
    contactMethods: { name: 'contactMethods', label: 'Métodos de Contacto', data: contactMethods, setter: setContactMethods, icon: '📞' },
    activeUsers: { name: 'activeUsers', label: 'Usuarios y Cuentas', data: activeUsers, setter: setActiveUsers, icon: '👤' },
    crmForms: { name: 'crmForms', label: 'Formularios CRM', data: crmForms, setter: setCrmForms, icon: '📝' },
    crmFormSubmissions: { name: 'crmFormSubmissions', label: 'Respuestas de Formularios', data: crmFormSubmissions, setter: setCrmFormSubmissions, icon: '📤' },
    events: { name: 'events', label: 'Eventos Tanatología', data: events, setter: setEvents, icon: '📅' },
    landingCards: { name: 'landingCards', label: 'Tarjetas de Inicio', data: landingCards, setter: setLandingCards, icon: '✨' },
    roles: { name: 'roles', label: 'Roles y Puestos', data: roles, setter: setRoles, icon: '🛡️' },
    directory: { name: 'directory', label: 'Directorio de Extensiones', data: directory, setter: setDirectory, icon: '☎️' },
    branches: { name: 'branches', label: 'Sucursales e Instalaciones', data: branches, setter: setBranches, icon: '🏢' },
    rooms: { name: 'rooms', label: 'Salas Disponibles', data: rooms, setter: setRooms, icon: '🚪' },
    products: { name: 'products', label: 'Catálogo de Tienda', data: products, setter: setProducts, icon: '🛒' }
  };

  const allTables = { ...tablesMap };
  Object.keys(customTables || {}).forEach(key => {
    allTables[key] = {
      name: key,
      label: `${key} (Personalizada)`,
      data: customTables[key],
      setter: (newData) => {
        setCustomTables(prev => ({
          ...prev,
          [key]: newData
        }));
      },
      icon: '🗃️',
      isCustom: true
    };
  });

  // Role & Employee management states
  const [editingRole, setEditingRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Directory management states
  const [editingDir, setEditingDir] = useState(null);
  const [showDirModal, setShowDirModal] = useState(false);
  const [selectedAdminCat, setSelectedAdminCat] = useState('Todos');
  const [directoryAdminSubTab, setDirectoryAdminSubTab] = useState('extensions');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  // Form states custom CRM
  const [newFieldName, setNewFieldName] = useState('');
  const [newCrmStage, setNewCrmStage] = useState('');
  const [newContactMethod, setNewContactMethod] = useState('');

  // Re-asignación de cartera
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [salespersonToDelete, setSalespersonToDelete] = useState(null);
  const [reassignTargetUser, setReassignTargetUser] = useState('');

  const handleAddNewStage = (e) => {
    e.preventDefault();
    if (!newCrmStage.trim()) return;
    const updated = [...crmColumns, newCrmStage.trim().toUpperCase()];
    setCrmColumns(updated);
    addAuditLog('superadmin_config', 'crmColumns', 'UPDATE', crmColumns, updated);
    setNewCrmStage('');
    triggerNotification(`Etapa añadida al CRM.`);
  };

  const handleMoveStage = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === crmColumns.length - 1) return;

    const newColumns = [...crmColumns];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newColumns[index];
    newColumns[index] = newColumns[targetIndex];
    newColumns[targetIndex] = temp;

    setCrmColumns(newColumns);
    addAuditLog('superadmin_config', 'crmColumns', 'UPDATE', crmColumns, newColumns);
  };

  const handleDeleteStage = (stage) => {
    const updated = crmColumns.filter(c => c !== stage);
    setCrmColumns(updated);
    addAuditLog('superadmin_config', 'crmColumns', 'DELETE', crmColumns, updated);
  };

  const handleAddNewField = (e) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;
    const updated = [...customFormFields, newFieldName.trim()];
    setCustomFormFields(updated);
    addAuditLog('superadmin_config', 'customFormFields', 'UPDATE', customFormFields, updated);
    setNewFieldName('');
    triggerNotification(`Campo dinámico añadido.`);
  };

  const handleAddContactMethod = (e) => {
    e.preventDefault();
    if (!newContactMethod.trim()) return;
    const trimmed = newContactMethod.trim();
    if (contactMethods.includes(trimmed)) {
      triggerNotification('Ese método de contacto ya existe.', 'error');
      return;
    }
    const updated = [...contactMethods, trimmed];
    setContactMethods(updated);
    addAuditLog('superadmin_config', 'contactMethods', 'UPDATE', contactMethods, updated);
    setNewContactMethod('');
    triggerNotification(`Método de contacto "${trimmed}" añadido.`);
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    const newRole = {
      ...editingRole,
      id: editingRole.id || 'rol_' + Date.now(),
      permissions: editingRole.permissions || { INTRANET: true, OPERATIONS: false, CRM: false, DOCS: false, ADMIN: false }
    };
    const isNew = !roles.find(r => r.id === newRole.id);
    const updated = isNew ? [...roles, newRole] : roles.map(r => r.id === newRole.id ? newRole : r);
    setRoles(updated);
    addAuditLog('roles', newRole.id, isNew ? 'INSERT' : 'UPDATE', null, newRole);
    setShowRoleModal(false);
  };

  const handleToggleRolePermission = (roleId, menuId) => {
    const updated = roles.map(r => {
      if (r.id === roleId) {
        return { ...r, permissions: { ...r.permissions, [menuId]: !r.permissions[menuId] } };
      }
      return r;
    });
    setRoles(updated);
  };

  const handleDeleteRole = (roleId) => {
    if(activeUsers.some(u => u.roleId === roleId)) {
      triggerNotification("No puedes eliminar un rol que está asignado a empleados activos.", "error");
      return;
    }
    const updated = roles.filter(r => r.id !== roleId);
    setRoles(updated);
    addAuditLog('roles', roleId, 'DELETE', roles.find(r => r.id === roleId), null);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const assignedRole = roles.find(r => r.id === editingUser.roleId);
    const newUser = {
      ...editingUser,
      id: editingUser.id || 'usr_' + Date.now(),
      role: assignedRole?.permissions?.ADMIN ? ROLES.ADMIN : ROLES.EMPLEADO,
      isActive: true
    };
    const isNew = !activeUsers.find(u => u.id === newUser.id);
    const updated = isNew ? [...activeUsers, newUser] : activeUsers.map(u => u.id === newUser.id ? newUser : u);
    setActiveUsers(updated);
    addAuditLog('users', newUser.id, isNew ? 'INSERT' : 'UPDATE', null, newUser);
    setShowUserModal(false);
  };

  const handleDeleteUser = (userId) => {
    if(userId === 'admin') {
      triggerNotification("No puedes eliminar al administrador principal.", "error");
      return;
    }
    const updated = activeUsers.filter(u => u.id !== userId);
    setActiveUsers(updated);
    addAuditLog('users', userId, 'DELETE', activeUsers.find(u => u.id === userId), null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      
      {/* Sidebar de Navegación del Super Admin - Premium Card Style */}
      <div className="w-full lg:w-72 shrink-0 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-serif font-bold text-[#081225] text-base">Panel de Control</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Super Administrador JAE</p>
        </div>

        <nav className="space-y-4">
          {[
            {
              label: 'Vista Pública / Clientes',
              icon: Eye,
              items: [
                { id: 'BRANCHES_ADMIN', label: '🏢 Sucursales e Instalaciones', desc: 'Gestiona la información y fotos reales de tus sucursales.' },
                { id: 'ROOMS_ADMIN', label: '🚪 Salas Disponibles', desc: 'Gestiona las salas de velación y sus características.' },
                { id: 'LANDING_CONTENT', label: '✨ Contenido e Homenajes', desc: 'Administra las tarjetas de Tanatología en Inicio.' },
                { id: 'DIRECTORY', label: '☎️ Directorio de Teléfonos', desc: 'Controla las extensiones y su visibilidad pública/interna.' }
              ]
            },
            {
              label: 'Gestión de Tienda JAE',
              icon: ShoppingBag,
              items: [
                { id: 'STORE_ADMIN', label: '🛒 Catálogo de Tienda', desc: 'Administra los ataúdes, urnas, planes de previsión y complementos.' }
              ]
            },
            {
              label: 'Área Interna / Trabajadores',
              icon: Users,
              items: [
                { id: 'ROLES_PERMISSIONS', label: '🛡️ Menús y Empleados', desc: 'Configura permisos de módulos y accesos de colaboradores.' },
                { id: 'CAROUSEL_ADMIN', label: '📢 Anuncios e Intranet', desc: 'Publica circulares y banners de información interna.' },
                { id: 'FORM_BUILDER', label: '⚙️ Constructor CRM', desc: 'Diseña el embudo de ventas y agrega campos dinámicos.' }
              ]
            },
            {
              label: 'Sistema Avanzado',
              icon: Shield,
              items: [
                { id: 'SESSIONS_ADMIN', label: '⏱️ Control de Sesiones', desc: 'Gestiona la inactividad y los usuarios activos.' },
                { id: 'DATABASE', label: '🗄️ Base de Datos Directa', desc: 'Vista CRUD directa e importación JSON de todas las colecciones.' },
                { id: 'AUDIT', label: '🔍 Auditoría de Cambios', desc: 'Revisa el historial de acciones y ediciones de los empleados.' }
              ]
            }
          ].map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.label} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1E3A8A] uppercase tracking-widest px-2.5 py-1.5 bg-slate-50 rounded-lg">
                  <GroupIcon className="w-3.5 h-3.5" />
                  <span>{group.label}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSubTab(item.id);
                        setSelectedTableName('');
                        setEditingRecordData(null);
                        setIsCreatingNewRecord(false);
                      }}
                      className={`text-left text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                        activeSubTab === item.id
                          ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50 font-bold scale-[1.01]'
                          : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50/70'
                      }`}
                      title={item.desc}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-0 transition-opacity ${
                        activeSubTab === item.id ? 'opacity-100 text-[#1E3A8A]' : 'group-hover:opacity-40'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Contenedor del Módulo Activo */}
      <div className="flex-1 w-full min-w-0">
        
        {/* NUEVO: Gestión de Sucursales */}
        {activeSubTab === 'BRANCHES_ADMIN' && (
          <BranchesAdminPanel 
            branches={branches}
            setBranches={setBranches}
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

        {/* NUEVO: Gestión de Salas */}
        {activeSubTab === 'ROOMS_ADMIN' && (
          <RoomsAdminPanel 
            rooms={rooms}
            setRooms={setRooms}
            branches={branches}
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

        {/* NUEVO: Catálogo de Tienda */}
        {activeSubTab === 'STORE_ADMIN' && (
          <StoreAdminPanel 
            products={products}
            setProducts={setProducts}
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

        {/* Control de Sesiones */}
        {activeSubTab === 'SESSIONS_ADMIN' && (
          <SessionsAdminPanel 
            activeSessions={activeSessions}
            setActiveSessions={setActiveSessions}
            systemConfig={systemConfig}
            setSystemConfig={setSystemConfig}
            addAuditLog={addAuditLog}
            triggerNotification={triggerNotification}
            triggerConfirm={triggerConfirm}
          />
        )}

      {/* 6. Gestión del Directorio */}
      {activeSubTab === 'DIRECTORY' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-3">
            <div>
              <h4 className="font-serif font-bold text-slate-950 text-lg">Directorio Telefónico</h4>
              <p className="text-sm text-slate-500 mt-1">Gestiona las extensiones, los grupos de sucursales y la visibilidad.</p>
            </div>
            {directoryAdminSubTab === 'extensions' && (
              <button
                type="button"
                onClick={() => { setEditingDir({ extension: '', name: '', contactPerson: '', photo: '', showToClients: false, showToEmployees: true }); setShowDirModal(true); }}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#081225] text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition-colors self-start cursor-pointer active:scale-95 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Nueva Extensión
              </button>
            )}
          </div>

          {/* Sub-pestañas de Navegación del Panel de Directorio */}
          <div className="flex gap-4 border-b border-slate-100 pb-3">
            <button 
              type="button"
              onClick={() => setDirectoryAdminSubTab('extensions')} 
              className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all cursor-pointer ${
                directoryAdminSubTab === 'extensions' 
                  ? 'border-[#1E3A8A] text-[#1E3A8A]' 
                  : 'border-transparent text-slate-400 hover:text-slate-650'
              }`}
            >
              Extensiones
            </button>
            <button 
              type="button"
              onClick={() => setDirectoryAdminSubTab('groups')} 
              className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-all cursor-pointer ${
                directoryAdminSubTab === 'groups' 
                  ? 'border-[#1E3A8A] text-[#1E3A8A]' 
                  : 'border-transparent text-slate-400 hover:text-slate-650'
              }`}
            >
              Grupos / Sucursales
            </button>
          </div>

          {directoryAdminSubTab === 'extensions' ? (
            <>
              {/* Categorías en Admin (Scroll Horizontal) */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {['Todos', ...([...directoryGroups].sort((a, b) => (a.order || 0) - (b.order || 0)).map(g => g.name))].map(cat => {
                  const count = directory.filter(d => cat === 'Todos' || getDirectoryGroup(d, directoryGroups).name === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedAdminCat(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                        selectedAdminCat === cat
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-[#1E3A8A]/20 scale-[1.02]'
                          : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        selectedAdminCat === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {directory
                  .filter(dir => selectedAdminCat === 'Todos' || getDirectoryGroup(dir, directoryGroups).name === selectedAdminCat)
                  .sort((a, b) => {
                    const numA = Number(a.extension);
                    const numB = Number(b.extension);
                    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                    return String(a.extension).localeCompare(String(b.extension));
                  })
                  .map(dir => (
                    <div key={dir.id} className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-3xl flex flex-col gap-4 relative group hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-4">
                        {/* Giant Extension Number in Center */}
                        <div className="flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-[#1E3A8A]/5 to-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 relative group-hover:from-[#1E3A8A]/10 group-hover:to-[#1E3A8A]/15 transition-all">
                          <span className="text-[8px] uppercase font-bold tracking-widest text-[#1E3A8A]/60 mb-0.5">Extensión</span>
                          <span className="text-2xl font-black font-mono text-[#081225] leading-none tracking-tight">{dir.extension}</span>

                          {/* Actions floating inside the badge area */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              type="button"
                              onClick={() => { setEditingDir({ ...dir, contactPerson: dir.contactPerson || '', groupId: dir.groupId || getDirectoryGroup(dir, directoryGroups).id || 'g_otros' }); setShowDirModal(true); }} 
                              className="p-1.5 bg-white text-slate-655 rounded-lg shadow-sm border border-slate-200 hover:text-[#1E3A8A] cursor-pointer"
                              title="Editar"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                triggerConfirm(`¿Eliminar la extensión de ${dir.name}?`, () => {
                                  const updated = directory.filter(d => d.id !== dir.id);
                                  setDirectory(updated);
                                  addAuditLog('directory', dir.id, 'DELETE', dir, null);
                                });
                              }} 
                              className="p-1.5 bg-white text-red-655 rounded-lg shadow-sm border border-slate-200 hover:bg-red-50 cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div className="text-center space-y-1">
                          <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide truncate" title={dir.contactPerson ? dir.contactPerson : dir.name}>
                            {dir.contactPerson ? dir.contactPerson : dir.name}
                          </h5>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider truncate">
                            {dir.contactPerson ? dir.name : 'Área / Puesto'}
                          </p>
                          <span className="inline-block text-[8px] font-bold text-[#1E3A8A] bg-[#1E3A8A]/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {getDirectoryGroup(dir, directoryGroups).name}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-1 pt-3 border-t border-slate-200/50">
                        <label className="flex justify-between items-center text-xs text-slate-600 font-medium cursor-pointer">
                          <span>Visible para Empleados</span>
                          <input 
                            type="checkbox" 
                            checked={dir.showToEmployees}
                            onChange={(e) => {
                              const updated = directory.map(d => d.id === dir.id ? {...d, showToEmployees: e.target.checked} : d);
                              setDirectory(updated);
                              addAuditLog('directory', dir.id, 'UPDATE', dir, updated.find(d=>d.id===dir.id));
                            }}
                            className="rounded text-[#1E3A8A] focus:ring-[#1E3A8A] focus:ring-offset-0 bg-slate-100 border-slate-300 w-4 h-4 cursor-pointer"
                          />
                        </label>
                        <label className="flex justify-between items-center text-xs text-slate-600 font-medium cursor-pointer">
                          <span>Visible para Clientes</span>
                          <input 
                            type="checkbox" 
                            checked={dir.showToClients}
                            onChange={(e) => {
                              const updated = directory.map(d => d.id === dir.id ? {...d, showToClients: e.target.checked} : d);
                              setDirectory(updated);
                              addAuditLog('directory', dir.id, 'UPDATE', dir, updated.find(d=>d.id===dir.id));
                            }}
                            className="rounded text-[#1E3A8A] focus:ring-[#1E3A8A] focus:ring-offset-0 bg-slate-100 border-slate-300 w-4 h-4 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
              {directory.filter(dir => selectedAdminCat === 'Todos' || getDirectoryGroup(dir, directoryGroups).name === selectedAdminCat).length === 0 && (
                <p className="text-xs text-slate-450 italic text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">No hay extensiones en esta sucursal.</p>
              )}
            </>
          ) : (
            <div className="space-y-6">
              {/* Formulario Crear Grupo */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-4">
                <h5 className="font-serif font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E3A8A] inline-block"></span>
                  Crear Nuevo Grupo o Sucursal
                </h5>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const nameInput = e.target.elements.groupName.value.trim();
                  const orderInput = parseInt(e.target.elements.groupOrder.value, 10) || 1;
                  if (!nameInput) return;
                  
                  const newGroup = {
                    id: 'g_' + Date.now(),
                    name: nameInput,
                    order: orderInput
                  };
                  const updated = [...directoryGroups, newGroup];
                  setDirectoryGroups(updated);
                  addAuditLog('directoryGroups', newGroup.id, 'INSERT', null, newGroup);
                  triggerNotification(`Grupo "${nameInput}" creado con éxito.`, 'success');
                  e.target.reset();
                }} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    name="groupName"
                    required
                    placeholder="Nombre del grupo (ej: Sucursal Juriquilla)"
                    className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                  />
                  <input 
                    type="number" 
                    name="groupOrder"
                    required
                    defaultValue={directoryGroups.length + 1}
                    placeholder="Orden"
                    className="w-24 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                  />
                  <button type="submit" className="bg-[#081225] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0">
                    <Plus className="w-4 h-4" /> Agregar Grupo
                  </button>
                </form>
              </div>

              {/* Listado de Grupos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {directoryGroups.sort((a,b)=>(a.order||0)-(b.order||0)).map(g => (
                  <div key={g.id} className="bg-slate-50/50 border border-slate-200 rounded-3xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-350 transition-all relative group">
                    <div className="absolute top-0 left-0 w-full h-[2.5px] bg-slate-355 group-hover:bg-[#1E3A8A] transition-colors"></div>
                    
                    {editingGroup && editingGroup.id === g.id ? (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const newName = e.target.elements.editGroupName.value.trim();
                        const newOrder = parseInt(e.target.elements.editGroupOrder.value, 10) || 1;
                        if (!newName) return;

                        const updated = directoryGroups.map(item => item.id === g.id ? {...item, name: newName, order: newOrder} : item);
                        setDirectoryGroups(updated);
                        addAuditLog('directoryGroups', g.id, 'UPDATE', g, updated.find(item => item.id === g.id));
                        setEditingGroup(null);
                        triggerNotification(`Grupo actualizado con éxito.`, 'success');
                      }} className="space-y-3 pt-2">
                        <div>
                          <label className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Nombre del Grupo</label>
                          <input 
                            type="text" 
                            name="editGroupName"
                            required
                            defaultValue={g.name}
                            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Orden de visualización</label>
                          <input 
                            type="number" 
                            name="editGroupOrder"
                            required
                            defaultValue={g.order || 1}
                            className="w-20 text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                          />
                        </div>
                        <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
                          <button type="button" onClick={() => setEditingGroup(null)} className="px-2.5 py-1 bg-slate-100 text-slate-650 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition-colors cursor-pointer">Cancelar</button>
                          <button type="submit" className="px-2.5 py-1 bg-[#1E3A8A] text-white rounded-lg text-[10px] font-bold hover:bg-blue-800 transition-colors cursor-pointer">Guardar</button>
                        </div>
                      </form>
                    ) : (
                      <div className="pt-2 flex flex-col justify-between h-full space-y-4">
                        <div>
                          <h6 className="font-bold text-slate-800 text-xs uppercase tracking-wide truncate">{g.name}</h6>
                          <span className="text-[10px] text-slate-400 font-semibold block mt-1">Orden en pantalla: <span className="font-bold text-slate-700">{g.order || 1}</span></span>
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-150 pt-3">
                          <span className="text-[9px] font-mono font-bold bg-[#1E3A8A]/5 text-[#1E3A8A] px-2.5 py-0.5 rounded-full uppercase">
                            {directory.filter(d => getDirectoryGroup(d, directoryGroups).id === g.id).length} extensiones
                          </span>
                          <div className="flex gap-1.5">
                            <button onClick={() => setEditingGroup(g)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors bg-white hover:bg-blue-50 border border-slate-200/60 rounded-lg cursor-pointer" title="Editar Grupo">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {/* No permitir borrar el grupo por defecto de otros para evitar orfandad sin alternativa */}
                            {g.id !== 'g_otros' && (
                              <button 
                                onClick={() => {
                                  triggerConfirm(`¿Eliminar el grupo "${g.name}"? Todas las extensiones que pertenecen a este grupo se re-asignarán automáticamente a "Otros / Soporte".`, () => {
                                    const updatedGroups = directoryGroups.filter(item => item.id !== g.id);
                                    setDirectoryGroups(updatedGroups);
                                    // Re-asignar extensiones
                                    const updatedDirectory = directory.map(d => d.groupId === g.id ? {...d, groupId: 'g_otros'} : d);
                                    setDirectory(updatedDirectory);
                                    addAuditLog('directoryGroups', g.id, 'DELETE', g, null);
                                    triggerNotification(`Grupo "${g.name}" eliminado y extensiones reasociadas.`);
                                  });
                                }} 
                                className="p-1.5 text-slate-400 hover:text-red-655 transition-colors bg-white hover:bg-red-50 border border-slate-200/60 rounded-lg cursor-pointer" 
                                title="Eliminar Grupo"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Edición Directorio */}
          {showDirModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm">
                <h3 className="font-serif font-bold text-slate-950 text-xl mb-4">
                  {editingDir.id ? 'Editar Extensión' : 'Nueva Extensión'}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!editingDir.name.trim() || !editingDir.extension.trim()) return;
                  const newEntry = {
                    ...editingDir,
                    id: editingDir.id || 'dir_' + Date.now(),
                    contactPerson: editingDir.contactPerson || '',
                    groupId: editingDir.groupId || getDirectoryGroup(editingDir, directoryGroups).id || 'g_otros'
                  };
                  const isNew = !directory.find(d => d.id === newEntry.id);
                  const updated = isNew ? [...directory, newEntry] : directory.map(d => d.id === newEntry.id ? newEntry : d);
                  setDirectory(updated);
                  addAuditLog('directory', newEntry.id, isNew ? 'INSERT' : 'UPDATE', null, newEntry);
                  setShowDirModal(false);
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Área / Puesto</label>
                    <input 
                      type="text" 
                      required
                      value={editingDir.name}
                      onChange={e => setEditingDir({...editingDir, name: e.target.value})}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                      placeholder="Ej. Gerente de Ventas, Recepción Centro"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Persona que atiende (Opcional)</label>
                    <input 
                      type="text" 
                      value={editingDir.contactPerson || ''}
                      onChange={e => setEditingDir({...editingDir, contactPerson: e.target.value})}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                      placeholder="Ej. Lic. Alejandro Gómez"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Grupo / División</label>
                    <select
                      value={editingDir.groupId || (editingDir.id ? getDirectoryGroup(editingDir, directoryGroups).id : 'g_otros')}
                      onChange={e => setEditingDir({...editingDir, groupId: e.target.value})}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 font-semibold text-slate-700"
                    >
                      {directoryGroups.sort((a, b) => (a.order || 0) - (b.order || 0)).map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Número de Extensión</label>
                    <input 
                      type="text" 
                      required
                      value={editingDir.extension}
                      onChange={e => setEditingDir({...editingDir, extension: e.target.value})}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                      placeholder="Ej. 201"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">URL Foto (Opcional)</label>
                    <input 
                      type="text" 
                      value={editingDir.photo || ''}
                      onChange={e => setEditingDir({...editingDir, photo: e.target.value})}
                      className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setShowDirModal(false)} className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
                    <button type="submit" className="flex-1 py-3 px-4 bg-[#081225] text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==========================================================
          7. GESTION DE BASE DE DATOS DIRECTA (CONSTRUCTOR Y CRUD DINÁMICO)
          ========================================================== */}
      {activeSubTab === 'DATABASE' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
          
          {/* Sidebar de Tablas */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 space-y-4 shadow-sm flex flex-col justify-between max-h-[600px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2 pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tablas del Sistema</span>
                <button
                  onClick={() => {
                    setNewTableNameInput('');
                    setShowCreateTableModal(true);
                  }}
                  className="bg-[#1E3A8A] text-white rounded-lg p-1.5 hover:bg-[#1E40AF] transition-colors flex items-center"
                  title="Crear Nueva Tabla"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1 overflow-y-auto max-h-[480px] pr-1">
                {Object.keys(allTables).map(key => {
                  const tbl = allTables[key];
                  const isSelected = selectedTableName === key;
                  const recordCount = Array.isArray(tbl.data) ? tbl.data.length : (tbl.data ? 1 : 0);
                  return (
                    <div 
                      key={key} 
                      className={`group w-full text-left text-xs px-3 py-2.5 rounded-xl transition-all font-semibold flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-50 text-[#081225] border-slate-200 shadow-sm'
                          : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900 border-transparent'
                      }`}
                      onClick={() => {
                        setSelectedTableName(key);
                        setEditingRecordIndex(-1);
                        setIsCreatingNewRecord(false);
                        setRawJsonMode(false);
                      }}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-sm shrink-0">{tbl.icon}</span>
                        <span className="truncate" title={tbl.label}>{tbl.label}</span>
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded-full text-slate-500 font-mono">
                          {recordCount}
                        </span>
                        {tbl.isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerConfirm(`¿Estás completamente seguro de que deseas eliminar permanentemente la tabla personalizada "${key}" y todos sus datos?`, () => {
                                const updatedCustom = { ...customTables };
                                delete updatedCustom[key];
                                setCustomTables(updatedCustom);
                                setSelectedTableName('');
                                triggerNotification(`Tabla "${key}" eliminada.`);
                              });
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-0.5 transition-opacity"
                            title="Eliminar Tabla"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel de Datos / CRUD */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-sm min-h-[500px]">
            {!selectedTableName ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-24 space-y-4">
                <div className="w-16 h-16 bg-slate-55 border border-slate-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
                  🗃️
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-serif font-bold text-slate-800 text-base">Explorador de Base de Datos</h4>
                  <p className="text-xs text-slate-500 max-w-sm">Selecciona una tabla del listado de la izquierda para comenzar a visualizar y modificar sus registros de forma directa.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-serif font-bold text-slate-900 text-lg flex items-center gap-2">
                        <span>{allTables[selectedTableName].icon}</span>
                        <span>{allTables[selectedTableName].label}</span>
                      </h3>
                      <p className="text-xs text-slate-450 mt-0.5">
                        Clave en BD: <span className="font-mono bg-slate-50 border border-slate-200/50 px-1.5 py-0.5 rounded text-slate-600 font-bold text-[10px]">{selectedTableName}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setRawJsonMode(!rawJsonMode);
                          setRawJsonText(JSON.stringify(allTables[selectedTableName].data, null, 2));
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          rawJsonMode 
                            ? 'bg-slate-100 border-slate-300 text-slate-800 shadow-inner' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 shadow-sm'
                        }`}
                      >
                        {rawJsonMode ? '📊 Vista Tabla' : '📄 Editar JSON Completo'}
                      </button>
                      {!rawJsonMode && Array.isArray(allTables[selectedTableName].data) && (
                        <button
                          onClick={() => {
                            const currentData = allTables[selectedTableName].data;
                            let newRecord = {};
                            if (currentData.length > 0 && typeof currentData[0] === 'object' && currentData[0] !== null) {
                              Object.keys(currentData[0]).forEach(k => {
                                if (k === 'id') {
                                  newRecord[k] = 'id_' + Date.now();
                                } else {
                                  newRecord[k] = typeof currentData[0][k] === 'number' ? 0 : 
                                                typeof currentData[0][k] === 'boolean' ? false : '';
                                }
                              });
                            } else {
                              newRecord = { id: 'id_' + Date.now(), nombre: '', descripcion: '' };
                            }
                            setEditingRecordData(newRecord);
                            setEditingRecordIndex(-1);
                            setIsCreatingNewRecord(true);
                          }}
                          className="bg-[#081225] hover:bg-slate-800 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-md flex items-center gap-1.5 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" /> Agregar Registro
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cuerpo Principal */}
                  {rawJsonMode ? (
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200/40 p-3 rounded-2xl text-[11px] text-amber-800 flex items-start gap-2 leading-relaxed">
                        <span className="text-sm">⚠️</span>
                        <p><strong>Cuidado:</strong> Estás editando el JSON completo de esta tabla. Conserva el formato de estructura de datos original para evitar errores funcionales en la plataforma.</p>
                      </div>
                      <textarea
                        value={rawJsonText}
                        onChange={(e) => setRawJsonText(e.target.value)}
                        className="w-full font-mono text-[10.5px] bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[350px] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                        spellCheck="false"
                      />
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => setRawJsonMode(false)}
                          className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            try {
                              const parsed = JSON.parse(rawJsonText);
                              allTables[selectedTableName].setter(parsed);
                              setRawJsonMode(false);
                              triggerNotification(`Tabla "${selectedTableName}" actualizada exitosamente.`);
                            } catch (err) {
                              triggerNotification('Error de Sintaxis JSON: Por favor valida los corchetes o comillas.', 'error');
                            }
                          }}
                          className="px-5 py-2 text-xs font-bold bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-xl shadow-md transition-all"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {(() => {
                        const data = allTables[selectedTableName].data;
                        if (!Array.isArray(data)) {
                          return (
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-150 space-y-4">
                              <p className="text-xs text-slate-500 font-semibold">Esta tabla contiene un objeto de configuración no-lista. Edítela usando el modo de JSON completo.</p>
                              <pre className="text-[10px] bg-white border border-slate-200 rounded-xl p-4 overflow-x-auto text-slate-700 leading-normal font-mono max-h-[300px] shadow-inner">
                                {JSON.stringify(data, null, 2)}
                              </pre>
                            </div>
                          );
                        }

                        if (data.length === 0) {
                          return (
                            <div className="py-16 text-center text-slate-400 text-xs italic flex flex-col items-center justify-center gap-2.5">
                              <span className="text-2xl">📎</span>
                              <span>Esta tabla no contiene ningún registro.</span>
                            </div>
                          );
                        }

                        const isObjectArray = typeof data[0] === 'object' && data[0] !== null;

                        if (!isObjectArray) {
                          return (
                            <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-slate-50 text-slate-400 border-b border-slate-150 font-bold uppercase text-[9px] tracking-wider">
                                    <th className="p-3">Índice</th>
                                    <th className="p-3">Valor</th>
                                    <th className="p-3 text-right">Acciones</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-150">
                                  {data.map((val, idx) => (
                                    <tr key={idx} className="hover:bg-slate-55/50 transition-colors">
                                      <td className="p-3 font-mono text-slate-400">#{idx}</td>
                                      <td className="p-3 font-semibold text-slate-800">{String(val)}</td>
                                      <td className="p-3 text-right flex items-center justify-end gap-3">
                                        <button
                                          onClick={() => {
                                            const newVal = prompt(`Editar valor #${idx}:`, String(val));
                                            if (newVal !== null) {
                                              const updated = [...data];
                                              updated[idx] = typeof val === 'number' ? Number(newVal) : 
                                                             typeof val === 'boolean' ? (newVal === 'true') : newVal;
                                              allTables[selectedTableName].setter(updated);
                                              triggerNotification('Valor actualizado.');
                                            }
                                          }}
                                          className="text-blue-600 hover:text-blue-800 font-bold text-[11px]"
                                        >
                                          Editar
                                        </button>
                                        <button
                                          onClick={() => {
                                            triggerConfirm(`¿Eliminar el valor "${String(val)}"?`, () => {
                                              const updated = data.filter((_, i) => i !== idx);
                                              allTables[selectedTableName].setter(updated);
                                              triggerNotification('Valor eliminado.');
                                            });
                                          }}
                                          className="text-red-500 hover:text-red-750 font-bold text-[11px]"
                                        >
                                          Eliminar
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        const headers = Object.keys(data[0]);

                        return (
                          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm max-h-[420px] overflow-y-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 text-slate-400 border-b border-slate-150 font-bold uppercase text-[9px] tracking-wider sticky top-0 z-10">
                                  {headers.slice(0, 5).map(h => (
                                    <th key={h} className="p-3">{h}</th>
                                  ))}
                                  {headers.length > 5 && <th className="p-3">...</th>}
                                  <th className="p-3 text-right">Acciones</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {data.map((row, idx) => (
                                  <tr key={row.id || idx} className="hover:bg-slate-55/40 transition-colors">
                                    {headers.slice(0, 5).map(h => {
                                      const val = row[h];
                                      const displayVal = typeof val === 'object' && val !== null 
                                        ? JSON.stringify(val).substring(0, 20) + '...'
                                        : String(val === undefined || val === null ? '' : val);
                                      return (
                                        <td key={h} className="p-3 truncate max-w-[150px]" title={displayVal}>
                                          {h === 'id' || h === 'folio' ? (
                                            <span className="font-mono bg-slate-100 border border-slate-200/50 px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-semibold">{displayVal}</span>
                                          ) : displayVal}
                                        </td>
                                      );
                                    })}
                                    {headers.length > 5 && <td className="p-3 text-slate-400 italic">+{headers.length - 5} campos</td>}
                                    <td className="p-3 text-right">
                                      <div className="flex gap-3.5 justify-end">
                                        <button
                                          onClick={() => {
                                            setEditingRecordData({ ...row });
                                            setEditingRecordIndex(idx);
                                            setIsCreatingNewRecord(false);
                                          }}
                                          className="text-[#1E3A8A] hover:text-[#1E40AF] font-bold text-[11px]"
                                        >
                                          Editar
                                        </button>
                                        <button
                                          onClick={() => {
                                            triggerConfirm(`¿Eliminar este registro con ID "${row.id || idx}"?`, () => {
                                              const updated = data.filter((_, i) => i !== idx);
                                              allTables[selectedTableName].setter(updated);
                                              triggerNotification('Registro eliminado.');
                                            });
                                          }}
                                          className="text-red-500 hover:text-red-750 font-bold text-[11px]"
                                        >
                                          Eliminar
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modal Crear Tabla */}
          {showCreateTableModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm border border-slate-150 animate-scale-up">
                <h3 className="font-serif font-bold text-slate-950 text-lg mb-2">Crear Nueva Tabla</h3>
                <p className="text-xs text-slate-450 mb-4">Cree una colección de datos personalizada en su base de datos.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const name = newTableNameInput.trim().replace(/\s+/g, '_');
                  if (!name) return;
                  
                  const standardKeys = [
                    'services', 'leads', 'internalDocs', 'announcements', 'tasks', 'auditLogs',
                    'crmColumns', 'customFormFields', 'contactMethods', 'activeUsers', 'crmForms',
                    'crmFormSubmissions', 'events', 'landingCards', 'roles', 'directory', 'empty'
                  ];
                  if (standardKeys.includes(name) || customTables[name]) {
                    triggerNotification('Ese nombre de tabla ya existe o está reservado por el sistema.', 'error');
                    return;
                  }

                  setCustomTables(prev => ({
                    ...prev,
                    [name]: []
                  }));
                  setSelectedTableName(name);
                  setShowCreateTableModal(false);
                  setNewTableNameInput('');
                  triggerNotification(`Tabla personalizada "${name}" inicializada.`);
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Nombre (Clave de BD)</label>
                    <input 
                      type="text" 
                      required
                      value={newTableNameInput}
                      onChange={e => setNewTableNameInput(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
                      placeholder="ej. convenios_2026"
                    />
                    <p className="text-[10px] text-slate-400 mt-1 italic">Solo minúsculas, números y guiones bajos.</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowCreateTableModal(false)} className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all">Cancelar</button>
                    <button type="submit" className="flex-1 py-2.5 px-4 bg-[#081225] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md">Crear Tabla</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal CRUD Registro Dinámico */}
          {editingRecordData && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] border border-slate-100 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-slate-950 text-base">
                      {isCreatingNewRecord ? `Nuevo Registro - ${selectedTableName}` : `Modificar Registro #${editingRecordIndex}`}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Gestión de campos para la colección `{selectedTableName}`</p>
                  </div>
                  <button 
                    onClick={() => setEditingRecordData(null)}
                    className="text-slate-400 hover:text-slate-700 text-xl font-bold font-mono transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(editingRecordData).map(key => {
                      const val = editingRecordData[key];
                      const type = typeof val;

                      if (type === 'object' && val !== null) {
                        return (
                          <div key={key} className="col-span-full space-y-1.5">
                            <label className="text-[9.5px] text-[#1E3A8A] font-bold uppercase tracking-wider block font-mono">{key} (Estructura JSON/Array/Objeto)</label>
                            <textarea
                              defaultValue={JSON.stringify(val, null, 2)}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  setEditingRecordData(prev => ({
                                    ...prev,
                                    [key]: parsed
                                  }));
                                } catch (err) {
                                  // Invalid raw json is just bypassed or ignored
                                }
                              }}
                              className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 h-28 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                            />
                          </div>
                        );
                      }

                      if (type === 'boolean') {
                        return (
                          <div key={key} className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-3 rounded-xl sm:col-span-1">
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider font-mono">{key}</span>
                            <input
                              type="checkbox"
                              checked={Boolean(val)}
                              onChange={(e) => {
                                setEditingRecordData(prev => ({
                                  ...prev,
                                  [key]: e.target.checked
                                }));
                              }}
                              className="rounded text-[#1E3A8A] focus:ring-0 cursor-pointer w-4 h-4"
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={key} className="space-y-1 sm:col-span-1">
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">{key}</label>
                          <input
                            type={type === 'number' ? 'number' : 'text'}
                            value={val === undefined || val === null ? '' : val}
                            disabled={key === 'id' && !isCreatingNewRecord}
                            onChange={(e) => {
                              const value = type === 'number' ? Number(e.target.value) : e.target.value;
                              setEditingRecordData(prev => ({
                                ...prev,
                                [key]: value
                              }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25 transition-all"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-4 mt-2">
                  <button 
                    type="button" 
                    onClick={() => setEditingRecordData(null)} 
                    className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      const table = allTables[selectedTableName];
                      const currentData = [...table.data];
                      
                      if (isCreatingNewRecord) {
                        currentData.push(editingRecordData);
                        triggerNotification('Registro agregado a la base de datos.');
                      } else {
                        currentData[editingRecordIndex] = editingRecordData;
                        triggerNotification('Registro actualizado en la base de datos.');
                      }

                      table.setter(currentData);
                      setEditingRecordData(null);
                    }}
                    className="flex-1 py-3 px-4 bg-[#081225] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                  >
                    Guardar Registro
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. Gestión de Roles y Habilitación Dinámica de Menús */}
      {activeSubTab === 'ROLES_PERMISSIONS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Roles Management */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col h-full max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center sticky top-0 bg-white pb-2 z-10 border-b border-slate-100">
              <div>
                <h4 className="font-serif font-bold text-slate-950 text-base">Puestos y Roles</h4>
                <p className="text-xs text-slate-450 mt-1">Crea puestos de trabajo y define qué módulos pueden operar.</p>
              </div>
              <button onClick={() => { setEditingRole({ name: '', permissions: {} }); setShowRoleModal(true); }} className="bg-[#1E3A8A] text-white text-xs px-4 py-2 rounded-full font-bold shadow-md hover:bg-[#1E40AF]">
                + Nuevo Rol
              </button>
            </div>

            <div className="space-y-3">
              {roles.map(r => (
                <div key={r.id} className="bg-[#FAFAFA] border border-slate-200 p-4 rounded-2xl flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#081225]">{r.name}</span>
                    <div className="flex gap-3">
                      <button onClick={() => { setEditingRole(r); setShowRoleModal(true); }} className="text-slate-500 hover:text-[#081225] text-xs font-semibold">Editar</button>
                      <button onClick={() => handleDeleteRole(r.id)} className="text-red-400 hover:text-red-600 text-xs font-semibold">Eliminar</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['INTRANET', 'OPERATIONS', 'CRM', 'DOCS', 'ADMIN'].map(menu => (
                      <button
                        key={menu}
                        onClick={() => handleToggleRolePermission(r.id, menu)}
                        className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${r.permissions[menu] ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200'}`}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col h-full max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center sticky top-0 bg-white pb-2 z-10 border-b border-slate-100">
              <div>
                <h4 className="font-serif font-bold text-slate-950 text-base">Directorio de Empleados</h4>
                <p className="text-xs text-slate-450 mt-1">Administra accesos y contraseñas.</p>
              </div>
              <button onClick={() => { setEditingUser({ name: '', email: '', password: '', roleId: roles[0]?.id || '' }); setShowUserModal(true); }} className="bg-[#081225] text-white text-xs px-4 py-2 rounded-full font-bold shadow-md hover:bg-slate-800">
                + Empleado
              </button>
            </div>

            <div className="space-y-3">
              {activeUsers.map(u => (
                <div key={u.id} className="bg-[#FAFAFA] border border-slate-200 p-3 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                      {u.avatar ? <img src={u.avatar} alt={u.name} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xs">{u.name.charAt(0)}</div>}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{u.name}</h5>
                      <span className="text-[10px] text-slate-500">{u.email}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {roles.find(r => r.id === u.roleId)?.name || u.role}
                    </span>
                    <div className="flex gap-2 mt-1">
                      <button onClick={() => { setEditingUser(u); setShowUserModal(true); }} className="text-slate-400 hover:text-slate-800 text-[10px] font-semibold">Editar</button>
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-300 hover:text-red-600 text-[10px] font-semibold">Baja</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Historial de Auditoría */}
      {activeSubTab === 'AUDIT' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-serif font-bold text-slate-900 text-base">Bitácora General de Cambios (Auditoría)</h4>
              <p className="text-xs text-slate-450 mt-1">Todo cambio en la base de datos se registra automáticamente con los valores OLD y NEW correspondientes.</p>
            </div>
            <button 
              onClick={() => setAuditLogs([])}
              className="text-red-500 hover:text-red-600 text-xs px-3 py-1.5 rounded-lg border border-red-100 font-semibold"
            >
              Limpiar Bitácora
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-[#1E3A8A]ollapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-100">
                  <th className="p-3">Tabla Afectada</th>
                  <th className="p-3">Acción</th>
                  <th className="p-3">ID Registro</th>
                  <th className="p-3">Usuario Ejecutó</th>
                  <th className="p-3">Fecha y Hora</th>
                  <th className="p-3 text-right">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map(log => {
                  const executor = activeUsers.find(u => u.id === log.userId)?.name || log.userId;
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 text-slate-800 font-semibold">{log.tableName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.action === 'INSERT' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          log.action === 'DELETE' ? 'bg-red-50 text-red-600 border border-red-100' :
                          'bg-slate-100 text-[#081225] border border-slate-200'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">{log.recordId}</td>
                      <td className="p-3 text-slate-600">{executor}</td>
                      <td className="p-3 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-[#081225] hover:text-slate-600 font-bold"
                        >
                          Inspeccionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Modal detalle log */}
          {selectedLog && (
            <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl w-full space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-lg">Detalle JSON Auditoría</h3>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">ID Log: {selectedLog.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedLog(null)}
                    className="bg-slate-100 px-3 py-1.5 rounded-xl text-slate-550 text-xs font-semibold"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1">
                    <span className="font-bold text-slate-500 block uppercase text-[9px] tracking-wider">Valor Previo (OLD)</span>
                    <pre className="text-[10px] text-red-650 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                      {selectedLog.oldValue ? JSON.stringify(selectedLog.oldValue, null, 2) : 'NULL'}
                    </pre>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-1">
                    <span className="font-bold text-slate-500 block uppercase text-[9px] tracking-wider">Nuevo Valor (NEW)</span>
                    <pre className="text-[10px] text-emerald-600 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                      {selectedLog.newValue ? JSON.stringify(selectedLog.newValue, null, 2) : 'NULL'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Gestión de Contenido de Inicio */}
      {activeSubTab === 'LANDING_CONTENT' && (
        <LandingContentPanel 
          landingCards={landingCards}
          setLandingCards={setLandingCards}
          addAuditLog={addAuditLog}
          triggerNotification={triggerNotification}
          triggerConfirm={triggerConfirm}
        />
      )}

      {/* 5. Gestión de Cartelera de Avisos y Anuncios */}
      {activeSubTab === 'CAROUSEL_ADMIN' && (
        <AnnouncementsAdminPanel
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          addAuditLog={addAuditLog}
          triggerNotification={triggerNotification}
          triggerConfirm={triggerConfirm}
        />
      )}

      {/* 3. Constructor dinámico */}
      {activeSubTab === 'FORM_BUILDER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div>
              <h4 className="font-serif font-bold text-slate-900 text-base">Estructurador CRM Dinámico</h4>
              <p className="text-xs text-slate-450 mt-1">Cree nuevos campos dinámicos a completar en prospectos o nuevas fases en el embudo.</p>
            </div>

            <form onSubmit={handleAddNewStage} className="space-y-2 bg-[#FAFAFA] p-4 rounded-2xl border border-slate-150">
              <label className="text-xs text-slate-650 font-bold block">Añadir Etapa de Venta</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ej. NEGOCIACION"
                  value={newCrmStage}
                  onChange={(e) => setNewCrmStage(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <button type="submit" className="bg-[#1E3A8A] text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm">
                  Añadir
                </button>
              </div>
            </form>

            <form onSubmit={handleAddNewField} className="space-y-2 bg-[#FAFAFA] p-4 rounded-2xl border border-slate-150">
              <label className="text-xs text-slate-650 font-bold block">Añadir Campo Complementario</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ej. Formulario Prospección Campaña X"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <button type="submit" className="bg-[#1E3A8A] text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm">
                  Añadir Campo
                </button>
              </div>
            </form>

            <form onSubmit={handleAddContactMethod} className="space-y-2 bg-[#FAFAFA] p-4 rounded-2xl border border-slate-150">
              <label className="text-xs text-slate-650 font-bold block">Añadir Método de Contacto CRM</label>
              <p className="text-[10px] text-slate-400">Opciones disponibles para el campo "¿Cómo nos contactó?" al registrar prospectos.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ej. Feria Comercial, Facebook Ads"
                  value={newContactMethod}
                  onChange={(e) => setNewContactMethod(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl px-4 py-2 text-xs font-semibold shadow-sm">
                  Añadir
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-slate-900 text-base">Configuración de Estructuras CRM</h4>
            
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Etapas de Venta Activas (Reordenables)</span>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {crmColumns.map((col, index) => (
                  <div key={col} className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between shadow-sm">
                    <span className="flex items-center gap-2">
                      <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] text-[10px] px-2 py-0.5 rounded font-mono">#{index + 1}</span>
                      {col}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveStage(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded-lg hover:bg-slate-200 transition-colors ${index === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-655'}`}
                        title="Subir etapa"
                      >
                        <ChevronRight className="w-4 h-4 -rotate-90" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveStage(index, 'down')}
                        disabled={index === crmColumns.length - 1}
                        className={`p-1 rounded-lg hover:bg-slate-200 transition-colors ${index === crmColumns.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-655'}`}
                        title="Bajar etapa"
                      >
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteStage(col)}
                        className="p-1 rounded-lg hover:bg-red-50 text-red-500 transition-colors ml-2 font-bold text-sm"
                        title="Eliminar etapa"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Campos dinámicos asignados</span>
              <div className="space-y-2">
                {customFormFields.map(f => (
                  <div key={f} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 flex justify-between items-center shadow-sm">
                    <span>{f}</span>
                    <button 
                      onClick={() => setCustomFormFields(customFormFields.filter(field => field !== f))}
                      className="text-red-550 font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-150">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Métodos de Contacto Activos</span>
              <div className="space-y-2">
                {(contactMethods || []).map(m => (
                  <div key={m} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 flex justify-between items-center shadow-sm">
                    <span>{m}</span>
                    <button 
                      onClick={() => setContactMethods(contactMethods.filter(method => method !== m))}
                      className="text-red-550 font-bold"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Modals for Roles and Users */}
    {showRoleModal && (
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
          <h3 className="font-serif font-bold text-lg mb-4">{editingRole.id ? 'Editar Rol' : 'Nuevo Rol'}</h3>
          <form onSubmit={handleSaveRole} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nombre del Puesto</label>
              <input type="text" value={editingRole.name} onChange={e => setEditingRole({...editingRole, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]" required />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setShowRoleModal(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800">Cancelar</button>
              <button type="submit" className="px-4 py-2 text-xs font-bold bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF]">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {showUserModal && (
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
          <h3 className="font-serif font-bold text-lg mb-4">{editingUser.id ? 'Editar Empleado' : 'Nuevo Empleado'}</h3>
          <form onSubmit={handleSaveUser} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo</label>
              <input type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]" required />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Correo (Usuario)</label>
              <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]" required />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Contraseña</label>
              <input type="text" value={editingUser.password} onChange={e => setEditingUser({...editingUser, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]" required />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Puesto / Rol</label>
              <select value={editingUser.roleId} onChange={e => setEditingUser({...editingUser, roleId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]" required>
                <option value="" disabled>Seleccione un rol...</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setShowUserModal(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800">Cancelar</button>
              <button type="submit" className="px-4 py-2 text-xs font-bold bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E40AF]">Guardar Empleado</button>
            </div>
          </form>
        </div>
      </div>
    )}
      </div>
    </div>
  );
}

// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE CARTELERA DE ANUNCIOS (CAROUSEL)
// ====================================================================================
function AnnouncementsAdminPanel({ announcements, setAnnouncements, addAuditLog, triggerNotification, triggerConfirm }) {
  const [showModal, setShowModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);

  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTag, setAnnTag] = useState('Corporativo');
  const [annImg, setAnnImg] = useState('/assets/recursos/Imagen13.jpg');
  const [annStartDate, setAnnStartDate] = useState('');
  const [annEndDate, setAnnEndDate] = useState('');
  const [annDuration, setAnnDuration] = useState(6);

  const IMAGES_LIST = [
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6549 - Fachada Capillas', path: '/assets/recursos/IMG_6549.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'IMG_6655 - Detalles Vitrales', path: '/assets/recursos/IMG_6655.jpg' },
    { label: 'IMG_6682 - Cruz e Iluminaci\u00f3n', path: '/assets/recursos/IMG_6682.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6707A - Vista Exterior Cruz', path: '/assets/recursos/IMG_6707A.jpg' },
    { label: 'IMG_6717 - Jard\u00edn de los \u00c1ngeles', path: '/assets/recursos/IMG_6717.jpg' },
    { label: 'IMG_6720 - Oratorio Principal', path: '/assets/recursos/IMG_6720.jpg' },
    { label: 'IMG_6808 - Recepci\u00f3n Principal', path: '/assets/recursos/IMG_6808.jpg' },
    { label: 'IMG_6815 - Homenaje Floral', path: '/assets/recursos/IMG_6815.jpg' },
    { label: 'IMG_6820 - Capilla Mayor Monumental', path: '/assets/recursos/IMG_6820.jpg' }
  ];

  const TAGS = ['Corporativo', 'Instalaciones', 'Eventos', 'Ventas', 'Aviso Urgente', 'Recursos Humanos'];

  const handleOpenCreate = () => {
    setEditingAnn(null);
    setAnnTitle('');
    setAnnContent('');
    setAnnTag('Corporativo');
    setAnnImg('/assets/recursos/Imagen13.jpg');
    const today = new Date().toISOString().split('T')[0];
    setAnnStartDate(today);
    setAnnEndDate(today);
    setAnnDuration(6);
    setShowModal(true);
  };

  const handleOpenEdit = (ann) => {
    setEditingAnn(ann);
    setAnnTitle(ann.title);
    setAnnContent(ann.content);
    setAnnTag(ann.tag);
    setAnnImg(ann.img || '/assets/recursos/Imagen13.jpg');
    setAnnStartDate(ann.startDate || '');
    setAnnEndDate(ann.endDate || '');
    setAnnDuration(ann.duration || 6);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    if (editingAnn) {
      const oldVal = { ...editingAnn };
      const newVal = { ...editingAnn, title: annTitle.trim(), content: annContent.trim(), tag: annTag, img: annImg, startDate: annStartDate, endDate: annEndDate, duration: Number(annDuration) };
      const updated = announcements.map(a => a.id === editingAnn.id ? newVal : a);
      setAnnouncements(updated);
      addAuditLog('announcements', editingAnn.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Aviso actualizado en la cartelera.');
    } else {
      const newAnn = {
        id: 'ann_' + Date.now(),
        title: annTitle.trim(),
        content: annContent.trim(),
        tag: annTag,
        img: annImg,
        startDate: annStartDate,
        endDate: annEndDate,
        duration: Number(annDuration)
      };
      const updated = [...announcements, newAnn];
      setAnnouncements(updated);
      addAuditLog('announcements', newAnn.id, 'INSERT', null, newAnn);
      triggerNotification('Nuevo aviso a\u00f1adido a la cartelera.');
    }
    setShowModal(false);
  };

  const handleDelete = (annId) => {
    triggerConfirm('¿Eliminar este aviso de la cartelera?', () => {
      const annToDelete = announcements.find(a => a.id === annId);
      const updated = announcements.filter(a => a.id !== annId);
      setAnnouncements(updated);
      addAuditLog('announcements', annId, 'DELETE', annToDelete, null);
      triggerNotification('Aviso eliminado de la cartelera.');
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gesti\u00f3n de Cartelera de Avisos y Anuncios</h4>
          <p className="text-xs text-slate-400 mt-1">Controle los avisos del carrusel de la p\u00e1gina principal. Cada aviso tiene duraci\u00f3n configurable, imagen y texto.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Nuevo Aviso
        </button>
      </div>

      {/* Vista previa del carrusel */}
      <div className="space-y-3">
        {announcements.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay avisos en la cartelera. Presione "Nuevo Aviso" para crear el primero.
          </div>
        )}
        {announcements.map((ann, idx) => (
          <div key={ann.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex gap-0 shadow-sm">
            {/* Imagen previa */}
            <div className="w-32 h-auto flex-shrink-0 relative overflow-hidden bg-slate-200">
              <img src={ann.img || '/assets/recursos/Imagen13.jpg'} alt={ann.title} className="w-full h-full object-cover" />
            </div>
            {/* Contenido */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">{ann.tag}</span>
                  <span className="text-[9px] text-slate-400">{ann.startDate} → {ann.endDate}</span>
                  <span className="text-[9px] text-slate-400 ml-auto flex items-center gap-1">
                    ⏱ {ann.duration || 6}s por diapositiva
                  </span>
                </div>
                <h5 className="font-bold text-xs text-slate-800">{ann.title}</h5>
                <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{ann.content}</p>
              </div>
              <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEdit(ann)}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(ann.id)}
                  className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de creación/edición */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingAnn ? 'Editar Aviso de Cartelera' : 'Nuevo Aviso de Cartelera'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">T\u00edtulo del Aviso *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Inauguraci\u00f3n nueva sala Cielo"
                  value={annTitle}
                  onChange={e => setAnnTitle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Contenido / Descripci\u00f3n *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Descripci\u00f3n del aviso para los empleados..."
                  value={annContent}
                  onChange={e => setAnnContent(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none resize-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Categor\u00eda / Tag</label>
                  <select
                    value={annTag}
                    onChange={e => setAnnTag(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none"
                  >
                    {TAGS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Duraci\u00f3n (segundos por diapositiva)</label>
                  <input
                    type="number"
                    min={3}
                    max={30}
                    value={annDuration}
                    onChange={e => setAnnDuration(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Fecha Inicio</label>
                  <input
                    type="date"
                    value={annStartDate}
                    onChange={e => setAnnStartDate(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-semibold block">Fecha Fin</label>
                  <input
                    type="date"
                    value={annEndDate}
                    onChange={e => setAnnEndDate(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-semibold block">Imagen del Aviso</label>
                <select
                  value={annImg}
                  onChange={e => setAnnImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none"
                >
                  {IMAGES_LIST.map(imgOpt => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                {/* Vista previa imagen */}
                <div className="relative overflow-hidden h-28 bg-slate-100 rounded-xl border border-slate-200">
                  <img src={annImg} alt="Vista previa" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingAnn ? 'Guardar Cambios' : 'Publicar Aviso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE CONTENIDO DE LA LANDING (TANATOLOGÍA & HOMENAJES)
// ====================================================================================
function LandingContentPanel({ landingCards, setLandingCards, addAuditLog, triggerNotification, triggerConfirm }) {

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('/assets/recursos/Imagen13.jpg');

  const IMAGES_LIST = [
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6549 - Fachada Capillas', path: '/assets/recursos/IMG_6549.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'IMG_6655 - Detalles Vitrales', path: '/assets/recursos/IMG_6655.jpg' },
    { label: 'IMG_6682 - Cruz e Iluminación', path: '/assets/recursos/IMG_6682.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6707A - Vista Exterior Cruz', path: '/assets/recursos/IMG_6707A.jpg' },
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' },
    { label: 'IMG_6720 - Oratorio Principal', path: '/assets/recursos/IMG_6720.jpg' },
    { label: 'IMG_6808 - Recepción Principal', path: '/assets/recursos/IMG_6808.jpg' },
    { label: 'IMG_6815 - Homenaje Floral', path: '/assets/recursos/IMG_6815.jpg' },
    { label: 'IMG_6820 - Capilla Mayor Monumental', path: '/assets/recursos/IMG_6820.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingCard(null);
    setTitle('');
    setDesc('');
    setImg('/assets/recursos/Imagen13.jpg');
    setShowFormModal(true);
  };

  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setTitle(card.title);
    setDesc(card.desc);
    setImg(card.img);
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    if (editingCard) {
      const oldVal = { ...editingCard };
      const newVal = { ...editingCard, title: title.trim(), desc: desc.trim(), img };
      const updated = landingCards.map(c => c.id === editingCard.id ? newVal : c);
      setLandingCards(updated);
      addAuditLog('landing_cards', editingCard.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Evento actualizado exitosamente.');
    } else {
      const newCard = {
        id: 'card_' + Date.now(),
        title: title.trim(),
        desc: desc.trim(),
        img
      };
      const updated = [...landingCards, newCard];
      setLandingCards(updated);
      addAuditLog('landing_cards', newCard.id, 'INSERT', null, newCard);
      triggerNotification('Evento creado exitosamente.');
    }

    setShowFormModal(false);
  };

  const handleDelete = (cardId) => {
    const cardToDelete = landingCards.find(c => c.id === cardId);
    if (!cardToDelete) return;
    const updated = landingCards.filter(c => c.id !== cardId);
    setLandingCards(updated);
    addAuditLog('landing_cards', cardId, 'DELETE', cardToDelete, null);
    triggerNotification('Evento eliminado exitosamente.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Eventos y Tanatología (Inicio)</h4>
          <p className="text-xs text-slate-400 mt-1">Administre las tarjetas informativas y los eventos públicos que se visualizan en la Landing Page.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Tarjeta / Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {landingCards.map(card => (
          <div key={card.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative overflow-hidden h-32 bg-slate-200">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h5 className="font-bold text-xs text-slate-800">{card.title}</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1">{card.desc}</p>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
                <button
                  onClick={() => handleOpenEdit(card)}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-650 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {landingCards.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay tarjetas públicas. Presione "Añadir Tarjeta" para registrar la primera.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingCard ? 'Editar Evento / Homenaje' : 'Crear Evento / Homenaje'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Título del Evento / Plática</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Taller de Tanatología Infantil"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Descripción o Detalles</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ej. Sesiones grupales de ayuda tanatológica dirigidas por profesionales..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#1E3A8A] rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Seleccionar Imagen Real Corporativa</label>
                <select
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#1E3A8A] rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none"
                >
                  {IMAGES_LIST.map((imgOpt) => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                <div className="relative overflow-hidden h-20 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingCard ? 'Guardar Cambios' : 'Crear Tarjeta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE INSTALACIONES Y SUCURSALES (VISTA PÚBLICA)
// ====================================================================================
function BranchesAdminPanel({ branches, setBranches, addAuditLog, triggerNotification, triggerConfirm }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [ext, setExt] = useState('');
  const [img, setImg] = useState('/assets/recursos/IMG_6717.jpg');

  const IMAGES_LIST = [
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'IMG_6655 - Detalles Vitrales', path: '/assets/recursos/IMG_6655.jpg' },
    { label: 'IMG_6682 - Cruz e Iluminación', path: '/assets/recursos/IMG_6682.jpg' },
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6707A - Vista Exterior Cruz', path: '/assets/recursos/IMG_6707A.jpg' },
    { label: 'IMG_6720 - Oratorio Principal', path: '/assets/recursos/IMG_6720.jpg' },
    { label: 'IMG_6808 - Recepción Principal', path: '/assets/recursos/IMG_6808.jpg' },
    { label: 'IMG_6815 - Homenaje Floral', path: '/assets/recursos/IMG_6815.jpg' },
    { label: 'IMG_6820 - Capilla Mayor Monumental', path: '/assets/recursos/IMG_6820.jpg' },
    { label: 'IMG_6549 - Fachada Capillas', path: '/assets/recursos/IMG_6549.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingBranch(null);
    setName('');
    setAddress('');
    setExt('');
    setImg('/assets/recursos/IMG_6717.jpg');
    setShowFormModal(true);
  };

  const handleOpenEdit = (branch) => {
    setEditingBranch(branch);
    setName(branch.name);
    setAddress(branch.address);
    setExt(branch.ext || '');
    setImg(branch.img || '/assets/recursos/IMG_6717.jpg');
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !ext.trim()) return;

    if (editingBranch) {
      const oldVal = { ...editingBranch };
      const newVal = { ...editingBranch, name: name.trim(), address: address.trim(), ext: ext.trim(), img };
      const updated = branches.map(b => b.id === editingBranch.id ? newVal : b);
      setBranches(updated);
      addAuditLog('branches', editingBranch.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Sucursal actualizada exitosamente.');
    } else {
      const newBranch = {
        id: 'branch_' + Date.now(),
        name: name.trim(),
        address: address.trim(),
        ext: ext.trim(),
        img
      };
      const updated = [...branches, newBranch];
      setBranches(updated);
      addAuditLog('branches', newBranch.id, 'INSERT', null, newBranch);
      triggerNotification('Sucursal creada exitosamente.');
    }

    setShowFormModal(false);
  };

  const handleDelete = (branchId) => {
    const branchToDelete = branches.find(b => b.id === branchId);
    triggerConfirm(`¿Está seguro de eliminar la sucursal "${branchToDelete?.name || ''}"?`, () => {
      const updated = branches.filter(b => b.id !== branchId);
      setBranches(updated);
      addAuditLog('branches', branchId, 'DELETE', branchToDelete, null);
      triggerNotification('Sucursal eliminada exitosamente.', 'success');
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Sucursales e Instalaciones</h4>
          <p className="text-xs text-slate-400 mt-1">Gestione las ubicaciones físicas, extensiones e imágenes reales que ven los clientes.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Sucursal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {branches.map(branch => (
          <div key={branch.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative overflow-hidden h-32 bg-slate-205">
              {branch.img ? (
                <img src={branch.img} alt={branch.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-[11px]">Imagen de Sucursal</div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h5 className="font-bold text-xs text-slate-800">{branch.name}</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1">{branch.address}</p>
                <span className="text-[10px] font-mono font-bold text-[#1E3A8A] mt-1.5 inline-block bg-[#1E3A8A]/5 px-2 py-0.5 rounded-full">Ext. {branch.ext}</span>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
                <button
                  onClick={() => handleOpenEdit(branch)}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(branch.id)}
                  className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-550 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {branches.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay sucursales registradas. Presione "Añadir Sucursal" para crear la primera.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingBranch ? 'Editar Sucursal' : 'Nueva Sucursal'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Nombre de la Sucursal</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sucursal Juriquilla"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Dirección de la Sucursal</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Av. de las Ciencias No. 2999, Col. Juriquilla"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Extensión Telefónica</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 590"
                  value={ext}
                  onChange={(e) => setExt(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Seleccionar Imagen Real de la Sucursal</label>
                <select
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-[#1E3A8A]"
                >
                  {IMAGES_LIST.map((imgOpt) => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                <div className="relative overflow-hidden h-24 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingBranch ? 'Guardar Cambios' : 'Crear Sucursal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StoreAdminPanel({ products, setProducts, addAuditLog, triggerNotification, triggerConfirm }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Paquetes');
  const [img, setImg] = useState('/assets/recursos/IMG_6631.jpg');
  
  // Nuevos estados para galería y promociones
  const [gallery, setGallery] = useState(['', '', '', '', '']);
  const [hasPromo, setHasPromo] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState('');
  const [promoStartDate, setPromoStartDate] = useState('');
  const [promoEndDate, setPromoEndDate] = useState('');
  const [promoLabel, setPromoLabel] = useState('');

  const IMAGES_LIST = [
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'IMG_6682 - Cruz e Iluminación', path: '/assets/recursos/IMG_6682.jpg' },
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' },
    { label: 'IMG_6815 - Homenaje Floral', path: '/assets/recursos/IMG_6815.jpg' },
    { label: 'IMG_6820 - Capilla Mayor Monumental', path: '/assets/recursos/IMG_6820.jpg' },
    { label: 'IMG_6655 - Detalles Vitrales', path: '/assets/recursos/IMG_6655.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' }
  ];

  const handleFileUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      triggerNotification('Subiendo imagen al servidor...', 'info');
      // Limpiar caracteres especiales del nombre
      const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const filename = `shop_${Date.now()}_${cleanName}`;
      
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        body: file
      });
      
      if (!response.ok) throw new Error('Error al subir el archivo');
      
      const resData = await response.json();
      if (resData.success && resData.path) {
        triggerNotification('Imagen cargada con éxito en el servidor.', 'success');
        if (type === 'main') {
          setImg(resData.path);
        } else if (type === 'gallery' && index !== null) {
          const updatedGallery = [...gallery];
          updatedGallery[index] = resData.path;
          setGallery(updatedGallery);
        }
      }
    } catch (err) {
      console.error('Error al subir imagen:', err);
      triggerNotification('Error en la carga de imagen.', 'error');
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setName('');
    setDesc('');
    setPrice('');
    setCategory('Paquetes');
    setImg('/assets/recursos/IMG_6631.jpg');
    setGallery(['', '', '', '', '']);
    setHasPromo(false);
    setPromoDiscount('');
    setPromoStartDate('');
    setPromoEndDate('');
    setPromoLabel('');
    setShowFormModal(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setName(prod.name);
    setDesc(prod.desc);
    setPrice(prod.price || '');
    setCategory(prod.category || 'Paquetes');
    setImg(prod.img || '/assets/recursos/IMG_6631.jpg');
    
    // Rellenar galería hasta 5 elementos
    const initialGallery = prod.gallery || [];
    const paddedGallery = [...initialGallery];
    while (paddedGallery.length < 5) {
      paddedGallery.push('');
    }
    setGallery(paddedGallery);

    setHasPromo(prod.hasPromo || false);
    setPromoDiscount(prod.promoDiscount || '');
    setPromoStartDate(prod.promoStartDate || '');
    setPromoEndDate(prod.promoEndDate || '');
    setPromoLabel(prod.promoLabel || '');
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim() || !price) return;

    const cleanGallery = gallery.filter(url => url.trim() !== '');

    if (editingProduct) {
      const oldVal = { ...editingProduct };
      const newVal = { 
        ...editingProduct, 
        name: name.trim(), 
        desc: desc.trim(), 
        price: Number(price), 
        category, 
        img,
        gallery: cleanGallery,
        hasPromo,
        promoDiscount: hasPromo ? Number(promoDiscount) : null,
        promoStartDate: hasPromo ? promoStartDate : null,
        promoEndDate: hasPromo ? promoEndDate : null,
        promoLabel: hasPromo ? promoLabel.trim() : null
      };
      const updated = products.map(p => p.id === editingProduct.id ? newVal : p);
      setProducts(updated);
      addAuditLog('products', editingProduct.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Producto actualizado exitosamente.');
    } else {
      const newProd = {
        id: 'product_' + Date.now(),
        name: name.trim(),
        desc: desc.trim(),
        price: Number(price),
        category,
        img,
        gallery: cleanGallery,
        hasPromo,
        promoDiscount: hasPromo ? Number(promoDiscount) : null,
        promoStartDate: hasPromo ? promoStartDate : null,
        promoEndDate: hasPromo ? promoEndDate : null,
        promoLabel: hasPromo ? promoLabel.trim() : null
      };
      const updated = [...products, newProd];
      setProducts(updated);
      addAuditLog('products', newProd.id, 'INSERT', null, newProd);
      triggerNotification('Producto creado exitosamente.');
    }

    setShowFormModal(false);
  };

  const handleDelete = (prodId) => {
    const prodToDelete = products.find(p => p.id === prodId);
    triggerConfirm(`¿Está seguro de eliminar el producto "${prodToDelete?.name || ''}" del catálogo?`, () => {
      const updated = products.filter(p => p.id !== prodId);
      setProducts(updated);
      addAuditLog('products', prodId, 'DELETE', prodToDelete, null);
      triggerNotification('Producto eliminado del catálogo.', 'success');
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Catálogo e Inventario (Tienda JAE)</h4>
          <p className="text-xs text-slate-400 mt-1">Gestione sus Pólizas, Paquetes de previsión, Espacios a perpetuidad y Mejoras de venta adicionales.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Producto / Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(prod => {
          const promo = getActivePromo(prod);
          return (
            <div key={prod.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="relative overflow-hidden h-36 bg-slate-200">
                {prod.img ? (
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-xs">Sin Imagen</div>
                )}
                
                <span className="absolute top-2.5 left-2.5 bg-[#081225]/85 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10">
                  {prod.category}
                </span>

                {promo && (
                  <span className="absolute top-2.5 right-2.5 bg-amber-550 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full shadow border border-white/10">
                    {promo.discount}% OFF • ACTIVA
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-slate-800 leading-snug">{prod.name}</h5>
                  <p className="text-[9.5px] text-slate-550 leading-normal line-clamp-2">{prod.desc}</p>
                  
                  <div className="pt-1 flex flex-col">
                    {promo ? (
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 line-through font-mono">${prod.price?.toLocaleString()} MXN</span>
                        <span className="text-xs font-bold font-mono text-[#1E3A8A]">${promo.discountedPrice?.toLocaleString()} MXN</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold font-mono text-[#1E3A8A]">${prod.price?.toLocaleString()} MXN</span>
                    )}
                  </div>
                  
                  {prod.gallery && prod.gallery.length > 0 && (
                    <p className="text-[8.5px] text-slate-400 font-bold">
                      📸 Galería: {prod.gallery.length} foto(s) adicional(es)
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/45">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="bg-white border border-slate-250 hover:bg-slate-100 text-slate-650 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="bg-red-50 hover:bg-red-100 border border-red-150 text-red-600 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay productos registrados. Presione "Añadir Producto" para registrar el primero.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full my-auto shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-slate-150">
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                {editingProduct ? 'Editar Artículo de Tienda JAE' : 'Nuevo Artículo de Tienda JAE'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowFormModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Sección A: Información Básica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 font-bold block">Nombre del Producto / Plan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Paquetes a Futuro – Plan Bronce"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 font-bold block">Categoría de Negocio *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-650 focus:outline-none focus:border-[#1E3A8A]"
                  >
                    <option value="Pólizas">Pólizas</option>
                    <option value="Paquetes">Paquetes</option>
                    <option value="Espacios">Espacios (Fosas / Nichos)</option>
                    <option value="Mejoras">Mejoras / Otros Productos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-600 font-bold block">Precio de Lista (MXN) *</label>
                  <input
                    type="number"
                    required
                    placeholder="Ej. 26250"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Descripción o Cobertura Detallada *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detalles sobre el ataúd, urna, tiempo de velación, cafetería, etc..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none resize-none focus:border-[#1E3A8A]"
                />
              </div>

              {/* Sección B: Imagen Principal & Carga */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider">Fotografía Principal</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600 font-bold block">Imagen Real Predefinida</label>
                    <select
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-650 focus:outline-none focus:border-[#1E3A8A]"
                    >
                      {IMAGES_LIST.map((imgOpt) => (
                        <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#1E3A8A] font-bold block">O Cargar Fotografía Nueva (PC Local)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'main')}
                      className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-650 focus:outline-none focus:border-[#1E3A8A] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-[#1E3A8A]/10 file:text-[#1E3A8A] hover:file:bg-[#1E3A8A]/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-bold">Ruta Actual:</span>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-500 focus:outline-none"
                  />
                  <div className="relative overflow-hidden w-20 h-14 bg-slate-100 rounded-xl border border-slate-200 flex-shrink-0">
                    <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Sección C: Galería Adicional (Hasta 5 fotos) */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider flex justify-between items-center">
                  <span>Imágenes Adicionales de la Galería (Hasta 5 fotos)</span>
                  <span className="text-[10px] text-slate-400 font-normal normal-case">Vacías se omitirán en la ficha</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((val, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-bold">Foto #{idx + 1}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'gallery', idx)}
                          className="w-36 text-[9px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-slate-200 hover:file:bg-slate-300"
                        />
                      </div>
                      
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Ruta o URL de la foto..."
                          value={val}
                          onChange={(e) => {
                            const updated = [...gallery];
                            updated[idx] = e.target.value;
                            setGallery(updated);
                          }}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] text-slate-700 font-mono focus:outline-none focus:border-[#1E3A8A]"
                        />
                        {val && (
                          <div className="w-10 h-8 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                            <img src={val} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección D: Promociones & Descuentos */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="hasPromo"
                    checked={hasPromo}
                    onChange={(e) => setHasPromo(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <label htmlFor="hasPromo" className="text-xs text-slate-800 font-bold cursor-pointer">
                    Habilitar descuento / promoción especial
                  </label>
                </div>

                {hasPromo && (
                  <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-650 font-bold block">Porcentaje de Descuento (%) *</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="99"
                          placeholder="Ej. 15"
                          value={promoDiscount}
                          onChange={(e) => setPromoDiscount(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-650 font-bold block">Nombre de Promoción *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Buen Fin Previsión, Descuento Pascua"
                          value={promoLabel}
                          onChange={(e) => setPromoLabel(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-650 font-bold block">Fecha de Inicio *</label>
                        <input
                          type="date"
                          required
                          value={promoStartDate}
                          onChange={(e) => setPromoStartDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-650 font-bold block">Fecha de Término *</label>
                        <input
                          type="date"
                          required
                          value={promoEndDate}
                          onChange={(e) => setPromoEndDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                        />
                      </div>
                    </div>

                    {price && promoDiscount && (
                      <p className="text-[11px] text-[#1E3A8A] font-semibold">
                        🏷️ Precio Final Promocionado: ${(Math.round(price * (1 - promoDiscount / 100))).toLocaleString()} MXN
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Botones de Guardado */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg shadow-[#1E3A8A]/10"
                >
                  {editingProduct ? 'Guardar Cambios JAE' : 'Añadir al Catálogo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE SALAS
// ====================================================================================
function RoomsAdminPanel({ rooms, setRooms, branches, addAuditLog, triggerNotification, triggerConfirm }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [branchId, setBranchId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [observations, setObservations] = useState('');
  const [img, setImg] = useState('/assets/recursos/IMG_6693.jpg');

  const IMAGES_LIST = [
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingRoom(null);
    setBranchId(branches.length > 0 ? branches[0].id : '');
    setName('');
    setType('');
    setCapacity('');
    setObservations('');
    setImg('/assets/recursos/IMG_6693.jpg');
    setShowFormModal(true);
  };

  const handleOpenEdit = (room) => {
    setEditingRoom(room);
    setBranchId(room.branchId || '');
    setName(room.name || '');
    setType(room.type || '');
    setCapacity(room.capacity || '');
    setObservations(room.observations || '');
    setImg(room.img || '/assets/recursos/IMG_6693.jpg');
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !branchId) return;

    if (editingRoom) {
      const oldVal = { ...editingRoom };
      const newVal = { ...editingRoom, branchId, name: name.trim(), type: type.trim(), capacity: Number(capacity), observations: observations.trim(), img };
      const updated = rooms.map(r => r.id === editingRoom.id ? newVal : r);
      setRooms(updated);
      addAuditLog('rooms', editingRoom.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Sala actualizada exitosamente.');
    } else {
      const newRoom = {
        id: 'room_' + Date.now(),
        branchId,
        name: name.trim(),
        type: type.trim(),
        capacity: Number(capacity),
        observations: observations.trim(),
        img
      };
      const updated = [...rooms, newRoom];
      setRooms(updated);
      addAuditLog('rooms', newRoom.id, 'INSERT', null, newRoom);
      triggerNotification('Sala creada exitosamente.');
    }

    setShowFormModal(false);
  };

  const handleDelete = (roomId) => {
    const roomToDelete = rooms.find(r => r.id === roomId);
    triggerConfirm(`¿Está seguro de eliminar la sala "${roomToDelete?.name || ''}"?`, () => {
      const updated = rooms.filter(r => r.id !== roomId);
      setRooms(updated);
      addAuditLog('rooms', roomId, 'DELETE', roomToDelete, null);
      triggerNotification('Sala eliminada exitosamente.', 'success');
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Salas Disponibles</h4>
          <p className="text-xs text-slate-400 mt-1">Configure las salas de velación para cada una de sus sucursales.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Sala
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map(room => {
          const parentBranch = branches.find(b => b.id === room.branchId);
          return (
            <div key={room.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative overflow-hidden h-32 bg-slate-200">
                {room.img ? (
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-[11px]">Imagen de Sala</div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 text-[#081225] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Aforo: {room.capacity}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#1E3A8A]">{room.name}</h5>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Sucursal: {parentBranch?.name || 'Desconocida'}</p>
                  <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 italic">{room.observations}</p>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
                  <button
                    onClick={() => handleOpenEdit(room)}
                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-550 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {rooms.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay salas registradas. Presione "Añadir Sala" para crear la primera.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingRoom ? 'Editar Sala' : 'Nueva Sala'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Sucursal Perteneciente</label>
                <select
                  required
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="">Seleccione una sucursal</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Nombre de la Sala</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sala 21"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="flex gap-4">
                <div className="space-y-1.5 flex-1">
                  <label className="text-xs text-slate-600 font-bold block">Tipo / Categoría</label>
                  <input
                    type="text"
                    placeholder="Ej. PREMIER/PLATINO"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div className="space-y-1.5 w-24">
                  <label className="text-xs text-slate-600 font-bold block">Aforo</label>
                  <input
                    type="number"
                    placeholder="Ej. 50"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">En qué caso aplica / Observaciones</label>
                <input
                  type="text"
                  placeholder="Ej. ORO/BRONCE / CLASICO/BASICO PÓLIZA"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Fotografía</label>
                <select
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-[#1E3A8A]"
                >
                  {IMAGES_LIST.map((imgOpt) => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                <div className="relative overflow-hidden h-24 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingRoom ? 'Guardar Cambios' : 'Crear Sala'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE SESIONES (⏱️ CONTROL DE SESIONES)
// ====================================================================================
function SessionsAdminPanel({ activeSessions, setActiveSessions, systemConfig, setSystemConfig, addAuditLog, triggerNotification, triggerConfirm }) {
  const [timeoutMinutes, setTimeoutMinutes] = useState(systemConfig.sessionTimeoutMinutes || 15);

  const handleKick = (session) => {
    triggerConfirm(
      '¿Forzar Cierre de Sesión?',
      `El colaborador ${session.name} será expulsado inmediatamente y perderá cualquier cambio no guardado en su pestaña activa.`,
      () => {
        setActiveSessions(prev => prev.filter(s => s.sessionId !== session.sessionId));
        addAuditLog('sessions', session.userId, 'KICK', session, null);
        triggerNotification(`Sesión de ${session.name} cerrada forzosamente.`);
      }
    );
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    const mins = parseInt(timeoutMinutes);
    if (isNaN(mins) || mins < 1 || mins > 1440) {
      triggerNotification('Por favor ingrese un tiempo válido entre 1 y 1440 minutos.', 'error');
      return;
    }

    const oldConfig = { ...systemConfig };
    const newConfig = { ...systemConfig, sessionTimeoutMinutes: mins };
    
    setSystemConfig(newConfig);
    addAuditLog('system_config', 'session_timeout', 'UPDATE', oldConfig, newConfig);
    triggerNotification('Configuración de inactividad guardada con éxito.');
  };

  // Helpers de formato de tiempo
  const formatTime = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  };

  const formatTimeAgo = (ts) => {
    if (!ts) return 'N/A';
    const diffMs = Date.now() - ts;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Hace un momento';
    if (diffMins === 1) return 'Hace 1 minuto';
    return `Hace ${diffMins} min`;
  };

  // Contar roles activos
  const adminCount = activeSessions.filter(s => s.role === 'ADMIN').length;
  const staffCount = activeSessions.filter(s => s.role === 'EMPLEADO').length;

  return (
    <div className="space-y-6">
      
      {/* Encabezado y Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tarjeta 1: Total de Sesiones */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#1E3A8A]/5 rounded-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="p-4 bg-blue-50 text-[#1E3A8A] rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Usuarios Online</span>
            <span className="text-3xl font-bold text-slate-900 font-mono leading-none mt-1 block">
              {activeSessions.length}
            </span>
          </div>
        </div>

        {/* Tarjeta 2: Administradores */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/5 rounded-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Administradores</span>
            <span className="text-3xl font-bold text-slate-900 font-mono leading-none mt-1 block">
              {adminCount}
            </span>
          </div>
        </div>

        {/* Tarjeta 3: Límite de inactividad */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Límite de Inactividad</span>
            <span className="text-3xl font-bold text-slate-900 font-mono leading-none mt-1 block">
              {systemConfig.sessionTimeoutMinutes || 15} <span className="text-xs font-sans text-slate-400">min</span>
            </span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Lista de Sesiones Activas (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-lg">Sesiones de Trabajo Activas</h4>
                <p className="text-xs text-slate-400 mt-1">Colaboradores con sesión de Intranet iniciada actualmente en el corporativo.</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-250 px-3 py-1 rounded-full animate-pulse">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Sincronizado
              </span>
            </div>

            {activeSessions.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl space-y-4">
                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">No hay sesiones activas</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">Actualmente ningún colaborador o administrador está conectado en el sistema.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto pr-1">
                {activeSessions.map((session) => (
                  <div key={session.sessionId} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all hover:bg-slate-50/50 px-3 rounded-2xl border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      {/* Avatar representativo */}
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-serif text-lg font-bold shadow-inner ${
                        session.role === 'ADMIN' 
                          ? 'bg-amber-50 text-amber-700 border border-amber-250' 
                          : 'bg-blue-50 text-blue-700 border border-blue-250'
                      }`}>
                        {session.name ? session.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-sm text-slate-800 leading-none">{session.name}</p>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border shadow-sm ${
                            session.role === 'ADMIN' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200/80 shadow-amber-100/10' 
                              : 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-blue-100/10'
                          }`}>
                            {session.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium font-mono">{session.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      
                      {/* Información de Tiempos */}
                      <div className="text-left sm:text-right space-y-1.5">
                        <div className="text-xs text-slate-700 font-semibold flex sm:justify-end items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Inicio:</span>
                          <span className="font-mono">{formatTime(session.loginTime)}</span>
                        </div>
                        <div className="text-xs text-slate-700 font-semibold flex sm:justify-end items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Activo:</span>
                          <span className="text-blue-600 bg-blue-50 border border-blue-150 px-2 py-0.5 rounded-md font-medium text-[10px] tracking-wide whitespace-nowrap">
                            {formatTimeAgo(session.lastActivity)}
                          </span>
                        </div>
                      </div>

                      {/* Botón de Expulsión (Kick) */}
                      <button
                        type="button"
                        onClick={() => handleKick(session)}
                        className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all border border-red-200 hover:border-red-500 cursor-pointer shadow-sm hover:shadow-md active:scale-95 group/btn"
                        title="Forzar Cierre de Sesión"
                      >
                        <LogOut className="w-4 h-4 transition-transform group-hover/btn:-translate-x-0.5" />
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Configuración de Parámetros Globales (1/3) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 h-full flex flex-col justify-between">
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h4 className="font-serif font-bold text-slate-900 text-lg">Parámetros de Sesión</h4>
              <p className="text-xs text-slate-400 mt-1">Configure las políticas de seguridad global del sistema intranet.</p>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Tiempo Límite por Inactividad
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    min="1"
                    max="1440"
                    value={timeoutMinutes}
                    onChange={(e) => setTimeoutMinutes(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl pl-4 pr-16 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1E3A8A] font-mono"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-slate-400 uppercase">minutos</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  Si un usuario no interactúa en la Intranet durante este tiempo, su sesión se cerrará de forma automática por protección.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <Save className="w-3.5 h-3.5" />
                Guardar Configuración
              </button>

            </form>
          </div>
          
          {/* Tarjeta de Seguridad */}
          <div className="mt-8 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2">
            <h5 className="text-xs font-bold text-slate-850 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              Garantía de Sesiones JAE
            </h5>
            <p className="text-[10px] text-slate-400 leading-relaxed font-light">
              Todas las conexiones y auditorías quedan registradas de manera permanente en el registro histórico. La inactividad evita fugas de información.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
